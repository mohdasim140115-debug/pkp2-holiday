"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

export default function PackageGallery({ images, name }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  function openAt(i) {
    setIndex(i);
    setOpen(true);
  }
  function next() {
    setIndex((i) => (i + 1) % images.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 sm:gap-3 h-[320px] sm:h-[420px] rounded-3xl overflow-hidden">
        {images.slice(0, 5).map((src, i) => (
          <button
            key={src}
            onClick={() => openAt(i)}
            className={`relative overflow-hidden group ${i === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}`}
          >
            <Image src={src} alt={`${name} photo ${i + 1}`} fill sizes="400px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
            {i === 4 && images.length > 5 && (
              <div className="absolute inset-0 bg-navy-dark/60 flex items-center justify-center gap-2 text-white text-sm font-semibold">
                <Images className="w-4 h-4" /> +{images.length - 5} Photos
              </div>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy-dark/95 flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <button aria-label="Close gallery" className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
            <button
              aria-label="Previous photo"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 sm:left-8 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-4xl h-[70vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[index]} alt={`${name} photo ${index + 1}`} fill sizes="90vw" className="object-contain" />
            </motion.div>
            <button
              aria-label="Next photo"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 sm:right-8 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="absolute bottom-6 text-white/70 text-sm">{index + 1} / {images.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
