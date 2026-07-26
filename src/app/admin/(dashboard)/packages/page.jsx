import Link from "next/link";
import { readDestinations, readPackages } from "@/lib/admin/data-store";
import PackagesTable from "./PackagesTable";

export default async function AdminPackagesPage({ searchParams }) {
  const { destinationId } = await searchParams;
  const [destinations, packages] = await Promise.all([readDestinations(), readPackages()]);

  const destinationById = new Map(destinations.map((d) => [d.id, d]));
  const enriched = packages
    .filter((p) => !destinationId || p.destinationId === destinationId)
    .map((p) => ({ ...p, destination: destinationById.get(p.destinationId) || null }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const filterDestination = destinationId ? destinationById.get(destinationId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Packages</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {filterDestination ? (
              <>
                Showing packages for <span className="font-medium">{filterDestination.name}</span> ·{" "}
                <Link href="/admin/packages" className="text-blue hover:text-navy">Clear filter</Link>
              </>
            ) : (
              `${packages.length} packages total`
            )}
          </p>
        </div>
        <Link
          href={destinationId ? `/admin/packages/new?destinationId=${destinationId}` : "/admin/packages/new"}
          className="rounded-lg bg-blue text-white text-sm font-medium px-4 py-2.5 hover:bg-navy transition-colors"
        >
          + Add Package
        </Link>
      </div>

      <PackagesTable packages={enriched} />
    </div>
  );
}
