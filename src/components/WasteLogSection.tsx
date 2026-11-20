import React, { useState } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';
import { CATEGORY_META, WasteCategory } from '../data/wasteItems';
import { CategoryIcon } from './WasteClassifierHero';

export interface LoggedWasteEntry {
  id: string;
  name: string;
  category: WasteCategory;
  loggedAt: string;
}

interface WasteLogSectionProps {
  entries: LoggedWasteEntry[];
  onAddEntry: (name: string, category: WasteCategory) => void;
  onRemoveEntry: (id: string) => void;
  onClearAll: () => void;
}

export const WasteLogSection: React.FC<WasteLogSectionProps> = ({
  entries,
  onAddEntry,
  onRemoveEntry,
  onClearAll,
}) => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState<WasteCategory>('biodegradable');
  const [confirmClear, setConfirmClear] = useState(false);

  const counts = {
    biodegradable: entries.filter((e) => e.category === 'biodegradable').length,
    recyclable: entries.filter((e) => e.category === 'recyclable').length,
    'non-biodegradable': entries.filter((e) => e.category === 'non-biodegradable')
      .length,
  };

  const total = entries.length;
  const divertedCount = counts.biodegradable + counts.recyclable;
  const diversionRate = total > 0 ? Math.round((divertedCount / total) * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = itemName.trim();
    if (!cleaned) return;
    onAddEntry(cleaned, category);
    setItemName('');
  };

  const handleDownloadCsv = () => {
    const header = 'Item,Category,LoggedAt\n';
    const rows = entries
      .map((entry) => {
        const safeName = `"${entry.name.replace(/"/g, '""')}"`;
        return `${safeName},${CATEGORY_META[entry.category].label},${entry.loggedAt}`;
      })
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'pinksort-waste-log.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="waste-log" className="py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-[#9D174D] mb-1.5">
              Saved Locally in Browser
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#2B121F]">
              Daily Waste Sorting Log
            </h2>
          </div>

          {entries.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadCsv}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#EBC6D7] bg-white hover:border-[#DB2777] text-xs font-medium text-[#2B121F] transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-[#BE185D]" aria-hidden="true" />
                <span>Download CSV</span>
              </button>

              {confirmClear ? (
                <div className="inline-flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onClearAll();
                      setConfirmClear(false);
                    }}
                    className="px-3 py-2 rounded-lg bg-[#BE123C] text-white text-xs font-medium whitespace-nowrap"
                  >
                    Confirm Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    className="px-3 py-2 rounded-lg border border-[#EBC6D7] bg-white text-xs font-medium text-[#5C394A] whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmClear(true)}
                  className="px-3.5 py-2 rounded-lg border border-[#EBC6D7] bg-white hover:border-[#BE123C] text-xs font-medium text-[#6E485A] hover:text-[#BE123C] transition-colors whitespace-nowrap shrink-0"
                >
                  Clear Log
                </button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Quick-Add Form & Summary */}
          <div className="lg:col-span-5 bg-white border border-[#F1D5E2] rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold text-[#2B121F] mb-4">
              Add a Sorted Item
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="log-item-name"
                  className="block text-xs font-medium text-[#5C394A] mb-1.5"
                >
                  Item description
                </label>
                <input
                  id="log-item-name"
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Avocado pit, Glass bottle, Snack wrapper"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8FB] border border-[#EBC6D7] text-sm text-[#2B121F] placeholder-[#9E788A] focus:outline-none focus:ring-2 focus:ring-[#DB2777]"
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-[#5C394A] mb-1.5">
                  Category bin
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    ['biodegradable', 'recyclable', 'non-biodegradable'] as WasteCategory[]
                  ).map((cat) => {
                    const meta = CATEGORY_META[cat];
                    const selected = category === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`px-2.5 py-2 rounded-lg border text-xs font-medium transition-colors truncate ${
                          selected
                            ? 'bg-[#BE185D] border-[#BE185D] text-white'
                            : 'bg-[#FFF8FB] border-[#EBC6D7] text-[#5C394A] hover:border-[#DB2777]'
                        }`}
                      >
                        {cat === 'non-biodegradable' ? 'Non-Bio' : meta.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={!itemName.trim()}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#BE185D] hover:bg-[#9D174D] disabled:opacity-45 text-white text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Add to Log</span>
              </button>
            </form>

            {/* Breakdown Metrics */}
            <div className="pt-5 border-t border-[#F1D5E2]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#5C394A] font-medium">
                  Landfill Diversion Rate
                </span>
                <span className="font-mono font-semibold text-[#BE185D] tabular-nums">
                  {diversionRate}%
                </span>
              </div>

              <div className="w-full h-2.5 bg-[#FCEFF5] rounded-full overflow-hidden flex mb-4">
                {total > 0 && (
                  <>
                    <div
                      className="h-full bg-[#16A34A]"
                      style={{
                        width: `${(counts.biodegradable / total) * 100}%`,
                      }}
                    />
                    <div
                      className="h-full bg-[#DB2777]"
                      style={{
                        width: `${(counts.recyclable / total) * 100}%`,
                      }}
                    />
                    <div
                      className="h-full bg-[#7E2268]"
                      style={{
                        width: `${(counts['non-biodegradable'] / total) * 100}%`,
                      }}
                    />
                  </>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-[#6E485A] block">Biodegradable</span>
                  <span className="font-mono font-semibold text-[#14532D] tabular-nums">
                    {counts.biodegradable}
                  </span>
                </div>
                <div>
                  <span className="text-[#6E485A] block">Recyclable</span>
                  <span className="font-mono font-semibold text-[#9D174D] tabular-nums">
                    {counts.recyclable}
                  </span>
                </div>
                <div>
                  <span className="text-[#6E485A] block">Non-Bio</span>
                  <span className="font-mono font-semibold text-[#581C49] tabular-nums">
                    {counts['non-biodegradable']}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Logged Entries List */}
          <div className="lg:col-span-7 bg-white border border-[#F1D5E2] rounded-2xl p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-display text-lg font-semibold text-[#2B121F]">
                Recent Entries
              </h3>
              <span className="text-xs font-mono text-[#6E485A] tabular-nums">
                {total} total
              </span>
            </div>

            {entries.length === 0 ? (
              <div className="rounded-xl bg-[#FFF8FB] border border-[#F1D5E2] p-8 text-center">
                <p className="text-sm font-medium text-[#2B121F] mb-1">
                  Your waste log is empty
                </p>
                <p className="text-xs text-[#6E485A]">
                  Log items from the Classifier, Field Guide, or add one on the left to track your sorting habits.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-[#F7E5EE]">
                {entries.map((entry) => {
                  const meta = CATEGORY_META[entry.category];
                  return (
                    <li
                      key={entry.id}
                      className="py-3.5 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#2B121F] truncate">
                          {entry.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[#6E485A] mt-0.5">
                          <span
                            className={`inline-flex items-center gap-1 font-medium ${meta.textClass}`}
                          >
                            <CategoryIcon category={entry.category} className="w-3.5 h-3.5" />
                            <span>{meta.label}</span>
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{entry.loggedAt}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveEntry(entry.id)}
                        aria-label={`Remove ${entry.name}`}
                        className="p-2 rounded-lg text-[#6E485A] hover:text-[#BE123C] hover:bg-[#FFF1F2] transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
