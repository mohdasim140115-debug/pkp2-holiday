import { readCategories } from "@/lib/admin/data-store";
import CategoriesManager from "./CategoriesManager";

export default async function AdminCategoriesPage() {
  const categories = await readCategories();
  const sorted = [...categories].sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">Package Categories</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {categories.length} categories · used to tag packages and power the filters on the public site
        </p>
      </div>

      <CategoriesManager categories={sorted} />
    </div>
  );
}
