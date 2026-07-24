import { Suspense } from "react";
import PageHero from "@/components/shared/PageHero";
import PackagesExplorer from "@/components/packages/PackagesExplorer";
import { packages as allPackages } from "@/lib/data/packages";

export default function CategoryPageTemplate({ title, subtitle, image, breadcrumbLabel, breadcrumbHref, categoryKey, filterFn }) {
  const list = filterFn ? allPackages.filter(filterFn) : allPackages;
  return (
    <>
      <PageHero title={title} subtitle={subtitle} image={image} breadcrumbItems={[{ label: breadcrumbLabel, href: breadcrumbHref || "/packages" }]} />
      <Suspense fallback={null}>
        <PackagesExplorer packages={list} initialCategory={categoryKey} />
      </Suspense>
    </>
  );
}
