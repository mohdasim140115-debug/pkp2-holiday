"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const emptyForm = { name: "", packageName: "", rating: 5, comment: "" };

export default function AddReviewForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
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
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to add review");
        return;
      }
      setForm(emptyForm);
      setOpen(false);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue text-white text-sm font-medium px-4 py-2.5 hover:bg-navy transition-colors"
      >
        + Add Review
      </button>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue";
  const labelClass = "text-sm font-medium text-neutral-700 mb-1.5 block";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4">
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Reviewer Name *</label>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} placeholder="e.g. Ankit & Riya Sharma" />
        </div>
        <div>
          <label className={labelClass}>Trip / Package Name</label>
          <input value={form.packageName} onChange={(e) => update("packageName", e.target.value)} className={inputClass} placeholder="e.g. Kashmir Honeymoon" />
        </div>
        <div>
          <label className={labelClass}>Rating *</label>
          <select required value={form.rating} onChange={(e) => update("rating", Number(e.target.value))} className={inputClass}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>Review Text *</label>
        <textarea required rows={3} value={form.comment} onChange={(e) => update("comment", e.target.value)} className={inputClass} placeholder="What did the traveler say about their trip?" />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue text-white text-sm font-medium px-4 py-2 hover:bg-navy transition-colors disabled:opacity-60"
        >
          {saving ? "Saving..." : "Add as Approved Review"}
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setError(""); }}
          className="rounded-lg border border-neutral-300 text-sm font-medium px-4 py-2 hover:bg-neutral-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
