import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import TestCourse from '@/lib/models/TestCourse';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      title,
      description,
      questions,
      durationMinutes,
      totalMarks,
      isActive
    } = body;

    // Validate required fields
    if (!title || !description || !durationMinutes || !totalMarks) {
      return NextResponse.json(
        { error: 'Title, description, duration, and total marks are required' },
        { status: 400 }
      );
    }

    // Validate numeric fields
    if (durationMinutes <= 0 || totalMarks <= 0) {
      return NextResponse.json(
        { error: 'Duration and total marks must be positive numbers' },
        { status: 400 }
      );
    }

    // Create new test course
    const newTestCourse = new TestCourse({
      title,
      description,
      questions: questions || [],
      durationMinutes,
      totalMarks,
      isActive: isActive !== undefined ? isActive : true
    });

    const savedTestCourse = await newTestCourse.save();

    return NextResponse.json({
      message: 'Test course created successfully',
      testCourse: {
        id: savedTestCourse._id,
        title: savedTestCourse.title,
        description: savedTestCourse.description,
        durationMinutes: savedTestCourse.durationMinutes,
        totalMarks: savedTestCourse.totalMarks,
        isActive: savedTestCourse.isActive,
        questionsCount: savedTestCourse.questions.length
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Create test course error:', error);
    return NextResponse.json(
      { error: 'Failed to create test course' },
      { status: 500 }
    );
  }
}
