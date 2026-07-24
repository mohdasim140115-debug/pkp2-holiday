"use client";
import { useRef } from "react";
import clsx from "clsx";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PackageCard from "@/components/shared/PackageCard";
import Button from "@/components/ui/Button";

export default function PackagesShowcase({
  eyebrow,
  title,
  packages,
  viewAllHref = "/packages",
  bg = "bg-white",
  tight = false,
}) {
  const scrollerRef = useRef(null);

  function scrollByCard(dir) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const amount = card ? card.offsetWidth + 24 : 300;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section className={clsx(bg, tight ? "pt-10 sm:pt-14 pb-10 sm:pb-14" : "py-16 sm:py-24", "overflow-hidden")}>
      <Container>
        <div className="flex flex-col items-center text-center gap-5">
          <SectionHeading eyebrow={eyebrow} title={title} align="center" className="mb-0" />
          <Button href={viewAllHref} variant="outline" size="sm" icon={ArrowRight} className="mb-4">
            View All
          </Button>
        </div>
      </Container>

      <div className="relative">
        <Container className="px-0! sm:px-6! lg:px-10!">
          <div
            ref={scrollerRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-px-4 sm:scroll-px-0 px-4 sm:px-0 pb-2 scrollbar-none"
            style={{ touchAction: "pan-x" }}
          >
            {packages.map((pkg, i) => (
              <div key={pkg.slug} data-card className="snap-start shrink-0 w-[78vw] sm:w-72 lg:w-80">
                <PackageCard pkg={pkg} index={i} />
              </div>
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
