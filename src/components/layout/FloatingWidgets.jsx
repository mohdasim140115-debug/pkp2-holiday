"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function FloatingWidgets() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop stacked floating actions */}
      <div className="fixed z-40 bottom-24 sm:bottom-8 right-4 sm:right-6 flex flex-col items-end gap-3">
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="w-11 h-11 rounded-full bg-navy text-white shadow-lg flex items-center justify-center hover:bg-navy-dark transition-colors"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hi PKP Holidays, I'd like to know more about your tour packages.")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform animate-float"
        >
          <MessageCircle className="w-7 h-7" fill="white" strokeWidth={0} />
        </a>

        <a
          href={`tel:${siteConfig.phoneRaw}`}
          aria-label="Call PKP Holidays"
          className="hidden sm:flex w-14 h-14 rounded-full bg-navy text-white shadow-xl items-center justify-center hover:scale-110 transition-transform"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      {/* Mobile sticky enquiry bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 gap-px bg-navy/10">
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="bg-navy text-white flex items-center justify-center gap-2 py-3.5 text-sm font-semibold"
        >
          <Phone className="w-4 h-4" /> Call Now
        </a>
        <a
          href={`https://wa.me/${siteConfig.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white flex items-center justify-center gap-2 py-3.5 text-sm font-semibold"
        >
          <MessageCircle className="w-4 h-4" fill="white" strokeWidth={0} /> WhatsApp
        </a>
      </div>
    </>
  );
}
