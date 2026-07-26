import CategoryPageTemplate from "@/components/packages/CategoryPageTemplate";
import { applySeoOverride } from "@/lib/seo";

export async function generateMetadata() {
  const { title, description } = applySeoOverride("/religious-tours", {
    title: "Religious Tours — Spiritual & Pilgrimage Journeys",
    description: "Embark on a spiritual journey with PKP Holidays' pilgrimage tour packages to Varanasi, Amritsar, Tirupati, Shirdi, Rishikesh and Bhutan.",
  });

  return {
    title,
    description,
    alternates: { canonical: "/religious-tours" },
  };
}

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
