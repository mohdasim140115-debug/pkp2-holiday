"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 15;

export default function BlogsTable({ blogs }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = blogs.filter((b) =>
    `${b.title} ${b.category}`.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginated = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to delete");
        return;
      }
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="p-4 border-b border-neutral-200">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or category..."
          className="w-full max-w-sm rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue"
        />
      </div>

      <div className="overflow-auto max-h-[65vh]">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-left text-neutral-500 border-b border-neutral-200">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Author</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((b) => (
              <tr key={b.id} className="border-b border-neutral-100 last:border-0 hover:bg-offwhite/60">
                <td className="px-4 py-3">
                  <p className="font-medium text-navy">{b.title}</p>
                  <p className="text-xs text-neutral-500 max-w-md line-clamp-1">{b.excerpt}</p>
                </td>
                <td className="px-4 py-3">{b.category}</td>
                <td className="px-4 py-3">{b.author}</td>
                <td className="px-4 py-3 whitespace-nowrap">{b.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/blogs/${b.id}/edit`} className="text-blue hover:text-navy font-medium">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(b.id, b.title)}
                      disabled={deletingId === b.id}
                      className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                    >
                      {deletingId === b.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-400">
                  No blog posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-neutral-200 text-sm">
          <p className="text-neutral-500">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-neutral-300 px-3 py-1.5 font-medium hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-neutral-500">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-neutral-300 px-3 py-1.5 font-medium hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
