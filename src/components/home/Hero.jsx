"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, ArrowRight, Bookmark } from "lucide-react";
import Container from "@/components/ui/Container";
import RatingStars from "@/components/ui/RatingStars";
import { siteConfig } from "@/lib/site";
import { getFeaturedPackages } from "@/lib/data/packages";

const floatingCards = getFeaturedPackages(3);
const quickTabs = getFeaturedPackages(4);

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-navy-dark pt-24 sm:pt-32 pb-16 sm:pt-32">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/destinations/kashmir.jpg"
          alt="Dal Lake, Kashmir — a signature PKP Holidays destination"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/35 to-navy-dark/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/85 via-navy-dark/25 to-navy-dark/5" />

      {/* Left vertical progress rail */}
      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-10">
        {[1, 2, 3, 4].map((n) => (
          <span
            key={n}
            className={`w-2 h-2 rounded-full ${n === 1 ? "bg-gold" : "bg-white/30"}`}
          />
        ))}
        <span className="w-px h-24 bg-white/15" />
      </div>

      <Container className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 glass text-white text-xs sm:text-sm font-semibold px-3 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-sm rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold" /> India&apos;s Premium Luxury Travel Experience
            </span>
          </motion.div>

          <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans font-black uppercase text-white text-[32px] sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.02em] max-w-[360px] sm:max-w-none"
          >
            Explore More. Travel Better.
            <br />
            <span className="text-sky">Memories Forever.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/75 text-[15px] sm:text-lg max-w-xl mt-6 leading-relaxed"
          >
            PKP Holidays is a trusted travel agency crafting customized domestic & international tour packages, honeymoon escapes and luxury getaways, planned end-to-end for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-row items-center gap-3 mt-8 w-full lg:w-auto px-2 sm:px-0"
          >
            <Link
              href="/packages"
              className="inline-flex flex-1 lg:flex-none w-full lg:w-auto h-14 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gold px-6 lg:px-8 text-[13px] lg:text-base font-bold text-navy shadow-lg shadow-gold/30 transition-all"
            >
              Explore Packages
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-white">
  <ArrowRight className="w-4 h-4" />
</span>
            </Link>
            <a
  href={`https://wa.me/${siteConfig.whatsapp}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex flex-1 lg:flex-none w-full lg:w-auto h-14 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gold text-navy px-6 lg:px-8 text-[13px] lg:text-base font-bold shadow-lg shadow-gold/30 hover:brightness-95 transition-all"
>
  <MessageCircle className="w-4 h-4 text-navy" />
  WhatsApp
</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="hidden sm:flex items-center flex-wrap gap-x-3 gap-y-3 mt-14 max-w-xl"
          >
            {quickTabs.map((pkg, i) => (
              <div key={pkg.slug} className="flex items-center gap-2">
                <Link
                  href={`/packages/${pkg.slug}`}
                  className={`text-sm sm:text-base font-semibold transition-colors ${
                    i === 0 ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {pkg.name}
                </Link>
                {i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                {i < quickTabs.length - 1 && <span className="w-8 sm:w-10 h-px bg-white/25" />}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex lg:col-span-5 items-center justify-end gap-4"
        >
          {floatingCards.map((pkg, i) => (
            <motion.div
              key={pkg.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.15 }}
              className={i === 1 ? "relative z-10" : "relative"}
              style={{ width: i === 1 ? "42%" : "29%" }}
            >
              <Link href={`/packages/${pkg.slug}`} className="group block">
                <div className={`mb-3 ${i === 2 ? "text-right" : ""}`}>
                  <p className="text-white text-xs sm:text-sm font-semibold truncate">{pkg.name}</p>
                  <RatingStars rating={pkg.rating} size={11} className={i === 2 ? "justify-end" : ""} />
                </div>
                <div
                  className={`relative rounded-2xl overflow-hidden luxury-shadow-lg ring-1 ring-white/10 ${
                    i === 1 ? "h-56 sm:h-60" : "h-40 sm:h-44"
                  }`}
                >
                  <Image
                    src={pkg.heroImage}
                    alt={`${pkg.name} tour package`}
                    fill
                    sizes="220px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full glass flex items-center justify-center text-white">
                    <Bookmark className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
