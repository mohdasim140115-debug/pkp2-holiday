"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X, Percent, Clock, ShieldCheck } from "lucide-react";
import BookingForm from "@/components/shared/BookingForm";
import { siteConfig } from "@/lib/site";

export default function StickyBookingCard({ pkg }) {
  const [open, setOpen] = useState(false);
  const discount = Math.round(100 - (pkg.price / pkg.originalPrice) * 100);

  return (
    <>
      <div className="bg-white rounded-3xl ring-1 ring-navy/8 luxury-shadow-lg p-6 sm:p-7 sticky top-28">
        <div className="flex items-end justify-between mb-1">
          <div>
            <span className="text-xs font-medium text-navy/50">Starting from</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-display text-4xl font-bold text-navy">₹{pkg.price.toLocaleString("en-IN")}</span>
              <span className="text-sm text-navy/40 line-through">₹{pkg.originalPrice.toLocaleString("en-IN")}</span>
            </div>
            <span className="text-xs text-navy/50">per person</span>
          </div>
          {discount > 0 && (
            <span className="inline-flex items-center gap-1 bg-gold/15 text-navy text-xs font-bold px-2.5 py-1 rounded-full">
              <Percent className="w-3 h-3" /> {discount}% OFF
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 my-5 text-xs">
          <div className="bg-offwhite rounded-xl p-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky" />
            <span className="text-navy/70 font-medium">{pkg.durationLabel}</span>
          </div>
          <div className="bg-offwhite rounded-xl p-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky" />
            <span className="text-navy/70 font-medium">Best Price Guarantee</span>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="w-full bg-navy hover:bg-navy-dark text-white font-semibold rounded-xl py-3.5 transition-colors shadow-lg shadow-navy/25 mb-3"
        >
          Enquire Now
        </button>
        <div className="grid grid-cols-2 gap-3">
          <a href={`tel:${siteConfig.phoneRaw}`} className="inline-flex items-center justify-center gap-2 border-2 border-navy/15 text-navy rounded-xl py-3 text-sm font-semibold hover:border-navy transition-colors">
            <Phone className="w-4 h-4" /> Call
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.name} tour package.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#128C7E] rounded-xl py-3 text-sm font-semibold hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy-dark/70 flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-navy/5 text-navy flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
              <BookingForm destination={pkg.name} title={`Enquire About ${pkg.name}`} subtitle="Fill in your details and our expert will contact you shortly." />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
