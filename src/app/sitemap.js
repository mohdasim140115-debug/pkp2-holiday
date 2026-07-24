import { packages } from "@/lib/data/packages";
import { blogs } from "@/lib/data/blogs";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "", "about", "packages", "domestic-tours", "international-tours", "honeymoon-packages",
  "family-packages", "adventure-tours", "religious-tours", "weekend-getaways", "group-tours",
  "corporate-tours", "luxury-holidays", "hotels", "flight-booking", "visa-assistance",
  "blog", "gallery", "testimonials", "faq", "contact", "privacy-policy",
  "terms-and-conditions", "cancellation-policy", "refund-policy", "sitemap-page",
];

export default function sitemap() {
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}/${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const packageEntries = packages.map((p) => ({
    url: `${siteConfig.url}/packages/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogEntries = blogs.map((b) => ({
    url: `${siteConfig.url}/blog/${b.slug}`,
    lastModified: b.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...packageEntries, ...blogEntries];
}
