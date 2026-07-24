import CategoryPageTemplate from "@/components/packages/CategoryPageTemplate";

export const metadata = {
  title: "Religious Tours — Spiritual & Pilgrimage Journeys",
  description: "Embark on a spiritual journey with PKP Holidays' pilgrimage tour packages to Varanasi, Amritsar, Tirupati, Shirdi, Rishikesh and Bhutan.",
  alternates: { canonical: "/religious-tours" },
};

export default function ReligiousToursPage() {
  return (
    <CategoryPageTemplate
      title="Religious & Pilgrimage Tours"
      subtitle="Meaningful spiritual journeys to India's holiest sites, planned with comfort and devotion in mind."
      image="/destinations/varanasi.jpg"
      breadcrumbLabel="Religious Tours"
      breadcrumbHref="/religious-tours"
      categoryKey="religious"
      filterFn={(p) => p.categories.includes("religious")}
    />
  );
}
