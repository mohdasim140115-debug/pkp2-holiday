import { notFound } from "next/navigation";
import { readDestinations, readPackages, readCategories } from "@/lib/admin/data-store";
import PackageForm from "../../PackageForm";

export default async function EditPackagePage({ params }) {
  const { id } = await params;
  const [destinations, packages, categories] = await Promise.all([
    readDestinations(),
    readPackages(),
    readCategories(),
  ]);
  const pkg = packages.find((p) => p.id === id);
  if (!pkg) notFound();

  const sorted = [...destinations].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">Edit Package</h1>
        <p className="text-sm text-neutral-500 mt-1">{pkg.name}</p>
      </div>
      <PackageForm destinations={sorted} categories={categories} pkg={pkg} />
    </div>
  );
}
