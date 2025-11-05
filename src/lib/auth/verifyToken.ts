import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface TokenPayload extends JwtPayload {
  userId: string;
  role: string;
}

export function getTokenPayload(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}
