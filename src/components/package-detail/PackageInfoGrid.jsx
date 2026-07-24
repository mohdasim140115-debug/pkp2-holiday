import { Hotel, Bus, UtensilsCrossed, Ticket, CalendarCheck, Backpack, CheckCircle2, XCircle } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function PackageInfoGrid({ pkg }) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FadeIn className="bg-white rounded-2xl border border-navy/10 p-6" y={16}>
          <h3 className="font-display font-bold text-navy flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-sky" /> Inclusions
          </h3>
          <ul className="space-y-2.5">
            {pkg.inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-navy/70">
                <CheckCircle2 className="w-4 h-4 text-sky mt-0.5 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn className="bg-white rounded-2xl border border-navy/10 p-6" y={16} delay={0.06}>
          <h3 className="font-display font-bold text-navy flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-navy/40" /> Exclusions
          </h3>
          <ul className="space-y-2.5">
            {pkg.exclusions.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-navy/70">
                <XCircle className="w-4 h-4 text-navy/30 mt-0.5 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FadeIn className="bg-white rounded-2xl border border-navy/10 p-6" y={16}>
          <h3 className="font-display font-bold text-navy flex items-center gap-2 mb-4">
            <Hotel className="w-5 h-5 text-sky" /> Hotels
          </h3>
          <ul className="space-y-3">
            {pkg.hotels.map((h) => (
              <li key={h.name} className="flex items-center justify-between text-sm">
                <span className="text-navy/80 font-medium">{h.name}</span>
                <span className="text-navy/50 text-xs">{h.category}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn className="bg-white rounded-2xl border border-navy/10 p-6" y={16} delay={0.06}>
          <h3 className="font-display font-bold text-navy flex items-center gap-2 mb-4">
            <Bus className="w-5 h-5 text-sky" /> Transportation
          </h3>
          <ul className="space-y-2.5">
            {pkg.transportation.map((t) => (
              <li key={t} className="text-sm text-navy/70">{t}</li>
            ))}
          </ul>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <FadeIn className="bg-white rounded-2xl border border-navy/10 p-6" y={16}>
          <h3 className="font-display font-bold text-navy flex items-center gap-2 mb-3">
            <UtensilsCrossed className="w-5 h-5 text-sky" /> Meals
          </h3>
          <p className="text-sm text-navy/70">{pkg.meals}</p>
        </FadeIn>
        <FadeIn className="bg-white rounded-2xl border border-navy/10 p-6" y={16} delay={0.06}>
          <h3 className="font-display font-bold text-navy flex items-center gap-2 mb-3">
            <CalendarCheck className="w-5 h-5 text-sky" /> Best Time To Visit
          </h3>
          <p className="text-sm text-navy/70">{pkg.bestTimeToVisit}</p>
        </FadeIn>
        <FadeIn className="bg-white rounded-2xl border border-navy/10 p-6" y={16} delay={0.12}>
          <h3 className="font-display font-bold text-navy flex items-center gap-2 mb-3">
            <Ticket className="w-5 h-5 text-sky" /> Key Activities
          </h3>
          <p className="text-sm text-navy/70">{pkg.activities.slice(0, 3).join(", ")}</p>
        </FadeIn>
      </div>

      <FadeIn className="bg-white rounded-2xl border border-navy/10 p-6" y={16}>
        <h3 className="font-display font-bold text-navy flex items-center gap-2 mb-4">
          <Backpack className="w-5 h-5 text-sky" /> Packing Tips
        </h3>
        <div className="flex flex-wrap gap-2">
          {pkg.packingTips.map((tip) => (
            <span key={tip} className="bg-offwhite text-navy/70 text-xs font-medium px-3 py-2 rounded-full">{tip}</span>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
