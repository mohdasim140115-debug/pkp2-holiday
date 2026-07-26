import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readCategories, writeCategories } from "@/lib/admin/data-store";

function revalidateCategoryPaths() {
  revalidatePath("/packages");
  revalidatePath("/", "layout");
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body || !body.label) {
    return NextResponse.json({ error: "Label is required" }, { status: 400 });
  }

  const categories = await readCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  categories[index] = { id, label: String(body.label).trim() };
  await writeCategories(categories);
  revalidateCategoryPaths();

  return NextResponse.json({ category: categories[index] });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const categories = await readCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  categories.splice(index, 1);
  await writeCategories(categories);
  revalidateCategoryPaths();

  return NextResponse.json({ ok: true });
}
