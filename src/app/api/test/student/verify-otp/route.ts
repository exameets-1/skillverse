import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Otp from '@/lib/models/Otp';
import Student from '@/lib/models/Student';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, otp } = body;

    // Validate required fields
    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Validate OTP format (6 digits)
    if (!/^\d{6}$/.test(otp.toString())) {
      return NextResponse.json(
        { error: 'OTP must be a 6-digit number' },
        { status: 400 }
      );
    }

    // Find the OTP record
    const otpRecord = await Otp.findOne({ 
      email,
      createdAt: { $gt: new Date(Date.now() - 5 * 60 * 1000) } // Within last 5 minutes
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'OTP not found or expired. Please request a new OTP.' },
        { status: 404 }
      );
    }

    // Check if already verified
    if (otpRecord.verified) {
      return NextResponse.json(
        { error: 'OTP has already been verified' },
        { status: 400 }
      );
    }

    // Check attempts limit (max 5 attempts)
    if (otpRecord.attempts >= 5) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return NextResponse.json(
        { error: 'Maximum verification attempts exceeded. Please request a new OTP.' },
        { status: 429 }
      );
    }

    // Verify OTP
    if (otpRecord.otp !== parseInt(otp)) {
      // Increment attempts
      await Otp.findByIdAndUpdate(otpRecord._id, { 
        $inc: { attempts: 1 } 
      });

      const remainingAttempts = 5 - (otpRecord.attempts + 1);
      return NextResponse.json(
        { 
          error: 'Invalid OTP',
          remainingAttempts: remainingAttempts > 0 ? remainingAttempts : 0
        },
        { status: 400 }
      );
    }

    // OTP is valid - mark as verified
    await Otp.findByIdAndUpdate(otpRecord._id, { 
      verified: true 
    });

    // Update student verification status if student exists
    const student = await Student.findOne({ studentEmail: email });
    if (student) {
      await Student.findByIdAndUpdate(student._id, { 
        verified: true 
      });
    }

    return NextResponse.json({
      message: 'Email verified successfully',
      email: email,
      verified: true
    }, { status: 200 });

  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP. Please try again later.' },
      { status: 500 }
    );
  }
}
