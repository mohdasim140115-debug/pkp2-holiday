"use client";
import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe2, Flag, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { packages } from "@/lib/data/packages";

export default function PopularDestinations() {
  const [tab, setTab] = useState("domestic");
  const scrollerRef = useRef(null);

  const list = useMemo(() => {
    return packages
      .filter((p) => p.type === tab)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);
  }, [tab]);

  function scrollByCard(dir) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const amount = card ? card.offsetWidth + 20 : 280;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section className="bg-offwhite pt-16 sm:pt-24 pb-10 sm:pb-14 overflow-hidden">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="Where To Next"
            title="Popular Destinations, India & Beyond"
            subtitle="From the snow-capped Himalayas to tropical island escapes — discover the destinations our travelers love most."
            align="left"
            className="mb-0"
          />

          <div className="flex items-center gap-3 shrink-0">
            {[
              { key: "domestic", label: "India", icon: Flag },
              { key: "international", label: "International", icon: Globe2 },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  tab === key ? "bg-navy text-white shadow-lg shadow-navy/25" : "bg-white text-navy/60 hover:text-navy"
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>
        </div>
      </Container>

      <div className="relative">
        <Container className="px-0! sm:px-6! lg:px-10!">
          <div
            ref={scrollerRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-px-4 sm:scroll-px-0 px-4 sm:px-0 pb-2 scrollbar-none"
            style={{ touchAction: "pan-x" }}
          >
            {list.map((pkg, i) => (
              <motion.div
                key={pkg.slug}
                data-card
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 5) * 0.06 }}
                className="snap-start shrink-0 w-[68vw] sm:w-65 lg:w-70"
              >
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="group relative block rounded-2xl overflow-hidden h-64 sm:h-72 luxury-shadow"
                >
                  <Image
                    src={pkg.heroImage}
                    alt={`${pkg.name} destination`}
                    fill
                    sizes="(max-width: 768px) 70vw, 280px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-dark/90 via-navy-dark/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-display font-bold text-base sm:text-lg">{pkg.name}</p>
                    <p className="text-white/70 text-xs">{pkg.state || pkg.country}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>

        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Scroll left"
          className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-navy items-center justify-center luxury-shadow hover:bg-navy hover:text-white transition-colors z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Scroll right"
          className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-navy items-center justify-center luxury-shadow hover:bg-navy hover:text-white transition-colors z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
