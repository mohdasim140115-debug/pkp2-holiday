import BlogForm from "../BlogForm";

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">Add Blog Post</h1>
        <p className="text-sm text-neutral-500 mt-1">Publish a new article to the blog.</p>
      </div>
      <BlogForm />
    </div>
  );
}
