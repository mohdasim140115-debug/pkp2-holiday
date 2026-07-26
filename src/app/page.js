import Hero from "@/components/home/Hero";
import PopularDestinations from "@/components/home/PopularDestinations";
import PackagesShowcase from "@/components/home/PackagesShowcase";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HomeReviews from "@/components/home/HomeReviews";
import { getFeaturedPackages } from "@/lib/data/packages";
import { siteConfig } from "@/lib/site";
import { applySeoOverride } from "@/lib/seo";

export async function generateMetadata() {
  const { title, description } = applySeoOverride("/", {
    title: "Premium Domestic & International Tour Packages",
    description: siteConfig.description,
  });

  return {
    title,
    description,
    alternates: { canonical: "/" },
  };
}

export default function Home() {
  const featured = getFeaturedPackages(8);

  return (
    <>
      <Hero />
      <PopularDestinations />
      <PackagesShowcase
        eyebrow="Handpicked For You"
        title="Top Tour Packages"
        packages={featured}
        viewAllHref="/packages"
        bg="bg-white"
        tight
      />
      <Services />
      <WhyChooseUs />
      <HomeReviews />
    </>
  );
}
