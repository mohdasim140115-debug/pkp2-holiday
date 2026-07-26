import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readCategories, writeCategories, makeUniqueId } from "@/lib/admin/data-store";

function revalidateCategoryPaths() {
  revalidatePath("/packages");
  revalidatePath("/", "layout");
}

export async function GET() {
  const categories = await readCategories();
  return NextResponse.json({ categories });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.label) {
    return NextResponse.json({ error: "Label is required" }, { status: 400 });
  }

  const categories = await readCategories();
  const id = makeUniqueId(body.label, categories);
  const entry = { id, label: String(body.label).trim() };

  categories.push(entry);
  await writeCategories(categories);
  revalidateCategoryPaths();

  return NextResponse.json({ category: entry }, { status: 201 });
}
