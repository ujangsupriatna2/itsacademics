import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Public API — no auth required
export async function GET() {
  try {
    const mitraId = process.env.MITRA_ID;

    const where: Record<string, unknown> = {};
    if (mitraId) where.mitraId = mitraId;

    const settings = await db.setting.findMany({
      where,
    });
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    return NextResponse.json(settingsMap);
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
