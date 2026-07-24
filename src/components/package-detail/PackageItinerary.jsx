"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

export default function PackageItinerary({ itinerary }) {
  const [open, setOpen] = useState(1);

  return (
    <div className="relative">
      {itinerary.map((day, i) => {
        const isOpen = open === day.day;
        const isLast = i === itinerary.length - 1;
        return (
          <div key={day.day} className="relative pl-14 pb-2">
            {!isLast && <span className="absolute left-[19px] top-11 bottom-0 w-px bg-navy/10" />}
            <span
              className={clsx(
                "absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm border-2",
                isOpen ? "bg-navy text-white border-navy" : "bg-white text-navy border-navy/15"
              )}
            >
              {day.day}
            </span>
            <button
              onClick={() => setOpen(isOpen ? -1 : day.day)}
              className="w-full flex items-start justify-between gap-4 text-left bg-white rounded-2xl border border-navy/10 px-5 py-4 hover:border-sky/40 transition-colors"
            >
              <div>
                <p className="text-xs font-semibold text-sky uppercase tracking-wide mb-1">Day {day.day}</p>
                <h3 className="font-display font-bold text-navy text-base sm:text-lg">{day.title}</h3>
              </div>
              <ChevronDown className={clsx("w-5 h-5 text-navy/50 shrink-0 mt-1 transition-transform", isOpen && "rotate-180")} />
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
                  <div className="bg-offwhite rounded-2xl mt-2 px-5 py-4">
                    <p className="text-sm text-navy/70 leading-relaxed mb-3">{day.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {day.activities.map((act) => (
                        <span key={act} className="inline-flex items-center gap-1.5 bg-white text-navy/70 text-xs font-medium px-3 py-1.5 rounded-full border border-navy/10">
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
