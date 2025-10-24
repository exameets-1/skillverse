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

// interface AnswerAttempt {
//   question: string;
//   optionSelected: number;
// }

// interface TestAttemptDocument {
//   _id: string;
//   status: string;
//   endTime: Date;
//   answerAttempts: AnswerAttempt[];
//   timeRemaining: number;
//   save: () => Promise<void>;
// }

// export async function PATCH(request: NextRequest) {
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
//     const { testAttemptId, questionId, optionSelected } = body;

//     // Validate required fields
//     if (!testAttemptId || !questionId || optionSelected === undefined) {
//       return NextResponse.json(
//         { error: 'Test attempt ID, question ID, and option selected are required' },
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

//     // Validate option index
//     if (typeof optionSelected !== 'number' || optionSelected < 0 || optionSelected > 3) {
//       return NextResponse.json(
//         { error: 'Option selected must be a number between 0 and 3' },
//         { status: 400 }
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

//     // Check if test is still in progress
//     if (testAttempt.status !== 'in_progress') {
//       return NextResponse.json(
//         { error: 'Test is not in progress. Cannot modify answers.' },
//         { status: 400 }
//       );
//     }

//     // Check if test time has expired
//     const now = new Date();
//     if (now > testAttempt.endTime) {
//       // Auto-submit the test
//       testAttempt.status = 'auto_submitted';
//       await testAttempt.save();

//       return NextResponse.json(
//         { error: 'Test time has expired. Test has been auto-submitted.' },
//         { status: 400 }
//       );
//     }

//     // Check if answer for this question already exists
//     const existingAnswerIndex = testAttempt.answerAttempts.findIndex(
//       (attempt: AnswerAttempt) => attempt.question.toString() === questionId
//     );

//     if (existingAnswerIndex !== -1) {
//       // Update existing answer
//       testAttempt.answerAttempts[existingAnswerIndex].optionSelected = optionSelected;
//     } else {
//       // Add new answer
//       testAttempt.answerAttempts.push({
//         question: questionId,
//         optionSelected,
//       });
//     }

//     // Calculate time remaining
//     const timeRemainingMs = testAttempt.endTime.getTime() - now.getTime();
//     testAttempt.timeRemaining = Math.max(0, Math.floor(timeRemainingMs / 1000));

//     await testAttempt.save();

//     // Log answer attempt
//     console.log('=== ANSWER SAVED ===');
//     console.log('Test Attempt ID:', testAttemptId);
//     console.log('Student ID:', decoded.studentId);
//     console.log('Question ID:', questionId);
//     console.log('Option Selected:', optionSelected);
//     console.log('Total Answers:', testAttempt.answerAttempts.length);
//     console.log('Time Remaining:', testAttempt.timeRemaining, 'seconds');
//     console.log('Timestamp:', now.toISOString());
//     console.log('===================');

//     return NextResponse.json({
//       message: 'Answer saved successfully',
//       questionId,
//       optionSelected,
//       totalAnswers: testAttempt.answerAttempts.length,
//       timeRemaining: testAttempt.timeRemaining,
//     }, { status: 200 });

//   } catch (error) {
//     console.error('Attempt answer error:', error);
//     return NextResponse.json(
//       { error: 'Failed to save answer. Please try again.' },
//       { status: 500 }
//     );
//   }
// }

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

// interface AnswerAttempt {
//   question: string;
//   optionSelected: number;
// }

// interface TestAttemptDocument {
//   _id: string;
//   status: string;
//   endTime: Date;
//   answerAttempts: AnswerAttempt[];
//   timeRemaining: number;
//   save: () => Promise<void>;
// }

// export async function PATCH(request: NextRequest) {
//   try {
//     await dbConnect();

//     const JWT_SECRET = process.env.JWT_SECRET;
//     if (!JWT_SECRET) {
//       console.error('JWT_SECRET is not configured');
//       return NextResponse.json(
//         { error: 'Server configuration error' },
//         { status: 500 }
//       );
//     }

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

//     if (decoded.type !== 'test_session') {
//       return NextResponse.json(
//         { error: 'Invalid token type' },
//         { status: 401 }
//       );
//     }

//     const body = await request.json();
//     const { testAttemptId, questionId, optionSelected } = body;

//     if (!testAttemptId || !questionId || optionSelected === undefined) {
//       return NextResponse.json(
//         { error: 'Test attempt ID, question ID, and option selected are required' },
//         { status: 400 }
//       );
//     }

//     if (testAttemptId !== decoded.testAttemptId) {
//       return NextResponse.json(
//         { error: 'Test attempt ID mismatch' },
//         { status: 403 }
//       );
//     }

//     if (typeof optionSelected !== 'number' || optionSelected < 0 || optionSelected > 3) {
//       return NextResponse.json(
//         { error: 'Option selected must be a number between 0 and 3' },
//         { status: 400 }
//       );
//     }

//     const testAttempt = await TestAttempt.findById(testAttemptId) as TestAttemptDocument | null;
//     if (!testAttempt) {
//       return NextResponse.json(
//         { error: 'Test attempt not found' },
//         { status: 404 }
//       );
//     }

//     if (testAttempt.status !== 'in_progress') {
//       return NextResponse.json(
//         { error: 'Test is not in progress. Cannot modify answers.' },
//         { status: 400 }
//       );
//     }

//     // Check if test time has expired (with 5-second grace period)
//     const now = new Date();
//     const gracePeriodMs = 5000; // 5 seconds

//     if (now.getTime() > testAttempt.endTime.getTime() + gracePeriodMs) {
//       return NextResponse.json(
//         { error: 'Test time has expired. Cannot save answer.' },
//         { status: 400 }
//       );
//     }

