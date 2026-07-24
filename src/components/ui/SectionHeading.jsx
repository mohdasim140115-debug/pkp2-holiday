"use client";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className = "mb-10 sm:mb-14",
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={clsx(
            "inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3",
            light ? "text-sky" : "text-blue"
          )}
        >
          <span className="h-[2px] w-6 bg-sky inline-block" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className={clsx(
          "font-sans font-extrabold text-2xl sm:text-3xl lg:text-[2.25rem] leading-tight tracking-tight",
          light ? "text-white" : "text-navy"
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className={clsx("mt-4 text-base sm:text-lg leading-relaxed", light ? "text-white/75" : "text-navy/65")}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
