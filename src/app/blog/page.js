import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import { blogs } from "@/lib/data/blogs";

export const metadata = {
  title: "Travel Blog — Tips, Guides & Inspiration",
  description: "Explore PKP Holidays' travel blog for tips on packing, visas, budget travel, honeymoon destinations, family vacations and adventure travel.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Travel Blog"
        subtitle="Tips, guides and inspiration to help you plan your next unforgettable trip."
        image="/destinations/darjeeling.jpg"
        breadcrumbItems={[{ label: "Blog", href: "/blog" }]}
      />
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <FadeIn key={blog.slug} delay={(i % 6) * 0.06}>
              <Link href={`/blog/${blog.slug}`} className="group block bg-white rounded-3xl overflow-hidden luxury-shadow hover:luxury-shadow-lg hover:-translate-y-1 transition-all duration-400">
                <div className="relative h-52 overflow-hidden">
                  <Image src={blog.image} alt={blog.title} fill sizes="400px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 bg-white/90 text-navy text-xs font-semibold px-3 py-1.5 rounded-full">{blog.category}</span>
                </div>
                <div className="p-6">
                  <p className="flex items-center gap-3 text-xs text-navy/50 mb-3">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
                  </p>
                  <h2 className="font-display font-bold text-lg text-navy leading-snug group-hover:text-blue transition-colors">{blog.title}</h2>
                  <p className="text-sm text-navy/60 mt-3 line-clamp-2">{blog.excerpt}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </>
  );
}
