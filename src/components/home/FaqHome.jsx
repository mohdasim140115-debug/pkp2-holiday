import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqAccordion from "@/components/shared/FaqAccordion";
import { siteFaqs } from "@/lib/data/content";

export default function FaqHome() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        <FaqAccordion faqs={siteFaqs.slice(0, 6)} />
      </Container>
    </section>
  );
}
