import { Star } from "lucide-react";
import clsx from "clsx";

export default function RatingStars({ rating = 5, size = 14, className = "" }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className={clsx("flex items-center gap-0.5", className)} aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half);
        return (
          <Star
            key={i}
            width={size}
            height={size}
            className={filled ? "fill-gold text-gold" : "fill-transparent text-navy/20"}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}
