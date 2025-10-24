import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import TestCourse from '@/lib/models/TestCourse';
import '@/lib/models/Question'; // Ensure model is registered

const allowedOrigin = 'https://admin.exameets.in';

export async function POST(request: Request) {
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    await dbConnect();

    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400, headers });
    }

    // Fetch and populate in a single query
    const course = await TestCourse.findById(courseId)
      .populate('questions', 'questionText options') // populate only required fields
      .select('title description questions durationMinutes totalMarks isActive');

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404, headers });
    }

    if (!course.isActive) {
      return NextResponse.json({ error: 'Course is not active' }, { status: 403, headers });
    }

    const formattedCourse = {
      id: course._id,
      title: course.title,
      description: course.description,
      durationMinutes: course.durationMinutes,
      totalMarks: course.totalMarks,
      totalQuestions: course.questions?.length || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      questions: (course.questions || []).map((q: any) => ({
        id: q._id,
        questionText: q.questionText,
        options: q.options.map((o: { text: string }) => ({ text: o.text })),
      })),
    };

    return NextResponse.json({ success: true, course: formattedCourse }, { status: 200, headers });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', details: process.env.NODE_ENV === 'development' ? error.message : undefined },
      { status: 500, headers }
    );
  }
}

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

// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import TestCourse from '@/lib/models/TestCourse';
// import '@/lib/models/Question'; // Ensure model is registered

// const allowedOrigin = 'https://admin.exameets.in';

// export async function GET(request: Request) {
//   const headers = {
//     'Access-Control-Allow-Origin': allowedOrigin,
//     'Access-Control-Allow-Methods': 'GET, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//   };

//   try {
//     await dbConnect();

//     const { searchParams } = new URL(request.url);
//     const courseId = searchParams.get('courseId');

//     if (!courseId) {
//       return NextResponse.json({ error: 'Course ID is required' }, { status: 400, headers });
//     }

//     // Fetch and populate in a single query
//     const course = await TestCourse.findById(courseId)
//       .populate('questions', 'questionText options') // populate only required fields
//       .select('title description questions durationMinutes totalMarks isActive');

//     if (!course) {
//       return NextResponse.json({ error: 'Course not found' }, { status: 404, headers });
//     }

//     if (!course.isActive) {
//       return NextResponse.json({ error: 'Course is not active' }, { status: 403, headers });
//     }

//     const formattedCourse = {
//       id: course._id,
//       title: course.title,
//       description: course.description,
//       durationMinutes: course.durationMinutes,
//       totalMarks: course.totalMarks,
//       totalQuestions: course.questions?.length || 0,
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       questions: (course.questions || []).map((q: any) => ({
//         id: q._id,
//         questionText: q.questionText,
//         options: q.options.map((o: { text: string }) => ({ text: o.text })),
//       })),
//     };

//     return NextResponse.json({ success: true, course: formattedCourse }, { status: 200, headers });
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: 'Internal server error', details: process.env.NODE_ENV === 'development' ? error.message : undefined },
//       { status: 500, headers }
//     );
//   }
// }

// export async function OPTIONS() {
//   return new NextResponse(null, {
//     status: 204,
//     headers: {
//       'Access-Control-Allow-Origin': allowedOrigin,
//       'Access-Control-Allow-Methods': 'GET, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     },
//   });
// }

// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import TestCourse from '@/lib/models/TestCourse';
// import '@/lib/models/Question'; // ensures Question model is registered

// const allowedOrigin = 'https://admin.exameets.in';

// // Define types for safety
// interface QuestionOption {
//   text: string;
// }

// interface QuestionDocument {
//   _id: string;
//   questionText: string;
//   options: QuestionOption[];
// }

// interface PopulatedCourse {
//   _id: string;
//   title: string;
//   description: string;
//   questions: QuestionDocument[];
//   durationMinutes: number;
//   totalMarks: number;
//   isActive: boolean;
// }

// export async function GET(request: Request) {
//   const headers = {
//     'Access-Control-Allow-Origin': allowedOrigin,
//     'Access-Control-Allow-Methods': 'GET, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//   };

//   try {
//     await dbConnect();

//     const { searchParams } = new URL(request.url);
//     const courseId = searchParams.get('courseId');

//     if (!courseId) {
//       return NextResponse.json({ error: 'Course ID is required' }, { status: 400, headers });
//     }

//     const course = await TestCourse.findById(courseId)
//       .populate<{ questions: QuestionDocument[] }>('questions', 'questionText options')
//       .select('title description questions durationMinutes totalMarks isActive')
//       .lean<PopulatedCourse>(); // converts mongoose doc to plain object

//     if (!course) {
//       return NextResponse.json({ error: 'Course not found' }, { status: 404, headers });
//     }

//     if (!course.isActive) {
//       return NextResponse.json({ error: 'Course is not active' }, { status: 403, headers });
//     }

//     const formattedCourse = {
//       id: course._id.toString(),
//       title: course.title,
//       description: course.description,
//       durationMinutes: course.durationMinutes,
//       totalMarks: course.totalMarks,
//       totalQuestions: course.questions?.length || 0,
//       questions: (course.questions || []).map((q: QuestionDocument) => ({
//         id: q._id.toString(),
//         questionText: q.questionText,
//         options: q.options.map((o: QuestionOption) => ({ text: o.text })),
//       })),
//     };

//     return NextResponse.json({ success: true, course: formattedCourse }, { status: 200, headers });

//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : 'Unknown error';
//     console.error('Fetch course error:', message);
//     return NextResponse.json(
//       {
//         error: 'Internal server error',
//         details: process.env.NODE_ENV === 'development' ? message : undefined,
//       },
//       { status: 500, headers }
//     );
//   }
// }

// export async function OPTIONS() {
//   return new NextResponse(null, {
//     status: 204,
//     headers: {
//       'Access-Control-Allow-Origin': allowedOrigin,
//       'Access-Control-Allow-Methods': 'GET, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     },
//   });
// }
