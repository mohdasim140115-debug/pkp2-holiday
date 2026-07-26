import CategoryPageTemplate from "@/components/packages/CategoryPageTemplate";
import { applySeoOverride } from "@/lib/seo";

export async function generateMetadata() {
  const { title, description } = applySeoOverride("/honeymoon-packages", {
    title: "Honeymoon Packages — Romantic Getaways for Two",
    description: "Celebrate your love with PKP Holidays' romantic honeymoon packages — Kashmir, Maldives, Bali, Andaman, Switzerland and more.",
  });

  return {
    title,
    description,
    alternates: { canonical: "/honeymoon-packages" },
  };
}

export default function HoneymoonPackagesPage() {
  return (
    <CategoryPageTemplate
      title="Honeymoon Packages"
      subtitle="Romantic escapes designed for two — private stays, candlelight dinners and unforgettable moments together."
      image="/destinations/maldives.jpg"
      breadcrumbLabel="Honeymoon Packages"
      breadcrumbHref="/honeymoon-packages"
      categoryKey="honeymoon"
      filterFn={(p) => p.categories.includes("honeymoon")}
    />
  );
}
