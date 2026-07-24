import Image from "next/image";
import { HeartHandshake, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Stats from "@/components/home/Stats";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ContactCta from "@/components/home/ContactCta";
import FadeIn from "@/components/ui/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "About Us",
  description: "Learn about PKP Holidays — a premium travel agency crafting customized domestic & international tour packages, honeymoon trips, group and corporate travel with passion and care.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Passion for Travel", desc: "Every itinerary is crafted with genuine passion for creating unforgettable experiences.", icon: HeartHandshake },
  { title: "Global Expertise", desc: "Deep destination knowledge across 120+ domestic and international locations.", icon: Globe2 },
  { title: "Trust & Transparency", desc: "Honest pricing and reliable service from planning to your safe return home.", icon: ShieldCheck },
  { title: "Personalized Care", desc: "Every trip is tailored to your preferences, budget and travel dreams.", icon: Sparkles },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About PKP Holidays"
        subtitle="Where every journey is crafted with passion, care, and unforgettable experiences."
        image="/destinations/udaipur.jpg"
        breadcrumbItems={[{ label: "About Us", href: "/about" }]}
      />

      <section className="bg-white pt-14 sm:pt-16 pb-14 sm:pb-16">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <FadeIn className="lg:col-span-6 relative" y={30}>
            <div className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden luxury-shadow-lg">
              <Image src="/destinations/kerala.jpg" alt="PKP Holidays travel experience" fill className="object-cover" />
            </div>
            <div className="hidden sm:block absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 luxury-shadow-lg max-w-[220px]">
              <p className="font-display text-3xl font-bold text-navy">12+ Years</p>
              <p className="text-navy/60 text-sm mt-1">of crafting unforgettable travel experiences across India and beyond</p>
            </div>
          </FadeIn>

          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Our Story" title="Welcome to PKP Holidays" align="left" className="mb-6" />
            <div className="space-y-4 text-navy/70 leading-relaxed">
              <p>
                Welcome to PKP Holidays, where every journey is crafted with passion, care, and unforgettable experiences.
                We believe that travel is more than just visiting new places—it&apos;s about creating lifelong memories, discovering
                new cultures, and enjoying every moment of the journey.
              </p>
              <p>
                At PKP Holidays, we specialize in providing customized domestic and international tour packages, family
                vacations, honeymoon trips, group tours, corporate travel, hotel bookings, flight tickets, visa assistance,
                and holiday planning.
              </p>
              <p>
                Our experienced team works closely with every traveler to design itineraries that suit their preferences,
                budget, and travel dreams. We are committed to delivering exceptional service, transparent pricing, and
                hassle-free travel experiences from the moment you plan your trip until you return home.
              </p>
              <p>
                Whether you&apos;re seeking adventure, relaxation, spiritual journeys, or luxury holidays, PKP Holidays ensures
                every detail is handled with professionalism and care. Our mission is to make travel simple, enjoyable, and
                accessible for everyone by offering reliable services and personalized attention.
              </p>
              <p>
                Customer satisfaction, trust, and quality remain at the heart of everything we do. Join thousands of happy
                travelers and let PKP Holidays turn your dream destinations into unforgettable memories.
              </p>
              <p className="font-display text-xl text-navy font-semibold pt-2">
                {siteConfig.name} – {siteConfig.tagline}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-offwhite pt-14 sm:pt-16 pb-16 sm:pb-24">
        <Container>
          <SectionHeading eyebrow="Our Values" title="What Drives Us Every Day" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08} className="bg-white rounded-3xl p-7 luxury-shadow">
                <span className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center mb-5">
                  <v.icon className="w-5 h-5" />
                </span>
                <h3 className="font-display font-bold text-lg text-navy mb-2">{v.title}</h3>
                <p className="text-sm text-navy/60 leading-relaxed">{v.desc}</p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <Stats />
      <WhyChooseUs />
      <ContactCta />
    </>
  );
}
