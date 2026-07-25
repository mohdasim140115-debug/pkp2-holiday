"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORY_OPTIONS = [
  "honeymoon",
  "family",
  "adventure",
  "religious",
  "weekend",
  "group",
  "corporate",
  "luxury",
  "beach",
  "hill-station",
  "wildlife",
];

function toFormState(destination) {
  return {
    name: destination?.name || "",
    state: destination?.state || "",
    country: destination?.country || "",
    type: destination?.type || "domestic",
    categories: destination?.categories || [],
    days: destination?.days ?? 4,
    nights: destination?.nights ?? 3,
    price: destination?.price ?? 15000,
    rating: destination?.rating ?? 4.7,
    img: destination?.img || "",
    tag: destination?.tag || "",
    best: destination?.best || "",
    highlights: (destination?.highlights || []).join("\n"),
  };
}

export default function DestinationForm({ destination }) {
  const router = useRouter();
  const isEdit = Boolean(destination);
  const [form, setForm] = useState(toFormState(destination));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleCategory(cat) {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...form,
      days: Number(form.days),
      nights: Number(form.nights),
      price: Number(form.price),
      rating: Number(form.rating),
      highlights: form.highlights.split("\n").map((h) => h.trim()).filter(Boolean),
    };

    try {
      const url = isEdit ? `/api/admin/destinations/${destination.id}` : "/api/admin/destinations";
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
      router.push("/admin/destinations");
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Destination Name *</label>
            <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} placeholder="e.g. Kashmir" />
          </div>
          <div>
            <label className={labelClass}>Tagline *</label>
            <input required value={form.tag} onChange={(e) => update("tag", e.target.value)} className={inputClass} placeholder="e.g. Paradise on Earth" />
          </div>
          <div>
            <label className={labelClass}>State (optional)</label>
            <input value={form.state} onChange={(e) => update("state", e.target.value)} className={inputClass} placeholder="e.g. Jammu & Kashmir" />
          </div>
          <div>
            <label className={labelClass}>Country *</label>
            <input required value={form.country} onChange={(e) => update("country", e.target.value)} className={inputClass} placeholder="e.g. India" />
          </div>
          <div>
            <label className={labelClass}>Type *</label>
            <select value={form.type} onChange={(e) => update("type", e.target.value)} className={inputClass}>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Best Time to Visit *</label>
            <input required value={form.best} onChange={(e) => update("best", e.target.value)} className={inputClass} placeholder="e.g. March to October" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className={labelClass}>Days *</label>
            <input required type="number" min={1} value={form.days} onChange={(e) => update("days", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Nights *</label>
            <input required type="number" min={0} value={form.nights} onChange={(e) => update("nights", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Price (₹) *</label>
            <input required type="number" min={0} value={form.price} onChange={(e) => update("price", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Rating *</label>
            <input required type="number" step="0.1" min={1} max={5} value={form.rating} onChange={(e) => update("rating", e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
        <div>
          <label className={labelClass}>Categories</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border capitalize transition-colors ${
                  form.categories.includes(cat)
                    ? "bg-blue text-white border-blue"
                    : "bg-white text-neutral-600 border-neutral-300 hover:border-blue"
                }`}
              >
                {cat.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Image Search Tags *</label>
          <input
            required
            value={form.img}
            onChange={(e) => update("img", e.target.value)}
            className={inputClass}
            placeholder="e.g. kashmir-valley-houseboat"
          />
          <p className="text-xs text-neutral-400 mt-1">
            Hyphenated keywords used to pull matching stock photos (e.g. &quot;goa-beach-sunset&quot;).
          </p>
        </div>

        <div>
          <label className={labelClass}>Highlights (one per line) *</label>
          <textarea
            required
            rows={6}
            value={form.highlights}
            onChange={(e) => update("highlights", e.target.value)}
            className={inputClass}
            placeholder={"Shikara ride on Dal Lake\nGondola cable car in Gulmarg"}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue text-white text-sm font-medium px-5 py-2.5 hover:bg-navy transition-colors disabled:opacity-60"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Destination"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/destinations")}
          className="rounded-lg border border-neutral-300 text-sm font-medium px-5 py-2.5 hover:bg-neutral-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
