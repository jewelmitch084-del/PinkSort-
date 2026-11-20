import React, { useMemo, useState } from 'react';
import { CATEGORY_META, WASTE_ITEMS, WasteItem } from '../data/wasteItems';
import { CategoryIcon } from './WasteClassifierHero';

interface TimeMilestone {
  label: string;
  days: number;
  note: string;
}

const MILESTONES: TimeMilestone[] = [
  {
    label: '3 Weeks',
    days: 21,
    note: 'Soft fruit scraps, loose tea, and paper napkins begin turning into dark compost humus.',
  },
  {
    label: '3 Months',
    days: 90,
    note: 'Citrus peels, greasy paperboard, and dry paper are mostly broken down by soil microbes.',
  },
  {
    label: '1 Year',
    days: 365,
    note: 'Untreated wooden chopsticks, cotton rags, and yard twigs finish returning to soil.',
  },
  {
    label: '10 Years',
    days: 3650,
    note: 'Laminated cartons begin degrading, while plastic-lined coffee cups and plastics persist.',
  },
  {
    label: '100 Years',
    days: 36500,
    note: 'Steel cans corrode and chip bags start fragmenting, while aluminum and PET remain intact.',
  },
  {
    label: '500 Years',
    days: 182500,
    note: 'PET bottles, diapers, and Styrofoam finally fragment into persistent microplastics.',
  },
  {
    label: '1,000+ Years',
    days: 365000000,
    note: 'Glass jars and fired ceramics remain virtually unchanged unless melted or recycled.',
  },
];

const FEATURED_TIMELINE_IDS = [
  'banana-peel',
  'paper-napkin',
  'greasy-pizza-box',
  'wooden-chopsticks',
  'plastic-lined-coffee-cup',
  'steel-tin-can',
  'chip-bag',
  'aluminum-can',
  'pet-water-bottle',
  'styrofoam-cup',
  'glass-jar',
  'broken-ceramic',
];

export const DecompositionTimeline: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(2); // Default: 1 Year
  const milestone = MILESTONES[stepIndex];

  const featuredItems = useMemo(() => {
    return FEATURED_TIMELINE_IDS.map((id) =>
      WASTE_ITEMS.find((item) => item.id === id)
    ).filter((item): item is WasteItem => Boolean(item));
  }, []);

  const brokenDownCount = featuredItems.filter(
    (item) => milestone.days >= item.decompositionDays
  ).length;

  return (
    <section id="timeline" className="py-14 border-b border-[#F1D5E2]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-[#9D174D] mb-1.5">
              Time-Horizon Simulation
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#2B121F]">
              Decomposition Timeline Explorer
            </h2>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#6E485A] block">Elapsed Time</span>
            <span className="font-mono text-xl font-semibold text-[#BE185D] tabular-nums">
              {milestone.label}
            </span>
          </div>
        </div>

        {/* Interactive Slider Control Deck */}
        <div className="bg-white border border-[#F1D5E2] rounded-2xl p-6 sm:p-8 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <label
              htmlFor="decomposition-slider"
              className="text-sm font-semibold text-[#2B121F]"
            >
              Time Horizon: <span className="font-mono text-[#BE185D]">{milestone.label}</span>
            </label>
            <span className="text-xs font-mono text-[#6E485A] tabular-nums">
              {brokenDownCount} of {featuredItems.length} items decomposed
            </span>
          </div>

          <input
            id="decomposition-slider"
            type="range"
            min={0}
            max={MILESTONES.length - 1}
            step={1}
            value={stepIndex}
            onChange={(e) => setStepIndex(Number(e.target.value))}
            className="w-full accent-[#BE185D] cursor-pointer mb-3"
          />

          <div className="grid grid-cols-7 gap-1 text-center mb-5">
            {MILESTONES.map((m, idx) => (
              <button
                key={m.label}
                type="button"
                onClick={() => setStepIndex(idx)}
                className={`py-1.5 px-1 rounded-md text-[11px] font-mono tabular-nums transition-colors ${
                  idx === stepIndex
                    ? 'bg-[#BE185D] text-white font-semibold'
                    : 'text-[#6E485A] hover:bg-[#FCEFF5]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <p className="text-sm text-[#5C394A] bg-[#FFF8FB] border border-[#F1D5E2] rounded-xl px-4 py-3">
            {milestone.note}
          </p>
        </div>

        {/* Item Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredItems.map((item) => {
            const meta = CATEGORY_META[item.category];
            const ratio = Math.min(1, milestone.days / item.decompositionDays);
            const pct = Math.round(ratio * 100);
            const isDecomposed = ratio >= 1;

            return (
              <div
                key={item.id}
                className="bg-white border border-[#F1D5E2] rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${meta.textClass}`}
                    >
                      <CategoryIcon category={item.category} className="w-3.5 h-3.5" />
                      <span>{meta.label}</span>
                    </span>
                    <span
                      className={`text-xs font-mono tabular-nums font-medium ${
                        isDecomposed ? 'text-[#15803D]' : 'text-[#6E485A]'
                      }`}
                    >
                      {isDecomposed ? 'Broken down' : `${pct}% elapsed`}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-semibold text-[#2B121F] mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#6E485A] font-mono tabular-nums mb-4">
                    Full span: {item.decompositionLabel}
                  </p>
                </div>

                <div>
                  <div className="w-full h-2 bg-[#FCEFF5] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-200 ${
                        isDecomposed ? 'bg-[#16A34A]' : meta.barClass
                      }`}
                      style={{ width: `${Math.max(4, pct)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
