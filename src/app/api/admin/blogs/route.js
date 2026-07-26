import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readBlogs, writeBlogs, makeUniqueId } from "@/lib/admin/data-store";

function normalizePayload(body) {
  return {
    title: String(body.title || "").trim(),
    category: String(body.category || "").trim(),
    excerpt: String(body.excerpt || "").trim(),
    body: Array.isArray(body.body)
      ? body.body.map((p) => String(p).trim()).filter(Boolean)
      : [],
    date: body.date || new Date().toISOString().slice(0, 10),
    author: String(body.author || "PKP Holidays Team").trim(),
    readTime: String(body.readTime || "5 min read").trim(),
    img: String(body.img || "travel").trim(),
  };
}

function revalidateBlogPaths() {
  revalidatePath("/blog");
  revalidatePath("/sitemap-page");
}

export async function GET() {
  const blogs = await readBlogs();
  return NextResponse.json({ blogs });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.title || !body.category) {
    return NextResponse.json({ error: "Title and category are required" }, { status: 400 });
  }

  const blogs = await readBlogs();
  const id = makeUniqueId(body.title, blogs);
  const entry = { id, ...normalizePayload(body) };

  blogs.push(entry);
  await writeBlogs(blogs);
  revalidateBlogPaths();

  return NextResponse.json({ blog: entry }, { status: 201 });
}
