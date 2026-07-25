// Seed facts for every tour package. The rich package object (itinerary,
// inclusions, FAQs, reviews etc.) is generated from this seed in packages.js
// so every one of the packages stays complete and consistent.
//
// The seed data itself lives in /data/destinations.json (editable via the
// /admin panel) so it can be managed without touching code.

import destinations from "../../../data/destinations.json";

export const destinationSeeds = destinations;
