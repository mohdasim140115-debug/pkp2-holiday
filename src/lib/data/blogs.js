import { slugify } from "./packages";
import { travelImage } from "@/lib/images";

const CATEGORY_TAGS = {
  "Travel Tips": ["travel", "suitcase", "airport"],
  "Visa Guide": ["passport", "travel", "documents"],
  "Packing Tips": ["packing", "suitcase", "travel"],
  "Budget Travel": ["backpacker", "travel", "budget"],
  "Best Time To Visit": ["hillstation", "mountains", "india"],
  "Top Honeymoon Places": ["couple", "beach", "sunset"],
  "Family Vacation Guide": ["family", "travel", "vacation"],
  "Adventure Guide": ["trekking", "adventure", "mountains"],
};

const rawBlogs = [
  {
    title: "10 Essential Travel Tips for a Stress-Free Vacation",
    category: "Travel Tips",
    excerpt: "From packing smart to planning ahead, here are our top tips to make your next vacation smooth and stress-free.",
    body: [
      "Great trips start with great preparation. Whether you're heading to the hills or hopping on an international flight, a little planning goes a long way toward a stress-free holiday.",
      "Start by researching your destination's weather, culture and local customs well in advance. This helps you pack appropriately and avoid any cultural faux pas during your travels.",
      "Always keep digital and physical copies of important documents — passport, ID, hotel bookings and travel insurance — in separate places in case one gets lost.",
      "Pack light but smart: choose versatile clothing that can be mixed and matched, and always carry a basic first-aid kit and any personal medication.",
      "Finally, build some buffer time into your itinerary. Rushing between attractions takes the joy out of travel — leave room to slow down and simply enjoy the moment.",
    ],
  },
  {
    title: "The Complete Visa Guide for First-Time International Travelers",
    category: "Visa Guide",
    excerpt: "Everything you need to know about visa types, documentation and processing times before your first international trip.",
    body: [
      "Applying for a visa can feel overwhelming for first-time travelers, but understanding the basics makes the process far less intimidating.",
      "Start by identifying the correct visa type for your trip — tourist, business, or transit — as requirements vary significantly between categories.",
      "Most countries require a passport valid for at least six months beyond your travel dates, recent passport-sized photographs, proof of accommodation, and return flight tickets.",
      "Processing times vary widely — some e-visas are approved within 48 hours, while others may take several weeks. Always apply well in advance of your travel dates.",
      "PKP Holidays offers end-to-end visa assistance, handling documentation and application submission so you can focus on planning the fun parts of your trip.",
    ],
  },
  {
    title: "Smart Packing Tips: What to Carry for Every Type of Trip",
    category: "Packing Tips",
    excerpt: "A practical packing checklist for beach holidays, hill stations, adventure trips and international vacations.",
    body: [
      "Packing well is an art — the goal is to carry everything you need without overloading your suitcase.",
      "For beach holidays, prioritize breathable fabrics, swimwear, reef-safe sunscreen and a good pair of sandals.",
      "Hill station trips call for layered clothing — thermal wear, a warm jacket, and comfortable trekking shoes are essential, even in the warmer months.",
      "Adventure trips require specialized gear depending on the activity — quick-dry clothing, a sturdy backpack, and any activity-specific equipment your tour operator recommends.",
      "For international trips, always pack a universal adapter, a portable charger, and photocopies of your essential documents in a separate bag from the originals.",
    ],
  },
  {
    title: "Budget Travel: How to See the World Without Breaking the Bank",
    category: "Budget Travel",
    excerpt: "Practical strategies to stretch your travel budget further without compromising on the experience.",
    body: [
      "Traveling on a budget doesn't mean compromising on unforgettable experiences — it just means traveling smarter.",
      "Book flights and hotels early, and stay flexible with your travel dates to take advantage of off-peak pricing.",
      "Consider shoulder-season travel — the weather is often still great, but prices for flights and hotels drop significantly compared to peak season.",
      "Opt for group tours where costs are shared, or ask PKP Holidays about our value-tier packages that combine comfort with affordability.",
      "Local street food, public transport, and free walking tours are excellent ways to experience a destination authentically while keeping costs low.",
    ],
  },
  {
    title: "Best Time to Visit India's Top Hill Stations",
    category: "Best Time To Visit",
    excerpt: "A season-by-season guide to visiting Manali, Shimla, Ooty, Darjeeling and Coorg at their scenic best.",
    body: [
      "India's hill stations offer something magical in every season, but timing your visit right makes all the difference.",
      "Manali and Shimla are best visited between March-June for pleasant weather, or December-February if you're chasing snowfall.",
      "Ooty and Coorg in the south are best explored October through June, avoiding the heavy southwest monsoon months.",
      "Darjeeling shines between March-May and October-December, offering clear views of the Kanchenjunga range.",
      "Whichever hill station you choose, PKP Holidays can help you time your trip perfectly to match your preferred experience — from snow adventures to blooming valleys."
    ],
  },
  {
    title: "Top 10 Honeymoon Destinations for Every Budget",
    category: "Top Honeymoon Places",
    excerpt: "From luxurious Maldives overwater villas to romantic Kashmir houseboats — honeymoon destinations for every budget.",
    body: [
      "Your honeymoon should be as unique as your relationship — and thankfully, there's a perfect destination for every budget.",
      "For ultimate luxury, the Maldives and Mauritius offer unmatched overwater villas and private beach experiences.",
      "Mid-range romantics love Bali, Thailand and Turkey for their blend of natural beauty, culture and affordability.",
      "Domestically, Kashmir, Udaipur, and Andaman are stunning choices offering luxury experiences at a fraction of the cost of international travel.",
      "Talk to our honeymoon specialists at PKP Holidays to design a romantic itinerary that fits your budget perfectly."
    ],
  },
  {
    title: "The Ultimate Family Vacation Planning Guide",
    category: "Family Vacation Guide",
    excerpt: "Tips for planning a trip that keeps every family member — from toddlers to grandparents — happy and comfortable.",
    body: [
      "Planning a family vacation that works for every age group takes a little extra thought, but the payoff in shared memories is priceless.",
      "Choose destinations with a mix of activities — cultural sites for the adults, adventure for the teens, and easy, safe spaces for younger kids.",
      "Look for family-friendly accommodations with connecting rooms or suites, and check if kid-friendly meal options are available.",
      "Build rest days into the itinerary — packing every day with activities can quickly exhaust younger travelers and grandparents alike.",
      "PKP Holidays' family packages are designed with exactly this balance in mind, ensuring every generation enjoys the trip equally."
    ],
  },
  {
    title: "A Beginner's Guide to Adventure Travel",
    category: "Adventure Guide",
    excerpt: "New to adventure travel? Here's how to choose your first trekking, rafting or paragliding experience safely.",
    body: [
      "Adventure travel can be exhilarating, but a little preparation ensures your first experience is safe and enjoyable.",
      "Start with beginner-friendly activities like short treks, river rafting on grade 1-2 rapids, or tandem paragliding before progressing to more advanced experiences.",
      "Always book adventure activities through certified operators with proper safety equipment and trained instructors.",
      "Physical preparation matters — build up your stamina with regular walks or light cardio in the weeks leading up to a trekking trip.",
      "PKP Holidays partners only with verified adventure operators across Manali, Rishikesh, Ladakh and beyond to ensure your safety every step of the way."
    ],
  },
];

export const blogs = rawBlogs.map((b, i) => ({
  slug: slugify(b.title),
  id: i + 1,
  date: `2026-0${(i % 6) + 1}-1${i}`,
  author: "PKP Holidays Team",
  readTime: `${5 + (i % 4)} min read`,
  image: travelImage(CATEGORY_TAGS[b.category] || ["travel"], 1200, 700, `blog-${i}`),
  ...b,
}));

export function getBlogBySlug(slug) {
  return blogs.find((b) => b.slug === slug);
}
export function getRelatedBlogs(blog, count = 3) {
  return blogs.filter((b) => b.slug !== blog.slug).slice(0, count);
}
