import Link from "next/link";
import { readBlogs } from "@/lib/admin/data-store";
import BlogsTable from "./BlogsTable";

export default async function AdminBlogsPage() {
  const blogs = await readBlogs();
  const sorted = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Blog Posts</h1>
          <p className="text-sm text-neutral-500 mt-1">{blogs.length} articles total</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="rounded-lg bg-blue text-white text-sm font-medium px-4 py-2.5 hover:bg-navy transition-colors"
        >
          + Add Blog Post
        </Link>
      </div>

      <BlogsTable blogs={sorted} />
    </div>
  );
}
