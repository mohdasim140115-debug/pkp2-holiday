import { destinationSeeds } from "./destinations-seed";
import { destinationImages } from "./destination-images";
import { travelImage } from "@/lib/images";

export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const REVIEWER_NAMES = [
  "Ankit Sharma", "Priya Menon", "Rahul Verma", "Sneha Das", "Vikram Rathi",
  "Neha Kapoor", "Arjun Nair", "Pooja Iyer", "Rohit Malhotra", "Ishita Sen",
  "Karan Gupta", "Divya Reddy", "Saurabh Jain", "Ananya Roy", "Manish Tiwari",
];

function pick(arr, n, offset = 0) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(arr[(offset + i) % arr.length]);
  return out;
}

function tagsForSeed(seed) {
  // seed.img is a descriptive hyphenated slug like "kashmir-valley-houseboat";
  // turn it into real search tags so photos actually match the destination.
  return seed.img.split("-");
}

function heroImage(seed) {
  return destinationImages[seed.destinationName] || travelImage([seed.destinationName, ...tagsForSeed(seed)], 1600, 1000, `${seed.name}-hero`);
}
function galleryImages(seed, count = 8) {
  const tags = tagsForSeed(seed);
  const primary = destinationImages[seed.destinationName];
  return Array.from({ length: count }, (_, i) =>
    i === 0 && primary ? primary : travelImage([seed.destinationName, tags[i % tags.length]], 900, 650, `${seed.name}-g${i}`)
  );
}

const CATEGORY_LABELS = {
  domestic: "Domestic Tours",
  international: "International Tours",
  honeymoon: "Honeymoon Packages",
  family: "Family Packages",
  adventure: "Adventure Tours",
  religious: "Religious Tours",
  weekend: "Weekend Getaways",
  group: "Group Tours",
  corporate: "Corporate Tours",
  luxury: "Luxury Holidays",
  beach: "Beach Holidays",
  "hill-station": "Hill Station Tours",
  wildlife: "Wildlife Tours",
};

function priceTier(price) {
  if (price >= 70000) return "luxury";
  if (price >= 25000) return "premium";
  return "value";
}

function buildInclusions(seed, tier) {
  const base = [
    `${seed.nights} Nights / ${seed.days} Days accommodation in handpicked ${tier === "luxury" ? "5-star luxury" : tier === "premium" ? "4-star premium" : "3-star comfort"} hotels`,
    "Daily breakfast at the hotel",
    `All transfers & sightseeing by private ${seed.type === "international" ? "air-conditioned coach/car" : "AC vehicle"}`,
    "Dedicated PKP Holidays tour manager / local representative support",
    "All applicable hotel taxes and service charges",
  ];
  if (tier !== "value") base.push("Daily breakfast and dinner (MAP plan)");
  if (seed.type === "international") base.push("Return flight assistance & airport transfers", "Visa processing assistance");
  if (seed.categories.includes("honeymoon")) base.push("Special honeymoon room decoration on arrival");
  if (seed.categories.includes("adventure")) base.push("Adventure activity charges as per itinerary");
  return base;
}

function buildExclusions(seed) {
  const base = [
    "Airfare / train fare unless mentioned in inclusions",
    "Personal expenses such as tips, laundry, and telephone calls",
    "Any meals other than those specified in the itinerary",
    "Travel insurance",
    "Camera / video camera fees at monuments, if applicable",
  ];
  if (seed.type === "international") base.push("Visa fees (unless specified) and international airfare", "Overseas medical & travel insurance");
  base.push("Anything not specifically mentioned in the 'Inclusions' section");
  return base;
}

