import { Suspense } from "react";
import { Users, Presentation, Trophy, PartyPopper } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import PackagesShowcase from "@/components/home/PackagesShowcase";
import BookingForm from "@/components/shared/BookingForm";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getPackagesByCategory } from "@/lib/data/packages";

export const metadata = {
  title: "Corporate Tours — MICE & Offsite Travel Management",
  description: "PKP Holidays plans corporate offsites, MICE events, incentive travel and team outings with end-to-end logistics and dedicated support.",
  alternates: { canonical: "/corporate-tours" },
};

const offerings = [
  { title: "Team Offsites", desc: "Fun, well-organized retreats that boost team morale and collaboration.", icon: Users },
  { title: "MICE Events", desc: "Meetings, incentives, conferences & exhibitions handled end-to-end.", icon: Presentation },
  { title: "Incentive Travel", desc: "Reward top performers with unforgettable, curated travel experiences.", icon: Trophy },
  { title: "Corporate Celebrations", desc: "Annual days, anniversaries and milestone celebrations, planned to perfection.", icon: PartyPopper },
];

export default function CorporateToursPage() {
  const suggested = [...getPackagesByCategory("group"), ...getPackagesByCategory("luxury")].slice(0, 4);

  return (
    <>
      <PageHero
        title="Corporate & MICE Travel"
        subtitle="From team offsites to large-scale conferences, PKP Holidays manages every detail of your corporate travel program."
        image="/destinations/dubai.jpg"
        breadcrumbItems={[{ label: "Corporate Tours", href: "/corporate-tours" }]}
      />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Corporate Travel" title="Tailored Programs For Every Business Need" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((o) => (
              <div key={o.title} className="bg-offwhite rounded-3xl p-7">
                <span className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center mb-5">
                  <o.icon className="w-5 h-5" />
                </span>
                <h3 className="font-display font-bold text-lg text-navy mb-2">{o.title}</h3>
                <p className="text-sm text-navy/60 leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {suggested.length > 0 && (
        <PackagesShowcase
          eyebrow="Popular Choices"
          title="Great Destinations For Corporate Offsites"
          packages={suggested}
          viewAllHref="/group-tours"
          bg="bg-offwhite"
        />
      )}

      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Get Started" title="Request a Corporate Travel Proposal" />
          <Suspense fallback={null}>
            <BookingForm destination="Corporate Tour" title="" subtitle="" />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
