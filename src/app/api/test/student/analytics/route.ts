import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';

// Import models in correct order
import '@/lib/models/TestCourse';  // Import first to register schema
import Student from '@/lib/models/Student';
import TestAttempt from '@/lib/models/TestAttempt';

const allowedOrigin = 'https://admin.exameets.in';

interface PopulatedCourse {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  totalMarks: number;
  durationMinutes: number;
  testDate: Date | null;
}

interface PopulatedReferrer {
  name: string;
  studentEmail: string;
}

interface StudentDoc {
  _id: mongoose.Types.ObjectId;
  name: string;
  studentEmail: string;
  studentNumber: string;
  studentDOB: Date;
  studentGuardianName: string;
  studentGuardianNumber: string;
  location?: {
    state: string;
    district: string;
  };
  verified: boolean;
  referralCode?: string;
  referredBy?: PopulatedReferrer;
  createdAt: Date;
  registeredCourses: PopulatedCourse[];
}

interface AnswerAttempt {
  optionSelected: number | null;
}

interface PopulatedTestCourse {
  title: string;
  totalMarks: number;
}

interface TestAttemptDoc {
  _id: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  testCourse?: PopulatedTestCourse;
  status: string;
  startTime: Date;
  endTime: Date;
  answerAttempts: AnswerAttempt[];
  timeRemaining?: number;
}

export async function GET() {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    await dbConnect();

    // Fetch all students with their registered courses populated
    const studentsResult = await Student.find({})
      .populate({
        path: 'registeredCourses',
        select: 'title description totalMarks durationMinutes testDate'
      })
      .populate({
        path: 'referredBy',
        select: 'name studentEmail'
      })
      .sort({ createdAt: -1 })
      .lean();

    const students = studentsResult as unknown as StudentDoc[];

    // Get all test attempts for these students
    const studentIds = students.map(student => student._id);
    const attemptsResult = await TestAttempt.find({
      student: { $in: studentIds }
    })
      .populate({
        path: 'testCourse',
        select: 'title totalMarks'
      })
      .lean();

    const testAttempts = attemptsResult as unknown as TestAttemptDoc[];

    // Create a map of student ID to their test attempts
    const attemptsByStudent: Record<string, TestAttemptDoc[]> = {};
    
    testAttempts.forEach(attempt => {
      const studentId = attempt.student.toString();
      if (!attemptsByStudent[studentId]) {
        attemptsByStudent[studentId] = [];
      }
      attemptsByStudent[studentId].push(attempt);
    });

    // Format the response data
    const analyticsData = students.map((student) => {
      const studentId = student._id.toString();
      const attempts = attemptsByStudent[studentId] || [];

      // Calculate statistics
      const completedAttempts = attempts.filter(
        (a) => a.status === 'submitted' || a.status === 'auto_submitted'
      );
      const inProgressAttempts = attempts.filter(
        (a) => a.status === 'in_progress'
      );

      return {
        id: student._id,
        name: student.name,
        email: student.studentEmail,
        phone: student.studentNumber,
        dateOfBirth: student.studentDOB,
        guardianName: student.studentGuardianName,
        guardianPhone: student.studentGuardianNumber,
        location: {
          state: student.location?.state || '',
          district: student.location?.district || ''
        },
        verified: student.verified,
        referralCode: student.referralCode || null,
        referredBy: student.referredBy ? {
          name: student.referredBy.name,
          email: student.referredBy.studentEmail
        } : null,
        registeredAt: student.createdAt,
        
        // Course statistics
        registeredCourses: student.registeredCourses.map((course) => ({
          id: course._id,
          title: course.title,
          description: course.description,
          totalMarks: course.totalMarks,
          durationMinutes: course.durationMinutes,
          testDate: course.testDate
        })),
        totalRegisteredCourses: student.registeredCourses.length,

        // Test attempt statistics
        testAttempts: attempts.map((attempt) => ({
          id: attempt._id,
          courseTitle: attempt.testCourse?.title || 'Unknown Course',
          status: attempt.status,
          startTime: attempt.startTime,
          endTime: attempt.endTime,
          totalQuestions: attempt.answerAttempts.length,
          answeredQuestions: attempt.answerAttempts.filter(
            (ans) => ans.optionSelected !== null
          ).length,
          timeRemaining: attempt.timeRemaining
        })),
        totalAttempts: attempts.length,
        completedAttempts: completedAttempts.length,
        inProgressAttempts: inProgressAttempts.length
      };
    });

    return NextResponse.json(
      {
        success: true,
        totalStudents: students.length,
        students: analyticsData
      },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Fetch student analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student analytics' },
      { status: 500, headers }
    );
  }
}

// Handle preflight requests (important for browsers)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}