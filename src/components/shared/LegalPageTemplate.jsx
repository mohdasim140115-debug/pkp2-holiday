import PageHero from "@/components/shared/PageHero";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";

export default function LegalPageTemplate({ title, updatedOn, sections, href }) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={`Last updated: ${updatedOn}`}
        image="/destinations/switzerland.jpg"
        breadcrumbItems={[{ label: title, href: href || "/" }]}
        compact
      />
      <Container className="py-14 sm:py-16 max-w-3xl">
        <div className="space-y-10">
          {sections.map((s, i) => (
            <FadeIn key={s.heading} delay={Math.min(i, 4) * 0.05} y={16}>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-navy mb-3">{s.heading}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j} className="text-navy/70 leading-relaxed mb-3 text-sm sm:text-base">{p}</p>
              ))}
              {s.list && (
                <ul className="list-disc pl-5 space-y-2 text-navy/70 text-sm sm:text-base">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </FadeIn>
          ))}
        </div>
      </Container>
    </>
  );
}
