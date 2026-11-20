import React, { useMemo, useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import {
  CATEGORY_META,
  WASTE_ITEMS,
  WasteCategory,
  WasteItem,
} from '../data/wasteItems';
import { CategoryIcon } from './WasteClassifierHero';

interface ItemDirectoryProps {
  activeFilter: WasteCategory | 'all';
  onFilterChange: (filter: WasteCategory | 'all') => void;
  onLogItem: (name: string, category: WasteCategory) => void;
}

export const ItemDirectory: React.FC<ItemDirectoryProps> = ({
  activeFilter,
  onFilterChange,
  onLogItem,
}) => {
  const [search, setSearch] = useState('');
  const [inspectedItem, setInspectedItem] = useState<WasteItem | null>(null);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return WASTE_ITEMS.filter((item) => {
      if (activeFilter !== 'all' && item.category !== activeFilter) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.material.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q))
      );
    });
  }, [activeFilter, search]);

  const filterTabs: { id: WasteCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'biodegradable', label: 'Biodegradable' },
    { id: 'recyclable', label: 'Recyclable' },
    { id: 'non-biodegradable', label: 'Non-Biodegradable' },
  ];

  return (
    <section id="directory" className="py-14 border-b border-[#F1D5E2]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-medium text-[#9D174D] mb-1.5">
              Material Reference
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#2B121F]">
              Complete Waste Field Guide
            </h2>
          </div>

          <span className="text-xs font-mono text-[#6E485A] tabular-nums">
            Showing {filteredItems.length} of {WASTE_ITEMS.length} items
          </span>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
          <div
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#FCEFF5] border border-[#F1D5E2] rounded-xl"
            role="tablist"
            aria-label="Filter waste items by category"
          >
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onFilterChange(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#BE185D] text-white'
                      : 'text-[#5C394A] hover:text-[#2B121F]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <label htmlFor="directory-search" className="sr-only">
              Filter field guide items
            </label>
            <Search
              className="w-4 h-4 text-[#9D174D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="directory-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter items..."
              className="w-full pl-10 pr-8 py-2 rounded-xl bg-white border border-[#EBC6D7] text-sm text-[#2B121F] placeholder-[#9E788A] focus:outline-none focus:ring-2 focus:ring-[#DB2777]"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear filter"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#6E485A] hover:text-[#2B121F]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Directory Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white border border-[#F1D5E2] rounded-2xl p-10 text-center">
            <p className="font-display text-lg font-semibold text-[#2B121F] mb-2">
              No matching items found
            </p>
            <p className="text-sm text-[#6E485A] mb-4">
              Try clearing your search filter or switching to All Items.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                onFilterChange('all');
              }}
              className="px-4 py-2 rounded-lg bg-[#BE185D] text-white text-xs font-medium hover:bg-[#9D174D] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const meta = CATEGORY_META[item.category];
              return (
                <article
                  key={item.id}
                  className="bg-white border border-[#F1D5E2] hover:border-[#DB2777] rounded-2xl p-5 flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold ${meta.textClass}`}
                      >
                        <CategoryIcon category={item.category} className="w-3.5 h-3.5" />
                        <span>{meta.label}</span>
                      </span>
                      <span className="text-xs font-mono text-[#6E485A] tabular-nums">
                        {item.decompositionLabel}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-[#2B121F] mb-1.5">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#6E485A] mb-3">{item.material}</p>
                    <p className="text-sm text-[#4A2B3A] leading-relaxed mb-4">
                      {item.binInstruction}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F7E5EE] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setInspectedItem(item)}
                      className="text-xs font-medium text-[#BE185D] hover:text-[#9D174D] underline decoration-[#DB2777]/40"
                    >
                      Prep &amp; Why
                    </button>
                    <button
                      type="button"
                      onClick={() => onLogItem(item.name, item.category)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FCEFF5] hover:bg-[#F7DCE9] text-[#9D174D] text-xs font-medium transition-colors whitespace-nowrap shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Log</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Accessible Detail Modal */}
      {inspectedItem && (
        <div
          className="fixed inset-0 z-50 bg-[#2B121F]/40 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-item-title"
          onClick={() => setInspectedItem(null)}
        >
          <div
            className="bg-white border border-[#F1D5E2] rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold mb-1 ${
                    CATEGORY_META[inspectedItem.category].textClass
                  }`}
                >
                  <CategoryIcon category={inspectedItem.category} className="w-4 h-4" />
                  <span>{CATEGORY_META[inspectedItem.category].label}</span>
                  <span aria-hidden="true">·</span>
                  <span>{CATEGORY_META[inspectedItem.category].binColorLabel}</span>
                </div>
                <h3
                  id="modal-item-title"
                  className="font-display text-2xl font-semibold text-[#2B121F]"
                >
                  {inspectedItem.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setInspectedItem(null)}
                aria-label="Close item details"
                className="p-2 rounded-lg text-[#6E485A] hover:bg-[#FCEFF5] hover:text-[#2B121F]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-[#4A2B3A] mb-6">
              <div className="bg-[#FFF8FB] border border-[#F1D5E2] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#2B121F] mb-1">
                  Preparation Step
                </p>
                <p className="leading-relaxed">{inspectedItem.preparationStep}</p>
              </div>
              <div className="bg-[#FFF8FB] border border-[#F1D5E2] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#2B121F] mb-1">
                  Why This Classification Matters
                </p>
                <p className="leading-relaxed">{inspectedItem.whyItMatters}</p>
              </div>
              <p className="text-xs font-mono text-[#6E485A] tabular-nums">
                Material: {inspectedItem.material} · Breakdown:{' '}
                {inspectedItem.decompositionLabel}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setInspectedItem(null)}
                className="px-4 py-2 rounded-lg border border-[#EBC6D7] text-xs font-medium text-[#5C394A] hover:border-[#DB2777]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onLogItem(inspectedItem.name, inspectedItem.category);
                  setInspectedItem(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Add to Waste Log</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
