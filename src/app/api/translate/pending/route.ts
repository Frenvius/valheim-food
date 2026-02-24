import { NextRequest, NextResponse } from "next/server";
import { query } from "@/adapter/db";
import { getErrorMessage } from "@/adapter/http";
import type { PendingCountResponse } from "@/domain/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language");

    if (!language) {
      return NextResponse.json(
        { error: "Language parameter is required" },
        { status: 400 }
      );
    }

    const results = await query<PendingCountResponse[]>(
      "SELECT COUNT(*) as count FROM translations WHERE language = ?",
      [language]
    );

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Error fetching pending count:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
