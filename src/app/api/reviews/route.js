import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { readReviews, writeReviews } from "@/lib/admin/data-store";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const rating = Number(body?.rating);

  if (!body || !body.name || !body.comment || !body.packageSlug || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Name, rating and comment are required" }, { status: 400 });
  }

  const review = {
    id: randomUUID(),
    packageSlug: String(body.packageSlug).trim(),
    packageName: body.packageName ? String(body.packageName).trim() : "",
    name: String(body.name).trim(),
    rating,
    comment: String(body.comment).trim(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const reviews = await readReviews();
  reviews.unshift(review);
  await writeReviews(reviews);

  return NextResponse.json({ ok: true }, { status: 201 });
}
