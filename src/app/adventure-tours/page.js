import CategoryPageTemplate from "@/components/packages/CategoryPageTemplate";

export const metadata = {
  title: "Adventure Tours — Thrilling Outdoor Experiences",
  description: "Trekking, river rafting, paragliding and more — explore PKP Holidays' adventure tour packages across Ladakh, Manali, Rishikesh, Spiti and beyond.",
  alternates: { canonical: "/adventure-tours" },
};

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
