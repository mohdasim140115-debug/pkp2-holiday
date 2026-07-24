import Container from "@/components/ui/Container";
import Counter from "@/components/ui/Counter";
import { stats } from "@/lib/data/content";

export default function Stats() {
  return (
    <section className="bg-gradient-to-br from-navy to-blue py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl sm:text-5xl font-bold text-white">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-white/70 text-xs sm:text-sm mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
