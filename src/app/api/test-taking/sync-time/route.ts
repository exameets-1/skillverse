// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import TestAttempt from '@/lib/models/TestAttempt';
// import jwt from 'jsonwebtoken';

// interface JWTPayload {
//   testAttemptId: string;
//   studentId: string;
//   testCourseId: string;
//   type: string;
// }

// interface TestAttemptDocument {
//   _id: string;
//   status: string;
//   endTime: Date;
//   startTime: Date;
//   timeRemaining: number;
//   save: () => Promise<void>;
// }

// export async function POST(request: NextRequest) {
//   try {
//     await dbConnect();

//     // Validate JWT_SECRET exists
//     const JWT_SECRET = process.env.JWT_SECRET;
//     if (!JWT_SECRET) {
//       console.error('JWT_SECRET is not configured');
//       return NextResponse.json(
//         { error: 'Server configuration error' },
//         { status: 500 }
//       );
//     }

//     // Extract and verify JWT token
//     const authHeader = request.headers.get('authorization');
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return NextResponse.json(
//         { error: 'No authorization token provided' },
//         { status: 401 }
//       );
//     }

//     const token = authHeader.substring(7);
//     let decoded: JWTPayload;

//     try {
//       decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
//     } catch {
//       return NextResponse.json(
//         { error: 'Invalid or expired session token' },
//         { status: 401 }
//       );
//     }

//     // Verify token type
//     if (decoded.type !== 'test_session') {
//       return NextResponse.json(
//         { error: 'Invalid token type' },
//         { status: 401 }
//       );
//     }

//     const body = await request.json();
//     const { testAttemptId } = body;

//     // Validate required fields
//     if (!testAttemptId) {
//       return NextResponse.json(
//         { error: 'Test attempt ID is required' },
//         { status: 400 }
//       );
//     }

//     // Verify testAttemptId matches token
//     if (testAttemptId !== decoded.testAttemptId) {
//       return NextResponse.json(
//         { error: 'Test attempt ID mismatch' },
//         { status: 403 }
//       );
//     }

//     // Find test attempt
//     const testAttempt = await TestAttempt.findById(testAttemptId) as TestAttemptDocument | null;
//     if (!testAttempt) {
//       return NextResponse.json(
//         { error: 'Test attempt not found' },
//         { status: 404 }
//       );
//     }

//     // Check if test is still valid
//     const now = new Date();
    
//     if (testAttempt.status !== 'in_progress') {
//       return NextResponse.json(
//         { error: 'Test is not in progress' },
//         { status: 400 }
//       );
//     }

//     // Calculate accurate time remaining
//     const timeRemainingMs = testAttempt.endTime.getTime() - now.getTime();
//     const timeRemainingSeconds = Math.max(0, Math.floor(timeRemainingMs / 1000));

//     // Update timeRemaining in database
//     testAttempt.timeRemaining = timeRemainingSeconds;

//     // Auto-submit if time has expired
//     if (timeRemainingSeconds <= 0) {
//       testAttempt.status = 'auto_submitted';
//       await testAttempt.save();

//       console.log('=== AUTO-SUBMITTED (TIME SYNC) ===');
//       console.log('Test Attempt ID:', testAttemptId);
//       console.log('Student ID:', decoded.studentId);
//       console.log('Auto-submit Time:', now.toISOString());
//       console.log('==================================');

//       return NextResponse.json({
//         message: 'Test time expired and auto-submitted',
//         timeRemaining: 0,
//         endTime: testAttempt.endTime.toISOString(),
//         status: 'auto_submitted',
//         autoSubmitted: true
//       }, { status: 200 });
//     }

//     await testAttempt.save();

//     // Log sync operation
//     console.log('=== TIME SYNC ===');
//     console.log('Test Attempt ID:', testAttemptId);
//     console.log('Student ID:', decoded.studentId);
//     console.log('Server Time:', now.toISOString());
//     console.log('End Time:', testAttempt.endTime.toISOString());
//     console.log('Time Remaining:', timeRemainingSeconds, 'seconds');
//     console.log('================');

//     return NextResponse.json({
//       message: 'Time synced successfully',
//       timeRemaining: timeRemainingSeconds,
//       endTime: testAttempt.endTime.toISOString(),
//       startTime: testAttempt.startTime.toISOString(),
//       serverTime: now.toISOString(),
//       status: testAttempt.status
//     }, { status: 200 });

//   } catch (error) {
//     console.error('Time sync error:', error);
//     return NextResponse.json(
//       { error: 'Failed to sync time. Please try again.' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import TestAttempt from '@/lib/test-models/TestAttempt';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  testAttemptId: string;
  studentId: string;
  testCourseId: string;
  type: string;
}

