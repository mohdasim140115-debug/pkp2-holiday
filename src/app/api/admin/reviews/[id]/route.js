import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readReviews, writeReviews } from "@/lib/admin/data-store";

const VALID_STATUSES = ["pending", "approved", "rejected"];

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body || !VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const reviews = await readReviews();
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  reviews[index] = { ...reviews[index], status: body.status };
  await writeReviews(reviews);
  if (reviews[index].packageSlug) revalidatePath(`/packages/${reviews[index].packageSlug}`);

  return NextResponse.json({ review: reviews[index] });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const reviews = await readReviews();
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const removed = reviews[index];
  reviews.splice(index, 1);
  await writeReviews(reviews);
  if (removed.packageSlug) revalidatePath(`/packages/${removed.packageSlug}`);

  return NextResponse.json({ ok: true });
}
