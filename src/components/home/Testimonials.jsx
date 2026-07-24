"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, PlayCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RatingStars from "@/components/ui/RatingStars";
import { testimonials, videoTestimonials } from "@/lib/data/content";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  function next() {
    setIndex((i) => (i + 1) % testimonials.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }

  return (
    <section className="bg-offwhite py-16 sm:py-24 overflow-hidden">
      <Container>
        <SectionHeading eyebrow="Testimonials" title="Loved By Thousands of Happy Travelers" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-16">
          <div className="lg:col-span-7 bg-white rounded-3xl luxury-shadow p-8 sm:p-10 relative overflow-hidden">
            <Quote className="w-14 h-14 text-sky/15 absolute top-6 right-8" />
            <AnimatePresence mode="wait">
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <RatingStars rating={t.rating} size={18} className="mb-5" />
                <p className="text-navy/80 text-lg sm:text-xl leading-relaxed font-display mb-8">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <Image src={t.avatar} alt={t.name} width={52} height={52} className="rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-navy">{t.name}</p>
                    <p className="text-xs text-navy/50">{t.location} • {t.trip}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-3 mt-8">
              <button onClick={prev} aria-label="Previous testimonial" className="w-10 h-10 rounded-full bg-navy/5 hover:bg-navy hover:text-white flex items-center justify-center transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={next} aria-label="Next testimonial" className="w-10 h-10 rounded-full bg-navy/5 hover:bg-navy hover:text-white flex items-center justify-center transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="flex-1 flex justify-end gap-1.5">
                {testimonials.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-sky" : "w-1.5 bg-navy/15"}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden luxury-shadow min-h-70">
            <Image src="/destinations/goa.jpg" alt="Traveler video testimonial" fill className="object-cover" />
            <div className="absolute inset-0 bg-navy-dark/40 flex items-center justify-center">
              <button aria-label="Play video testimonial" className="w-16 h-16 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                <PlayCircle className="w-9 h-9 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {videoTestimonials.map((v) => (
            <div key={v.name} className="group relative rounded-2xl overflow-hidden h-48 luxury-shadow">
              <Image src={v.thumbnail} alt={v.trip} fill sizes="400px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-navy-dark/45 flex items-center justify-center">
                <PlayCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <p className="font-semibold text-sm">{v.name}</p>
                <p className="text-xs text-white/70">{v.trip}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
