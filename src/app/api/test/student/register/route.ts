// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Student from '@/lib/test-models/Student';
// import Referral from '@/lib/test-models/Referral';

// // Generate a unique referral code
// function generateReferralCode(length: number = 5): string {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return result;
// }

// export async function POST(request: NextRequest) {
//   try {
//     await dbConnect();

//     const body = await request.json();
//     const {
//       name,
//       studentEmail,
//       studentNumber,
//       studentDOB,
//       studentGuardianName,
//       studentGuardianNumber,
//       location,
//       registeredCourses, // Add this field
//       referralCode // Optional: if student was referred by someone
//     } = body;

//     // Validate required fields
//     if (!name || !studentEmail || !studentNumber || !studentDOB || 
//         !studentGuardianName || !studentGuardianNumber || !location || 
//         !location.state || !location.district) {
//       return NextResponse.json(
//         { error: 'All required fields must be provided' },
//         { status: 400 }
//       );
//     }

//     // Validate registeredCourses
//     if (!registeredCourses || !Array.isArray(registeredCourses) || registeredCourses.length === 0) {
//       return NextResponse.json(
//         { error: 'At least one course must be selected' },
//         { status: 400 }
//       );
//     }

//     // Check if student already exists
//     const existingStudent = await Student.findOne({ studentEmail });
//     if (existingStudent) {
//       return NextResponse.json(
//         { error: 'Student with this email already exists' },
//         { status: 409 }
//       );
//     }

//     let referredBy = null;

//     // Handle referral logic if referralCode is provided
//     if (referralCode) {
//       const referralDoc = await Referral.findOne({ referralCode });
//       if (referralDoc) {
//         referredBy = referralDoc.owner;
//       }
//     }

//     // Generate unique referral code for new student
//     let newReferralCode;
//     let isUnique = false;
//     while (!isUnique) {
//       newReferralCode = generateReferralCode();
//       const existingReferral = await Referral.findOne({ referralCode: newReferralCode });
//       if (!existingReferral) {
//         isUnique = true;
//       }
//     }

//     // Create student document
//     const newStudent = new Student({
//       name,
//       studentEmail,
//       studentNumber,
//       studentDOB: new Date(studentDOB),
//       studentGuardianName,
//       studentGuardianNumber,
//       location: {
//         state: location.state,
//         district: location.district
//       },
//       registeredCourses, // Add this field
//       referredBy,
//       verified: false
//     });

//     const savedStudent = await newStudent.save();

//     // Create referral document for the new student
//     const newReferral = new Referral({
//       owner: savedStudent._id,
//       referralCode: newReferralCode,
//       referredUsers: [],
//       count: 0
//     });

//     await newReferral.save();

//     // Update referrer's referral document if student was referred
//     if (referredBy) {
//       await Referral.findOneAndUpdate(
//         { owner: referredBy },
//         { 
//           $push: { referredUsers: savedStudent._id },
//           $inc: { count: 1 },
//           lastUsed: new Date()
//         }
//       );
//     }

//     return NextResponse.json({
//       message: 'Student registered successfully',
//       student: {
//         id: savedStudent._id,
//         name: savedStudent.name,
//         email: savedStudent.studentEmail,
//         referralCode: newReferralCode,
//         registeredCoursesCount: savedStudent.registeredCourses.length // Add course count
//       }
//     }, { status: 201 });

//   } catch (error) {
//     console.error('Registration error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Student from '@/lib/test-models/Student';
import Referral from '@/lib/test-models/Referral';
import TestCourse from '@/lib/test-models/TestCourse';
import { getRegistrationEmailTemplate } from '@/lib/emailTemplates/registrationEmail';
import { sendEmail } from '@/lib/sendEmail';

// Generate a unique referral code
function generateReferralCode(length: number = 5): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      name,
      studentEmail,
      studentNumber,
      studentDOB,
      studentGuardianName,
      studentGuardianNumber,
      location,
      registeredCourses,
      referralCode
    } = body;

    // Validate required fields
    if (!name || !studentEmail || !studentNumber || !studentDOB || 
        !studentGuardianName || !studentGuardianNumber || !location || 
        !location.state || !location.district) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Validate registeredCourses
    if (!registeredCourses || !Array.isArray(registeredCourses) || registeredCourses.length === 0) {
      return NextResponse.json(
        { error: 'At least one course must be selected' },
        { status: 400 }
      );
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ studentEmail });
    if (existingStudent) {
      return NextResponse.json(
        { error: 'Student with this email already exists' },
        { status: 409 }
      );
    }

    let referredBy = null;

    // Handle referral logic if referralCode is provided
    if (referralCode) {
      const referralDoc = await Referral.findOne({ referralCode });
      if (referralDoc) {
        referredBy = referralDoc.owner;
      }
    }

    // Generate unique referral code for new student
    let newReferralCode;
    let isUnique = false;
    while (!isUnique) {
      newReferralCode = generateReferralCode();
      const existingReferral = await Referral.findOne({ referralCode: newReferralCode });
      if (!existingReferral) {
        isUnique = true;
      }
    }

    // Create student document
    const newStudent = new Student({
      name,
      studentEmail,
      studentNumber,
      studentDOB: new Date(studentDOB),
      studentGuardianName,
      studentGuardianNumber,
      location: {
        state: location.state,
        district: location.district
      },
      registeredCourses,
      referredBy,
      verified: false
    });

    const savedStudent = await newStudent.save();

    // Create referral document for the new student
    const newReferral = new Referral({
      owner: savedStudent._id,
      referralCode: newReferralCode,
      referredUsers: [],
      count: 0
    });

    await newReferral.save();

    // Update referrer's referral document if student was referred
    if (referredBy) {
      await Referral.findOneAndUpdate(
        { owner: referredBy },
        { 
          $push: { referredUsers: savedStudent._id },
          $inc: { count: 1 },
          lastUsed: new Date()
        }
      );
    }

    // Fetch full course details for email
    const courseDetails = await TestCourse.find({
      _id: { $in: registeredCourses }
    }).lean();

    const coursesData = courseDetails.map(course => ({
      title: course.title,
      questionsPerTest: course.questionsPerTest,
      durationMinutes: course.durationMinutes
    }));

    // Send welcome email with registration confirmation
    try {
      const emailHTML = getRegistrationEmailTemplate({
        studentName: savedStudent.name,
        registeredCourses: coursesData,
        referralCode: newReferralCode!
      });

      await sendEmail({
        to: savedStudent.studentEmail,
        subject: '🎉 Welcome to Exameets Skillverse - Your Test is LIVE!',
        message: emailHTML
      });

      console.log(`✅ Welcome email sent to ${savedStudent.studentEmail}`);
    } catch (emailError) {
      // Log error but don't fail registration
      console.error('Failed to send welcome email:', emailError);
    }

    return NextResponse.json({
      message: 'Student registered successfully',
      student: {
        id: savedStudent._id,
        name: savedStudent.name,
        email: savedStudent.studentEmail,
        referralCode: newReferralCode,
        registeredCoursesCount: savedStudent.registeredCourses.length
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}