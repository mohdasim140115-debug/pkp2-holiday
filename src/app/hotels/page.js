import { Hotel, BedDouble, Wallet, ShieldCheck, MessageSquareText, Search, CalendarCheck, ThumbsUp } from "lucide-react";
import ServicePageTemplate from "@/components/shared/ServicePageTemplate";
import { applySeoOverride } from "@/lib/seo";

export async function generateMetadata() {
  const { title, description } = applySeoOverride("/hotels", {
    title: "Hotel Booking — Handpicked Stays Worldwide",
    description: "Book handpicked hotels and resorts worldwide with PKP Holidays — from cozy boutique stays to 5-star luxury resorts, at the best available rates.",
  });

  return {
    title,
    description,
    alternates: { canonical: "/hotels" },
  };
}

const features = [
  { title: "Handpicked Properties", desc: "Every hotel is personally vetted for quality, location and service.", icon: Hotel },
  { title: "Best Rate Guarantee", desc: "Competitive pricing with no hidden charges on every booking.", icon: Wallet },
  { title: "Flexible Room Options", desc: "From budget rooms to luxury suites, choose what fits your trip.", icon: BedDouble },
  { title: "Verified & Secure", desc: "Safe, secure bookings backed by dedicated customer support.", icon: ShieldCheck },
];

const process = [
  { title: "Share Requirements", desc: "Tell us your destination, dates and preferred hotel category.", icon: MessageSquareText },
  { title: "We Shortlist Options", desc: "Get 2-3 handpicked hotel options that match your budget.", icon: Search },
  { title: "Confirm & Book", desc: "Choose your favorite and we'll confirm your reservation instantly.", icon: CalendarCheck },
  { title: "Enjoy Your Stay", desc: "Check in stress-free with 24/7 support throughout your stay.", icon: ThumbsUp },
];

const faqs = [
  { q: "Can I book hotels without a full tour package?", a: "Yes, PKP Holidays offers standalone hotel bookings for any destination, with or without a complete tour package." },
  { q: "Do you offer discounts on hotel bookings?", a: "Yes, we negotiate special rates with our partner hotels and pass on the savings to you." },
  { q: "Can I request specific hotel categories?", a: "Absolutely — let us know your preferred star category, location and amenities and we'll find the best match." },
  { q: "Is free cancellation available?", a: "Cancellation policies vary by hotel and rate plan; we'll clearly share the applicable policy before you confirm your booking." },
];

export default function HotelsPage() {
  return (
    <ServicePageTemplate
      title="Hotel Booking"
      subtitle="Handpicked stays across the globe, from boutique properties to 5-star luxury resorts, at the best available rates."
      image="/destinations/udaipur.jpg"
      breadcrumbLabel="Hotels"
      breadcrumbHref="/hotels"
      features={features}
      process={process}
      faqs={faqs}
      formTitle="Book Your Hotel Stay"
    />
  );
}
