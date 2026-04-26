import { NextResponse } from "next/server";
import { getAuthSession, getMitraWhere } from "@/lib/auth-helper";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const user = await getAuthSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const mitraIdFilter = searchParams.get("mitraId") || undefined;
    const mitraWhere = getMitraWhere(user, mitraIdFilter);
    const targetMitraId = (mitraWhere.mitraId as string | null) ?? null;

    const settings = await db.setting.findMany({
      where: { mitraId: targetMitraId },
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

export async function PUT(req: Request) {
  try {
    const user = await getAuthSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const items: { key: string; value: string; label?: string; group?: string; mitraId?: string | null }[] = body;

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Expected array of settings" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const mitraIdFilter = searchParams.get("mitraId") || undefined;
    const mitraWhere = getMitraWhere(user, mitraIdFilter);
    const targetMitraId = (mitraWhere.mitraId as string | null) ?? null;

    for (const item of items) {
      const existing = await db.setting.findFirst({
        where: { key: item.key, mitraId: targetMitraId },
      });

      if (existing) {
        await db.setting.update({
          where: { id: existing.id },
          data: {
            value: item.value,
            ...(item.label !== undefined && { label: item.label }),
            ...(item.group !== undefined && { group: item.group }),
          },
        });
      } else {
        await db.setting.create({
          data: {
            key: item.key,
            value: item.value,
            label: item.label || item.key,
            group: item.group || "general",
            mitraId: targetMitraId,
          },
        });
      }
    }

    return NextResponse.json({ message: "Settings updated successfully" });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
