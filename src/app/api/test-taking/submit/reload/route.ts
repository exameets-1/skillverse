/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import TestAttempt from "@/lib/models/TestAttempt";
import jwt from "jsonwebtoken";

interface JWTPayload {
  testAttemptId: string;
  studentId: string;
  type: string;
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

    // ✅ Extract token from URL (e.g., /api/auto-submit?token=xyz)
    const token = request.nextUrl.searchParams.get("token");
    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    let decoded: JWTPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    // ✅ Parse body (small JSON)
    const { testAttemptId } = await request.json();
    if (!testAttemptId) {
      return NextResponse.json({ error: "Missing testAttemptId" }, { status: 400 });
    }

    // ✅ Ensure ownership
    if (testAttemptId !== decoded.testAttemptId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Lightweight DB update (no populate)
    const result = await TestAttempt.updateOne(
      { _id: testAttemptId, student: decoded.studentId, status: "in_progress" },
      {
        $set: {
          status: "auto_submitted",
          endTime: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "No in-progress attempt found" }, { status: 200 });
    }

    return NextResponse.json({ message: "Auto-submitted successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Auto submit failed" }, { status: 500 });
  }
}
