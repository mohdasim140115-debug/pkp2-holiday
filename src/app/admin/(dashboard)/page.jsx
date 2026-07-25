import Link from "next/link";
import { readDestinations } from "@/lib/admin/data-store";

export default async function AdminDashboardPage() {
  const destinations = await readDestinations();
  const domesticCount = destinations.filter((d) => d.type === "domestic").length;
  const internationalCount = destinations.filter((d) => d.type === "international").length;

  const cards = [
    { label: "Total Packages", value: destinations.length },
    { label: "Domestic", value: domesticCount },
    { label: "International", value: internationalCount },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Overview of your site&apos;s content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-neutral-200 p-5">
            <p className="text-sm text-neutral-500">{card.label}</p>
            <p className="text-3xl font-semibold text-navy mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="font-semibold text-navy mb-2">Manage Packages</h2>
        <p className="text-sm text-neutral-500 mb-4">
          Add, edit or remove tour packages and destinations shown across the site&apos;s pages.
        </p>
        <Link
          href="/admin/destinations"
          className="inline-block rounded-lg bg-blue text-white text-sm font-medium px-4 py-2 hover:bg-navy transition-colors"
        >
          Go to Destinations & Packages
        </Link>
      </div>
    </div>
  );
}
