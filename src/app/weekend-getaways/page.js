import CategoryPageTemplate from "@/components/packages/CategoryPageTemplate";

export const metadata = {
  title: "Weekend Getaways — Quick Refreshing Escapes",
  description: "Short on time? Explore PKP Holidays' best weekend getaway packages for a quick, refreshing escape from routine.",
  alternates: { canonical: "/weekend-getaways" },
};

export default function WeekendGetawaysPage() {
  return (
    <CategoryPageTemplate
      title="Weekend Getaways"
      subtitle="Perfect short escapes for when you need a quick refresh without using up all your leave."
      image="/destinations/coorg.jpg"
      breadcrumbLabel="Weekend Getaways"
      breadcrumbHref="/weekend-getaways"
      categoryKey="weekend"
      filterFn={(p) => p.categories.includes("weekend") || p.duration.days <= 3}
    />
  );
}