function buildItinerary(seed) {
  const place = seed.destinationName;
  const days = [];
  const highlights = seed.highlights;
  days.push({
    day: 1,
    title: `Arrival in ${place}`,
    description: `On arrival at ${place}, our representative will welcome you and transfer you to your hotel. Spend the rest of the day at leisure, settling in and exploring the local surroundings at your own pace. Overnight stay at the hotel.`,
    activities: ["Airport / station pickup", "Hotel check-in", "Evening at leisure"],
  });

  const midDaysCount = Math.max(seed.days - 2, 1);
  for (let d = 0; d < midDaysCount; d++) {
    const dayHighlights = pick(highlights, 2, d * 2);
    days.push({
      day: d + 2,
      title: `${place} Sightseeing — ${dayHighlights[0]}`,
      description: `After breakfast, set out to experience the best of ${place}. Today's journey covers ${dayHighlights.join(" and ")}, with plenty of time for photography and relaxation. Return to the hotel for a comfortable overnight stay.`,
      activities: dayHighlights,
    });
  }

  if (seed.days > 1) {
    days.push({
      day: seed.days,
      title: `Departure from ${place}`,
      description: `Enjoy breakfast at the hotel and, depending on your flight/train timing, some last-minute shopping or leisure time. Our representative will transfer you to the airport/station for your onward journey with unforgettable memories of ${place}.`,
      activities: ["Breakfast at hotel", "Last minute shopping", "Transfer to airport/station"],
    });
  }
  return days;
}

function buildHotels(seed, tier) {
  const place = seed.destinationName;
  const stars = tier === "luxury" ? 5 : tier === "premium" ? 4 : 3;
  return [
    { name: `The Grand ${place} Palace`, category: `${stars} Star`, location: `Central ${place}` },
    { name: `${place} Hillview Resort & Spa`, category: `${stars} Star`, location: `${place} Outskirts` },
    { name: `Lake ${place} Boutique Stay`, category: `${Math.max(stars - 1, 3)} Star`, location: `Near ${place} City Center` },
  ];
}

function buildFaqs(seed) {
  const place = seed.destinationName;
  return [
    { q: `What is the best time to visit ${place}?`, a: `The best time to visit ${place} is ${seed.best}, when the weather is most pleasant for sightseeing and outdoor activities.` },
    { q: `How many days are ideal for a ${place} trip?`, a: `Our recommended itinerary for ${place} is ${seed.nights} Nights / ${seed.days} Days, which comfortably covers all major highlights. It can be customized based on your preferences.` },
    { q: `Is this ${seed.name} customizable?`, a: `Yes, every PKP Holidays package including this ${seed.name} can be fully customized — hotel category, duration, activities and travel dates can all be tailored to your needs.` },
    { q: `What is included in the ${seed.name} price?`, a: `The price includes accommodation, breakfast, all transfers and sightseeing as per the itinerary, and support from our tour manager. Please refer to the Inclusions section for full details.` },
    { q: `Do you provide EMI or installment payment options?`, a: `Yes, we offer flexible payment plans and EMI options on select packages. Contact our travel experts on WhatsApp or call for more details.` },
  ];
}

function buildReviews(seed) {
  const place = seed.destinationName;
  const comments = [
    `Our trip to ${place} was absolutely magical! PKP Holidays took care of every little detail.`,
    `Well organized itinerary for ${place}, comfortable hotels and a super friendly tour manager. Highly recommend!`,
    `${place} exceeded our expectations. Great value for money and zero hassle from start to finish.`,
  ];
  return comments.map((comment, i) => ({
    name: REVIEWER_NAMES[(REVIEWER_NAMES.length + i * 3 + place.length) % REVIEWER_NAMES.length],
    rating: Math.max(4, Math.round(seed.rating)),
    date: "2026-0" + ((i % 6) + 1) + "-1" + i,
    comment,
  }));
}

function buildPackingTips(seed) {
  const tips = ["Comfortable walking shoes", "Reusable water bottle", "Personal medication & first-aid essentials", "Power bank and travel adapter", "Valid ID proof / passport copies"];
  if (seed.categories.includes("hill-station") || seed.categories.includes("adventure")) tips.push("Warm layered jackets and thermal wear", "Sunscreen with high SPF for high altitude");
  if (seed.categories.includes("beach")) tips.push("Swimwear and quick-dry clothing", "Sunglasses and a wide-brim hat");
  if (seed.categories.includes("religious")) tips.push("Modest, comfortable clothing for temple visits");
  if (seed.type === "international") tips.push("Passport, visa copies and travel insurance documents", "Currency exchange / international debit card");
  return tips;
}

