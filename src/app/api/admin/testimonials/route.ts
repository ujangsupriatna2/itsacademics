import { NextResponse } from "next/server";
import { getAuthSession, getMitraWhere } from "@/lib/auth-helper";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const user = await getAuthSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const mitraIdFilter = searchParams.get("mitraId") || undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const where = { ...getMitraWhere(user, mitraIdFilter) };

    const [testimonials, total] = await Promise.all([
      db.testimonial.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.testimonial.count({ where }),
    ]);

    return NextResponse.json({ testimonials, total, page, limit });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, role, text, rating, featured } = body;

    if (!name || !text) {
      return NextResponse.json({ error: "Name and text are required" }, { status: 400 });
    }

    const parsedRating = parseInt(rating);
    const mitraId = user.role === "superadmin" ? (body.mitraId || null) : user.mitraId;

    const testimonial = await db.testimonial.create({
      data: {
        name,
        role: role || "",
        text,
        rating: (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) ? 5 : parsedRating,
        featured: !!featured,
        mitraId,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
