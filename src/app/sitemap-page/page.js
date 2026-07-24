import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/ui/Container";
import { packages } from "@/lib/data/packages";
import { blogs } from "@/lib/data/blogs";
import { packageMenu, servicesMenu, companyMenu, footerLinks } from "@/lib/data/nav";

export const metadata = {
  title: "Sitemap",
  description: "Browse a full sitemap of all pages available on the PKP Holidays website.",
  alternates: { canonical: "/sitemap-page" },
};

function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="font-display font-bold text-lg text-navy mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-navy/65 hover:text-blue transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SitemapPage() {
  return (
    <>
      <PageHero
        title="Sitemap"
        subtitle="A complete overview of every page on the PKP Holidays website."
        image="/destinations/leh-ladakh.jpg"
        breadcrumbItems={[{ label: "Sitemap", href: "/sitemap-page" }]}
        compact
      />
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <LinkColumn title="Main Pages" links={[{ label: "Home", href: "/" }, ...companyMenu]} />
          <LinkColumn title="Package Categories" links={packageMenu} />
          <LinkColumn title="Services" links={servicesMenu} />
          <LinkColumn title="Legal" links={footerLinks.legal} />
        </div>

        <div className="mb-16">
          <h3 className="font-display font-bold text-lg text-navy mb-4">All Tour Packages ({packages.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2.5">
            {packages.map((p) => (
              <Link key={p.slug} href={`/packages/${p.slug}`} className="text-sm text-navy/65 hover:text-blue transition-colors">
                {p.name} Tour Package
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold text-lg text-navy mb-4">All Blog Articles ({blogs.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {blogs.map((b) => (
              <Link key={b.slug} href={`/blog/${b.slug}`} className="text-sm text-navy/65 hover:text-blue transition-colors">
                {b.title}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
