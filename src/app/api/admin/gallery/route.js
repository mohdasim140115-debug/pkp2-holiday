import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readGallery, writeGallery, makeUniqueId } from "@/lib/admin/data-store";

function normalizePayload(body) {
  return {
    tags: String(body.tags || "").trim(),
    caption: String(body.caption || "").trim(),
  };
}

export async function GET() {
  const gallery = await readGallery();
  return NextResponse.json({ gallery });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.tags) {
    return NextResponse.json({ error: "Image tags are required" }, { status: 400 });
  }

  const gallery = await readGallery();
  const id = makeUniqueId(body.caption || body.tags, gallery);
  const entry = { id, ...normalizePayload(body) };

  gallery.push(entry);
  await writeGallery(gallery);
  revalidatePath("/gallery");

  return NextResponse.json({ item: entry }, { status: 201 });
}
