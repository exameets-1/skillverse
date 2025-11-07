import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/course-models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // ✅ Get token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // ✅ Verify token
    let decoded: { userId: string; role: string };
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    // ✅ Fetch user
    const user = await User.findById(decoded.userId).select("name email role phone");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Return user info
    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("ME endpoint error:", error);
    return NextResponse.json({ error: "Server error verifying session" }, { status: 500 });
  }
}
