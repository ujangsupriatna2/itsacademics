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
    const mitraWhere = getMitraWhere(user, mitraIdFilter);

    const [
      totalProperties,
      publishedBlogs,
      totalTestimonials,
      totalBanks,
      totalGallery,
    ] = await Promise.all([
      db.property.count({ where: mitraWhere }),
      db.blogPost.count({ where: { ...mitraWhere, published: true } }),
      db.testimonial.count({ where: mitraWhere }),
      db.bank.count({ where: { ...mitraWhere, isActive: true } }),
      db.galleryItem.count({ where: mitraWhere }),
    ]);

    return NextResponse.json({
      totalProperties,
      publishedBlogs,
      totalTestimonials,
      totalBanks,
      totalGallery,
    });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
