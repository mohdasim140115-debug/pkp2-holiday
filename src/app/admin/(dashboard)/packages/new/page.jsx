import { readDestinations, readCategories } from "@/lib/admin/data-store";
import PackageForm from "../PackageForm";

export default async function NewPackagePage({ searchParams }) {
  const { destinationId } = await searchParams;
  const [destinations, categories] = await Promise.all([readDestinations(), readCategories()]);
  const sorted = [...destinations].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">Add Package</h1>
        <p className="text-sm text-neutral-500 mt-1">Create a new tour package for a destination.</p>
      </div>
      <PackageForm destinations={sorted} categories={categories} defaultDestinationId={destinationId} />
    </div>
  );
}
