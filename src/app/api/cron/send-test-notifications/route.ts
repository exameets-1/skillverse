import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Student from '@/lib/test-models/Student';
import TestAttempt from '@/lib/test-models/TestAttempt';
import '@/lib/test-models/TestCourse';
import { getTestNotificationTemplate } from '@/lib/emailTemplates/testNotification';
import { sendEmail } from '@/lib/sendEmail';

interface ITestCourse {
  _id: string;
  title: string;
  questionsPerTest: number;
  durationMinutes: number;
}

interface IStudent {
  _id: string;
  name: string;
  studentEmail: string;
  studentNumber: string;
  location: {
    state: string;
    district: string;
  };
  registeredCourses: ITestCourse[];
  createdAt: Date;
  verified: boolean;
}

// Helper function to determine email subject based on registration date
function getEmailSubject(registrationDate: Date): string {
  const now = new Date();
  const regDate = new Date(registrationDate);
  
  // Calculate days difference (ignore time, just compare dates)
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const regDateOnly = new Date(regDate.getFullYear(), regDate.getMonth(), regDate.getDate());
  const daysDifference = Math.floor((nowDate.getTime() - regDateOnly.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDifference === 0) {
    // Same day registration
    return '🚀 Your Test is Now LIVE - Exameets Skillverse Talent Hunt';
  } else if (daysDifference === 1) {
    // Registered yesterday
    return '⏰ Your Test is Awaiting - Don\'t Miss Out!';
  } else if (daysDifference === 2) {
    // Registered 2 days ago
    return '📢 Reminder: Your Test is Still Waiting - Exameets Skillverse';
  } else {
    // Registered 3+ days ago
    return '⚠️ Final Reminder: Complete Your Pending Test - Exameets Skillverse';
  }
}

// GET method for cron job (no authentication needed for cron)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Build query to fetch all students with registered courses
    const query: Record<string, unknown> = { 
      registeredCourses: { $exists: true, $ne: [] }
    };

    const students = await Student.find(query)
      .populate('registeredCourses')
      .lean() as unknown as IStudent[];

    const results = [];

    for (const student of students) {
      const validCourses = (student.registeredCourses || []).filter((course): course is ITestCourse => !!course);

      if (validCourses.length === 0) continue;

      // Fetch all test attempts for this student
      const attemptedTests = await TestAttempt.find({
        student: student._id
      }).select('testCourse').lean();

      // Create a Set of attempted course IDs for quick lookup
      const attemptedCourseIds = new Set(
        attemptedTests.map(attempt => attempt.testCourse.toString())
      );

      // Filter out courses that have already been attempted
      const unattemptedCourses = validCourses.filter(
        (course: ITestCourse) => !attemptedCourseIds.has(course._id.toString())
      );

      // Skip this student if all courses have been attempted
      if (unattemptedCourses.length === 0) {
        results.push({ 
          email: student.studentEmail, 
          status: 'skipped',
          reason: 'all_tests_attempted'
        });
        continue;
      }

      // Prepare course data for email template (only unattempted courses)
      const coursesData = unattemptedCourses.map((course: ITestCourse) => ({
        title: course.title,
        questionsPerTest: course.questionsPerTest,
        durationMinutes: course.durationMinutes
      }));

      const emailHTML = getTestNotificationTemplate({
        studentName: student.name,
        registeredCourses: coursesData
      });

      // Get dynamic subject based on registration date
      const emailSubject = getEmailSubject(student.createdAt);

      try {
        await sendEmail({
          to: student.studentEmail,
          subject: emailSubject,
          message: emailHTML
        });
        
        results.push({ 
          email: student.studentEmail, 
          status: 'sent',
          subject: emailSubject,
          unattemptedCount: unattemptedCourses.length,
          totalCourses: validCourses.length,
          registeredDaysAgo: Math.floor((Date.now() - new Date(student.createdAt).getTime()) / (1000 * 60 * 60 * 24))
        });
      } catch (error) {
        results.push({ 
          email: student.studentEmail, 
          status: 'failed', 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
      summary: {
        total: students.length,
        sent: results.filter(r => r.status === 'sent').length,
        skipped: results.filter(r => r.status === 'skipped').length,
        failed: results.filter(r => r.status === 'failed').length
      }
    });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send notifications' },
      { status: 500 }
    );
  }
}