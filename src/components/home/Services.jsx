"use client";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/data/content";

const accents = [
  { tint: "bg-navy/10", text: "text-navy", bar: "bg-navy" },
  { tint: "bg-blue/10", text: "text-blue", bar: "bg-blue" },
  { tint: "bg-sky/15", text: "text-sky-700", bar: "bg-sky" },
  { tint: "bg-gold/20", text: "text-amber-700", bar: "bg-gold" },
];

export default function Services() {
  return (
    <section className="bg-offwhite pt-10 sm:pt-14 pb-16 sm:pb-24">
      <Container>
        <SectionHeading eyebrow="Our Services" title="Everything You Need For A Perfect Trip" maxWidth="max-w-4xl" nowrap />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="group relative flex flex-col h-full bg-white rounded-2xl p-6 luxury-shadow ring-1 ring-navy/8 hover:-translate-y-1.5 hover:luxury-shadow-lg transition-all duration-400 overflow-hidden"
                >
                  <span className={`absolute top-0 left-0 right-0 h-1 ${accent.bar}`} />

                  <div className="relative flex items-start justify-between mb-5">
                    <span className={`w-13 h-13 rounded-2xl ${accent.tint} ${accent.text} flex items-center justify-center transition-transform duration-400 group-hover:scale-110`}>
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className={`w-8 h-8 rounded-full ${accent.tint} flex items-center justify-center ${accent.text} group-hover:bg-navy group-hover:text-white transition-all duration-400`}>
                      <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-400" />
                    </span>
                  </div>

                  <h3 className="relative font-display font-bold text-lg text-navy mb-1.5">{service.title}</h3>
                  <p className="relative text-sm text-navy/60 leading-relaxed">{service.desc}</p>

                  <span className={`relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${accent.text}`}>
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
