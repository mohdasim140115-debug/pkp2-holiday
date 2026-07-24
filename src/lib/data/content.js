import { travelImage, avatarImage } from "@/lib/images";

export const testimonials = [
  { name: "Ankit & Riya Sharma", location: "Mumbai", trip: "Kashmir Honeymoon", rating: 5, avatar: avatarImage("t1"), text: "PKP Holidays planned the most magical honeymoon for us in Kashmir. The houseboat stay and Gulmarg gondola ride were unforgettable. Every detail was handled perfectly!" },
  { name: "Rohan Gupta", location: "Delhi", trip: "Bali Family Trip", rating: 5, avatar: avatarImage("t2"), text: "Traveled with my parents and kids to Bali — the itinerary was perfectly paced for all age groups. Our tour manager was extremely helpful throughout." },
  { name: "Simran Kaur", location: "Chandigarh", trip: "Dubai Getaway", rating: 5, avatar: avatarImage("t3"), text: "Best travel agency I've booked with! Dubai desert safari and Burj Khalifa visit were arranged flawlessly. Highly recommend PKP Holidays." },
  { name: "Vivek & Family", location: "Ranchi", trip: "Kerala Backwaters", rating: 5, avatar: avatarImage("t4"), text: "Our Kerala houseboat experience was beyond expectations. Being from Ranchi, it was great to find a local agency offering such premium service." },
  { name: "Neha Choudhary", location: "Bengaluru", trip: "Switzerland Tour", rating: 5, avatar: avatarImage("t5"), text: "A dream European vacation made effortless. The Jungfraujoch train ride was breathtaking. Thank you PKP Holidays for the flawless planning!" },
  { name: "Amit & Sonal", location: "Pune", trip: "Andaman Honeymoon", rating: 4, avatar: avatarImage("t6"), text: "Radhanagar Beach at sunset was pure magic. Great hotel selections and smooth transfers throughout our Andaman trip." },
];

export const videoTestimonials = [
  { name: "The Malhotra Family", trip: "Rajasthan Heritage Tour", thumbnail: travelImage(["rajasthan", "family", "travel"], 700, 450, "vt1") },
  { name: "Aditi & Karan", trip: "Maldives Honeymoon", thumbnail: travelImage(["maldives", "couple", "beach"], 700, 450, "vt2") },
  { name: "Team Corporate Offsite", trip: "Goa Corporate Retreat", thumbnail: travelImage(["goa", "team", "resort"], 700, 450, "vt3") },
];

export const stats = [
  { label: "Happy Travelers", value: 25000, suffix: "+" },
  { label: "Destinations Covered", value: 120, suffix: "+" },
  { label: "Tour Packages", value: 500, suffix: "+" },
  { label: "Years of Excellence", value: 12, suffix: "+" },
];

export const whyChooseUs = [
  { title: "Handpicked Hotels", desc: "Only the best-vetted stays make it into our itineraries, from boutique properties to 5-star luxury resorts.", icon: "Hotel" },
  { title: "24/7 Travel Support", desc: "Our team is available round the clock during your trip so help is always a call or message away.", icon: "Headset" },
  { title: "Best Price Guarantee", desc: "Transparent pricing with no hidden costs, and flexible payment plans on every package.", icon: "BadgeIndianRupee" },
  { title: "Customized Itineraries", desc: "Every trip is tailored to your pace, budget and interests — never a rigid, one-size-fits-all package.", icon: "MapPinned" },
  { title: "Expert Local Guides", desc: "Verified, experienced guides who bring every destination's culture and history to life.", icon: "Compass" },
  { title: "Hassle-Free Visa Support", desc: "End-to-end visa documentation and processing assistance for all major destinations.", icon: "FileCheck2" },
];

