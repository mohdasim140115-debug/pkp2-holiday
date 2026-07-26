import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readSeo, writeSeo } from "@/lib/admin/data-store";

function normalizePath(path) {
  const trimmed = String(path || "").trim();
  if (!trimmed.startsWith("/")) return `/${trimmed}`;
  return trimmed.length > 1 ? trimmed.replace(/\/+$/, "") : trimmed;
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body || !body.path || (!body.title && !body.description)) {
    return NextResponse.json({ error: "Path and at least a title or description are required" }, { status: 400 });
  }

  const path = normalizePath(body.path);
  const seo = await readSeo();
  const index = seo.findIndex((s) => s.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (seo.some((s) => s.path === path && s.id !== id)) {
    return NextResponse.json({ error: "An override for this path already exists" }, { status: 400 });
  }

  const oldPath = seo[index].path;
  seo[index] = { id, path, title: String(body.title || "").trim(), description: String(body.description || "").trim() };
  await writeSeo(seo);
  revalidatePath(oldPath);
  revalidatePath(path);

  return NextResponse.json({ seo: seo[index] });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const seo = await readSeo();
  const index = seo.findIndex((s) => s.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const removed = seo[index];
  seo.splice(index, 1);
  await writeSeo(seo);
  revalidatePath(removed.path);

  return NextResponse.json({ ok: true });
}
