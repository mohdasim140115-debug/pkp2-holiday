"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DestinationsTable({ destinations }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = destinations.filter((d) =>
    `${d.name} ${d.country} ${d.state || ""}`.toLowerCase().includes(query.toLowerCase())
  );

  async function handleDelete(id, name) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/destinations/${id}`, { method: "DELETE" });
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
          placeholder="Search by name, country, or state..."
          className="w-full max-w-sm rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-neutral-500 border-b border-neutral-200">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Duration</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id} className="border-b border-neutral-100 last:border-0 hover:bg-offwhite/60">
                <td className="px-4 py-3">
                  <p className="font-medium text-navy">{d.name}</p>
                  <p className="text-xs text-neutral-500">{d.state ? `${d.state}, ` : ""}{d.country}</p>
                </td>
                <td className="px-4 py-3 capitalize">{d.type}</td>
                <td className="px-4 py-3">{d.nights}N / {d.days}D</td>
                <td className="px-4 py-3">₹{Number(d.price).toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">{d.rating}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/destinations/${d.id}/edit`} className="text-blue hover:text-navy font-medium">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(d.id, d.name)}
                      disabled={deletingId === d.id}
                      className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                    >
                      {deletingId === d.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-neutral-400">
                  No destinations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
