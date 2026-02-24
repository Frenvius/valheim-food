import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.SECRET);

export async function signToken(userId: number): Promise<string> {
  return new SignJWT({ sub: String(userId) })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

const COOKIE_NAME = "auth-token";

export function getCookieConfig() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export async function getTokenFromRequest(
  request: NextRequest
): Promise<string | null> {
  const cookieToken = request.cookies.get(COOKIE_NAME)?.value;
  if (cookieToken) {
    return cookieToken;
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, userId: number) => Promise<NextResponse>
): Promise<NextResponse> {
  const token = await getTokenFromRequest(request);

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload || !payload.sub) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const userId = parseInt(payload.sub as string, 10);
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  return handler(request, userId);
}

const publicRoutes = ["/api/users/authenticate", "/api/users/logout"];

export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => pathname.startsWith(route));
}
