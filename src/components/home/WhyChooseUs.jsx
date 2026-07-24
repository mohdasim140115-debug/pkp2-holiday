"use client";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { whyChooseUs } from "@/lib/data/content";

export default function WhyChooseUs() {
  return (
    <section className="bg-navy py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky/10 rounded-full blur-3xl" />
      <Container className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[420px] rounded-3xl overflow-hidden luxury-shadow-lg"
          >
            <Image src="/destinations/manali.jpg" alt="PKP Holidays travel experience" fill className="object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden sm:block absolute -bottom-6 -right-6 glass rounded-2xl p-5 w-48"
          >
            <p className="text-white font-display text-3xl font-bold">12+</p>
            <p className="text-white/70 text-xs mt-1">Years crafting unforgettable journeys</p>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Why PKP Holidays"
            title="Travel Planning Made Effortless & Personal"
            align="left"
            light
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyChooseUs.map((item, i) => {
              const Icon = Icons[item.icon] || Icons.Sparkles;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                  className="flex gap-4"
                >
                  <span className="shrink-0 w-11 h-11 rounded-xl bg-sky/15 text-sky flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
