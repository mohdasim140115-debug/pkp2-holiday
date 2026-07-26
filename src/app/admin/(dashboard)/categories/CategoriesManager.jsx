"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoriesManager({ categories }) {
  const router = useRouter();
  const [newLabel, setNewLabel] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  async function handleAdd(e) {
    e.preventDefault();
    setError("");
    if (!newLabel.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newLabel.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to add category");
        return;
      }
      setNewLabel("");
      router.refresh();
    } finally {
      setAdding(false);
    }
  }

  async function handleSaveEdit(id) {
    if (!editLabel.trim()) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: editLabel.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to update");
        return;
      }
      setEditingId(null);
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id, label) {
    if (!confirm(`Delete category "${label}"? Packages already tagged with it will keep the tag, but it will no longer appear as an option.`)) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to delete");
        return;
      }
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="bg-white rounded-xl border border-neutral-200 p-4 flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-48">
          <label className="text-sm font-medium text-neutral-700 mb-1.5 block">New Category Name</label>
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="e.g. Wellness Retreat"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue"
          />
        </div>
        <button
          type="submit"
          disabled={adding}
          className="rounded-lg bg-blue text-white text-sm font-medium px-4 py-2.5 hover:bg-navy transition-colors disabled:opacity-60"
        >
          {adding ? "Adding..." : "+ Add Category"}
        </button>
      </form>
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-auto max-h-[65vh]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-left text-neutral-500 border-b border-neutral-200">
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Key</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-b border-neutral-100 last:border-0 hover:bg-offwhite/60">
                  <td className="px-4 py-3">
                    {editingId === c.id ? (
                      <input
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        className="w-full rounded-lg border border-neutral-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue"
                        autoFocus
                      />
                    ) : (
                      <p className="font-medium text-navy">{c.label}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-neutral-400">{c.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      {editingId === c.id ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(c.id)}
                            disabled={busyId === c.id}
                            className="text-blue hover:text-navy font-medium"
                          >
                            Save
                          </button>
                          <button onClick={() => setEditingId(null)} className="text-neutral-500 hover:text-neutral-700 font-medium">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(c.id);
                              setEditLabel(c.label);
                            }}
                            className="text-blue hover:text-navy font-medium"
                          >
                            Rename
                          </button>
                          <button
                            onClick={() => handleDelete(c.id, c.label)}
                            disabled={busyId === c.id}
                            className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                          >
                            {busyId === c.id ? "..." : "Delete"}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-neutral-400">
                    No categories yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
