import Link from "next/link";
import { readDestinations } from "@/lib/admin/data-store";
import DestinationsTable from "./DestinationsTable";

export default async function AdminDestinationsPage() {
  const destinations = await readDestinations();
  const sorted = [...destinations].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Destinations & Packages</h1>
          <p className="text-sm text-neutral-500 mt-1">{destinations.length} packages total</p>
        </div>
        <Link
          href="/admin/destinations/new"
          className="rounded-lg bg-blue text-white text-sm font-medium px-4 py-2.5 hover:bg-navy transition-colors"
        >
          + Add Destination
        </Link>
      </div>

      <DestinationsTable destinations={sorted} />
    </div>
  );
}
