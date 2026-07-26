import { readGallery } from "@/lib/admin/data-store";
import GalleryManager from "./GalleryManager";

export default async function AdminGalleryPage() {
  const gallery = await readGallery();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">Gallery Images</h1>
        <p className="text-sm text-neutral-500 mt-1">{gallery.length} photos shown on the public gallery page</p>
      </div>

      <GalleryManager gallery={gallery} />
    </div>
  );
}
