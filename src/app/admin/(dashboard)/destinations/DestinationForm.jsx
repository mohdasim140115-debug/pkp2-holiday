"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function toFormState(destination) {
  return {
    name: destination?.name || "",
    state: destination?.state || "",
    country: destination?.country || "",
    type: destination?.type || "domestic",
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

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const url = isEdit ? `/api/admin/destinations/${destination.id}` : "/api/admin/destinations";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
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
            <label className={labelClass}>Type *</label>
            <select value={form.type} onChange={(e) => update("type", e.target.value)} className={inputClass}>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>State (optional)</label>
            <input value={form.state} onChange={(e) => update("state", e.target.value)} className={inputClass} placeholder="e.g. Jammu & Kashmir" />
          </div>
          <div>
            <label className={labelClass}>Country *</label>
            <input required value={form.country} onChange={(e) => update("country", e.target.value)} className={inputClass} placeholder="e.g. India" />
          </div>
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
