import { NextResponse } from "next/server";
import { getCookieConfig } from "@/adapter/auth";

export async function POST() {
  const cookieConfig = getCookieConfig();

  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set(cookieConfig.name, "", {
    httpOnly: cookieConfig.httpOnly,
    secure: cookieConfig.secure,
    sameSite: cookieConfig.sameSite,
    path: cookieConfig.path,
    maxAge: 0,
  });

  return response;
}
