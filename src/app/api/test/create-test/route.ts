// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import TestCourse from '@/lib/models/TestCourse';

// export async function POST(request: NextRequest) {
//   try {
//     await dbConnect();

//     const body = await request.json();
//     const {
//       title,
//       description,
//       questions,
//       durationMinutes,
//       totalMarks,
//       isActive
//     } = body;

//     // Validate required fields
//     if (!title || !description || !durationMinutes || !totalMarks) {
//       return NextResponse.json(
//         { error: 'Title, description, duration, and total marks are required' },
//         { status: 400 }
//       );
//     }

//     // Validate numeric fields
//     if (durationMinutes <= 0 || totalMarks <= 0) {
//       return NextResponse.json(
//         { error: 'Duration and total marks must be positive numbers' },
//         { status: 400 }
//       );
//     }

//     // Create new test course
//     const newTestCourse = new TestCourse({
//       title,
//       description,
//       questions: questions || [],
//       durationMinutes,
//       totalMarks,
//       isActive: isActive !== undefined ? isActive : true
//     });

//     const savedTestCourse = await newTestCourse.save();

//     return NextResponse.json({
//       message: 'Test course created successfully',
//       testCourse: {
//         id: savedTestCourse._id,
//         title: savedTestCourse.title,
//         description: savedTestCourse.description,
//         durationMinutes: savedTestCourse.durationMinutes,
//         totalMarks: savedTestCourse.totalMarks,
//         isActive: savedTestCourse.isActive,
//         questionsCount: savedTestCourse.questions.length
//       }
//     }, { status: 201 });

//   } catch (error) {
//     console.error('Create test course error:', error);
//     return NextResponse.json(
//       { error: 'Failed to create test course' },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import TestCourse from '@/lib/models/TestCourse';

const allowedOrigin = 'https://admin.exameets.in';

export async function POST(request: NextRequest) {
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    await dbConnect();

    const body = await request.json();
    const {
      title,
      description,
      instructions,
      questionsPerTest,
      questions,
      durationMinutes,
      totalMarks,
      isActive
    } = body;

    // Validate required fields
    if (!title || !description || !durationMinutes || !totalMarks || !instructions || !questionsPerTest) {
      return NextResponse.json(
        { error: 'Title, description, duration, total marks, instructions, and questions per test are required' },
        { status: 400, headers }
      );
    }

    // Validate numeric fields
    if (durationMinutes <= 0 || totalMarks <= 0) {
      return NextResponse.json(
        { error: 'Duration and total marks must be positive numbers' },
        { status: 400, headers }
      );
    }

    // Create new test course
    const newTestCourse = new TestCourse({
      title,
      description,
      questions: questions || [],
      durationMinutes,
      totalMarks,
      instructions : instructions || [],
      questionsPerTest,
      isActive: isActive !== undefined ? isActive : true
    });

    const savedTestCourse = await newTestCourse.save();

    return NextResponse.json(
      {
        message: 'Test course created successfully',
        testCourse: {
          id: savedTestCourse._id,
          title: savedTestCourse.title,
          description: savedTestCourse.description,
          durationMinutes: savedTestCourse.durationMinutes,
          totalMarks: savedTestCourse.totalMarks,
          isActive: savedTestCourse.isActive,
          instructions: savedTestCourse.instructions,
          questionsPerTest: savedTestCourse.questionsPerTest,
          questionsCount: savedTestCourse.questions.length
        }
      },
      { status: 201, headers }
    );

  } catch (error) {
    console.error('Create test course error:', error);
    return NextResponse.json(
      { error: 'Failed to create test course' },
      { status: 500, headers }
    );
  }
}

// Handle preflight requests (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
