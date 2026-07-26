import Link from "next/link";
import {
  Package,
  MapPin,
  Tags,
  Newspaper,
  Images,
  Star,
  Inbox,
  Search,
  ArrowRight,
  PlusCircle,
} from "lucide-react";
import {
  readDestinations,
  readPackages,
  readLeads,
  readBlogs,
  readReviews,
  readCategories,
  readGallery,
  readSeo,
} from "@/lib/admin/data-store";

const ACCENTS = {
  blue: "bg-blue/10 text-blue",
  navy: "bg-navy/10 text-navy",
  amber: "bg-amber-100 text-amber-700",
  green: "bg-green-100 text-green-700",
  rose: "bg-rose-100 text-rose-700",
  purple: "bg-purple-100 text-purple-700",
  sky: "bg-sky-100 text-sky-700",
  teal: "bg-teal-100 text-teal-700",
};

export default async function AdminDashboardPage() {
  const [destinations, packages, leads, blogs, reviews, categories, gallery, seo] = await Promise.all([
    readDestinations(),
    readPackages(),
    readLeads(),
    readBlogs(),
    readReviews(),
    readCategories(),
    readGallery(),
    readSeo(),
  ]);

  const newLeadsCount = leads.filter((l) => l.status === "new").length;
  const pendingReviewsCount = reviews.filter((r) => r.status === "pending").length;

  const sections = [
    { label: "Destinations", value: destinations.length, href: "/admin/destinations", icon: MapPin, accent: "navy" },
    { label: "Packages", value: packages.length, href: "/admin/packages", icon: Package, accent: "blue" },
    { label: "Categories", value: categories.length, href: "/admin/categories", icon: Tags, accent: "purple" },
    { label: "Blog Posts", value: blogs.length, href: "/admin/blogs", icon: Newspaper, accent: "teal" },
    { label: "Gallery Photos", value: gallery.length, href: "/admin/gallery", icon: Images, accent: "sky" },
    { label: "Total Reviews", value: reviews.length, href: "/admin/reviews", icon: Star, accent: "amber", badge: pendingReviewsCount > 0 },
    { label: "New Enquiries", value: newLeadsCount, href: "/admin/leads", icon: Inbox, accent: "rose", badge: newLeadsCount > 0 },
    { label: "SEO Overrides", value: seo.length, href: "/admin/seo", icon: Search, accent: "navy" },
  ];

  const quickActions = [
    { label: "Add Package", href: "/admin/packages/new" },
    { label: "Add Destination", href: "/admin/destinations/new" },
    { label: "Write Blog Post", href: "/admin/blogs/new" },
    { label: "Review Approvals", href: "/admin/reviews" },
    { label: "View Leads & Bookings", href: "/admin/leads" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Overview of your site&apos;s content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-white rounded-xl border border-neutral-200 p-5 hover:border-blue/40 hover:shadow-sm transition-all relative"
            >
              {s.badge && (
                <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-500" />
              )}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${ACCENTS[s.accent]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm text-neutral-500">{s.label}</p>
              <div className="flex items-end justify-between mt-1">
                <p className="text-3xl font-semibold text-navy">{s.value}</p>
                <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-blue group-hover:translate-x-0.5 transition-all mb-1" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="font-semibold text-navy mb-4 flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-blue" /> Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="inline-block rounded-lg bg-blue text-white text-sm font-medium px-4 py-2 hover:bg-navy transition-colors"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-navy flex items-center gap-2">
            <Inbox className="w-4 h-4 text-blue" /> Recent Enquiries
          </h2>
          <Link href="/admin/leads" className="text-sm text-blue hover:text-navy font-medium">View All</Link>
        </div>
        {leads.length === 0 ? (
          <p className="text-sm text-neutral-400">No enquiries received yet.</p>
        ) : (
          <div className="divide-y divide-neutral-100">
            {[...leads]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((l) => (
                <div key={l.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-navy text-sm">{l.name}</p>
                    <p className="text-xs text-neutral-500">{l.phone} · {l.email}</p>
                  </div>
                  <span className="text-xs font-medium text-neutral-400 whitespace-nowrap">
                    {new Date(l.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
