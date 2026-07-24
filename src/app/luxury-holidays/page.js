import CategoryPageTemplate from "@/components/packages/CategoryPageTemplate";

export const metadata = {
  title: "Luxury Holidays — Indulgent 5-Star Experiences",
  description: "Experience the finest in travel with PKP Holidays' luxury holiday packages — 5-star stays, private transfers and bespoke itineraries.",
  alternates: { canonical: "/luxury-holidays" },
};

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
