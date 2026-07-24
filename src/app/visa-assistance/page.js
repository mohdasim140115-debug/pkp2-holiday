import { Stamp, FileCheck2, Clock3, ShieldCheck, MessageSquareText, FileText, Send, ThumbsUp } from "lucide-react";
import ServicePageTemplate from "@/components/shared/ServicePageTemplate";

export const metadata = {
  title: "Visa Assistance — Hassle-Free Visa Processing",
  description: "Get complete visa documentation and processing assistance for all major destinations with PKP Holidays' expert visa support team.",
  alternates: { canonical: "/visa-assistance" },
};

const features = [
  { title: "All Visa Types", desc: "Tourist, business and transit visa assistance for 100+ countries.", icon: Stamp },
  { title: "Document Checklist", desc: "A clear, customized checklist so you never miss a requirement.", icon: FileCheck2 },
  { title: "Fast Processing", desc: "We track your application and keep processing times to a minimum.", icon: Clock3 },
  { title: "Expert Guidance", desc: "Dedicated visa experts guide you through every step of the process.", icon: ShieldCheck },
];

const process = [
  { title: "Consultation", desc: "We understand your destination and travel dates to advise the right visa type.", icon: MessageSquareText },
  { title: "Document Collection", desc: "Share the required documents as per our detailed checklist.", icon: FileText },
  { title: "Application Submission", desc: "We prepare and submit your application accurately and on time.", icon: Send },
  { title: "Visa Approval", desc: "Receive your approved visa and get ready for your trip.", icon: ThumbsUp },
];

const faqs = [
  { q: "Which countries do you provide visa assistance for?", a: "We assist with visa processing for over 100 countries including UAE, Thailand, Singapore, Schengen countries, USA, UK and more." },
  { q: "How long does visa processing take?", a: "Processing times vary by country and visa type — anywhere from 48 hours for e-visas to a few weeks for regular visas. We advise the specific timeline during consultation." },
  { q: "What documents are required for a visa application?", a: "Requirements vary by destination but typically include a valid passport, photographs, proof of accommodation and travel itinerary. We provide a complete checklist for your destination." },
  { q: "Do you guarantee visa approval?", a: "Visa approval is at the sole discretion of the respective embassy/consulate. We ensure your application is complete and accurate to maximize your chances of approval." },
];

export default function VisaAssistancePage() {
  return (
    <ServicePageTemplate
      title="Visa Assistance"
      subtitle="End-to-end visa documentation and processing support for a smooth, stress-free application experience."
      image="/destinations/turkey.jpg"
      breadcrumbLabel="Visa Assistance"
      breadcrumbHref="/visa-assistance"
      features={features}
      process={process}
      faqs={faqs}
      formTitle="Get Visa Assistance"
    />
  );
}
