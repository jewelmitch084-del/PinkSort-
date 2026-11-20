import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Shuffle,
  XCircle,
} from 'lucide-react';
import {
  CATEGORY_META,
  WASTE_ITEMS,
  WasteCategory,
  WasteItem,
} from '../data/wasteItems';
import { CategoryIcon } from './WasteClassifierHero';

const ROUND_SIZE = 10;

function pickShuffledDeck(): WasteItem[] {
  const copy = [...WASTE_ITEMS];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, ROUND_SIZE);
}

interface SortOutcome {
  item: WasteItem;
  chosen: WasteCategory;
  correct: boolean;
}

export const SortingGame: React.FC = () => {
  const [deck, setDeck] = useState<WasteItem[]>(() => pickShuffledDeck());
  const [index, setIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [lastOutcome, setLastOutcome] = useState<SortOutcome | null>(null);
  const [history, setHistory] = useState<SortOutcome[]>([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [dragOverBin, setDragOverBin] = useState<WasteCategory | null>(null);

  const isFinished = index >= deck.length;
  const currentItem = !isFinished ? deck[index] : null;

  const correctCount = useMemo(
    () => history.filter((h) => h.correct).length,
    [history]
  );

  const accuracy = useMemo(() => {
    if (history.length === 0) return 100;
    return Math.round((correctCount / history.length) * 100);
  }, [correctCount, history.length]);

  const handleSort = useCallback(
    (chosen: WasteCategory) => {
      if (!currentItem || lastOutcome) return;

      const correct = currentItem.category === chosen;
      const outcome: SortOutcome = {
        item: currentItem,
        chosen,
        correct,
      };

      setLastOutcome(outcome);
      setHistory((prev) => [...prev, outcome]);
      if (correct) {
        setStreak((prev) => {
          const next = prev + 1;
          setBestStreak((b) => Math.max(b, next));
          return next;
        });
      } else {
        setStreak(0);
      }
    },
    [currentItem, lastOutcome]
  );

  const handleNext = useCallback(() => {
    setLastOutcome(null);
    setShowHint(false);
    setIndex((prev) => prev + 1);
  }, []);

  const handleReset = useCallback(() => {
    setDeck(pickShuffledDeck());
    setIndex(0);
    setShowHint(false);
    setLastOutcome(null);
    setHistory([]);
    setStreak(0);
  }, []);

  // Keyboard shortcuts: 1, 2, 3 to sort; Enter/Space for next when feedback shown
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        return;
      }

      if (!currentItem) return;

      if (!lastOutcome) {
        if (e.key === '1') handleSort('biodegradable');
        if (e.key === '2') handleSort('recyclable');
        if (e.key === '3') handleSort('non-biodegradable');
      } else if (e.key === 'Enter') {
        handleNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentItem, lastOutcome, handleSort, handleNext]);

  const bins: { id: WasteCategory; shortcut: string }[] = [
    { id: 'biodegradable', shortcut: '1' },
    { id: 'recyclable', shortcut: '2' },
    { id: 'non-biodegradable', shortcut: '3' },
  ];

  return (
    <section id="sorting-game" className="py-14 border-b border-[#F1D5E2]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-[#9D174D] mb-1.5">
              Interactive Simulation
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#2B121F]">
              Practice Waste Sorting Challenge
            </h2>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#EBC6D7] bg-white hover:border-[#DB2777] text-xs font-medium text-[#2B121F] transition-colors whitespace-nowrap shrink-0"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#BE185D]" aria-hidden="true" />
            <span>New 10-Item Round</span>
          </button>
        </div>

        {/* Two-Zone Sandbox Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Stage: Item Tray + 3 Interactive Bins */}
          <div className="lg:col-span-8 bg-white border border-[#F1D5E2] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            {!isFinished && currentItem ? (
              <>
                {/* Active Item Card on Tray */}
                <div>
                  <div className="flex items-center justify-between gap-4 text-xs text-[#6E485A] mb-4">
                    <span className="font-mono tabular-nums">
                      Item {index + 1} of {deck.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowHint((h) => !h)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#BE185D] hover:text-[#9D174D] whitespace-nowrap"
                    >
                      <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{showHint ? 'Hide Clue' : 'Show Material Clue'}</span>
                    </button>
                  </div>

                  <div
                    draggable={!lastOutcome}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', currentItem.id);
                    }}
                    className={`rounded-2xl border border-[#EBC6D7] bg-[#FFF8FB] p-6 mb-6 transition-transform duration-150 ${
                      !lastOutcome ? 'cursor-grab active:cursor-grabbing' : ''
                    }`}
                  >
                    <p className="text-xs text-[#6E485A] mb-1">
                      Drag or choose the right bin below
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#2B121F] mb-2">
                      {currentItem.name}
                    </h3>
                    <p className="text-sm text-[#5C394A]">
                      Material: {currentItem.material}
                    </p>

                    {showHint && (
                      <p className="mt-3 pt-3 border-t border-[#F1D5E2] text-xs text-[#9D174D] leading-relaxed">
                        Clue: {currentItem.hint}
                      </p>
                    )}
                  </div>
                </div>

                {/* 3 Target Sorting Bins */}
                <div>
                  <p className="text-xs font-medium text-[#6E485A] mb-3">
                    Select a bin (or press keys 1, 2, 3):
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {bins.map(({ id, shortcut }) => {
                      const meta = CATEGORY_META[id];
                      const isCorrectTarget =
                        lastOutcome && lastOutcome.item.category === id;
                      const isWrongChoice =
                        lastOutcome &&
                        lastOutcome.chosen === id &&
                        !lastOutcome.correct;
                      const isDragHover = dragOverBin === id;

                      let stateClasses =
                        'bg-white border-[#EBC6D7] hover:border-[#DB2777] hover:bg-[#FDF5F9]';
                      if (isDragHover) {
                        stateClasses = 'bg-[#FCEEF4] border-[#BE185D] scale-[1.01]';
                      } else if (isCorrectTarget) {
                        stateClasses = `${meta.surfaceClass} ${meta.borderClass} ring-2 ring-[#BE185D]/30`;
                      } else if (isWrongChoice) {
                        stateClasses = 'bg-[#FFF1F2] border-[#E11D48]';
                      }

                      return (
                        <button
                          key={id}
                          type="button"
                          disabled={Boolean(lastOutcome)}
                          onClick={() => handleSort(id)}
                          onDragOver={(e) => {
                            e.preventDefault();
                            if (!lastOutcome) setDragOverBin(id);
                          }}
                          onDragLeave={() => setDragOverBin(null)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragOverBin(null);
                            handleSort(id);
                          }}
                          className={`p-4 rounded-xl border text-left transition-all duration-150 disabled:cursor-default ${stateClasses}`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span
                              className={`inline-flex items-center gap-1.5 text-sm font-semibold ${meta.textClass}`}
                            >
                              <CategoryIcon category={id} className="w-4 h-4" />
                              <span>{meta.label}</span>
                            </span>
                            <span className="text-[11px] font-mono text-[#6E485A] border border-[#EBC6D7] rounded px-1.5 py-0.5 tabular-nums">
                              {shortcut}
                            </span>
                          </div>
                          <p className="text-xs text-[#6E485A] leading-snug">
                            {meta.shortLabel}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              /* Round Complete Summary */
              <div className="py-6 text-center max-w-lg mx-auto">
                <p className="text-xs font-medium text-[#9D174D] mb-2">
                  Round Complete
                </p>
                <h3 className="font-display text-3xl font-semibold text-[#2B121F] mb-3">
                  You sorted {correctCount} of {deck.length} items accurately.
                </h3>
                <p className="text-sm text-[#5C394A] leading-relaxed mb-6">
                  Final accuracy: <span className="font-mono font-semibold tabular-nums">{accuracy}%</span> ·
                  Best streak: <span className="font-mono font-semibold tabular-nums">{bestStreak}</span>.
                  Try another shuffled round to test trickier items like laminated coffee cups and pizza boxes.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#BE185D] hover:bg-[#9D174D] text-white text-sm font-medium transition-colors"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>Play Another Round</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Deck: Live Telemetry & Immediate Feedback */}
          <div className="lg:col-span-4 bg-[#FCEFF5] border border-[#F1D5E2] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold text-[#2B121F] mb-4">
                Session Scorecard
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-white border border-[#F1D5E2] rounded-xl p-3">
                  <div className="text-[11px] text-[#6E485A] mb-1">Accuracy</div>
                  <div className="font-mono text-lg font-semibold text-[#2B121F] tabular-nums">
                    {accuracy}%
                  </div>
                </div>
                <div className="bg-white border border-[#F1D5E2] rounded-xl p-3">
                  <div className="text-[11px] text-[#6E485A] mb-1">Streak</div>
                  <div className="font-mono text-lg font-semibold text-[#BE185D] tabular-nums">
                    {streak}
                  </div>
                </div>
                <div className="bg-white border border-[#F1D5E2] rounded-xl p-3">
                  <div className="text-[11px] text-[#6E485A] mb-1">Sorted</div>
                  <div className="font-mono text-lg font-semibold text-[#2B121F] tabular-nums">
                    {history.length}/{deck.length}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-white border border-[#F1D5E2] rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-[#DB2777] transition-all duration-200"
                  style={{
                    width: `${Math.round((history.length / deck.length) * 100)}%`,
                  }}
                />
              </div>

              {/* Immediate Explanation Panel */}
              {lastOutcome ? (
                <div className="bg-white border border-[#F1D5E2] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    {lastOutcome.correct ? (
                      <CheckCircle2
                        className="w-5 h-5 text-[#15803D] shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <XCircle
                        className="w-5 h-5 text-[#BE123C] shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <span className="text-sm font-semibold text-[#2B121F]">
                      {lastOutcome.correct
                        ? 'Correctly sorted'
                        : `Belongs in ${CATEGORY_META[lastOutcome.item.category].label}`}
                    </span>
                  </div>

                  <p className="text-xs text-[#5C394A] leading-relaxed mb-3">
                    {lastOutcome.item.whyItMatters}
                  </p>
                  <p className="text-xs font-mono text-[#6E485A] tabular-nums mb-4">
                    Decomposition: {lastOutcome.item.decompositionLabel}
                  </p>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-medium transition-colors"
                  >
                    {index + 1 >= deck.length ? 'View Round Summary' : 'Next Item'}
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-[#F1D5E2] rounded-xl p-5 text-xs text-[#6E485A] leading-relaxed">
                  {isFinished
                    ? 'All 10 items in this round are complete. Start a new round anytime.'
                    : 'Choose one of the three bins to see why that material is compostable, recyclable, or residual waste.'}
                </div>
              )}
            </div>

            {history.length > 0 && (
              <div className="mt-5 pt-4 border-t border-[#EBC6D7] flex items-center justify-between text-xs text-[#6E485A]">
                <span>Best streak this round</span>
                <span className="font-mono font-semibold text-[#2B121F] tabular-nums">
                  {bestStreak}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
