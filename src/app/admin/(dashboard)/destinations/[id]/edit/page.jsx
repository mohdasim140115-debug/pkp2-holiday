import { notFound } from "next/navigation";
import { readDestinations } from "@/lib/admin/data-store";
import DestinationForm from "../../DestinationForm";

export default async function EditDestinationPage({ params }) {
  const { id } = await params;
  const destinations = await readDestinations();
  const destination = destinations.find((d) => d.id === id);

  if (!destination) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">Edit Destination</h1>
        <p className="text-sm text-neutral-500 mt-1">{destination.name}</p>
      </div>
      <DestinationForm destination={destination} />
    </div>
  );
}
