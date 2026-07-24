import RatingStars from "@/components/ui/RatingStars";
import FadeIn from "@/components/ui/FadeIn";

export default function PackageReviews({ pkg }) {
  return (
    <div>
      <FadeIn className="flex items-center gap-4 mb-8" y={16}>
        <span className="font-display text-4xl font-bold text-navy">{pkg.rating}</span>
        <div>
          <RatingStars rating={pkg.rating} size={18} />
          <p className="text-sm text-navy/50 mt-1">Based on {pkg.reviewCount} verified reviews</p>
        </div>
      </FadeIn>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {pkg.reviews.map((r, i) => (
          <FadeIn key={r.name} delay={i * 0.08} y={16} className="bg-white rounded-2xl border border-navy/10 p-6">
            <RatingStars rating={r.rating} size={13} className="mb-3" />
            <p className="text-sm text-navy/70 leading-relaxed mb-4">&quot;{r.comment}&quot;</p>
            <p className="text-sm font-semibold text-navy">{r.name}</p>
            <p className="text-xs text-navy/45">{new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
