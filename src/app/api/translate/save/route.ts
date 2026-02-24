import { NextRequest, NextResponse } from "next/server";
import { query, conn } from "@/adapter/db";
import { getErrorMessage } from "@/adapter/http";
import type { SaveTranslationDto } from "@/domain/types";

export async function POST(request: NextRequest) {
  try {
    const body: SaveTranslationDto = await request.json();
    const { language, data } = body;

    if (!language || !data) {
      return NextResponse.json(
        { error: "Language and data are required" },
        { status: 400 }
      );
    }

    const json = JSON.stringify(data);
    const escapedJson = conn.escape(json);

    await query(
      `INSERT INTO translations (language, json) VALUES (?, ${escapedJson})`,
      [language]
    );

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error("Error saving translation:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
