import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readBlogs, writeBlogs } from "@/lib/admin/data-store";
import { slugify } from "@/lib/data/packages";

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

export async function GET(request, { params }) {
  const { id } = await params;
  const blogs = await readBlogs();
  const blog = blogs.find((b) => b.id === id);
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ blog });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body || !body.title || !body.category) {
    return NextResponse.json({ error: "Title and category are required" }, { status: 400 });
  }

  const blogs = await readBlogs();
  const index = blogs.findIndex((b) => b.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const entry = { id, ...normalizePayload(body) };
  blogs[index] = entry;
  await writeBlogs(blogs);
  revalidateBlogPaths();
  revalidatePath(`/blog/${slugify(entry.title)}`);

  return NextResponse.json({ blog: entry });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const blogs = await readBlogs();
  const index = blogs.findIndex((b) => b.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  blogs.splice(index, 1);
  await writeBlogs(blogs);
  revalidateBlogPaths();

  return NextResponse.json({ ok: true });
}
