import React, { useMemo, useState } from 'react';
import {
  Ban,
  Leaf,
  Plus,
  Recycle,
  Search,
  X,
} from 'lucide-react';
import {
  CATEGORY_META,
  WASTE_ITEMS,
  WasteCategory,
  WasteItem,
  matchWasteQuery,
} from '../data/wasteItems';
import { HeroTrioIllustration } from './CategoryVisuals';

export function CategoryIcon({
  category,
  className = 'w-4 h-4',
}: {
  category: WasteCategory;
  className?: string;
}) {
  if (category === 'biodegradable') return <Leaf className={className} aria-hidden="true" />;
  if (category === 'recyclable') return <Recycle className={className} aria-hidden="true" />;
  return <Ban className={className} aria-hidden="true" />;
}

interface WasteClassifierHeroProps {
  selectedCategory: WasteCategory | null;
  onSelectCategory: (category: WasteCategory) => void;
  onLogItem: (name: string, category: WasteCategory) => void;
}

const QUICK_SAMPLES = [
  'Banana peel',
  'Pizza box',
  'Coffee cup',
  'Plastic bottle',
  'Chip bag',
  'Aluminum foil',
];

export const WasteClassifierHero: React.FC<WasteClassifierHeroProps> = ({
  selectedCategory,
  onSelectCategory,
  onLogItem,
}) => {
  const [query, setQuery] = useState('Pizza box');

  const matches = useMemo(() => matchWasteQuery(query), [query]);
  const topMatch: WasteItem | null = matches.length > 0 ? matches[0] : null;
  const topMeta = topMatch ? CATEGORY_META[topMatch.category] : null;

  return (
    <section id="classifier" className="pt-10 pb-14 border-b border-[#F1D5E2]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Zone: Headline + Instant Classifier */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-[#F1D5E2] rounded-2xl p-7 sm:p-9">
            <div>
              <p className="text-xs font-medium text-[#9D174D] mb-3 tracking-wide">
                Biodegradable · Recyclable · Non-Biodegradable
              </p>
              <h1
                className="font-display text-3xl sm:text-5xl font-semibold text-[#2B121F] tracking-tight leading-[1.12] mb-4"
                style={{ textWrap: 'balance' }}
              >
                Know exactly which bin every everyday item belongs in.
              </h1>
              <p className="text-base text-[#6E485A] leading-relaxed max-w-2xl mb-7">
                Type any household waste item below to check its classification, preparation
                step, and decomposition timeline—no account or sign-in needed.
              </p>

              {/* Search Input */}
              <div className="relative mb-3">
                <label htmlFor="instant-classifier-input" className="sr-only">
                  Search a waste item to classify
                </label>
                <Search
                  className="w-4 h-4 text-[#9D174D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="instant-classifier-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try banana peel, coffee cup, aluminum foil, battery..."
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#FFF8FB] border border-[#EBC6D7] text-[#2B121F] placeholder-[#9E788A] text-sm focus:outline-none focus:ring-2 focus:ring-[#DB2777] focus:border-[#DB2777]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#6E485A] hover:text-[#2B121F] rounded-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Sample Triggers */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-[#6E485A] mr-1">Try:</span>
                {QUICK_SAMPLES.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => setQuery(sample)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                      query.toLowerCase() === sample.toLowerCase()
                        ? 'bg-[#BE185D] border-[#BE185D] text-white'
                        : 'bg-[#FFF8FB] border-[#F1D5E2] text-[#5C394A] hover:border-[#DB2777]'
                    }`}
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            {/* Instant Classification Result Panel */}
            {topMatch && topMeta ? (
              <div
                className={`rounded-xl border p-5 transition-colors ${topMeta.surfaceClass} ${topMeta.borderClass}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <div className={`inline-flex items-center gap-1.5 text-xs font-semibold ${topMeta.textClass} mb-1`}>
                      <CategoryIcon category={topMatch.category} className="w-4 h-4" />
                      <span>{topMeta.label}</span>
                      <span aria-hidden="true">·</span>
                      <span>{topMeta.binColorLabel}</span>
                    </div>
                    <h2 className="font-display text-xl font-semibold text-[#2B121F]">
                      {topMatch.name}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => onLogItem(topMatch.name, topMatch.category)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Log Item</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5C394A] mb-3 font-mono tabular-nums">
                  <span>Breakdown: {topMatch.decompositionLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-sans">{topMatch.material}</span>
                </div>

                <p className="text-sm text-[#2B121F] leading-relaxed mb-2">
                  <span className="font-semibold">What to do: </span>
                  {topMatch.binInstruction}
                </p>
                <p className="text-xs text-[#5C394A] leading-relaxed">
                  <span className="font-semibold">Prep tip: </span>
                  {topMatch.preparationStep}
                </p>

                {matches.length > 1 && (
                  <div className="mt-4 pt-3 border-t border-black/10 flex flex-wrap items-center gap-2 text-xs text-[#5C394A]">
                    <span>Related matches:</span>
                    {matches.slice(1, 4).map((rel) => (
                      <button
                        key={rel.id}
                        type="button"
                        onClick={() => setQuery(rel.name)}
                        className="underline decoration-[#DB2777]/50 hover:text-[#BE185D] font-medium"
                      >
                        {rel.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-[#F1D5E2] bg-[#FFF8FB] p-5 text-sm text-[#6E485A]">
                {query.trim() ? (
                  <div>
                    <p className="font-medium text-[#2B121F] mb-1">
                      No exact match for &ldquo;{query}&rdquo; in our 30-item index.
                    </p>
                    <p className="text-xs leading-relaxed">
                      Rule of thumb: untreated food/plant matter is{' '}
                      <span className="font-semibold text-[#14532D]">Biodegradable</span>; clean
                      glass, metal, cardboard, and #1/#2 bottles are{' '}
                      <span className="font-semibold text-[#9D174D]">Recyclable</span>; mixed
                      wrappers, foam, and soiled ceramics are{' '}
                      <span className="font-semibold text-[#581C49]">Non-Biodegradable</span>.
                    </p>
                  </div>
                ) : (
                  <p>
                    Start typing an item name above—like &ldquo;eggshells&rdquo;,
                    &ldquo;styrofoam&rdquo;, or &ldquo;glass jar&rdquo;—to see where it goes.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Zone: Interactive Pink Trio Bin Showcase */}
          <div className="lg:col-span-5">
            <HeroTrioIllustration
              activeCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
            />
          </div>
        </div>

        {/* Full-Width 3-Category Strip Below Hero Split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {(['biodegradable', 'recyclable', 'non-biodegradable'] as WasteCategory[]).map(
            (catId) => {
              const meta = CATEGORY_META[catId];
              const count = WASTE_ITEMS.filter((i) => i.category === catId).length;
              const isSelected = selectedCategory === catId;

              return (
                <button
                  key={catId}
                  type="button"
                  onClick={() => onSelectCategory(catId)}
                  className={`text-left rounded-2xl p-6 border transition-colors ${
                    isSelected
                      ? 'bg-[#FDF0F6] border-[#BE185D]'
                      : 'bg-white border-[#F1D5E2] hover:border-[#DB2777]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className={`inline-flex items-center gap-2 text-sm font-semibold ${meta.textClass}`}>
                      <CategoryIcon category={catId} className="w-4 h-4" />
                      <span>{meta.label}</span>
                    </div>
                    <span className="text-xs font-mono text-[#6E485A] tabular-nums">
                      {count} items
                    </span>
                  </div>
                  <p className="text-sm text-[#5C394A] leading-relaxed mb-3">
                    {meta.summary}
                  </p>
                  <p className="text-xs text-[#6E485A]">
                    {meta.shortLabel} · {meta.binColorLabel}
                  </p>
                </button>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};
