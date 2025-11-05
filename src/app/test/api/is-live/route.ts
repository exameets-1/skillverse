import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import TestCourse from '@/lib/test-models/TestCourse';

export async function GET() {
  try {
    await dbConnect();

    // Get current date in IST
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istDate = new Date(now.getTime() + istOffset);
    
    // Set to start of day in IST (midnight)
    const startOfDay = new Date(
      istDate.getFullYear(),
      istDate.getMonth(),
      istDate.getDate()
    );
    
    // Set to end of day in IST (23:59:59.999)
    const endOfDay = new Date(
      istDate.getFullYear(),
      istDate.getMonth(),
      istDate.getDate(),
      23, 59, 59, 999
    );

    // Find any active test courses scheduled for today
    const activeCourses = await TestCourse.findOne({
      isActive: true,
      testDate: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    return NextResponse.json({
      isLive: !!activeCourses // Convert to boolean
    });

  } catch (error) {
    console.error('Failed to check live tests:', error);
    return NextResponse.json(
      { error: 'Failed to check live tests' },
      { status: 500 }
    );
  }
}
