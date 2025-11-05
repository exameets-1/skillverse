import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
// Import Student schema first
import '@/lib/test-models/Student';
import Referral from '@/lib/test-models/Referral';

interface PopulatedOwner {
  name: string;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { referralCode } = body;

    if (!referralCode) {
      return NextResponse.json(
        { error: 'Referral code is required' },
        { status: 400 }
      );
    }

    const referralDoc = await Referral.findOne({ 
      referralCode: referralCode.toUpperCase() 
    }).populate<{ owner: PopulatedOwner }>('owner', 'name');

    if (!referralDoc) {
      return NextResponse.json(
        { error: 'Invalid referral code' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      referrerName: referralDoc.owner.name
    });

  } catch (error) {
    console.error('Check referral error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
