// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Question from '@/lib/models/Question';
// import TestCourse from '@/lib/models/TestCourse';

// export async function POST(request: NextRequest) {
//   try {
//     await dbConnect();

//     const body = await request.json();
//     const {
//       questionText,
//       options,
//       correctOptionIndex,
//       testCourseIds
//     } = body;

//     // Validate required fields
//     if (!questionText || !options || correctOptionIndex === undefined) {
//       return NextResponse.json(
//         { error: 'Question text, options, and correct option index are required' },
//         { status: 400 }
//       );
//     }

//     // Validate options array
//     if (!Array.isArray(options) || options.length < 2) {
//       return NextResponse.json(
//         { error: 'At least 2 options are required' },
//         { status: 400 }
//       );
//     }

//     // Validate each option has text
//     for (let i = 0; i < options.length; i++) {
//       if (!options[i].text || typeof options[i].text !== 'string') {
//         return NextResponse.json(
//           { error: `Option ${i + 1} must have valid text` },
//           { status: 400 }
//         );
//       }
//     }

//     // Validate correct option index
//     if (correctOptionIndex < 0 || correctOptionIndex >= options.length) {
//       return NextResponse.json(
//         { error: 'Correct option index is out of range' },
//         { status: 400 }
//       );
//     }

//     // Validate test course IDs if provided
//     if (testCourseIds && (!Array.isArray(testCourseIds) || testCourseIds.length === 0)) {
//       return NextResponse.json(
//         { error: 'Test course IDs must be a non-empty array' },
//         { status: 400 }
//       );
//     }

//     // Create new question
//     const newQuestion = new Question({
//       questionText,
//       options,
//       correctOptionIndex
//     });

//     const savedQuestion = await newQuestion.save();

//     // Add question to specified test courses if IDs provided
//     let updatedTestCourses = [];
//     if (testCourseIds && testCourseIds.length > 0) {
//       // Update all specified test courses
//       const updateResult = await TestCourse.updateMany(
//         { _id: { $in: testCourseIds }},
//         { $push: { questions: savedQuestion._id } }
//       );

//       // Get updated test courses for response
//       updatedTestCourses = await TestCourse.find(
//         { _id: { $in: testCourseIds } },
//         { title: 1, questions: 1 }
//       );

//       if (updateResult.modifiedCount === 0) {
//         return NextResponse.json(
//           { error: 'No active test courses found with the provided IDs' },
//           { status: 404 }
//         );
//       }
//     }

//     return NextResponse.json({
//       message: 'Question created successfully',
//       question: {
//         id: savedQuestion._id,
//         questionText: savedQuestion.questionText,
//         optionsCount: savedQuestion.options.length,
//         correctOptionIndex: savedQuestion.correctOptionIndex
//       },
//       addedToTestCourses: updatedTestCourses.map(course => ({
//         id: course._id,
//         title: course.title,
//         totalQuestions: course.questions.length
//       }))
//     }, { status: 201 });

//   } catch (error) {
//     console.error('Add question error:', error);
//     return NextResponse.json(
//       { error: 'Failed to create question' },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Question from '@/lib/models/Question';
import TestCourse from '@/lib/models/TestCourse';

const allowedOrigin = 'https://admin.exameets.in';

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    await dbConnect();

    const body = await request.json();
    const {
      questionText,
      options,
      correctOptionIndex,
      testCourseIds
    } = body;

    // Validate required fields
    if (!questionText || !options || correctOptionIndex === undefined) {
      return NextResponse.json(
        { error: 'Question text, options, and correct option index are required' },
        { status: 400, headers }
      );
    }

    // Validate options array
    if (!Array.isArray(options) || options.length < 2) {
      return NextResponse.json(
        { error: 'At least 2 options are required' },
        { status: 400, headers }
      );
    }

    // Validate each option has text
    for (let i = 0; i < options.length; i++) {
      if (!options[i].text || typeof options[i].text !== 'string') {
        return NextResponse.json(
          { error: `Option ${i + 1} must have valid text` },
          { status: 400, headers }
        );
      }
    }

    // Validate correct option index
    if (correctOptionIndex < 0 || correctOptionIndex >= options.length) {
      return NextResponse.json(
        { error: 'Correct option index is out of range' },
        { status: 400, headers }
      );
    }

    // Validate test course IDs if provided
    if (testCourseIds && (!Array.isArray(testCourseIds) || testCourseIds.length === 0)) {
      return NextResponse.json(
        { error: 'Test course IDs must be a non-empty array' },
        { status: 400, headers }
      );
    }

    // Create new question
    const newQuestion = new Question({
      questionText,
      options,
      correctOptionIndex
    });

    const savedQuestion = await newQuestion.save();

    // Add question to specified test courses if IDs provided
    let updatedTestCourses = [];
    if (testCourseIds && testCourseIds.length > 0) {
      // Update all specified test courses
      const updateResult = await TestCourse.updateMany(
        { _id: { $in: testCourseIds } },
        { $push: { questions: savedQuestion._id } }
      );

      // Get updated test courses for response
      updatedTestCourses = await TestCourse.find(
        { _id: { $in: testCourseIds } },
        { title: 1, questions: 1 }
      );

      if (updateResult.modifiedCount === 0) {
        return NextResponse.json(
          { error: 'No active test courses found with the provided IDs' },
          { status: 404, headers }
        );
      }
    }

    return NextResponse.json(
      {
        message: 'Question created successfully',
        question: {
          id: savedQuestion._id,
          questionText: savedQuestion.questionText,
          optionsCount: savedQuestion.options.length,
          correctOptionIndex: savedQuestion.correctOptionIndex,
        },
        addedToTestCourses: updatedTestCourses.map(course => ({
          id: course._id,
          title: course.title,
          totalQuestions: course.questions.length,
        })),
      },
      { status: 201, headers }
    );

  } catch (error) {
    console.error('Add question error:', error);
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500, headers }
    );
  }
}

// Handle preflight requests for browsers
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
