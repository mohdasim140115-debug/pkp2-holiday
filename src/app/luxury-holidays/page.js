import CategoryPageTemplate from "@/components/packages/CategoryPageTemplate";
import { applySeoOverride } from "@/lib/seo";

export async function generateMetadata() {
  const { title, description } = applySeoOverride("/luxury-holidays", {
    title: "Luxury Holidays — Indulgent 5-Star Experiences",
    description: "Experience the finest in travel with PKP Holidays' luxury holiday packages — 5-star stays, private transfers and bespoke itineraries.",
  });

  return {
    title,
    description,
    alternates: { canonical: "/luxury-holidays" },
  };
}

export default function LuxuryHolidaysPage() {
  return (
    <CategoryPageTemplate
      title="Luxury Holidays"
      subtitle="Indulgent five-star experiences, handpicked for the discerning traveler who wants nothing but the best."
      image="/destinations/mauritius.jpg"
      breadcrumbLabel="Luxury Holidays"
      breadcrumbHref="/luxury-holidays"
      categoryKey="luxury"
      filterFn={(p) => p.categories.includes("luxury")}
    />
  );
}
