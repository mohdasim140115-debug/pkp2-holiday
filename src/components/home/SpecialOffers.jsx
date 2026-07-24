import Image from "next/image";
import Link from "next/link";
import { Tag, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { travelImage } from "@/lib/images";

const offers = [
  { code: "HONEYMOON10", title: "Flat 10% Off Honeymoon Packages", desc: "Book your romantic getaway before Sep 30 and save extra.", href: "/honeymoon-packages", tags: ["couple", "honeymoon"] },
  { code: "EARLYBIRD", title: "Early Bird International Deals", desc: "Save up to ₹15,000 on Bali, Dubai & Thailand tours.", href: "/international-tours", tags: ["bali", "temple"] },
  { code: "GROUP5", title: "Group Tours, Extra Savings", desc: "Travel with 5+ friends and unlock special group pricing.", href: "/group-tours", tags: ["group", "friends"] },
];

export default function SpecialOffers() {
  return (
    <section className="bg-white pb-16 sm:pb-24">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Link
              key={offer.code}
              href={offer.href}
              className="group relative rounded-3xl overflow-hidden h-64 luxury-shadow"
            >
              <Image src={travelImage(offer.tags, 600, 500, offer.code)} alt={offer.title} fill sizes="400px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <span className="inline-flex items-center gap-1.5 self-start bg-gold text-navy text-xs font-bold px-3 py-1.5 rounded-full">
                  <Tag className="w-3 h-3" /> {offer.code}
                </span>
                <div>
                  <h3 className="font-display font-bold text-xl text-white leading-snug">{offer.title}</h3>
                  <p className="text-white/70 text-sm mt-1">{offer.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sky text-sm font-semibold mt-3">
                    Claim Offer <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
