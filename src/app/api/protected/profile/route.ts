import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/lib/course-models/User";
import dbConnect from "@/lib/dbConnect";

const JWT_SECRET = process.env.JWT_SECRET!;

interface TokenPayload extends JwtPayload {
  userId: string;
  role: string;
}

export async function GET(req: NextRequest) {
  await dbConnect();

  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

  const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
  const user = await User.findById(decoded.userId).select("-password");

  return NextResponse.json(user);
}
