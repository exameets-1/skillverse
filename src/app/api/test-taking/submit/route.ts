/* eslint-disable @typescript-eslint/no-unused-vars */
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

interface StudentDocument {
  _id: string;
  name: string;
  studentEmail: string;
}

interface TestCourseDocument {
  _id: string;
  title: string;
  questions: string[];
}

interface TestAttemptDocument {
  _id: string;
  status: string;
  endTime: Date;
  startTime: Date;
  answerAttempts: Array<{ question: string; optionSelected: number }>;

  timeRemaining: number;
  student: StudentDocument;
  testCourse: TestCourseDocument;
  save: () => Promise<void>;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Validate JWT_SECRET exists
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
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

    // Find test attempt with populated references
    const testAttempt = (await TestAttempt.findById(testAttemptId)
      .populate('student')
      .populate('testCourse')) as TestAttemptDocument | null;

    if (!testAttempt) {
      return NextResponse.json(
        { error: 'Test attempt not found' },
        { status: 404 }
      );
    }

    // Check if already submitted
    if (testAttempt.status === 'submitted' || testAttempt.status === 'auto_submitted') {
      return NextResponse.json(
        { error: 'Test has already been submitted' },
        { status: 400 }
      );
    }

    // Check if test is in progress
    if (testAttempt.status !== 'in_progress') {
      return NextResponse.json(
        { error: 'Test is not in progress' },
        { status: 400 }
      );
    }

    // Update status to submitted
    const now = new Date();
    const isAutoSubmit = now > testAttempt.endTime;

    // Calculate actual time remaining (could be negative if auto-submitted)
    const timeRemainingMs = testAttempt.endTime.getTime() - now.getTime();
    const actualTimeRemaining = Math.max(0, Math.floor(timeRemainingMs / 1000));

    testAttempt.status = isAutoSubmit ? 'auto_submitted' : 'submitted';
    // Don't reset timeRemaining - preserve it for ranking/analysis
    // testAttempt.timeRemaining = 0; // REMOVED - keep actual remaining time

    await testAttempt.save();

    // Get student and test course info for logging
    const student = testAttempt.student;
    const testCourse = testAttempt.testCourse;

    return NextResponse.json({
      message: 'Test submitted successfully',
      testAttemptId: testAttempt._id.toString(),
      status: testAttempt.status,
      totalAnswered: testAttempt.answerAttempts.length,
      totalQuestions: testCourse.questions.length,
      submittedAt: now.toISOString(),
      timeRemaining: testAttempt.timeRemaining,
      isAutoSubmit,
    }, { status: 200 });

  } catch (error) {
    //console.error('Submit test error:', error);
    return NextResponse.json(
      { error: 'Failed to submit test. Please try again.' },
      { status: 500 }
    );
  }
}