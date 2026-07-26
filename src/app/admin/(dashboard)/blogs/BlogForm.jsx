"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORY_OPTIONS = [
  "Travel Tips",
  "Visa Guide",
  "Packing Tips",
  "Budget Travel",
  "Best Time To Visit",
  "Top Honeymoon Places",
  "Family Vacation Guide",
  "Adventure Guide",
];

function toFormState(blog) {
  return {
    title: blog?.title || "",
    category: blog?.category || CATEGORY_OPTIONS[0],
    excerpt: blog?.excerpt || "",
    body: (blog?.body || []).join("\n\n"),
    date: blog?.date || new Date().toISOString().slice(0, 10),
    author: blog?.author || "PKP Holidays Team",
    readTime: blog?.readTime || "5 min read",
    img: blog?.img || "",
  };
}

export default function BlogForm({ blog }) {
  const router = useRouter();
  const isEdit = Boolean(blog);
  const [form, setForm] = useState(toFormState(blog));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...form,
      body: form.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
    };

    try {
      const url = isEdit ? `/api/admin/blogs/${blog.id}` : "/api/admin/blogs";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save");
        return;
      }
      router.push("/admin/blogs");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue";
  const labelClass = "text-sm font-medium text-neutral-700 mb-1.5 block";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
        <div>
          <label className={labelClass}>Title *</label>
          <input required value={form.title} onChange={(e) => update("title", e.target.value)} className={inputClass} placeholder="e.g. 10 Essential Travel Tips for a Stress-Free Vacation" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Category *</label>
            <select required value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass}>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Author</label>
            <input value={form.author} onChange={(e) => update("author", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Read Time</label>
            <input value={form.readTime} onChange={(e) => update("readTime", e.target.value)} className={inputClass} placeholder="e.g. 5 min read" />
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Cover Image Search Tags *</label>
            <input required value={form.img} onChange={(e) => update("img", e.target.value)} className={inputClass} placeholder="e.g. travel,suitcase,airport" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
        <div>
          <label className={labelClass}>Excerpt *</label>
          <textarea
            required
            rows={2}
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            className={inputClass}
            placeholder="Short summary shown on the blog listing page"
          />
        </div>
        <div>
          <label className={labelClass}>Body (separate paragraphs with a blank line) *</label>
          <textarea
            required
            rows={12}
            value={form.body}
            onChange={(e) => update("body", e.target.value)}
            className={inputClass}
            placeholder={"First paragraph...\n\nSecond paragraph..."}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue text-white text-sm font-medium px-5 py-2.5 hover:bg-navy transition-colors disabled:opacity-60"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Blog Post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          className="rounded-lg border border-neutral-300 text-sm font-medium px-5 py-2.5 hover:bg-neutral-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
