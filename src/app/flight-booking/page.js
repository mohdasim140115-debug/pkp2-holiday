import { Plane, TicketCheck, Wallet, Headset, MessageSquareText, Search, CalendarCheck, ThumbsUp } from "lucide-react";
import ServicePageTemplate from "@/components/shared/ServicePageTemplate";

export const metadata = {
  title: "Flight Booking — Domestic & International Flights",
  description: "Book domestic and international flights with PKP Holidays at the best fares. Hassle-free ticketing with dedicated travel support.",
  alternates: { canonical: "/flight-booking" },
};

const features = [
  { title: "Domestic & International", desc: "Flights to every major destination, in India and abroad.", icon: Plane },
  { title: "Best Fare Search", desc: "We compare across airlines to find you the most competitive fares.", icon: Wallet },
  { title: "Instant E-Tickets", desc: "Get confirmed e-tickets quickly with zero paperwork hassle.", icon: TicketCheck },
  { title: "24/7 Travel Support", desc: "Assistance with rescheduling, cancellations and travel updates.", icon: Headset },
];

const process = [
  { title: "Share Travel Plan", desc: "Tell us your route, dates and preferred airline or class.", icon: MessageSquareText },
  { title: "Compare Best Fares", desc: "We search across airlines to find you the best value fare.", icon: Search },
  { title: "Confirm Booking", desc: "Approve the fare and we'll issue your confirmed e-ticket.", icon: CalendarCheck },
  { title: "Fly Stress-Free", desc: "Enjoy dedicated support for any changes before your flight.", icon: ThumbsUp },
];

const faqs = [
  { q: "Do you book both domestic and international flights?", a: "Yes, we book flights to all major domestic and international destinations across all leading airlines." },
  { q: "Can I book flights along with my tour package?", a: "Yes, flights can be bundled with any tour package for a seamless, all-in-one booking experience." },
  { q: "What if I need to reschedule my flight?", a: "Our team assists with rescheduling and cancellations as per the airline's policy, with minimal hassle." },
  { q: "Do you offer group flight bookings?", a: "Yes, we handle group flight bookings for corporate trips, weddings and large family travel groups." },
];

export default function FlightBookingPage() {
  return (
    <ServicePageTemplate
      title="Flight Booking"
      subtitle="Domestic and international flights at the best fares, booked and managed by our travel experts."
      image="/destinations/singapore.jpg"
      breadcrumbLabel="Flight Booking"
      breadcrumbHref="/flight-booking"
      features={features}
      process={process}
      faqs={faqs}
      formTitle="Book Your Flight"
    />
  );
}
