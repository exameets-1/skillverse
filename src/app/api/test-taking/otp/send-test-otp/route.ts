import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Otp from '@/lib/test-models/Otp';
import Student from '@/lib/test-models/Student';
import { sendEmail } from '@/lib/sendEmail';

// Generate 6-digit OTP
function generateOTP(): number {
  return Math.floor(100000 + Math.random() * 900000);
}

// HTML template for test proceed OTP email
function getTestProceedOTPEmailTemplate(otp: number, studentName?: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Verification - Exameets Skillverse</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Exameets Skillverse</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Ready to Begin Your Test</p>
        </div>
        
        <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            ${studentName ? `<p style="font-size: 16px; margin-bottom: 20px; color: #555;">Hello <strong>${studentName}</strong>,</p>` : ''}
            
            <h2 style="color: #333; margin-bottom: 20px; font-size: 24px;">Test Access Verification</h2>
            
            <p style="font-size: 16px; margin-bottom: 25px; color: #555;">
                You're about to begin your test. Please use the verification code below to proceed:
            </p>
            
            <div style="background: #f8f9fa; border: 2px dashed #667eea; border-radius: 8px; padding: 25px; text-align: center; margin: 30px 0;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Verification Code</p>
                <div style="font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 3px; font-family: 'Courier New', monospace;">
                    ${otp}
                </div>
            </div>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 25px 0; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; color: #856404;">
                    <strong>⏰ Important:</strong> This verification code will expire in <strong>5 minutes</strong> for security reasons.
                </p>
            </div>
            
            <div style="background: #e7f3ff; border-left: 4px solid #2196F3; padding: 15px; margin: 25px 0; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; color: #1565C0;">
                    <strong>📝 Test Tips:</strong> Ensure you have a stable internet connection and a quiet environment before starting.
                </p>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 25px;">
                If you didn't request this code or aren't planning to take a test, please ignore this email or contact our support team immediately.
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <div style="text-align: center; color: #888; font-size: 12px;">
                <p style="margin: 5px 0;">© 2025 Exameets Skillverse. All rights reserved.</p>
                <p style="margin: 5px 0;">Empowering students with quality education and skill development.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if student exists with this email
    const existingStudent = await Student.findOne({ studentEmail: email });
    if (!existingStudent) {
      return NextResponse.json(
        { error: 'No student found with this email. Please register first.' },
        { status: 404 }
      );
    }

    // Check if there's a recent OTP for this email (within last 1 minute)
    const recentOtp = await Otp.findOne({ 
      email, 
      createdAt: { $gt: new Date(Date.now() - 1 * 60 * 1000) } // Within last 1 minute
    });

    if (recentOtp) {
      const secondsRemaining = Math.ceil((recentOtp.createdAt.getTime() + 1 * 60 * 1000 - Date.now()) / 1000);
      return NextResponse.json(
        { 
          error: 'Please wait before requesting a new OTP.',
          canRetryAfter: secondsRemaining,
          message: `You can request a new OTP in ${secondsRemaining} seconds`
        },
        { status: 429 }
      );
    }

    // Generate new OTP
    const otp = generateOTP();

    // Save OTP to database (remove any existing OTPs for this email first)
    await Otp.deleteMany({ email });
    
    const newOtp = new Otp({
      email,
      otp,
      attempts: 0,
      verified: false
    });

    await newOtp.save();

    // Send email with OTP
    const emailTemplate = getTestProceedOTPEmailTemplate(otp, existingStudent.studentName);
    
    await sendEmail({
      to: email,
      subject: 'Test Verification Code - Exameets Skillverse',
      message: emailTemplate
    });

    return NextResponse.json({
      message: 'OTP sent successfully to your email address',
      email: email,
      expiresIn: '5 minutes',
      studentName: existingStudent.studentName
    }, { status: 200 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    //console.error('Send test proceed OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP. Please try again later.' },
      { status: 500 }
    );
  }
}