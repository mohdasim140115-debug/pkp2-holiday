import LegalPageTemplate from "@/components/shared/LegalPageTemplate";
import { siteConfig } from "@/lib/site";
import { applySeoOverride } from "@/lib/seo";

export async function generateMetadata() {
  const { title, description } = applySeoOverride("/terms-and-conditions", {
    title: "Terms & Conditions",
    description: "Read the terms and conditions governing the use of PKP Holidays' website and travel booking services.",
  });

  return {
    title,
    description,
    alternates: { canonical: "/terms-and-conditions" },
  };
}

const sections = [
  {
    heading: "1. Acceptance of Terms",
    paragraphs: [
      `By accessing or using the ${siteConfig.name} website and services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.`,
    ],
  },
  {
    heading: "2. Booking & Payments",
    paragraphs: ["All bookings are subject to availability and confirmation."],
    list: [
      "A booking is confirmed only after receipt of the applicable advance payment",
      "Full payment must be made as per the schedule communicated at the time of booking",
      "Prices are subject to change until full payment is received and the booking is confirmed",
    ],
  },
  {
    heading: "3. Traveler Responsibilities",
    paragraphs: [
      "Travelers are responsible for ensuring they hold valid travel documents, including passports, visas and any required vaccination certificates, for their trip.",
    ],
  },
  {
    heading: "4. Changes to Itinerary",
    paragraphs: [
      "While we make every effort to operate tours as planned, itineraries may be modified due to weather, local conditions, or circumstances beyond our control, without prior notice, in the interest of traveler safety and comfort.",
    ],
  },
  {
    heading: "5. Liability",
    paragraphs: [
      `${siteConfig.name} acts as an intermediary between travelers and third-party service providers (hotels, airlines, transport operators). We are not liable for any loss, injury, delay or damage caused by the acts of these third parties.`,
    ],
  },
  {
    heading: "6. Governing Law",
    paragraphs: [
      "These Terms & Conditions are governed by the laws of India, and any disputes shall be subject to the jurisdiction of the courts in Ranchi, Jharkhand.",
    ],
  },
  {
    heading: "7. Contact Us",
    paragraphs: [`For questions about these Terms & Conditions, contact us at ${siteConfig.email} or ${siteConfig.phone}.`],
  },
];

export default function TermsPage() {
  return <LegalPageTemplate title="Terms & Conditions" updatedOn="January 1, 2026" sections={sections} href="/terms-and-conditions" />;
}
