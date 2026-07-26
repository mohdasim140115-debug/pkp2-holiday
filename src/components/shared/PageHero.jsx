"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/shared/Breadcrumb";

export default function PageHero({ title, subtitle, image, breadcrumbItems = [], compact = false }) {
  return (
    <section className={`relative ${compact ? "pt-32 pb-16" : "pt-32 pb-20 sm:pt-36 sm:pb-24"} overflow-hidden bg-navy-dark`}>
      <Image
        src={image || "/destinations/switzerland.jpg"}
        alt={title}
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-linear-to-t from-navy-dark via-navy-dark/65 to-navy-dark/35" />
      <div className="absolute inset-0 bg-linear-to-r from-navy-dark/70 via-transparent to-transparent" />
      <Container className="relative">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Breadcrumb items={breadcrumbItems} light />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-white text-3xl sm:text-5xl mt-5 max-w-3xl leading-[1.1] tracking-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/75 text-base sm:text-lg mt-4 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </Container>
    </section>
  );
}
