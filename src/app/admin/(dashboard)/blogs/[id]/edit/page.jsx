import { notFound } from "next/navigation";
import { readBlogs } from "@/lib/admin/data-store";
import BlogForm from "../../BlogForm";

export default async function EditBlogPage({ params }) {
  const { id } = await params;
  const blogs = await readBlogs();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">Edit Blog Post</h1>
        <p className="text-sm text-neutral-500 mt-1">{blog.title}</p>
      </div>
      <BlogForm blog={blog} />
    </div>
  );
}
