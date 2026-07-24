import Image from "next/image";
import { PlayCircle } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RatingStars from "@/components/ui/RatingStars";
import ContactCta from "@/components/home/ContactCta";
import FadeIn from "@/components/ui/FadeIn";
import { testimonials, videoTestimonials } from "@/lib/data/content";

export const metadata = {
  title: "Testimonials — What Our Travelers Say",
  description: "Read real reviews and testimonials from thousands of happy PKP Holidays travelers across India and around the world.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        title="Traveler Testimonials"
        subtitle="Real stories from thousands of happy travelers who trusted PKP Holidays with their journeys."
        image="/destinations/goa.jpg"
        breadcrumbItems={[{ label: "Testimonials", href: "/testimonials" }]}
      />

      <section className="bg-white pt-14 sm:pt-16 pb-16 sm:pb-24">
        <Container>
          <SectionHeading eyebrow="Video Stories" title="Hear It From Our Travelers" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
            {videoTestimonials.map((v, i) => (
              <FadeIn key={v.name} delay={i * 0.1} className="group relative rounded-3xl overflow-hidden h-64 luxury-shadow">
                <Image src={v.thumbnail} alt={v.trip} fill sizes="400px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-navy-dark/45 flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <p className="font-semibold">{v.name}</p>
                  <p className="text-xs text-white/70">{v.trip}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <SectionHeading eyebrow="Reviews" title="What Our Travelers Are Saying" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={(i % 3) * 0.08} className="bg-offwhite rounded-3xl p-7">
                <RatingStars rating={t.rating} size={15} className="mb-4" />
                <p className="text-navy/70 text-sm leading-relaxed mb-6">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <Image src={t.avatar} alt={t.name} width={44} height={44} className="rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-navy text-sm">{t.name}</p>
                    <p className="text-xs text-navy/50">{t.location} • {t.trip}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
