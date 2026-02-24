import { NextResponse } from "next/server";
import { query } from "@/adapter/db";
import { getErrorMessage } from "@/adapter/http";

interface Language {
  id: number;
  name: string;
  strings: string;
}

export async function GET() {
  try {
    const results = await query<Language[]>("SELECT * FROM languages");
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching strings:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
