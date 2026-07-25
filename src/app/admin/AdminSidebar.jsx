"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Destinations & Packages", href: "/admin/destinations" },
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
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-blue text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full rounded-lg px-3 py-2 text-sm font-medium text-white/75 hover:bg-white/10 hover:text-white text-left transition-colors"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
