"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { travelImage } from "@/lib/images";

const categories = [
  { label: "Domestic", href: "/domestic-tours", tags: ["india", "travel"] },
  { label: "International", href: "/international-tours", tags: ["world", "city"] },
  { label: "Honeymoon", href: "/honeymoon-packages", tags: ["couple", "beach"] },
  { label: "Family", href: "/family-packages", tags: ["family", "vacation"] },
  { label: "Adventure", href: "/adventure-tours", tags: ["trekking", "adventure"] },
  { label: "Religious", href: "/religious-tours", tags: ["temple", "pilgrimage"] },
  { label: "Weekend Getaways", href: "/weekend-getaways", tags: ["weekend", "nature"] },
  { label: "Group Tours", href: "/group-tours", tags: ["group", "friends"] },
  { label: "Corporate", href: "/corporate-tours", tags: ["business", "conference"] },
  { label: "Luxury Holidays", href: "/luxury-holidays", tags: ["luxury", "resort"] },
  { label: "Wildlife", href: "/packages?category=wildlife", tags: ["wildlife", "safari"] },
  { label: "Beach Holidays", href: "/packages?category=beach", tags: ["beach", "ocean"] },
];

export default function CategoryGrid() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Tour Categories"
          title="A Holiday For Every Kind of Traveler"
          subtitle="Whichever way you love to travel, PKP Holidays has a perfectly curated category of tours designed for you."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
            >
              <Link href={cat.href} className="group relative block rounded-2xl overflow-hidden h-32 sm:h-36 luxury-shadow">
                <Image
                  src={travelImage(cat.tags, 400, 300, cat.href)}
                  alt={`${cat.label} tours`}
                  fill
                  sizes="200px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy/50 group-hover:bg-navy/65 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center p-2 text-center">
                  <span className="text-white font-semibold text-sm">{cat.label}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
