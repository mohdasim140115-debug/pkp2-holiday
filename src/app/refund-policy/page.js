import LegalPageTemplate from "@/components/shared/LegalPageTemplate";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Refund Policy",
  description: "Learn about PKP Holidays' refund policy, processing timelines and eligibility for tour, hotel and flight bookings.",
  alternates: { canonical: "/refund-policy" },
};

const sections = [
  {
    heading: "1. Refund Eligibility",
    paragraphs: [
      "Refunds are calculated based on the amount paid, less any applicable cancellation charges as outlined in our Cancellation Policy, and less any non-refundable third-party costs already incurred (such as visa fees or non-refundable hotel deposits).",
    ],
  },
  {
    heading: "2. Refund Processing Time",
    paragraphs: [
      "Approved refunds are processed within 7-14 business days from the date of cancellation approval, and credited back to the original mode of payment.",
    ],
  },
  {
    heading: "3. Non-Refundable Items",
    paragraphs: ["The following are generally non-refundable once processed:"],
    list: [
      "Visa application fees, once submitted to the embassy/consulate",
      "Non-refundable flight tickets and special promotional fares",
      "Any third-party service charges explicitly marked as non-refundable at the time of booking",
    ],
  },
  {
    heading: "4. Refunds for Service Deficiency",
    paragraphs: [
      `If you experience a genuine service deficiency during your trip, please report it to your PKP Holidays tour manager immediately and follow up in writing to ${siteConfig.email}. We will review each case individually and offer an appropriate resolution.`,
    ],
  },
  {
    heading: "5. Contact Us",
    paragraphs: [`For refund-related queries, reach out to us at ${siteConfig.email} or ${siteConfig.phone}.`],
  },
];

export default function RefundPolicyPage() {
  return <LegalPageTemplate title="Refund Policy" updatedOn="January 1, 2026" sections={sections} href="/refund-policy" />;
}
