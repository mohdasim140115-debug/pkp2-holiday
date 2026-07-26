"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import PackageCard from "@/components/shared/PackageCard";
import clsx from "clsx";
import categoryList from "../../../data/categories.json";

const TYPE_OPTIONS = [
  { key: "domestic", label: "Domestic", type: true },
  { key: "international", label: "International", type: true },
];

const CATEGORY_OPTIONS = [
  ...TYPE_OPTIONS,
  ...categoryList.map((c) => ({ key: c.id, label: c.label })),
];

const BUDGETS = [
  { key: "under20", label: "Under ₹20,000", test: (p) => p.price < 20000 },
  { key: "20to50", label: "₹20,000 - ₹50,000", test: (p) => p.price >= 20000 && p.price <= 50000 },
  { key: "50to100", label: "₹50,000 - ₹1,00,000", test: (p) => p.price > 50000 && p.price <= 100000 },
  { key: "above100", label: "Above ₹1,00,000", test: (p) => p.price > 100000 },
];

const DURATIONS = [
  { key: "short", label: "Up to 3 Days", test: (p) => p.duration.days <= 3 },
  { key: "medium", label: "4 - 6 Days", test: (p) => p.duration.days >= 4 && p.duration.days <= 6 },
  { key: "long", label: "7+ Days", test: (p) => p.duration.days >= 7 },
];

export default function PackagesExplorer({ packages, initialCategory }) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [categories, setCategories] = useState(initialCategory ? [initialCategory] : []);
  const [budget, setBudget] = useState(null);
  const [duration, setDuration] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  function toggleCategory(key) {
    setCategories((c) => (c.includes(key) ? c.filter((x) => x !== key) : [...c, key]));
  }

  const filtered = useMemo(() => {
    let list = packages.filter((p) => {
      if (search && !`${p.name} ${p.country} ${p.state || ""}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (categories.length && !categories.some((c) => p.categories.includes(c) || p.type === c)) return false;
      if (budget) {
        const b = BUDGETS.find((x) => x.key === budget);
        if (b && !b.test(p)) return false;
      }
      if (duration) {
        const d = DURATIONS.find((x) => x.key === duration);
        if (d && !d.test(p)) return false;
      }
      if (p.rating < minRating) return false;
      return true;
    });

    if (sort === "priceLow") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "priceHigh") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);

    return list;
  }, [packages, search, categories, budget, duration, minRating, sort]);

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <h4 className="font-display font-bold text-navy mb-3">Tour Type & Category</h4>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((c) => (
            <button
              key={c.key}
              onClick={() => toggleCategory(c.key)}
              className={clsx(
                "px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors",
                categories.includes(c.key) ? "bg-navy text-white border-navy" : "border-navy/15 text-navy/60 hover:border-navy/40"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display font-bold text-navy mb-3">Budget</h4>
        <div className="space-y-2">
          {BUDGETS.map((b) => (
            <label key={b.key} className="flex items-center gap-2.5 text-sm text-navy/70 cursor-pointer">
              <input
                type="radio"
                name="budget"
                checked={budget === b.key}
                onChange={() => setBudget(budget === b.key ? null : b.key)}
                className="accent-sky w-4 h-4"
              />
              {b.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display font-bold text-navy mb-3">Duration</h4>
        <div className="space-y-2">
          {DURATIONS.map((d) => (
            <label key={d.key} className="flex items-center gap-2.5 text-sm text-navy/70 cursor-pointer">
              <input
                type="radio"
                name="duration"
                checked={duration === d.key}
                onChange={() => setDuration(duration === d.key ? null : d.key)}
                className="accent-sky w-4 h-4"
              />
              {d.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display font-bold text-navy mb-3">Minimum Rating</h4>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={clsx(
                "flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold border transition-colors",
                minRating === r ? "bg-gold text-navy border-gold" : "border-navy/15 text-navy/60 hover:border-navy/40"
              )}
            >
              <Star className="w-3 h-3" /> {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Container className="py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-navy/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by destination, country or state..."
            className="w-full bg-white border border-navy/15 rounded-full pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-white border border-navy/15 rounded-full px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky"
        >
          <option value="popular">Sort: Most Popular</option>
          <option value="rating">Sort: Highest Rated</option>
          <option value="priceLow">Sort: Price Low to High</option>
          <option value="priceHigh">Sort: Price High to Low</option>
        </select>
        <button
          onClick={() => setFiltersOpen(true)}
          className="lg:hidden inline-flex items-center justify-center gap-2 bg-navy text-white rounded-full px-5 py-3.5 text-sm font-semibold"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="hidden lg:block lg:col-span-3">
          <div className="bg-white rounded-3xl p-6 luxury-shadow sticky top-28">{FilterPanel}</div>
        </aside>

        <div className="lg:col-span-9">
          <p className="text-sm text-navy/60 mb-6">{filtered.length} packages found</p>
          {filtered.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl">
              <p className="text-navy/60">No packages match your filters. Try adjusting your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((pkg, i) => (
                <PackageCard key={pkg.slug} pkg={pkg} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-navy-dark/60 lg:hidden" onClick={() => setFiltersOpen(false)}>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 bottom-0 w-[86%] max-w-sm bg-white overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-xl text-navy">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full bg-navy/5">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {FilterPanel}
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full mt-8 bg-navy text-white rounded-full py-3.5 font-semibold"
              >
                Show {filtered.length} Results
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}
