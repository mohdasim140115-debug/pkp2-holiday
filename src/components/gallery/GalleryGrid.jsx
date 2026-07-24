"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryGrid({ images }) {
  const [index, setIndex] = useState(null);

  function next(e) {
    e?.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  }
  function prev(e) {
    e?.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
            onClick={() => setIndex(i)}
            className="relative block w-full mb-4 rounded-2xl overflow-hidden break-inside-avoid group"
          >
            <Image src={img.src} alt={img.alt} width={500} height={500} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-navy-dark/95 flex items-center justify-center p-4"
            onClick={() => setIndex(null)}
          >
            <button aria-label="Close" className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
            <button aria-label="Previous" onClick={prev} className="absolute left-4 sm:left-8 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-3xl h-[75vh]" onClick={(e) => e.stopPropagation()}>
              <Image src={images[index].src} alt={images[index].alt} fill sizes="90vw" className="object-contain" />
            </motion.div>
            <button aria-label="Next" onClick={next} className="absolute right-4 sm:right-8 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center">
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
