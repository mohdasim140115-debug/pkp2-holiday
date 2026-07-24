import LegalPageTemplate from "@/components/shared/LegalPageTemplate";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description: "Read PKP Holidays' privacy policy to understand how we collect, use and protect your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    heading: "1. Introduction",
    paragraphs: [
      `${siteConfig.name} ("we", "us", "our") values your privacy. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our website or use our travel booking services.`,
    ],
  },
  {
    heading: "2. Information We Collect",
    paragraphs: ["We may collect the following types of information when you interact with us:"],
    list: [
      "Personal details such as name, phone number, WhatsApp number and email address",
      "Travel preferences including destination, travel dates, budget and number of travelers",
      "Payment information processed securely through our payment partners",
      "Technical data such as IP address, browser type and device information",
    ],
  },
  {
    heading: "3. How We Use Your Information",
    paragraphs: ["We use the collected information to:"],
    list: [
      "Process and manage your tour, hotel, flight and visa bookings",
      "Communicate booking confirmations, updates and travel-related information",
      "Improve our website, services and customer experience",
      "Send promotional offers and newsletters, which you may opt out of at any time",
    ],
  },
  {
    heading: "4. Information Sharing",
    paragraphs: [
      "We do not sell your personal information. We may share necessary details with trusted third parties such as hotels, airlines and visa processing partners solely for the purpose of fulfilling your bookings.",
    ],
  },
  {
    heading: "5. Data Security",
    paragraphs: [
      "We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration or disclosure.",
    ],
  },
  {
    heading: "6. Your Rights",
    paragraphs: [
      "You may request access to, correction of, or deletion of your personal data by contacting us at the details below.",
    ],
  },
  {
    heading: "7. Contact Us",
    paragraphs: [`For any questions regarding this Privacy Policy, please contact us at ${siteConfig.email} or ${siteConfig.phone}.`],
  },
];

export default function PrivacyPolicyPage() {
  return <LegalPageTemplate title="Privacy Policy" updatedOn="January 1, 2026" sections={sections} href="/privacy-policy" />;
}
