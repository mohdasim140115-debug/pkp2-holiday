import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readGallery, writeGallery } from "@/lib/admin/data-store";

function normalizePayload(body) {
  return {
    tags: String(body.tags || "").trim(),
    caption: String(body.caption || "").trim(),
  };
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body || !body.tags) {
    return NextResponse.json({ error: "Image tags are required" }, { status: 400 });
  }

  const gallery = await readGallery();
  const index = gallery.findIndex((g) => g.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const entry = { id, ...normalizePayload(body) };
  gallery[index] = entry;
  await writeGallery(gallery);
  revalidatePath("/gallery");

  return NextResponse.json({ item: entry });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const gallery = await readGallery();
  const index = gallery.findIndex((g) => g.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  gallery.splice(index, 1);
  await writeGallery(gallery);
  revalidatePath("/gallery");

  return NextResponse.json({ ok: true });
}
