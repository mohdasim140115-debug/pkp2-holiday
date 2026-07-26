"use client";

import { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";

export default function ReviewForm({ packageSlug, packageName }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageSlug, packageName, name, rating, comment }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit review");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-navy/10 p-6 text-center">
        <CheckCircle2 className="w-10 h-10 text-sky mx-auto mb-3" />
        <p className="font-semibold text-navy">Thank you for your review!</p>
        <p className="text-sm text-navy/60 mt-1">It will appear here once approved by our team.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-navy/10 p-6 space-y-4">
      <h4 className="font-semibold text-navy">Write a Review</h4>
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            onMouseEnter={() => setHoverRating(n)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`${n} star`}
          >
            <Star
              className={`w-6 h-6 ${(hoverRating || rating) >= n ? "fill-gold text-gold" : "text-navy/20"}`}
            />
          </button>
        ))}
      </div>

      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="w-full rounded-xl border border-navy/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky"
      />
      <textarea
        required
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with this package..."
        className="w-full rounded-xl border border-navy/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky resize-none"
      />

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-dark text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
