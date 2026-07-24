import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Clock, Star, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumb, { breadcrumbSchema } from "@/components/shared/Breadcrumb";
import ShareButtons from "@/components/shared/ShareButtons";
import BookingForm from "@/components/shared/BookingForm";
import FaqAccordion from "@/components/shared/FaqAccordion";
import RatingStars from "@/components/ui/RatingStars";
import SectionHeading from "@/components/ui/SectionHeading";
import PackageItinerary from "@/components/package-detail/PackageItinerary";
import PackageInfoGrid from "@/components/package-detail/PackageInfoGrid";
import PackageReviews from "@/components/package-detail/PackageReviews";
import StickyBookingCard from "@/components/package-detail/StickyBookingCard";
import { getAllPackages, getPackageBySlug } from "@/lib/data/packages";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  return getAllPackages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return {};

  const title = `${pkg.title} — ${pkg.durationLabel} | ${siteConfig.name}`;
  const description = `${pkg.shortDescription} Starting from ₹${pkg.price.toLocaleString("en-IN")} per person. Book with PKP Holidays for the best price guarantee.`;
  const url = `${siteConfig.url}/packages/${pkg.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/packages/${pkg.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [{ url: pkg.heroImage, width: 1600, height: 1000, alt: `${pkg.name} tour package` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [pkg.heroImage],
    },
  };
}

export default async function PackageDetailPage({ params }) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const url = `${siteConfig.url}/packages/${pkg.slug}`;

  const breadcrumbItems = [
    { label: "Tour Packages", href: "/packages" },
    { label: pkg.name, href: `/packages/${pkg.slug}` },
  ];

  const touristTripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.overview,
    image: pkg.gallery,
    touristType: pkg.categoryLabels,
    itinerary: {
      "@type": "ItemList",
      itemListElement: pkg.itinerary.map((d) => ({
        "@type": "ListItem",
        position: d.day,
        name: d.title,
        description: d.description,
      })),
    },
    offers: {
      "@type": "Offer",
      price: pkg.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: pkg.rating,
      reviewCount: pkg.reviewCount,
    },
    review: pkg.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.comment,
      datePublished: r.date,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pkg.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbItems)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 bg-navy-dark overflow-hidden">
        <Image src={pkg.heroImage} alt={`${pkg.name} tour package`} fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/70 to-navy-dark/40" />
        <Container className="relative">
          <Breadcrumb items={breadcrumbItems} light />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mt-5">
            <div>
              <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
                <MapPin className="w-4 h-4 text-sky" /> {pkg.state ? `${pkg.state}, ${pkg.country}` : pkg.country}
              </div>
              <h1 className="font-display font-bold text-white text-3xl sm:text-5xl leading-tight max-w-2xl">{pkg.title}</h1>
              <p className="text-sky mt-2 font-medium">{pkg.tagline}</p>
              <div className="flex flex-wrap items-center gap-5 mt-5 text-white/80 text-sm">
                <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-sky" /> {pkg.durationLabel}</span>
                <span className="inline-flex items-center gap-1.5">
                  <RatingStars rating={pkg.rating} size={14} /> {pkg.rating} ({pkg.reviewCount} reviews)
                </span>
                <span className="inline-flex items-center gap-1.5"><Users className="w-4 h-4 text-sky" /> {pkg.type === "international" ? "International" : "Domestic"}</span>
              </div>
            </div>
            <ShareButtons url={url} title={pkg.title} />
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-14">
            <div>
              <SectionHeading eyebrow="Overview" title={`About This ${pkg.name} Tour`} align="left" className="mb-6" />
              <p className="text-navy/70 leading-relaxed mb-6">{pkg.overview}</p>
              <div className="flex flex-wrap gap-2.5">
                {pkg.highlights.map((h) => (
                  <span key={h} className="bg-sky/10 text-blue text-sm font-medium px-4 py-2 rounded-full">{h}</span>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Itinerary" title="Day Wise Tour Itinerary" align="left" className="mb-6" />
              <PackageItinerary itinerary={pkg.itinerary} />
            </div>

            <div>
              <SectionHeading eyebrow="Trip Details" title="Inclusions, Hotels & More" align="left" className="mb-6" />
              <PackageInfoGrid pkg={pkg} />
            </div>

            <div>
              <SectionHeading eyebrow="Reviews" title="What Our Travelers Say" align="left" className="mb-6" />
              <PackageReviews pkg={pkg} />
            </div>

            <div>
              <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" align="left" className="mb-6" />
              <FaqAccordion faqs={pkg.faqs} />
            </div>

            <div id="enquire">
              <SectionHeading eyebrow="Enquiry" title={`Plan Your ${pkg.name} Trip`} align="left" className="mb-6" />
              <BookingForm destination={pkg.name} title="" subtitle="" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <StickyBookingCard pkg={pkg} />
          </div>
        </div>
      </Container>
    </>
  );
}
