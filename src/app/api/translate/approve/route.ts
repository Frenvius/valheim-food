import { NextRequest, NextResponse } from "next/server";
import { query, conn } from "@/adapter/db";
import { getTokenFromRequest, verifyToken } from "@/adapter/auth";
import { getErrorMessage } from "@/adapter/http";
import type { ApproveTranslationDto } from "@/domain/types";

interface LanguageResult {
  strings: string;
}

export async function POST(request: NextRequest) {
  const token = await getTokenFromRequest(request);

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    const body: ApproveTranslationDto = await request.json();
    const { language, json, id } = body;

    if (!language || !json || !id) {
      return NextResponse.json(
        { error: "Language, json, and id are required" },
        { status: 400 }
      );
    }

    const result = await query<LanguageResult[]>(
      "SELECT strings FROM languages WHERE name = ?",
      [language]
    );

    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: "Language not found" },
        { status: 404 }
      );
    }

    const strings = JSON.parse(result[0].strings.replace(/\\/g, ""));
    const parsedJson = JSON.parse(json);
    const newJson = { ...strings, ...parsedJson };
    const jsonStr = JSON.stringify(newJson);
    const escapedJson = conn.escape(jsonStr);

    await query(
      `UPDATE languages SET strings = ${escapedJson} WHERE name = ?`,
      [language]
    );
    await query("DELETE FROM translations WHERE id = ?", [id]);

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error("Error approving translation:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
