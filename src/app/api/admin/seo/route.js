import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readSeo, writeSeo } from "@/lib/admin/data-store";
import { randomUUID } from "node:crypto";

function normalizePath(path) {
  const trimmed = String(path || "").trim();
  if (!trimmed.startsWith("/")) return `/${trimmed}`;
  return trimmed.length > 1 ? trimmed.replace(/\/+$/, "") : trimmed;
}

export async function GET() {
  const seo = await readSeo();
  return NextResponse.json({ seo });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.path || (!body.title && !body.description)) {
    return NextResponse.json({ error: "Path and at least a title or description are required" }, { status: 400 });
  }

  const path = normalizePath(body.path);
  const seo = await readSeo();
  if (seo.some((s) => s.path === path)) {
    return NextResponse.json({ error: "An override for this path already exists" }, { status: 400 });
  }

  const entry = {
    id: randomUUID(),
    path,
    title: String(body.title || "").trim(),
    description: String(body.description || "").trim(),
  };

  seo.push(entry);
  await writeSeo(seo);
  revalidatePath(path);

  return NextResponse.json({ seo: entry }, { status: 201 });
}
