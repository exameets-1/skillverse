// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Otp from '@/lib/models/Otp';
// import Student from '@/lib/models/Student';
// import TestAttempt from '@/lib/models/TestAttempt';
// import TestCourse from '@/lib/models/TestCourse';

// export async function POST(request: NextRequest) {
//   try {
//     await dbConnect();

//     const body = await request.json();
//     const { email, otp } = body;

//     // Validate required fields
//     if (!email || !otp) {
//       return NextResponse.json(
//         { error: 'Email and OTP are required' },
//         { status: 400 }
//       );
//     }

//     // Validate OTP format (6 digits)
//     if (!/^\d{6}$/.test(otp.toString())) {
//       return NextResponse.json(
//         { error: 'OTP must be a 6-digit number' },
//         { status: 400 }
//       );
//     }

//     // Find the OTP record
//     const otpRecord = await Otp.findOne({ 
//       email,
//       createdAt: { $gt: new Date(Date.now() - 5 * 60 * 1000) } // Within last 5 minutes
//     });

//     if (!otpRecord) {
//       return NextResponse.json(
//         { error: 'OTP not found or expired. Please request a new OTP.' },
//         { status: 404 }
//       );
//     }

//     // Check if already verified
//     if (otpRecord.verified) {
//       return NextResponse.json(
//         { error: 'OTP has already been verified' },
//         { status: 400 }
//       );
//     }

//     // Check attempts limit (max 5 attempts)
//     if (otpRecord.attempts >= 5) {
//       await Otp.deleteOne({ _id: otpRecord._id });
//       return NextResponse.json(
//         { error: 'Maximum verification attempts exceeded. Please request a new OTP.' },
//         { status: 429 }
//       );
//     }

//     // Verify OTP
//     if (otpRecord.otp !== parseInt(otp)) {
//       // Increment attempts
//       await Otp.findByIdAndUpdate(otpRecord._id, { 
//         $inc: { attempts: 1 } 
//       });

//       const remainingAttempts = 5 - (otpRecord.attempts + 1);
//       return NextResponse.json(
//         { 
//           error: 'Invalid OTP',
//           remainingAttempts: remainingAttempts > 0 ? remainingAttempts : 0
//         },
//         { status: 400 }
//       );
//     }

//     // OTP is valid - mark as verified
//     await Otp.findByIdAndUpdate(otpRecord._id, { 
//       verified: true 
//     });

//     // Find student by email
//     const student = await Student.findOne({ studentEmail: email })
//       .populate('registeredCourses');

//     if (!student) {
//       return NextResponse.json(
//         { error: 'No student found with this email' },
//         { status: 404 }
//       );
//     }

//     // Get all test attempts for this student
//     const testAttempts = await TestAttempt.find({ 
//       student: student._id 
//     });

//     // Create a map of testCourse ID to attempt status
//     const attemptStatusMap = new Map();
//     testAttempts.forEach(attempt => {
//       attemptStatusMap.set(attempt.testCourse.toString(), attempt.status);
//     });

//     // Build the test courses array with their statuses
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const testCourses = student.registeredCourses.map((course: any) => {
//       const courseId = course._id.toString();
//       const status = attemptStatusMap.get(courseId) || 'not_started';
      
//       return {
//         testCourseId: course._id,
//         title: course.title,
//         description: course.description,
//         durationMinutes: course.durationMinutes,
//         totalMarks: course.totalMarks,
//         status: status // 'not_started', 'in_progress', 'submitted', or 'auto_submitted'
//       };
//     });

//     return NextResponse.json({
//       message: 'OTP verified successfully',
//       email: email,
//       verified: true,
//       student: {
//         id: student._id,
//         name: student.name,
//         email: student.studentEmail,
//         registeredCourses: testCourses
//       }
//     }, { status: 200 });

//   } catch (error) {
//     console.error('Verify OTP error:', error);
//     return NextResponse.json(
//       { error: 'Failed to verify OTP. Please try again later.' },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Otp from '@/lib/test-models/Otp';
import Student from '@/lib/test-models/Student';
import TestAttempt from '@/lib/test-models/TestAttempt';
import TestCourse from '@/lib/test-models/TestCourse';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, otp } = body;

    // Validate required fields
    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Validate OTP format (6 digits)
    if (!/^\d{6}$/.test(otp.toString())) {
      return NextResponse.json(
        { error: 'OTP must be a 6-digit number' },
        { status: 400 }
      );
    }

    // Find the OTP record
    const otpRecord = await Otp.findOne({ 
      email,
      createdAt: { $gt: new Date(Date.now() - 5 * 60 * 1000) } // Within last 5 minutes
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'OTP not found or expired. Please request a new OTP.' },
        { status: 404 }
      );
    }

    // Check if already verified
    if (otpRecord.verified) {
      return NextResponse.json(
        { error: 'OTP has already been verified' },
        { status: 400 }
      );
    }

    // Check attempts limit (max 5 attempts)
    if (otpRecord.attempts >= 5) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return NextResponse.json(
        { error: 'Maximum verification attempts exceeded. Please request a new OTP.' },
        { status: 429 }
      );
    }

    // Verify OTP
    if (otpRecord.otp !== parseInt(otp)) {
      // Increment attempts
      await Otp.findByIdAndUpdate(otpRecord._id, { 
        $inc: { attempts: 1 } 
      });

      const remainingAttempts = 5 - (otpRecord.attempts + 1);
      return NextResponse.json(
        { 
          error: 'Invalid OTP',
          remainingAttempts: remainingAttempts > 0 ? remainingAttempts : 0
        },
        { status: 400 }
      );
    }

    // OTP is valid - mark as verified
    await Otp.findByIdAndUpdate(otpRecord._id, { 
      verified: true 
    });

    // Ensure TestCourse model is registered
    // This import at the top ensures the model is loaded
    if (!TestCourse) {
      throw new Error('TestCourse model not loaded');
    }

    // Find student by email
    const student = await Student.findOne({ studentEmail: email })
      .populate('registeredCourses');

    if (!student) {
      return NextResponse.json(
        { error: 'No student found with this email' },
        { status: 404 }
      );
    }

    // Get all test attempts for this student
    const testAttempts = await TestAttempt.find({ 
      student: student._id 
    });

    // Create a map of testCourse ID to attempt status
    const attemptStatusMap = new Map<string, string>();
    testAttempts.forEach(attempt => {
      attemptStatusMap.set(attempt.testCourse.toString(), attempt.status);
    });

    // Build the test courses array with their statuses
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const testCourses = student.registeredCourses.map((course: any) => {
      const courseId = course._id.toString();
      const status = attemptStatusMap.get(courseId) || 'not_started';
      
      return {
        testCourseId: course._id,
        title: course.title,
        description: course.description,
        durationMinutes: course.durationMinutes,
        totalMarks: course.totalMarks,
        status: status // 'not_started', 'in_progress', 'submitted', or 'auto_submitted'
      };
    });

    return NextResponse.json({
      message: 'OTP verified successfully',
      email: email,
      verified: true,
      student: {
        id: student._id,
        name: student.name,
        email: student.studentEmail,
        registeredCourses: testCourses
      }
    }, { status: 200 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    //console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP. Please try again later.' },
      { status: 500 }
    );
  }
}