import { NextRequest, NextResponse } from "next/server";
import { getTokenPayload } from "./verifyToken";

export function verifyUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return { authorized: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };

  const decoded = getTokenPayload(token);
  if (!decoded) return { authorized: false, response: NextResponse.json({ error: "Invalid token" }, { status: 403 }) };

  return { authorized: true, decoded };
}

export function verifyRole(req: NextRequest, roles: string[]) {
  const { authorized, decoded, response } = verifyUser(req);
  if (!authorized) return { authorized, response };

  if (!roles.includes(decoded!.role)) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Access denied" }, { status: 403 }),
    };
  }

  return { authorized: true, decoded };
}
