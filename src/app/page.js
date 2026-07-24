import Hero from "@/components/home/Hero";
import PopularDestinations from "@/components/home/PopularDestinations";
import PackagesShowcase from "@/components/home/PackagesShowcase";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import FaqHome from "@/components/home/FaqHome";
import ContactCta from "@/components/home/ContactCta";
import { getFeaturedPackages } from "@/lib/data/packages";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Premium Domestic & International Tour Packages",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

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
      <Testimonials />
      <FaqHome />
      <ContactCta />
    </>
  );
}
