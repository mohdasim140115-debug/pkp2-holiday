import { Suspense } from "react";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BookingForm from "@/components/shared/BookingForm";
import FaqAccordion from "@/components/shared/FaqAccordion";
import FadeIn from "@/components/ui/FadeIn";

export default function ServicePageTemplate({
  title,
  subtitle,
  image,
  breadcrumbLabel,
  breadcrumbHref,
  features,
  process,
  faqs,
  formTitle,
}) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} image={image} breadcrumbItems={[{ label: breadcrumbLabel, href: breadcrumbHref }]} />

      <section className="bg-white pt-14 sm:pt-16 pb-14 sm:pb-16">
        <Container>
          <SectionHeading eyebrow="What We Offer" title={`Everything You Need For ${breadcrumbLabel}`} maxWidth="max-w-4xl" nowrap />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={(i % 4) * 0.08} className="group bg-white rounded-2xl ring-1 ring-navy/8 luxury-shadow hover:luxury-shadow-lg hover:-translate-y-1 transition-all duration-400 p-6 sm:p-7">
                <span className="w-12 h-12 rounded-2xl bg-navy/10 text-navy flex items-center justify-center mb-5 transition-transform duration-400 group-hover:scale-110">
                  <f.icon className="w-5 h-5" />
                </span>
                <h3 className="font-display font-bold text-lg text-navy mb-2 leading-snug">{f.title}</h3>
                <p className="text-sm text-navy/60 leading-relaxed">{f.desc}</p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {process && (
        <section className="bg-offwhite pt-14 sm:pt-16 pb-14 sm:pb-16">
          <Container>
            <SectionHeading eyebrow="How It Works" title="Simple, Transparent Process" maxWidth="max-w-3xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((step, i) => (
                <FadeIn key={step.title} delay={(i % 4) * 0.08} className="group relative bg-white rounded-2xl ring-1 ring-navy/8 luxury-shadow hover:luxury-shadow-lg hover:-translate-y-1 transition-all duration-400 p-6 sm:p-7 overflow-hidden">
                  <span className="absolute top-4 right-5 font-display text-5xl font-bold text-navy/6 select-none">{String(i + 1).padStart(2, "0")}</span>
                  <span className="relative w-12 h-12 rounded-2xl bg-sky/15 text-blue flex items-center justify-center mb-5 transition-transform duration-400 group-hover:scale-110">
                    <step.icon className="w-5 h-5" />
                  </span>
                  <h3 className="relative font-display font-bold text-lg text-navy mb-2 leading-snug">{step.title}</h3>
                  <p className="relative text-sm text-navy/60 leading-relaxed">{step.desc}</p>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-white pt-14 sm:pt-16 pb-16 sm:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" align="left" className="mb-8" />
              <FaqAccordion faqs={faqs} />
            </div>
            <div className="lg:col-span-7">
              <Suspense fallback={null}>
                <BookingForm title={formTitle} subtitle="Share your requirements and our travel expert will get back to you shortly." />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
