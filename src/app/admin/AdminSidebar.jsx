"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Package,
  MapPin,
  Tags,
  Newspaper,
  Images,
  Star,
  Inbox,
  Search,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Destinations", href: "/admin/destinations", icon: MapPin },
  { label: "Categories", href: "/admin/categories", icon: Tags },
  { label: "Blog Posts", href: "/admin/blogs", icon: Newspaper },
  { label: "Gallery Images", href: "/admin/gallery", icon: Images },
  { label: "Review Approvals", href: "/admin/reviews", icon: Star },
  { label: "Leads & Bookings", href: "/admin/leads", icon: Inbox },
  { label: "SEO Manager", href: "/admin/seo", icon: Search },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-64 shrink-0 bg-navy-dark text-white min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-white/10">
        <p className="font-display text-lg font-semibold">PKP Holidays</p>
        <p className="text-xs text-white/60">Super Admin</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-blue text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/75 hover:bg-white/10 hover:text-white text-left transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
