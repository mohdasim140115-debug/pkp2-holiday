"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-navy flex flex-col items-center justify-center gap-5"
        >
          <motion.svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x="24" y="6" width="16" height="9" rx="3" stroke="#F8FBFF" strokeWidth="3" fill="none" />
            <path d="M45 15.5 52 10.2c.9-.68 2.2-.02 2.2 1.1 0 .4-.16.78-.46 1.05l-5.4 5" stroke="#F8FBFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="10" y="14" width="44" height="40" rx="9" fill="#0B2E63" stroke="#F8FBFF" strokeWidth="3" />
            <g clipPath="url(#loaderClip)">
              <path d="M2 50 20 30 30 40 40 24 62 50Z" fill="#4DA8DA" opacity="0.9" />
              <path d="M2 52 15 38 24 46 34 32 62 52Z" fill="#F8FBFF" />
            </g>
            <clipPath id="loaderClip">
              <rect x="10" y="14" width="44" height="40" rx="9" />
            </clipPath>
            <circle cx="20" cy="57" r="2.6" fill="#F8FBFF" />
            <circle cx="44" cy="57" r="2.6" fill="#F8FBFF" />
          </motion.svg>
          <span className="flex items-baseline gap-1.5">
            <span className="font-display text-white text-xl font-extrabold tracking-wide">PKP</span>
            <span className="font-script text-sky text-xl">Holidays</span>
          </span>
          <div className="w-40 h-1 bg-white/15 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              className="w-1/2 h-full bg-sky rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
