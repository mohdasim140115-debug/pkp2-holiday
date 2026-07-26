"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import clsx from "clsx";

export default function PackageItinerary({ itinerary }) {
  const [open, setOpen] = useState(1);

  return (
    <div className="relative">
      {itinerary.map((day, i) => {
        const isOpen = open === day.day;
        const isLast = i === itinerary.length - 1;
        return (
          <div key={day.day} className="relative pl-13 sm:pl-14 pb-2">
            {!isLast && <span className="absolute left-4.25 sm:left-4.75 top-9 bottom-0 w-px bg-linear-to-b from-navy/15 to-transparent" />}
            <span
              className={clsx(
                "absolute left-0 top-0 w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-display font-bold text-xs transition-all duration-300",
                isOpen
                  ? "bg-linear-to-br from-navy to-navy-dark text-white shadow-md shadow-navy/25"
                  : "bg-white text-navy ring-1 ring-navy/10"
              )}
            >
              {day.day}
            </span>
            <button
              onClick={() => setOpen(isOpen ? -1 : day.day)}
              className={clsx(
                "w-full flex items-center justify-between gap-4 text-left bg-white rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-300",
                isOpen ? "luxury-shadow-lg ring-1 ring-sky/30" : "ring-1 ring-navy/8 hover:ring-navy/20 luxury-shadow"
              )}
            >
              <div>
                <p className="text-[10px] font-bold text-sky uppercase tracking-[0.15em] mb-0.5">Day {day.day}</p>
                <h3 className="font-display font-bold text-navy text-sm sm:text-base leading-snug">{day.title}</h3>
              </div>
              <ChevronDown className={clsx("w-4 h-4 text-navy/40 shrink-0 transition-transform duration-300", isOpen && "rotate-180 text-sky")} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white/60 ring-1 ring-navy/8 rounded-xl mt-2 px-4 sm:px-5 py-3 sm:py-3.5">
                    <p className="text-xs sm:text-sm text-navy/70 leading-relaxed mb-2.5">{day.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {day.activities.map((act) => (
                        <span key={act} className="inline-flex items-center gap-1.5 bg-sky/10 text-navy text-[11px] font-semibold px-2.5 py-1 rounded-full">
                          <MapPin className="w-3 h-3 text-sky" /> {act}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
