"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function travelImage(tags, w, h, seed) {
  const lock = seed ? `?lock=${encodeURIComponent(seed)}` : "";
  return `https://loremflickr.com/${w}/${h}/${encodeURIComponent(tags)}${lock}`;
}

function EditableForm({ initial, onCancel, onSaved, saveUrl, method }) {
  const router = useRouter();
  const [tags, setTags] = useState(initial?.tags || "");
  const [caption, setCaption] = useState(initial?.caption || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch(saveUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags, caption }),
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
        <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Image Search Tags *</label>
        <input
          required
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. kashmir,houseboat"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Caption</label>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="e.g. Kashmir Houseboat"
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

export default function GalleryManager({ gallery }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  async function handleDelete(id) {
    if (!confirm("Delete this photo from the gallery?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
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
    <div className="space-y-4">
      {!adding && (
        <button
          onClick={() => setAdding(true)}
          className="rounded-lg bg-blue text-white text-sm font-medium px-4 py-2.5 hover:bg-navy transition-colors"
        >
          + Add Photo
        </button>
      )}

      {adding && (
        <EditableForm
          saveUrl="/api/admin/gallery"
          method="POST"
          onCancel={() => setAdding(false)}
          onSaved={() => setAdding(false)}
        />
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item) =>
          editingId === item.id ? (
            <div key={item.id} className="col-span-2">
              <EditableForm
                initial={item}
                saveUrl={`/api/admin/gallery/${item.id}`}
                method="PUT"
                onCancel={() => setEditingId(null)}
                onSaved={() => setEditingId(null)}
              />
            </div>
          ) : (
            <div key={item.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="relative w-full h-32">
                <Image
                  src={travelImage(item.tags, 400, 300, item.id)}
                  alt={item.caption || item.tags}
                  fill
                  sizes="200px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-navy truncate">{item.caption || item.tags}</p>
                <p className="text-xs text-neutral-400 truncate">{item.tags}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button onClick={() => setEditingId(item.id)} className="text-blue hover:text-navy text-xs font-medium">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="text-red-600 hover:text-red-800 text-xs font-medium disabled:opacity-50"
                  >
                    {deletingId === item.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          )
        )}
        {gallery.length === 0 && (
          <p className="col-span-full text-center text-neutral-400 py-8">No photos in the gallery yet.</p>
        )}
      </div>
    </div>
  );
}
