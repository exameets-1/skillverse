import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import TestAttempt from '@/lib/models/TestAttempt';
import Student from '@/lib/models/Student';
import TestCourse from '@/lib/models/TestCourse';
import jwt from 'jsonwebtoken';

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

    const body = await request.json();
    const { studentId, testCourseId, durationMinutes } = body;

    // Validate required fields
    if (!studentId || !testCourseId || !durationMinutes) {
      return NextResponse.json(
        { error: 'Student ID, Test Course ID, and duration are required' },
        { status: 400 }
      );
    }

    // Verify student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Verify test course exists
    const testCourse = await TestCourse.findById(testCourseId);
    if (!testCourse) {
      return NextResponse.json(
        { error: 'Test course not found' },
        { status: 404 }
      );
    }

    // Check if student already has an attempt for this course
    const existingAttempt = await TestAttempt.findOne({
      student: studentId,
      testCourse: testCourseId,
    });

    if (existingAttempt) {
      // If already submitted, don't allow restart
      if (existingAttempt.status === 'submitted' || existingAttempt.status === 'auto_submitted') {
        return NextResponse.json(
          { error: 'You have already completed this test' },
          { status: 400 }
        );
      }

      // If in progress, return existing session
      const sessionToken = jwt.sign(
        {
          testAttemptId: existingAttempt._id.toString(),
          studentId: studentId,
          testCourseId: testCourseId,
          type: 'test_session',
        },
        JWT_SECRET,
        { expiresIn: `${durationMinutes + 5}m` } // Add 5 min buffer
      );

      return NextResponse.json({
        message: 'Resuming existing test attempt',
        sessionToken,
        testAttemptId: existingAttempt._id.toString(),
        studentId,
        testCourseId,
        startTime: existingAttempt.startTime,
        endTime: existingAttempt.endTime,
        status: existingAttempt.status,
        existingAnswers: existingAttempt.answerAttempts,
      }, { status: 200 });
    }

    // Create new test attempt
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);

    const testAttempt = await TestAttempt.create({
      student: studentId,
      testCourse: testCourseId,
      startTime,
      endTime,
      timeRemaining: durationMinutes * 60, // in seconds
      status: 'in_progress',
      answerAttempts: [],
    });

    // Create JWT session token
    const sessionToken = jwt.sign(
      {
        testAttemptId: testAttempt._id.toString(),
        studentId: studentId,
        testCourseId: testCourseId,
        type: 'test_session',
      },
      JWT_SECRET,
      { expiresIn: `${durationMinutes + 5}m` } // Add 5 min buffer
    );

    // Log test attempt creation
    // console.log('=== TEST ATTEMPT CREATED ===');
    // console.log('Test Attempt ID:', testAttempt._id.toString());
    // console.log('Student ID:', studentId);
    // console.log('Student Name:', student.name);
    // console.log('Test Course:', testCourse.title);
    // console.log('Start Time:', startTime.toISOString());
    // console.log('End Time:', endTime.toISOString());
    // console.log('Duration:', durationMinutes, 'minutes');
    // console.log('Session Token Created');
    // console.log('===========================');

    return NextResponse.json({
      message: 'Test attempt created successfully',
      sessionToken,
      testAttemptId: testAttempt._id.toString(),
      studentId,
      testCourseId,
      startTime: testAttempt.startTime,
      endTime: testAttempt.endTime,
      status: testAttempt.status,
    }, { status: 201 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    //console.error('Create test attempt error:', error);
    return NextResponse.json(
      { error: 'Failed to create test attempt. Please try again.' },
      { status: 500 }
    );
  }
}