import CategoryPageTemplate from "@/components/packages/CategoryPageTemplate";

export const metadata = {
  title: "Family Packages — Memories for the Whole Family",
  description: "PKP Holidays' family tour packages are designed for every generation — comfortable stays, fun activities and hassle-free planning.",
  alternates: { canonical: "/family-packages" },
};

export default function FamilyPackagesPage() {
  return (
    <CategoryPageTemplate
      title="Family Packages"
      subtitle="Thoughtfully paced itineraries that keep every family member — from toddlers to grandparents — happy."
      image="/destinations/munnar.jpg"
      breadcrumbLabel="Family Packages"
      breadcrumbHref="/family-packages"
      categoryKey="family"
      filterFn={(p) => p.categories.includes("family")}
    />
  );
}
