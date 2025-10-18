// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import TestCourse from '@/lib/models/TestCourse';

// export async function GET() {
//   try {
//     await dbConnect();

//     // Fetch only active test courses with selected fields
//     const activeTests = await TestCourse.find(
//       { isActive: true },
//       { _id: 1, title: 1, description: 1 }
//     ).sort({ createdAt: -1 });

//     return NextResponse.json({
//       success: true,
//       tests: activeTests.map(test => ({
//         id: test._id,
//         name: test.title,
//         description: test.description
//       }))
//     }, { status: 200 });

//   } catch (error) {
//     console.error('Fetch active tests error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch active tests' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import TestCourse from '@/lib/models/TestCourse';

const allowedOrigin = 'https://www.exameets.in';

export async function GET(request: Request) {
  const origin = request.headers.get('origin');

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    await dbConnect();

    // Fetch only active test courses with selected fields
    const activeTests = await TestCourse.find(
      { isActive: true },
      { _id: 1, title: 1, description: 1 }
    ).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        tests: activeTests.map((test) => ({
          id: test._id,
          name: test.title,
          description: test.description,
        })),
      },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Fetch active tests error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active tests' },
      { status: 500, headers }
    );
  }
}

// Handle preflight requests (important for browsers)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
