import { Suspense } from "react";
import PageHero from "@/components/shared/PageHero";
import PackagesExplorer from "@/components/packages/PackagesExplorer";
import { packages } from "@/lib/data/packages";

export const metadata = {
  title: "All Tour Packages — Domestic & International Holidays",
  description: "Browse 40+ premium domestic and international tour packages by PKP Holidays. Filter by destination, budget, duration and tour type to find your perfect trip.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        title="All Tour Packages"
        subtitle="Explore our complete collection of handpicked domestic & international tour packages, crafted for every type of traveler."
        image="/destinations/switzerland.jpg"
        breadcrumbItems={[{ label: "Tour Packages", href: "/packages" }]}
      />
      <Suspense fallback={null}>
        <PackagesExplorer packages={packages} />
      </Suspense>
    </>
  );
}