export const packages = destinationSeeds.map((seed) => {
  const slug = slugify(seed.name);
  const tier = priceTier(seed.price);
  const stars = tier === "luxury" ? 5 : tier === "premium" ? 4 : 3;
  return {
    slug,
    name: seed.name,
    destinationName: seed.destinationName,
    title: seed.name,
    tagline: seed.tag,
    country: seed.country,
    state: seed.state || null,
    type: seed.type,
    categories: seed.categories,
    categoryLabels: seed.categories.map((c) => CATEGORY_LABELS[c] || c),
    duration: { days: seed.days, nights: seed.nights },
    durationLabel: `${seed.nights}N / ${seed.days}D`,
    price: seed.price,
    originalPrice: Math.round(seed.price * 1.22 / 100) * 100,
    rating: seed.rating,
    reviewCount: 80 + (seed.name.length * 7) % 260,
    starCategory: stars,
    heroImage: heroImage(seed),
    gallery: galleryImages(seed, 8),
    video: null,
    shortDescription: `Discover ${seed.destinationName}, ${seed.tag.toLowerCase()}, with our specially curated ${seed.nights}N/${seed.days}D tour package featuring handpicked hotels, guided sightseeing and seamless travel arrangements.`,
    overview: `${seed.destinationName} is one of ${seed.type === "international" ? "the world's" : "India's"} most sought-after destinations, known as the "${seed.tag}". This ${seed.nights} Nights / ${seed.days} Days tour by PKP Holidays is thoughtfully designed to help you experience the very best of ${seed.destinationName} — from iconic landmarks and natural wonders to authentic local culture and cuisine. Travel in comfort with handpicked ${stars}-star accommodations, private transfers, and the support of our experienced travel experts at every step, so all you need to do is enjoy the journey.`,
  highlights: seed.highlights,
    itinerary: buildItinerary(seed),
    inclusions: buildInclusions(seed, tier),
    exclusions: buildExclusions(seed),
    hotels: buildHotels(seed, tier),
    transportation:
      seed.type === "international"
        ? ["Airport pickup & drop in a private vehicle", "AC coach / car for all sightseeing and transfers", "Inter-city transfers as per itinerary"]
        : ["Private AC vehicle for airport/station pickup & drop", "AC vehicle for all sightseeing as per itinerary", "Experienced local driver-cum-guide"],
    meals: tier === "value" ? "Daily breakfast at the hotel" : tier === "premium" ? "Daily breakfast and dinner (MAP)" : "Daily breakfast, lunch and dinner (all meals included)",
    activities: seed.highlights,
    bestTimeToVisit: seed.best,
    packingTips: buildPackingTips(seed),
    faqs: buildFaqs(seed),
    reviews: buildReviews(seed),
    mapQuery: encodeURIComponent(`${seed.destinationName} ${seed.state || seed.country}`),
  };
});

export function getAllPackages() {
  return packages;
}
export function getPackageBySlug(slug) {
  return packages.find((p) => p.slug === slug);
}
export function getPackagesByCategory(category) {
  return packages.filter((p) => p.categories.includes(category));
}
export function getPackagesByType(type) {
  return packages.filter((p) => p.type === type);
}
export function getRelatedPackages(pkg, count = 4) {
  return packages
    .filter((p) => p.slug !== pkg.slug && (p.type === pkg.type || p.categories.some((c) => pkg.categories.includes(c))))
    .slice(0, count);
}
export function getFeaturedPackages(count = 8) {
  return [...packages].sort((a, b) => b.rating - a.rating).slice(0, count);
}
export function getTrendingPackages(count = 8) {
  return [...packages].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, count);
}
