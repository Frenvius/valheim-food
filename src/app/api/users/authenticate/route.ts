import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { query } from "@/adapter/db";
import { signToken, getCookieConfig } from "@/adapter/auth";
import { getErrorMessage } from "@/adapter/http";
import type { LoginCredentials } from "@/domain/types";

interface DbUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const credentials: LoginCredentials = await request.json();
    const { email, password } = credentials;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const results = await query<DbUser[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!results || results.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const user = results[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Username or password is incorrect" },
        { status: 400 }
      );
    }

    const token = await signToken(user.id);
    const cookieConfig = getCookieConfig();

    const response = NextResponse.json({
      id: user.id,
      username: user.name,
      email: user.email,
    });

    response.cookies.set(cookieConfig.name, token, {
      httpOnly: cookieConfig.httpOnly,
      secure: cookieConfig.secure,
      sameSite: cookieConfig.sameSite,
      path: cookieConfig.path,
      maxAge: cookieConfig.maxAge,
    });

    return response;
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
