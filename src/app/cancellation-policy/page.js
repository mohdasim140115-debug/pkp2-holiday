import LegalPageTemplate from "@/components/shared/LegalPageTemplate";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Cancellation Policy",
  description: "Understand PKP Holidays' cancellation policy, including timelines and charges applicable to tour, hotel and flight bookings.",
  alternates: { canonical: "/cancellation-policy" },
};

const sections = [
  {
    heading: "1. Cancellation by Traveler",
    paragraphs: ["Cancellation charges vary based on how far in advance you cancel your booking prior to the travel date:"],
    list: [
      "45+ days before travel: 10% of total tour cost",
      "30 - 44 days before travel: 25% of total tour cost",
      "15 - 29 days before travel: 50% of total tour cost",
      "Less than 15 days before travel: 100% of total tour cost (non-refundable)",
    ],
  },
  {
    heading: "2. Third-Party Cancellation Charges",
    paragraphs: [
      "Hotel, airline and other third-party bookings may carry their own separate cancellation policies, which will apply in addition to our cancellation charges above.",
    ],
  },
  {
    heading: "3. Cancellation by PKP Holidays",
    paragraphs: [
      `In rare cases where ${siteConfig.name} needs to cancel a confirmed tour due to circumstances beyond our control, we will offer an alternate date, an alternate package of equal value, or a full refund as applicable.`,
    ],
  },
  {
    heading: "4. How to Cancel",
    paragraphs: [
      `To cancel a booking, please contact us in writing via email at ${siteConfig.email} or call us at ${siteConfig.phone}. Cancellation requests are processed based on the date and time the request is received.`,
    ],
  },
];

export default function CancellationPolicyPage() {
  return <LegalPageTemplate title="Cancellation Policy" updatedOn="January 1, 2026" sections={sections} href="/cancellation-policy" />;
}
