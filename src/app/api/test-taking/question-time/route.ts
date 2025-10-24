// api/test-taking/question-time/route.ts
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

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      //console.error('JWT_SECRET is not configured');
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
    const { testAttemptId, questionId, timeSpent } = body;

    if (!testAttemptId || !questionId || timeSpent === undefined) {
      return NextResponse.json(
        { error: 'Test attempt ID, question ID, and time spent are required' },
        { status: 400 }
      );
    }

    if (testAttemptId !== decoded.testAttemptId) {
      return NextResponse.json(
        { error: 'Test attempt ID mismatch' },
        { status: 403 }
      );
    }

    if (typeof timeSpent !== 'number' || timeSpent < 0) {
      return NextResponse.json(
        { error: 'Time spent must be a non-negative number' },
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
        { error: 'Test is not in progress. Cannot update time.' },
        { status: 400 }
      );
    }

    const now = new Date();

    // Check if answer attempt for this question already exists
    const existingAnswerIndex = testAttempt.answerAttempts.findIndex(
      (attempt: AnswerAttempt) => attempt.question.toString() === questionId
    );

    if (existingAnswerIndex !== -1) {
      // Update existing answer attempt with time spent
      testAttempt.answerAttempts[existingAnswerIndex].timeSpent = timeSpent;
      testAttempt.answerAttempts[existingAnswerIndex].lastInteractionAt = now;
    } else {
      // Create new answer attempt with null optionSelected (unanswered question)
      testAttempt.answerAttempts.push({
        question: questionId,
        optionSelected: null,
        timeSpent: timeSpent,
        lastInteractionAt: now,
      });
    }

    // Calculate time remaining
    const timeRemainingMs = testAttempt.endTime.getTime() - now.getTime();
    testAttempt.timeRemaining = Math.max(0, Math.floor(timeRemainingMs / 1000));

    await testAttempt.save();

    // Log time tracking
    // console.log('=== TIME TRACKED ===');
    // console.log('Test Attempt ID:', testAttemptId);
    // console.log('Student ID:', decoded.studentId);
    // console.log('Question ID:', questionId);
    // console.log('Time Spent:', timeSpent, 'seconds');
    // console.log('Time in Minutes:', (timeSpent / 60).toFixed(2), 'minutes');
    // console.log('Option Selected:', existingAnswerIndex !== -1 ? testAttempt.answerAttempts[existingAnswerIndex].optionSelected : 'null (unanswered)');
    // console.log('Last Interaction:', now.toISOString());
    // console.log('Total Answers:', testAttempt.answerAttempts.length);
    // console.log('Time Remaining:', testAttempt.timeRemaining, 'seconds');
    // console.log('Timestamp:', now.toISOString());
    // console.log('====================');

    return NextResponse.json({
      message: 'Time tracked successfully',
      questionId,
      timeSpent,
      timeSpentMinutes: parseFloat((timeSpent / 60).toFixed(2)),
      totalAnswers: testAttempt.answerAttempts.length,
      timeRemaining: testAttempt.timeRemaining,
    }, { status: 200 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    //console.error('Question time tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track time. Please try again.' },
      { status: 500 }
    );
  }
}