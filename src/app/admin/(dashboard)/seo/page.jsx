import { readSeo } from "@/lib/admin/data-store";
import SeoManager from "./SeoManager";

export default async function AdminSeoPage() {
  const seo = await readSeo();
  const sorted = [...seo].sort((a, b) => a.path.localeCompare(b.path));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">SEO Manager</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Override the page title / meta description shown in search results for any URL path, e.g. <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded">/about</code> or <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded">/packages/goa-beach-holiday-package</code>.
        </p>
      </div>

      <SeoManager entries={sorted} />
    </div>
  );
}
