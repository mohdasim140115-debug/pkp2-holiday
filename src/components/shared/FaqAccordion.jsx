"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import clsx from "clsx";

export default function FaqAccordion({ faqs, defaultOpen = 0, compact = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={compact ? "space-y-2.5" : "space-y-3.5"}>
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={clsx(
              "group relative rounded-2xl overflow-hidden transition-all duration-300",
              isOpen ? "bg-navy luxury-shadow-lg" : "bg-white ring-1 ring-navy/10 hover:ring-navy/20 hover:-translate-y-0.5 luxury-shadow"
            )}
          >
            {isOpen && <span className="absolute left-0 top-0 bottom-0 w-1 bg-sky" />}
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className={clsx(
                "w-full flex items-center gap-4 sm:gap-5 text-left px-5 sm:px-7",
                compact ? "py-3.5" : "py-5"
              )}
              aria-expanded={isOpen}
            >
              <span
                className={clsx(
                  "hidden sm:flex shrink-0 items-center justify-center rounded-full text-xs font-bold font-display transition-colors",
                  compact ? "w-7 h-7" : "w-9 h-9",
                  isOpen ? "bg-sky/20 text-sky" : "bg-offwhite text-navy/40"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={clsx("flex-1 font-semibold text-sm sm:text-base transition-colors", isOpen ? "text-white" : "text-navy")}>
                {faq.q}
              </span>
              <span
                className={clsx(
                  "shrink-0 flex items-center justify-center rounded-full transition-all duration-300",
                  compact ? "w-7 h-7" : "w-9 h-9",
                  isOpen ? "rotate-45 bg-sky text-white" : "bg-offwhite text-navy group-hover:bg-sky/10 group-hover:text-sky"
                )}
              >
                <Plus className="w-4 h-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className={clsx("px-5 sm:px-7 sm:pl-19 text-sm sm:text-base text-white/70 leading-relaxed", compact ? "pb-4" : "pb-6")}>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
