import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (req.nextUrl.pathname.startsWith("/api/protected")) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/protected/:path*"],
};
