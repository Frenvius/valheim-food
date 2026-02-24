import { NextRequest, NextResponse } from "next/server";
import { query } from "@/adapter/db";
import { getTokenFromRequest, verifyToken } from "@/adapter/auth";
import { getErrorMessage } from "@/adapter/http";
import type { Translation } from "@/domain/types";

export async function GET(request: NextRequest) {
  const token = await getTokenFromRequest(request);

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    const results = await query<Translation[]>("SELECT * FROM translations");
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching translations:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
