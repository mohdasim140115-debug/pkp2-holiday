import CategoryPageTemplate from "@/components/packages/CategoryPageTemplate";
import { applySeoOverride } from "@/lib/seo";

export async function generateMetadata() {
  const { title, description } = applySeoOverride("/domestic-tours", {
    title: "Domestic Tour Packages — Explore Incredible India",
    description: "Discover PKP Holidays' handpicked domestic tour packages across India — Kashmir, Kerala, Goa, Rajasthan, Andaman, Ladakh and more.",
  });

  return {
    title,
    description,
    alternates: { canonical: "/domestic-tours" },
  };
}

export default function DomesticToursPage() {
  return (
    <CategoryPageTemplate
      title="Domestic Tour Packages"
      subtitle="From the snow peaks of Kashmir to the beaches of Goa — explore the very best of Incredible India."
      image="/destinations/rajasthan.jpg"
      breadcrumbLabel="Domestic Tours"
      breadcrumbHref="/domestic-tours"
      categoryKey="domestic"
      filterFn={(p) => p.type === "domestic"}
    />
  );
}
