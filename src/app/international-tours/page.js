import CategoryPageTemplate from "@/components/packages/CategoryPageTemplate";
import { applySeoOverride } from "@/lib/seo";

export async function generateMetadata() {
  const { title, description } = applySeoOverride("/international-tours", {
    title: "International Tour Packages — Journeys Across The Globe",
    description: "Explore PKP Holidays' curated international tour packages to Bali, Dubai, Thailand, Singapore, Switzerland, Maldives and more.",
  });

  return {
    title,
    description,
    alternates: { canonical: "/international-tours" },
  };
}

export default function InternationalToursPage() {
  return (
    <CategoryPageTemplate
      title="International Tour Packages"
      subtitle="Handpicked journeys to the world's most loved destinations, planned end-to-end by our travel experts."
      image="/destinations/bali.jpg"
      breadcrumbLabel="International Tours"
      breadcrumbHref="/international-tours"
      categoryKey="international"
      filterFn={(p) => p.type === "international"}
    />
  );
}