interface TestAttemptDocument {
  _id: string;
  status: string;
  endTime: Date;
  startTime: Date;
  timeRemaining: number;
  save: () => Promise<void>;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Validate JWT_SECRET exists
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      //console.error('JWT_SECRET is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Extract and verify JWT token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let decoded: JWTPayload;

    try {
      decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
      return NextResponse.json(
        { error: 'Invalid or expired session token' },
        { status: 401 }
      );
    }

    // Verify token type
    if (decoded.type !== 'test_session') {
      return NextResponse.json(
        { error: 'Invalid token type' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { testAttemptId } = body;

    // Validate required fields
    if (!testAttemptId) {
      return NextResponse.json(
        { error: 'Test attempt ID is required' },
        { status: 400 }
      );
    }

    // Verify testAttemptId matches token
    if (testAttemptId !== decoded.testAttemptId) {
      return NextResponse.json(
        { error: 'Test attempt ID mismatch' },
        { status: 403 }
      );
    }

    // Find test attempt
    const testAttempt = await TestAttempt.findById(testAttemptId) as TestAttemptDocument | null;
    if (!testAttempt) {
      return NextResponse.json(
        { error: 'Test attempt not found' },
        { status: 404 }
      );
    }

    // Check if test is still valid
    const now = new Date();
    
    if (testAttempt.status !== 'in_progress') {
      return NextResponse.json(
        { error: 'Test is not in progress' },
        { status: 400 }
      );
    }

    // Calculate accurate time remaining
    const timeRemainingMs = testAttempt.endTime.getTime() - now.getTime();
    const timeRemainingSeconds = Math.max(0, Math.floor(timeRemainingMs / 1000));

    // Update timeRemaining in database
    testAttempt.timeRemaining = timeRemainingSeconds;

    // Auto-submit if time has expired (with 5-second grace period)
    const GRACE_PERIOD_SECONDS = 5;
    if (timeRemainingSeconds <= -GRACE_PERIOD_SECONDS) {
      testAttempt.status = 'auto_submitted';
      await testAttempt.save();

      // console.log('=== AUTO-SUBMITTED (TIME SYNC) ===');
      // console.log('Test Attempt ID:', testAttemptId);
      // console.log('Student ID:', decoded.studentId);
      // console.log('Auto-submit Time:', now.toISOString());
      // console.log('==================================');

      return NextResponse.json({
        message: 'Test time expired and auto-submitted',
        timeRemaining: 0,
        endTime: testAttempt.endTime.toISOString(),
        status: 'auto_submitted',
        autoSubmitted: true
      }, { status: 200 });
    }

    await testAttempt.save();

    // Log sync operation
    // console.log('=== TIME SYNC ===');
    // console.log('Test Attempt ID:', testAttemptId);
    // console.log('Student ID:', decoded.studentId);
    // console.log('Server Time:', now.toISOString());
    // console.log('End Time:', testAttempt.endTime.toISOString());
    // console.log('Time Remaining:', timeRemainingSeconds, 'seconds');
    // console.log('================');

    return NextResponse.json({
      message: 'Time synced successfully',
      timeRemaining: timeRemainingSeconds,
      endTime: testAttempt.endTime.toISOString(),
      startTime: testAttempt.startTime.toISOString(),
      serverTime: now.toISOString(),
      status: testAttempt.status
    }, { status: 200 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    //console.error('Time sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync time. Please try again.' },
      { status: 500 }
    );
  }
}