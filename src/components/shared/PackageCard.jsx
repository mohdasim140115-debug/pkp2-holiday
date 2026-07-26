"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, Award } from "lucide-react";

export default function PackageCard({ pkg, index = 0 }) {
  const discount = pkg.originalPrice > pkg.price ? Math.round(100 - (pkg.price / pkg.originalPrice) * 100) : 0;
  const badgeLabel = pkg.rating >= 4.8 ? "Best Seller" : discount > 0 ? `${discount}% OFF` : pkg.type === "international" ? "International" : "Domestic";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group relative bg-white rounded-3xl overflow-hidden ring-1 ring-navy/8 luxury-shadow hover:luxury-shadow-lg hover:-translate-y-1 transition-all duration-500"
    >
      <Link href={`/packages/${pkg.slug}`} className="block">
        <div className="relative h-44 sm:h-48 overflow-hidden">
          <Image
            src={pkg.heroImage}
            alt={`${pkg.name} tour package`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
          <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 bg-gold text-navy text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            <Award className="w-3.5 h-3.5" /> {badgeLabel}
          </span>
        </div>

        <div className="p-5">
          <h3 className="font-display text-lg sm:text-xl font-bold leading-snug text-navy mb-2.5 line-clamp-2">{pkg.name}</h3>

          <div className="flex items-center gap-3.5 text-xs text-navy/50 mb-3">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue" /> {pkg.durationLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue" /> {pkg.state || pkg.country}
            </span>
          </div>

          <p className="text-sm text-navy/55 leading-relaxed line-clamp-2 mb-4">
            {pkg.highlights.slice(0, 2).join(" & ")}.
          </p>

          <div className="flex items-baseline gap-1.5 mb-4 pt-4 border-t border-navy/8">
            <span className="text-xs text-navy/45">From</span>
            <span className="font-display font-bold text-2xl text-navy">₹{pkg.price.toLocaleString("en-IN")}</span>
            <span className="text-xs text-navy/45">/ person</span>
          </div>

          <span className="flex items-center justify-center gap-2 w-full bg-navy group-hover:bg-navy-dark text-white font-semibold rounded-xl py-3 text-sm transition-colors">
            Enquire Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
