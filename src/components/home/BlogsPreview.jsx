import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { blogs } from "@/lib/data/blogs";

export default function BlogsPreview() {
  const latest = blogs.slice(0, 3);
  return (
    <section className="bg-offwhite py-16 sm:py-24">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading eyebrow="From The Blog" title="Travel Tips & Inspiration" align="left" className="mb-0" />
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-blue shrink-0 mb-14">
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {latest.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group bg-white rounded-3xl overflow-hidden luxury-shadow hover:luxury-shadow-lg transition-shadow">
              <div className="relative h-52 overflow-hidden">
                <Image src={blog.image} alt={blog.title} fill sizes="400px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <span className="absolute top-4 left-4 bg-white/90 text-navy text-xs font-semibold px-3 py-1.5 rounded-full">{blog.category}</span>
              </div>
              <div className="p-6">
                <p className="flex items-center gap-1.5 text-xs text-navy/50 mb-3">
                  <Calendar className="w-3.5 h-3.5" /> {new Date(blog.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} • {blog.readTime}
                </p>
                <h3 className="font-display font-bold text-lg text-navy leading-snug group-hover:text-blue transition-colors">{blog.title}</h3>
                <p className="text-sm text-navy/60 mt-3 line-clamp-2">{blog.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