//     // Check if answer for this question already exists
//     const existingAnswerIndex = testAttempt.answerAttempts.findIndex(
//       (attempt: AnswerAttempt) => attempt.question.toString() === questionId
//     );

//     if (existingAnswerIndex !== -1) {
//       testAttempt.answerAttempts[existingAnswerIndex].optionSelected = optionSelected;
//     } else {
//       testAttempt.answerAttempts.push({
//         question: questionId,
//         optionSelected,
//       });
//     }

//     // Calculate time remaining
//     const timeRemainingMs = testAttempt.endTime.getTime() - now.getTime();
//     testAttempt.timeRemaining = Math.max(0, Math.floor(timeRemainingMs / 1000));

//     await testAttempt.save();

//     // Log answer attempt
//     console.log('=== ANSWER SAVED ===');
//     console.log('Test Attempt ID:', testAttemptId);
//     console.log('Student ID:', decoded.studentId);
//     console.log('Question ID:', questionId);
//     console.log('Option Selected:', optionSelected);
//     console.log('Total Answers:', testAttempt.answerAttempts.length);
//     console.log('Time Remaining:', testAttempt.timeRemaining, 'seconds');
//     console.log('Timestamp:', now.toISOString());
//     console.log('===================');

//     return NextResponse.json({
//       message: 'Answer saved successfully',
//       questionId,
//       optionSelected,
//       totalAnswers: testAttempt.answerAttempts.length,
//       timeRemaining: testAttempt.timeRemaining,
//     }, { status: 200 });

//   } catch (error) {
//     console.error('Attempt answer error:', error);
//     return NextResponse.json(
//       { error: 'Failed to save answer. Please try again.' },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import TestAttempt from '@/lib/models/TestAttempt';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  testAttemptId: string;
  studentId: string;
  testCourseId: string;
  type: string;
}

interface AnswerAttempt {
  question: string;
  optionSelected: number | null;
  timeSpent: number;
  lastInteractionAt: Date;
}

interface TestAttemptDocument {
  _id: string;
  status: string;
  endTime: Date;
  answerAttempts: AnswerAttempt[];
  timeRemaining: number;
  save: () => Promise<void>;
}

export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

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

    if (decoded.type !== 'test_session') {
      return NextResponse.json(
        { error: 'Invalid token type' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { testAttemptId, questionId, optionSelected } = body;

    if (!testAttemptId || !questionId || optionSelected === undefined) {
      return NextResponse.json(
        { error: 'Test attempt ID, question ID, and option selected are required' },
        { status: 400 }
      );
    }

    if (testAttemptId !== decoded.testAttemptId) {
      return NextResponse.json(
        { error: 'Test attempt ID mismatch' },
        { status: 403 }
      );
    }

    if (typeof optionSelected !== 'number' || optionSelected < 0 || optionSelected > 3) {
      return NextResponse.json(
        { error: 'Option selected must be a number between 0 and 3' },
        { status: 400 }
      );
    }

    const testAttempt = await TestAttempt.findById(testAttemptId) as TestAttemptDocument | null;
    if (!testAttempt) {
      return NextResponse.json(
        { error: 'Test attempt not found' },
        { status: 404 }
      );
    }

    if (testAttempt.status !== 'in_progress') {
      return NextResponse.json(
        { error: 'Test is not in progress. Cannot modify answers.' },
        { status: 400 }
      );
    }

    // Check if test time has expired (with 5-second grace period)
    const now = new Date();
    const gracePeriodMs = 5000; // 5 seconds

    if (now.getTime() > testAttempt.endTime.getTime() + gracePeriodMs) {
      return NextResponse.json(
        { error: 'Test time has expired. Cannot save answer.' },
        { status: 400 }
      );
    }

    // Check if answer for this question already exists
    const existingAnswerIndex = testAttempt.answerAttempts.findIndex(
      (attempt: AnswerAttempt) => attempt.question.toString() === questionId
    );

    if (existingAnswerIndex !== -1) {
      // Update existing answer
      testAttempt.answerAttempts[existingAnswerIndex].optionSelected = optionSelected;
      testAttempt.answerAttempts[existingAnswerIndex].lastInteractionAt = now;
    } else {
      // Create new answer attempt
      testAttempt.answerAttempts.push({
        question: questionId,
        optionSelected,
        timeSpent: 0,
        lastInteractionAt: now,
      });
    }

    // Calculate time remaining
    const timeRemainingMs = testAttempt.endTime.getTime() - now.getTime();
    testAttempt.timeRemaining = Math.max(0, Math.floor(timeRemainingMs / 1000));

    await testAttempt.save();

    // Log answer attempt
    // console.log('=== ANSWER SAVED ===');
    // console.log('Test Attempt ID:', testAttemptId);
    // console.log('Student ID:', decoded.studentId);
    // console.log('Question ID:', questionId);
    // console.log('Option Selected:', optionSelected);
    // console.log('Total Answers:', testAttempt.answerAttempts.length);
    // console.log('Time Remaining:', testAttempt.timeRemaining, 'seconds');
    // console.log('Last Interaction:', now.toISOString());
    // console.log('Timestamp:', now.toISOString());
    // console.log('===================');

    return NextResponse.json({
      message: 'Answer saved successfully',
      questionId,
      optionSelected,
      totalAnswers: testAttempt.answerAttempts.length,
      timeRemaining: testAttempt.timeRemaining,
    }, { status: 200 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    //console.error('Attempt answer error:', error);
    return NextResponse.json(
      { error: 'Failed to save answer. Please try again.' },
      { status: 500 }
    );
  }
}