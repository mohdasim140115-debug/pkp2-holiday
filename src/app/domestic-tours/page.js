import CategoryPageTemplate from "@/components/packages/CategoryPageTemplate";

export const metadata = {
  title: "Domestic Tour Packages — Explore Incredible India",
  description: "Discover PKP Holidays' handpicked domestic tour packages across India — Kashmir, Kerala, Goa, Rajasthan, Andaman, Ladakh and more.",
  alternates: { canonical: "/domestic-tours" },
};

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
