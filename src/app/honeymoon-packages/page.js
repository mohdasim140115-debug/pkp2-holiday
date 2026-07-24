import CategoryPageTemplate from "@/components/packages/CategoryPageTemplate";

export const metadata = {
  title: "Honeymoon Packages — Romantic Getaways for Two",
  description: "Celebrate your love with PKP Holidays' romantic honeymoon packages — Kashmir, Maldives, Bali, Andaman, Switzerland and more.",
  alternates: { canonical: "/honeymoon-packages" },
};

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
