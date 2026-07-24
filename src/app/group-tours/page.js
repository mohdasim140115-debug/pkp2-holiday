import CategoryPageTemplate from "@/components/packages/CategoryPageTemplate";

export const metadata = {
  title: "Group Tours — Travel Together, Save Together",
  description: "Planning a trip with friends or extended family? Explore PKP Holidays' group tour packages with special group pricing.",
  alternates: { canonical: "/group-tours" },
};

export default function GroupToursPage() {
  return (
    <CategoryPageTemplate
      title="Group Tours"
      subtitle="Travel together and save more — perfect for friends, extended family and community groups."
      image="/destinations/goa.jpg"
      breadcrumbLabel="Group Tours"
      breadcrumbHref="/group-tours"
      categoryKey="group"
      filterFn={(p) => p.categories.includes("group")}
    />
  );
}
