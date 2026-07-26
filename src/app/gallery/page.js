import PageHero from "@/components/shared/PageHero";
import Container from "@/components/ui/Container";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { galleryImages } from "@/lib/data/content";
import { applySeoOverride } from "@/lib/seo";

export async function generateMetadata() {
  const { title, description } = applySeoOverride("/gallery", {
    title: "Travel Gallery — Moments From Our Trips",
    description: "Browse PKP Holidays' travel gallery — real moments captured by our travelers across India and around the world.",
  });

  return {
    title,
    description,
    alternates: { canonical: "/gallery" },
  };
}

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Travel Gallery"
        subtitle="Moments captured by our travelers, from mountain peaks to tropical beaches."
        image="/destinations/andaman.jpg"
        breadcrumbItems={[{ label: "Gallery", href: "/gallery" }]}
      />
      <Container className="py-14 sm:py-16">
        <GalleryGrid images={galleryImages} />
      </Container>
    </>
  );
}
