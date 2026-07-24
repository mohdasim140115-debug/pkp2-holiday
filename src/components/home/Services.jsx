"use client";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/data/content";

const accents = [
  { tint: "bg-navy/10", text: "text-navy", ring: "group-hover:ring-navy/20", hoverBg: "group-hover:bg-navy", bar: "bg-navy" },
  { tint: "bg-blue/10", text: "text-blue", ring: "group-hover:ring-blue/20", hoverBg: "group-hover:bg-blue", bar: "bg-blue" },
  { tint: "bg-sky/10", text: "text-sky", ring: "group-hover:ring-sky/20", hoverBg: "group-hover:bg-sky", bar: "bg-sky" },
  { tint: "bg-gold/15", text: "text-gold", ring: "group-hover:ring-gold/30", hoverBg: "group-hover:bg-gold", bar: "bg-gold" },
];

export default function Services() {
  return (
    <section className="bg-offwhite pt-10 sm:pt-14 pb-16 sm:pb-24">
      <Container>
        <SectionHeading eyebrow="Our Services" title="Everything You Need For A Perfect Trip" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = Icons[service.icon] || Icons.Sparkles;
            const accent = accents[i % accents.length];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="h-full"
              >
                <Link
                  href={service.href}
                  className={`group relative flex flex-col h-full bg-white rounded-2xl p-5 luxury-shadow ring-1 ring-navy/5 ${accent.ring} hover:-translate-y-1 hover:luxury-shadow-lg transition-all duration-400 overflow-hidden`}
                >
                  <span className={`absolute -top-8 -right-8 w-24 h-24 rounded-full ${accent.tint} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`} />

                  <div className="relative flex items-start justify-between mb-4">
                    <span className={`w-11 h-11 rounded-xl ${accent.tint} ${accent.text} flex items-center justify-center transition-transform duration-400 group-hover:scale-110`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className={`w-7 h-7 rounded-full border border-navy/10 flex items-center justify-center text-navy/40 ${accent.hoverBg} group-hover:text-white group-hover:border-transparent transition-all duration-400`}>
                      <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-400" />
                    </span>
                  </div>

                  <h3 className="relative font-display font-bold text-base text-navy mb-1">{service.title}</h3>
                  <p className="relative text-xs text-navy/60 leading-relaxed mb-3">{service.desc}</p>

                  <span className={`relative mt-auto inline-flex items-center gap-1.5 text-xs font-semibold ${accent.text}`}>
                    Explore
                    <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>

                  <span className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full ${accent.bar} transition-all duration-500`} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
