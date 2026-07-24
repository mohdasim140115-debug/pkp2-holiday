import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

export default function Breadcrumb({ items, light = false }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm">
      {all.map((item, i) => {
        const isLast = i === all.length - 1;
        return (
          <span key={item.href} className="flex items-center gap-1.5">
            {i === 0 ? (
              <Link href={item.href} className={light ? "text-white/70 hover:text-white flex items-center gap-1" : "text-navy/60 hover:text-navy flex items-center gap-1"}>
                <Home className="w-3.5 h-3.5" /> {item.label}
              </Link>
            ) : isLast ? (
              <span className={light ? "text-white font-medium" : "text-navy font-medium"}>{item.label}</span>
            ) : (
              <Link href={item.href} className={light ? "text-white/70 hover:text-white" : "text-navy/60 hover:text-navy"}>
                {item.label}
              </Link>
            )}
            {!isLast && <ChevronRight className={`w-3.5 h-3.5 ${light ? "text-white/40" : "text-navy/30"}`} />}
          </span>
        );
      })}
    </nav>
  );
}
