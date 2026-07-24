"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/ui/SocialIcons";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryImages, instagramPosts } from "@/lib/data/content";

export default function GalleryPreview() {
  const shots = galleryImages.slice(0, 8);
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <SectionHeading eyebrow="Travel Gallery" title="Moments Captured Around The World" align="left" className="mb-0" />
          <Link href="/gallery" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-blue shrink-0 mb-14">
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {shots.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              className={`relative rounded-2xl overflow-hidden ${i % 3 === 0 ? "row-span-2 h-[420px]" : "h-[200px]"}`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="300px" className="object-cover hover:scale-110 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-2xl text-navy flex items-center gap-2">
            <Instagram className="w-6 h-6 text-sky" /> @pkpholidays on Instagram
          </h3>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {instagramPosts.map((post, i) => (
            <a
              key={i}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <Image src={post.src} alt="Instagram post" fill sizes="150px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
