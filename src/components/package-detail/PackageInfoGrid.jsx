import { Hotel, Bus, UtensilsCrossed, Ticket, CalendarCheck, Backpack, CheckCircle2, XCircle } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

function CardHeading({ icon: Icon, children, tone = "sky" }) {
  const tones = {
    sky: "bg-sky/10 text-sky",
    muted: "bg-navy/8 text-navy/50",
  };
  return (
    <h3 className="font-display font-bold text-navy text-lg flex items-center gap-3 mb-5">
      <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${tones[tone]}`}>
        <Icon className="w-4.5 h-4.5" />
      </span>
      {children}
    </h3>
  );
}

const cardClass = "bg-white rounded-2xl ring-1 ring-navy/8 luxury-shadow p-6 sm:p-7";

export default function PackageInfoGrid({ pkg }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FadeIn className={cardClass} y={16}>
          <CardHeading icon={CheckCircle2}>Inclusions</CardHeading>
          <ul className="space-y-3">
            {pkg.inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-navy/70 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-sky mt-0.5 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn className={cardClass} y={16} delay={0.06}>
          <CardHeading icon={XCircle} tone="muted">Exclusions</CardHeading>
          <ul className="space-y-3">
            {pkg.exclusions.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-navy/70 leading-relaxed">
                <XCircle className="w-4 h-4 text-navy/30 mt-0.5 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FadeIn className={cardClass} y={16}>
          <CardHeading icon={Hotel}>Hotels</CardHeading>
          <ul className="space-y-3.5">
            {pkg.hotels.map((h) => (
              <li key={h.name} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-navy/80 font-medium">{h.name}</span>
                <span className="shrink-0 text-navy/50 text-xs font-semibold bg-offwhite px-2.5 py-1 rounded-full">{h.category}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn className={cardClass} y={16} delay={0.06}>
          <CardHeading icon={Bus}>Transportation</CardHeading>
          <ul className="space-y-2.5">
            {pkg.transportation.map((t) => (
              <li key={t} className="text-sm text-navy/70 leading-relaxed">{t}</li>
            ))}
          </ul>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <FadeIn className={cardClass} y={16}>
          <CardHeading icon={UtensilsCrossed}>Meals</CardHeading>
          <p className="text-sm text-navy/70 leading-relaxed">{pkg.meals}</p>
        </FadeIn>
        <FadeIn className={cardClass} y={16} delay={0.06}>
          <CardHeading icon={CalendarCheck}>Best Time To Visit</CardHeading>
          <p className="text-sm text-navy/70 leading-relaxed">{pkg.bestTimeToVisit}</p>
        </FadeIn>
        <FadeIn className={cardClass} y={16} delay={0.12}>
          <CardHeading icon={Ticket}>Key Activities</CardHeading>
          <p className="text-sm text-navy/70 leading-relaxed">{pkg.activities.slice(0, 3).join(", ")}</p>
        </FadeIn>
      </div>

      <FadeIn className={cardClass} y={16}>
        <CardHeading icon={Backpack}>Packing Tips</CardHeading>
        <div className="flex flex-wrap gap-2">
          {pkg.packingTips.map((tip) => (
            <span key={tip} className="bg-offwhite text-navy/70 text-xs font-semibold px-3 py-2 rounded-full">{tip}</span>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
