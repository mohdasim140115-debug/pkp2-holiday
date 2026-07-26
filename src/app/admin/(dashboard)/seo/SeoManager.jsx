"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const emptyForm = { path: "", title: "", description: "" };

function EntryForm({ initial, onCancel, onSaved, saveUrl, method }) {
  const router = useRouter();
  const [form, setForm] = useState(initial || emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch(saveUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save");
        return;
      }
      router.refresh();
      onSaved();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-neutral-200 p-4 space-y-3">
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
      <div>
        <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Page Path *</label>
        <input
          required
          value={form.path}
          onChange={(e) => update("path", e.target.value)}
          placeholder="/about"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Meta Title</label>
        <input
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Custom page title for search results"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Meta Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Custom description shown under the title in search results"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue text-white text-sm font-medium px-4 py-2 hover:bg-navy transition-colors disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-neutral-300 text-sm font-medium px-4 py-2 hover:bg-neutral-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function SeoManager({ entries }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  async function handleDelete(id, path) {
    if (!confirm(`Remove SEO override for "${path}"?`)) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/seo/${id}`, { method: "DELETE" });
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
      {!adding && (
        <button
          onClick={() => setAdding(true)}
          className="rounded-lg bg-blue text-white text-sm font-medium px-4 py-2.5 hover:bg-navy transition-colors"
        >
          + Add SEO Override
        </button>
      )}

      {adding && (
        <EntryForm saveUrl="/api/admin/seo" method="POST" onCancel={() => setAdding(false)} onSaved={() => setAdding(false)} />
      )}

      <div className="space-y-3">
        {entries.map((entry) =>
          editingId === entry.id ? (
            <EntryForm
              key={entry.id}
              initial={entry}
              saveUrl={`/api/admin/seo/${entry.id}`}
              method="PUT"
              onCancel={() => setEditingId(null)}
              onSaved={() => setEditingId(null)}
            />
          ) : (
            <div key={entry.id} className="bg-white rounded-xl border border-neutral-200 p-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-mono text-xs text-blue">{entry.path}</p>
                {entry.title && <p className="font-medium text-navy mt-1">{entry.title}</p>}
                {entry.description && <p className="text-sm text-neutral-500 mt-0.5 line-clamp-2">{entry.description}</p>}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => setEditingId(entry.id)} className="text-blue hover:text-navy text-sm font-medium">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry.id, entry.path)}
                  disabled={busyId === entry.id}
                  className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                >
                  {busyId === entry.id ? "..." : "Delete"}
                </button>
              </div>
            </div>
          )
        )}
        {entries.length === 0 && !adding && (
          <p className="text-center text-neutral-400 py-8">No SEO overrides configured yet.</p>
        )}
      </div>
    </div>
  );
}
