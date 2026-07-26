import PageHero from "@/components/shared/PageHero";
import Container from "@/components/ui/Container";
import FaqAccordion from "@/components/shared/FaqAccordion";
import ContactCta from "@/components/home/ContactCta";
import { siteFaqs } from "@/lib/data/content";
import { siteConfig } from "@/lib/site";
import { applySeoOverride } from "@/lib/seo";

export async function generateMetadata() {
  const { title, description } = applySeoOverride("/faq", {
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about booking, payments, cancellations, visa assistance and more at PKP Holidays.",
  });

  return {
    title,
    description,
    alternates: { canonical: "/faq" },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: siteFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about planning and booking your trip with PKP Holidays."
        image="/destinations/shirdi.jpg"
        breadcrumbItems={[{ label: "FAQ", href: "/faq" }]}
      />
      <Container className="py-14 sm:py-16 max-w-3xl">
        <FaqAccordion faqs={siteFaqs} />
        <p className="text-center text-navy/60 text-sm mt-10">
          Still have questions? Call us at <a href={`tel:${siteConfig.phoneRaw}`} className="text-blue font-semibold">{siteConfig.phone}</a> or{" "}
          <a href="/contact" className="text-blue font-semibold">contact us here</a>.
        </p>
      </Container>
      <ContactCta />
    </>
  );
}
