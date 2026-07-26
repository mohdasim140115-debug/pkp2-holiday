import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumb, { breadcrumbSchema } from "@/components/shared/Breadcrumb";
import ShareButtons from "@/components/shared/ShareButtons";
import { blogs, getBlogBySlug, getRelatedBlogs } from "@/lib/data/blogs";
import { siteConfig } from "@/lib/site";
import { applySeoOverride } from "@/lib/seo";

export async function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return {};
  const { title, description } = applySeoOverride(`/blog/${blog.slug}`, {
    title: blog.title,
    description: blog.excerpt,
  });
  const url = `${siteConfig.url}/blog/${blog.slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: { type: "article", title, description, url, images: [{ url: blog.image, width: 1200, height: 700 }] },
    twitter: { card: "summary_large_image", title, description, images: [blog.image] },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  const related = getRelatedBlogs(blog, 3);
  const url = `${siteConfig.url}/blog/${blog.slug}`;
  const breadcrumbItems = [{ label: "Blog", href: "/blog" }, { label: blog.title, href: `/blog/${blog.slug}` }];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name, logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.png` } },
    datePublished: blog.date,
    dateModified: blog.date,
    mainEntityOfPage: url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbItems)) }} />

      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 bg-navy-dark overflow-hidden">
        <Image src={blog.image} alt={blog.title} fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/70 to-navy-dark/40" />
        <Container className="relative">
          <Breadcrumb items={breadcrumbItems} light />
          <span className="inline-block bg-sky text-white text-xs font-semibold px-3 py-1.5 rounded-full mt-5 mb-4">{blog.category}</span>
          <h1 className="font-display font-bold text-white text-3xl sm:text-5xl leading-tight max-w-3xl">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-5 mt-6 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-sky" /> {blog.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-sky" /> {new Date(blog.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-sky" /> {blog.readTime}</span>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8">
            <div className="prose-none space-y-6 text-navy/75 leading-relaxed text-base sm:text-lg">
              {blog.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-navy/10">
              <span className="text-sm font-semibold text-navy">Share this article</span>
              <ShareButtons url={url} title={blog.title} />
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="bg-offwhite rounded-3xl p-6 sticky top-28">
              <h3 className="font-display font-bold text-lg text-navy mb-5">Related Articles</h3>
              <div className="space-y-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="flex gap-3 group">
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0">
                      <Image src={r.image} alt={r.title} fill sizes="80px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy leading-snug group-hover:text-blue transition-colors line-clamp-2">{r.title}</p>
                      <p className="text-xs text-navy/50 mt-1">{r.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-blue mt-6">
                View All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