export const services = [
  { title: "Tour Packages", desc: "Domestic & international holidays curated end-to-end.", icon: "Plane", href: "/packages" },
  { title: "Hotel Booking", desc: "Handpicked stays at the best available rates.", icon: "Hotel", href: "/hotels" },
  { title: "Flight Booking", desc: "Domestic & international flights at the best fares.", icon: "TicketCheck", href: "/flight-booking" },
  { title: "Visa Assistance", desc: "Complete visa documentation and processing support.", icon: "Stamp", href: "/visa-assistance" },
  { title: "Group & Corporate Tours", desc: "MICE, offsites and large group travel management.", icon: "Users", href: "/corporate-tours" },
  { title: "Luxury Holidays", desc: "Indulgent, five-star curated travel experiences.", icon: "Gem", href: "/luxury-holidays" },
];

export const howWeWork = [
  { step: "01", title: "Share Your Requirements", desc: "Tell us your destination, dates, budget and travel style.", icon: "MessageSquareText" },
  { step: "02", title: "Get a Custom Itinerary", desc: "Our experts design a personalized plan just for you.", icon: "FileText" },
  { step: "03", title: "Book with Confidence", desc: "Secure your trip with flexible, transparent payment options.", icon: "ShieldCheck" },
  { step: "04", title: "Travel & Create Memories", desc: "Relax while we handle everything — travel, stay and support.", icon: "Luggage" },
];

const GALLERY_TAGS = [
  "kashmir,houseboat", "goa,beach", "kerala,backwaters", "rajasthan,palace",
  "andaman,island", "manali,mountains", "bali,temple", "dubai,skyline",
  "ladakh,lake", "switzerland,alps", "maldives,resort", "darjeeling,tea",
  "udaipur,lake", "sikkim,himalaya", "coorg,coffee", "thailand,islands",
  "varanasi,ganges", "meghalaya,waterfall", "singapore,marina", "turkey,cappadocia",
  "munnar,hills", "jaipur,fort", "vietnam,halongbay", "spiti,valley",
];

export const galleryImages = GALLERY_TAGS.map((tag, i) => ({
  src: travelImage(tag.split(","), 800, i % 3 === 0 ? 1000 : 650, `gallery-${i}`),
  alt: `PKP Holidays travel gallery photo ${i + 1}`,
}));

const INSTA_TAGS = ["kashmir", "goa,beach", "bali", "kerala,houseboat", "dubai", "rajasthan", "maldives", "manali"];

export const instagramPosts = INSTA_TAGS.map((tag, i) => ({
  src: travelImage(tag.split(","), 500, 500, `insta-${i}`),
  href: "https://instagram.com/pkpholidays",
}));

export const siteFaqs = [
  { q: "How do I book a tour package with PKP Holidays?", a: "You can book directly through our website by selecting a package and submitting the enquiry form, or by calling / WhatsApping us at +91 7903245327. Our travel expert will get in touch to finalize your itinerary and payment." },
  { q: "Do you offer customized tour packages?", a: "Yes, every package can be tailored to your budget, duration and interests. Share your requirements and our team will design a custom itinerary for you." },
  { q: "What payment methods do you accept?", a: "We accept bank transfers, UPI, credit/debit cards, and offer EMI options on select packages." },
  { q: "Is travel insurance included in the packages?", a: "Travel insurance is not included by default but can be added to any package on request." },
  { q: "Can I cancel or reschedule my booking?", a: "Yes, cancellations and rescheduling are subject to our Cancellation Policy. Please refer to that page or contact our support team for details specific to your booking." },
  { q: "Do you assist with visa processing?", a: "Yes, we provide complete visa documentation and processing assistance for all major international destinations." },
  { q: "Are your tours suitable for solo travelers?", a: "Absolutely — many of our group tours are solo-traveler friendly, and we can also arrange fully personalized solo itineraries." },
  { q: "How far in advance should I book my trip?", a: "We recommend booking at least 4-6 weeks in advance for domestic trips and 8-12 weeks for international trips to get the best rates and availability." },
];
