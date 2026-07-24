"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, Calendar, Users, Wallet, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site";

const inputClass =
  "w-full bg-white border border-navy/15 rounded-xl pl-11 pr-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-sky focus:border-transparent transition-all";

export default function BookingForm({ destination = "", variant = "light", title = "Plan Your Trip", subtitle = "Fill in your details and our travel expert will get back to you within 24 hours." }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-10 px-4">
        <CheckCircle2 className="w-14 h-14 text-sky mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-navy mb-2">Thank You!</h3>
        <p className="text-navy/60">
          Your enquiry has been received. Our travel expert will contact you shortly at{" "}
          <span className="font-semibold text-navy">{siteConfig.phone}</span> or via email.
        </p>
      </div>
    );
  }

  return (
    <div className={variant === "light" ? "bg-white rounded-3xl p-6 sm:p-8 luxury-shadow" : "glass rounded-3xl p-6 sm:p-8"}>
      {title && (
        <div className="mb-6">
          <h3 className={`font-display text-2xl font-bold ${variant === "light" ? "text-navy" : "text-white"}`}>{title}</h3>
          {subtitle && <p className={`text-sm mt-2 ${variant === "light" ? "text-navy/60" : "text-white/70"}`}>{subtitle}</p>}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <User className="w-4 h-4 text-navy/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input required name="name" placeholder="Full Name" className={inputClass} />
        </div>
        <div className="relative">
          <Phone className="w-4 h-4 text-navy/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input required name="phone" type="tel" placeholder="Phone Number" className={inputClass} />
        </div>
        <div className="relative">
          <Phone className="w-4 h-4 text-navy/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input name="whatsapp" type="tel" placeholder="WhatsApp Number" className={inputClass} />
        </div>
        <div className="relative">
          <Mail className="w-4 h-4 text-navy/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input required name="email" type="email" placeholder="Email Address" className={inputClass} />
        </div>
        <div className="relative">
          <Calendar className="w-4 h-4 text-navy/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input name="travelDate" type="date" className={inputClass} />
        </div>
        <div className="relative">
          <Users className="w-4 h-4 text-navy/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input name="adults" type="number" min="1" placeholder="No. of Adults" className={inputClass} />
        </div>
        <div className="relative">
          <Users className="w-4 h-4 text-navy/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input name="children" type="number" min="0" placeholder="No. of Children" className={inputClass} />
        </div>
        <div className="relative">
          <Wallet className="w-4 h-4 text-navy/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <select name="budget" defaultValue="" className={inputClass + " appearance-none"}>
            <option value="" disabled>Budget Range</option>
            <option>Under ₹20,000</option>
            <option>₹20,000 - ₹50,000</option>
            <option>₹50,000 - ₹1,00,000</option>
            <option>Above ₹1,00,000</option>
          </select>
        </div>
        <input type="hidden" name="destination" value={destination} />
        <div className="relative sm:col-span-2">
          <MessageSquare className="w-4 h-4 text-navy/40 absolute left-4 top-4" />
          <textarea
            name="message"
            rows={3}
            placeholder={destination ? `Tell us more about your ${destination} trip plans...` : "Tell us more about your trip plans..."}
            className={inputClass + " pt-3 resize-none"}
          />
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-dark text-white font-semibold rounded-xl py-3.5 transition-colors shadow-lg shadow-navy/25"
        >
          <Send className="w-4 h-4" /> Send Enquiry
        </motion.button>
      </form>
    </div>
  );
}
