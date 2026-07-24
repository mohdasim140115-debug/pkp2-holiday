import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export default function ContactCta() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <Image src="/destinations/maldives.jpg" alt="Maldives — start planning your dream journey with PKP Holidays" fill quality={90} className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-navy-dark/95 via-navy-dark/70 to-navy-dark/55" />
      <Container className="relative text-center">
        <span className="inline-flex items-center gap-2 glass text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-6">
          Let&apos;s Plan Your Next Journey
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white max-w-2xl mx-auto leading-tight">
          Your Dream Vacation Is Just One Call Away
        </h2>
        <p className="text-white/70 max-w-xl mx-auto mt-5 text-base sm:text-lg">
          Speak to our travel experts today and let us craft a personalized itinerary that matches your dreams and budget.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-9">
          <Button href="/contact" variant="accent" size="lg">Get a Free Quote</Button>
          <Button href={`tel:${siteConfig.phoneRaw}`} variant="glass" size="lg" icon={Phone} iconPosition="left">
            {siteConfig.phone}
          </Button>
        </div>
      </Container>
    </section>
  );
}
