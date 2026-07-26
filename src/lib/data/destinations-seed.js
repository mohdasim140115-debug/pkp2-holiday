// Seed facts for every tour package. The rich package object (itinerary,
// inclusions, FAQs, reviews etc.) is generated from this seed in packages.js
// so every one of the packages stays complete and consistent.
//
// The seed data is assembled from /data/destinations.json (places) and
// /data/packages.json (packages per place), both editable via the /admin
// panel, so it can be managed without touching code.

import destinations from "../../../data/destinations.json";
import packages from "../../../data/packages.json";

export const destinationSeeds = packages.map((pkg) => {
  const destination = destinations.find((d) => d.id === pkg.destinationId);
  return {
    id: pkg.id,
    name: pkg.name,
    destinationName: destination?.name || pkg.name,
    state: destination?.state || null,
    country: destination?.country || "",
    type: destination?.type || "domestic",
    categories: pkg.categories,
    days: pkg.days,
    nights: pkg.nights,
    price: pkg.price,
    rating: pkg.rating,
    img: pkg.img,
    tag: pkg.tag,
    best: pkg.best,
    highlights: pkg.highlights,
  };
});
