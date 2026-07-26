import { Suspense } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BookingForm from "@/components/shared/BookingForm";
import FadeIn from "@/components/ui/FadeIn";
import { siteConfig, fullAddress } from "@/lib/site";
import { applySeoOverride } from "@/lib/seo";

export async function generateMetadata() {
  const { title, description } = applySeoOverride("/contact", {
    title: "Contact Us",
    description: "Get in touch with PKP Holidays for tour bookings, hotel reservations, flight tickets and visa assistance. Call, WhatsApp or visit our Ranchi office.",
  });

  return {
    title,
    description,
    alternates: { canonical: "/contact" },
  };
}

const contactCards = [
  { icon: Phone, title: "Call Us", value: siteConfig.phone, href: `tel:${siteConfig.phoneRaw}` },
  { icon: Mail, title: "Email Us", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPin, title: "Visit Us", value: fullAddress, href: siteConfig.mapEmbed },
  { icon: Clock, title: "Working Hours", value: "Mon - Sat: 9:30 AM - 7:30 PM", href: null },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to help you plan your next unforgettable trip. Reach out to our travel experts today."
        image="/destinations/rishikesh.jpg"
        breadcrumbItems={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="bg-white pt-14 sm:pt-16 pb-16 sm:pb-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactCards.map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.08} className="bg-offwhite rounded-3xl p-6 text-center">
                <span className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center mx-auto mb-4">
                  <c.icon className="w-5 h-5" />
                </span>
                <h3 className="font-semibold text-navy mb-1.5">{c.title}</h3>
                {c.href ? (
                  <a href={c.href} target={c.title === "Visit Us" ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm text-navy/60 hover:text-blue">
                    {c.value}
                  </a>
                ) : (
                  <p className="text-sm text-navy/60">{c.value}</p>
                )}
              </FadeIn>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <FadeIn className="lg:col-span-6" y={20}>
              <SectionHeading eyebrow="Get In Touch" title="Send Us a Message" align="left" className="mb-6" />
              <Suspense fallback={null}>
                <BookingForm title="" subtitle="" />
              </Suspense>
            </FadeIn>
            <FadeIn className="lg:col-span-6" y={20} delay={0.1}>
              <div className="rounded-3xl overflow-hidden luxury-shadow h-full min-h-105">
                <iframe
                  title="PKP Holidays office location"
                  src={siteConfig.mapEmbed}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
