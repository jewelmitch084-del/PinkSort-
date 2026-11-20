import { useCallback, useEffect, useState } from 'react';
import { WasteCategory } from './data/wasteItems';
import { WasteClassifierHero } from './components/WasteClassifierHero';
import { SortingGame } from './components/SortingGame';
import { DecompositionTimeline } from './components/DecompositionTimeline';
import { ItemDirectory } from './components/ItemDirectory';
import { LoggedWasteEntry, WasteLogSection } from './components/WasteLogSection';

const STORAGE_KEY = 'pinksort_waste_log_v1';

const DEFAULT_SAMPLE_LOG: LoggedWasteEntry[] = [
  {
    id: 'seed-1',
    name: 'Banana Peel',
    category: 'biodegradable',
    loggedAt: 'Today',
  },
  {
    id: 'seed-2',
    name: 'Clear PET Plastic Bottle',
    category: 'recyclable',
    loggedAt: 'Today',
  },
  {
    id: 'seed-3',
    name: 'Foil-Lined Snack & Chip Bag',
    category: 'non-biodegradable',
    loggedAt: 'Today',
  },
];

function readInitialLog(): LoggedWasteEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SAMPLE_LOG;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return DEFAULT_SAMPLE_LOG;
  } catch {
    return DEFAULT_SAMPLE_LOG;
  }
}

export default function App() {
  const [directoryFilter, setDirectoryFilter] = useState<WasteCategory | 'all'>('all');
  const [logEntries, setLogEntries] = useState<LoggedWasteEntry[]>(readInitialLog);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(logEntries));
    } catch {
      // Ignore storage quota or private-mode restrictions cleanly
    }
  }, [logEntries]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const handleSelectHeroCategory = useCallback((category: WasteCategory) => {
    setDirectoryFilter((prev) => (prev === category ? 'all' : category));
    const el = document.getElementById('directory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleLogItem = useCallback((name: string, category: WasteCategory) => {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newEntry: LoggedWasteEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name,
      category,
      loggedAt: timeLabel,
    };

    setLogEntries((prev) => [newEntry, ...prev]);
    setToastMessage(`Logged "${name}"`);
  }, []);

  const handleRemoveEntry = useCallback((id: string) => {
    setLogEntries((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const handleClearAll = useCallback(() => {
    setLogEntries([]);
  }, []);

  const scrollToSorting = () => {
    const el = document.getElementById('sorting-game');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFF7FA] text-[#2B121F] flex flex-col">
      {/* Three-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FFF7FA]/95 backdrop-blur-sm border-b border-[#F1D5E2]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element wordmark */}
          <a
            href="#classifier"
            className="font-display text-xl font-bold tracking-tight text-[#BE185D] whitespace-nowrap shrink-0"
          >
            PinkSort
          </a>

          {/* Zone 2: Concise single-line nav links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C394A]"
          >
            <a
              href="#classifier"
              className="hover:text-[#BE185D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Classifier
            </a>
            <a
              href="#sorting-game"
              className="hover:text-[#BE185D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Sorting Game
            </a>
            <a
              href="#timeline"
              className="hover:text-[#BE185D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Timeline
            </a>
            <a
              href="#directory"
              className="hover:text-[#BE185D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Field Guide
            </a>
            <a
              href="#waste-log"
              className="hover:text-[#BE185D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Waste Log
            </a>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={scrollToSorting}
              className="px-4 py-2 rounded-lg bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0"
            >
              Start Sorting
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <WasteClassifierHero
          selectedCategory={directoryFilter === 'all' ? null : directoryFilter}
          onSelectCategory={handleSelectHeroCategory}
          onLogItem={handleLogItem}
        />

        <SortingGame />

        <DecompositionTimeline />

        <ItemDirectory
          activeFilter={directoryFilter}
          onFilterChange={setDirectoryFilter}
          onLogItem={handleLogItem}
        />

        <WasteLogSection
          entries={logEntries}
          onAddEntry={handleLogItem}
          onRemoveEntry={handleRemoveEntry}
          onClearAll={handleClearAll}
        />
      </main>

      <footer className="border-t border-[#F1D5E2] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6E485A]">
          <p>
            PinkSort · Practical waste sorting guide for Biodegradable, Recyclable, and Non-Biodegradable materials.
          </p>
          <div className="flex items-center gap-5">
            <a href="#classifier" className="hover:text-[#BE185D]">
              Classifier
            </a>
            <a href="#sorting-game" className="hover:text-[#BE185D]">
              Sorting Game
            </a>
            <a href="#timeline" className="hover:text-[#BE185D]">
              Timeline
            </a>
            <a href="#waste-log" className="hover:text-[#BE185D]">
              Waste Log
            </a>
          </div>
        </div>
      </footer>

      {/* Non-intrusive toast feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#2B121F] text-white text-xs font-medium shadow-md"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
