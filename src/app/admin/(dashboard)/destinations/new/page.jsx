import DestinationForm from "../DestinationForm";

export default function NewDestinationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">Add Destination</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Create a new tour package. Itinerary, inclusions, FAQs and reviews are generated automatically.
        </p>
      </div>
      <DestinationForm />
    </div>
  );
}
