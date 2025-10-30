import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import TestAttempt from "@/lib/models/TestAttempt";
import jwt from "jsonwebtoken";

interface JWTPayload {
  testAttemptId: string;
  studentId: string;
  type: string;
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const testAttempts = await TestAttempt.find({ _id: { $exists: true } });
    return NextResponse.json(testAttempts);
  } catch (error) {
    console.error("Error fetching test attempts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No authorization token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let decoded: JWTPayload;

    try {
      decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired session token" },
        { status: 401 }
      );
    }

    // Get testAttemptId from request body
    const { testAttemptId } = await request.json();
    if (!testAttemptId) {
      return NextResponse.json(
        { error: "Test attempt ID is required" },
        { status: 400 }
      );
    }

    // Verify ownership
    if (testAttemptId !== decoded.testAttemptId) {
      return NextResponse.json(
        { error: "Unauthorized access to test attempt" },
        { status: 403 }
      );
    }

    const testAttempt = await TestAttempt.findById(testAttemptId);
    if (!testAttempt) {
      return NextResponse.json(
        { error: "Test attempt not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: testAttempt.status,
      endTime: testAttempt.endTime,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check test status" },
      { status: 500 }
    );
  }
}
