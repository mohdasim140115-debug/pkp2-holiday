export const packageMenu = [
  { label: "All Tour Packages", href: "/packages", desc: "Browse our full collection" },
  { label: "Domestic Tours", href: "/domestic-tours", desc: "Explore incredible India" },
  { label: "International Tours", href: "/international-tours", desc: "Journeys across the globe" },
  { label: "Honeymoon Packages", href: "/honeymoon-packages", desc: "Romantic getaways for two" },
  { label: "Family Packages", href: "/family-packages", desc: "Memories for the whole family" },
  { label: "Adventure Tours", href: "/adventure-tours", desc: "Thrilling outdoor experiences" },
  { label: "Religious Tours", href: "/religious-tours", desc: "Spiritual & pilgrimage journeys" },
  { label: "Weekend Getaways", href: "/weekend-getaways", desc: "Quick refreshing escapes" },
  { label: "Group Tours", href: "/group-tours", desc: "Travel together, save together" },
  { label: "Corporate Tours", href: "/corporate-tours", desc: "MICE & offsite travel" },
  { label: "Luxury Holidays", href: "/luxury-holidays", desc: "Indulgent 5-star experiences" },
];

export const servicesMenu = [
  { label: "Hotels", href: "/hotels", desc: "Handpicked stays worldwide" },
  { label: "Flight Booking", href: "/flight-booking", desc: "Best fares, zero hassle" },
  { label: "Visa Assistance", href: "/visa-assistance", desc: "End-to-end visa support" },
];

export const companyMenu = [
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages", mega: "packages" },
  { label: "Services", href: "/hotels", mega: "services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  packages: packageMenu.slice(0, 8),
  company: companyMenu,
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cancellation Policy", href: "/cancellation-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Sitemap", href: "/sitemap-page" },
  ],
};
