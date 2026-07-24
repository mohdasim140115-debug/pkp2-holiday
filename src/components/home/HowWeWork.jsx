"use client";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { howWeWork } from "@/lib/data/content";

export default function HowWeWork() {
  return (
    <section className="bg-offwhite py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="How We Work" title="Your Dream Trip, In Four Simple Steps" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {howWeWork.map((step, i) => {
            const Icon = Icons[step.icon] || Icons.Sparkles;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-white rounded-3xl p-7 luxury-shadow"
              >
                <span className="absolute top-5 right-6 font-display text-4xl font-bold text-navy/[0.06]">{step.step}</span>
                <span className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="font-display font-bold text-lg text-navy mb-2">{step.title}</h3>
                <p className="text-sm text-navy/60 leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
