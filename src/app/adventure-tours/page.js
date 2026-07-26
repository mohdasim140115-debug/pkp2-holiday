import CategoryPageTemplate from "@/components/packages/CategoryPageTemplate";
import { applySeoOverride } from "@/lib/seo";

export async function generateMetadata() {
  const { title, description } = applySeoOverride("/adventure-tours", {
    title: "Adventure Tours — Thrilling Outdoor Experiences",
    description: "Trekking, river rafting, paragliding and more — explore PKP Holidays' adventure tour packages across Ladakh, Manali, Rishikesh, Spiti and beyond.",
  });

  return {
    title,
    description,
    alternates: { canonical: "/adventure-tours" },
  };
}

export default function AdventureToursPage() {
  return (
    <CategoryPageTemplate
      title="Adventure Tours"
      subtitle="For travelers who chase adrenaline — treks, rafting, paragliding and unforgettable outdoor thrills."
      image="/destinations/spiti-valley.jpg"
      breadcrumbLabel="Adventure Tours"
      breadcrumbHref="/adventure-tours"
      categoryKey="adventure"
      filterFn={(p) => p.categories.includes("adventure")}
    />
  );
}
