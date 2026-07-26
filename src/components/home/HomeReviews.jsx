import { Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RatingStars from "@/components/ui/RatingStars";
import approvedReviews from "../../../data/reviews.json";
import { testimonials } from "@/lib/data/content";

function getReviews(maxCount = 12) {
  const real = approvedReviews
    .filter((r) => r.status === "approved")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((r) => ({
      name: r.name,
      trip: r.packageName || "PKP Holidays Trip",
      rating: r.rating,
      text: r.comment,
    }));

  if (real.length > 0) return real.slice(0, maxCount);

  return testimonials.map((t) => ({ name: t.name, trip: t.trip, rating: t.rating, text: t.text }));
}

function ReviewCard({ r }) {
  return (
    <div className="w-72 sm:w-88 shrink-0 bg-white ring-1 ring-navy/10 luxury-shadow rounded-xl p-5 hover:-translate-y-0.5 hover:luxury-shadow-lg transition-all">
      <div className="flex items-center justify-between mb-3">
        <Quote className="w-6 h-6 text-sky/50" />
        <RatingStars rating={r.rating} size={13} />
      </div>
      <p className="text-navy/70 text-sm leading-relaxed mb-4 line-clamp-4">&quot;{r.text}&quot;</p>
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-navy/10">
        <p className="font-semibold text-navy text-sm">{r.name}</p>
        <p className="text-xs text-navy/40 text-right">{r.trip}</p>
      </div>
    </div>
  );
}

export default function HomeReviews() {
  const reviews = getReviews();

  return (
    <section className="bg-white py-12 sm:py-16 relative overflow-hidden">
      <Container className="relative">
        <SectionHeading
          eyebrow="Real Reviews"
          title="What Our Travelers Say"
          align="center"
          className="mb-6"
        />
      </Container>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[...reviews, ...reviews].map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
