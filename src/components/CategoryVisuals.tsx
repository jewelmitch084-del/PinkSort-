import React from 'react';
import { WasteCategory } from '../data/wasteItems';

interface HeroTrioProps {
  activeCategory: WasteCategory | null;
  onSelectCategory: (category: WasteCategory) => void;
}

export const HeroTrioIllustration: React.FC<HeroTrioProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const bins: {
    id: WasteCategory;
    label: string;
    subtitle: string;
    x: number;
    bodyFill: string;
    lidFill: string;
    stroke: string;
    accent: string;
    iconType: 'leaf' | 'recycle' | 'ban';
  }[] = [
    {
      id: 'biodegradable',
      label: 'Biodegradable',
      subtitle: 'Weeks to months',
      x: 44,
      bodyFill: '#F7DFEA',
      lidFill: '#E6B4CA',
      stroke: '#C47E9D',
      accent: '#15803D',
      iconType: 'leaf',
    },
    {
      id: 'recyclable',
      label: 'Recyclable',
      subtitle: 'Clean recovery',
      x: 204,
      bodyFill: '#FCEBF3',
      lidFill: '#DB2777',
      stroke: '#BE185D',
      accent: '#BE185D',
      iconType: 'recycle',
    },
    {
      id: 'non-biodegradable',
      label: 'Non-Biodegradable',
      subtitle: 'Residual & special',
      x: 364,
      bodyFill: '#F2E4EE',
      lidFill: '#8E497A',
      stroke: '#6B2158',
      accent: '#6B2158',
      iconType: 'ban',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#FCEFF5] border border-[#F1D5E2] rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <p className="text-sm font-medium text-[#6E485A]">
          Three Waste Streams — Select a bin to explore
        </p>
        <span className="text-xs font-mono text-[#9D174D] tabular-nums whitespace-nowrap">
          30 items indexed
        </span>
      </div>

      <div className="relative w-full aspect-[4/3] bg-white border border-[#F1D5E2] rounded-xl overflow-hidden flex items-center justify-center p-4">
        <svg
          viewBox="0 0 540 360"
          className="w-full h-full"
          role="img"
          aria-label="Three pink-themed waste sorting bins: Biodegradable, Recyclable, and Non-Biodegradable"
        >
          {/* Soft blush studio backdrop */}
          <defs>
            <linearGradient id="pinkStudioBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF9FB" />
              <stop offset="100%" stopColor="#FCEEF4" />
            </linearGradient>
            <linearGradient id="floorBand" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F8DCE8" />
              <stop offset="50%" stopColor="#F5CFE0" />
              <stop offset="100%" stopColor="#F8DCE8" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="540" height="360" rx="14" fill="url(#pinkStudioBg)" />
          {/* Subtle botanical arches */}
          <circle cx="95" cy="95" r="68" fill="#FBE5EE" opacity="0.7" />
          <circle cx="270" cy="85" r="78" fill="#FDECF3" opacity="0.8" />
          <circle cx="445" cy="95" r="68" fill="#F5E1EE" opacity="0.65" />

          {/* Floor plane */}
          <rect x="20" y="290" width="500" height="52" rx="10" fill="url(#floorBand)" opacity="0.55" />

          {bins.map((bin) => {
            const isSelected = activeCategory === bin.id;
            const translateY = isSelected ? -8 : 0;

            return (
              <g
                key={bin.id}
                transform={`translate(${bin.x}, ${72 + translateY})`}
                onClick={() => onSelectCategory(bin.id)}
                className="cursor-pointer transition-transform duration-200"
                role="button"
                tabIndex={0}
                aria-label={`Filter by ${bin.label}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCategory(bin.id);
                  }
                }}
              >
                {/* Ground shadow */}
                <ellipse
                  cx="66"
                  cy="224"
                  rx={isSelected ? 58 : 52}
                  ry="9"
                  fill="#9D174D"
                  opacity={isSelected ? 0.18 : 0.1}
                />

                {/* Bin handle */}
                <rect
                  x="46"
                  y="0"
                  width="40"
                  height="10"
                  rx="5"
                  fill="none"
                  stroke={bin.stroke}
                  strokeWidth="3"
                />

                {/* Bin lid */}
                <rect
                  x="6"
                  y="10"
                  width="120"
                  height="24"
                  rx="8"
                  fill={bin.lidFill}
                  stroke={bin.stroke}
                  strokeWidth="2"
                />

                {/* Lid slot */}
                <rect
                  x="36"
                  y="18"
                  width="60"
                  height="6"
                  rx="3"
                  fill="#FFFFFF"
                  opacity="0.75"
                />

                {/* Bin body */}
                <path
                  d="M14 34 L118 34 L110 212 C109.5 217 105.5 220 100.5 220 L31.5 220 C26.5 220 22.5 217 22 212 Z"
                  fill={bin.bodyFill}
                  stroke={bin.stroke}
                  strokeWidth={isSelected ? '3' : '2'}
                />

                {/* Front label plaque */}
                <rect
                  x="30"
                  y="68"
                  width="72"
                  height="86"
                  rx="10"
                  fill="#FFFFFF"
                  stroke={bin.stroke}
                  strokeWidth="1.5"
                />

                {/* Category Icon inside plaque */}
                {bin.iconType === 'leaf' && (
                  <g transform="translate(50, 82)">
                    <path
                      d="M16 2 C25 2 30 9 30 18 C30 26 23 30 15 30 C7 30 2 24 2 16 C2 8 8 2 16 2 Z"
                      fill="#ECFDF3"
                      stroke={bin.accent}
                      strokeWidth="2"
                    />
                    <path
                      d="M9 24 C13 17 18 12 24 8"
                      stroke={bin.accent}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {bin.iconType === 'recycle' && (
                  <g transform="translate(49, 82)">
                    <circle
                      cx="17"
                      cy="17"
                      r="14"
                      fill="#FDF2F8"
                      stroke={bin.accent}
                      strokeWidth="2"
                      strokeDasharray="18 5"
                    />
                    <path
                      d="M17 7 L22 13 L12 13 Z"
                      fill={bin.accent}
                    />
                    <path
                      d="M10 21 L17 26 L24 21"
                      fill="none"
                      stroke={bin.accent}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                )}

                {bin.iconType === 'ban' && (
                  <g transform="translate(50, 82)">
                    <circle
                      cx="16"
                      cy="16"
                      r="13"
                      fill="#FAF0F6"
                      stroke={bin.accent}
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="8"
                      x2="24"
                      y2="24"
                      stroke={bin.accent}
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {/* Plaque text lines */}
                <text
                  x="66"
                  y="134"
                  textAnchor="middle"
                  fill="#2B121F"
                  fontSize="10.5"
                  fontWeight="700"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  {bin.id === 'non-biodegradable' ? 'Non-Bio' : bin.label}
                </text>
                <text
                  x="66"
                  y="147"
                  textAnchor="middle"
                  fill="#6E485A"
                  fontSize="8.5"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  {bin.subtitle}
                </text>

                {/* Bottom subtle horizontal rib lines */}
                <line
                  x1="36"
                  y1="176"
                  x2="96"
                  y2="176"
                  stroke={bin.stroke}
                  strokeWidth="1.5"
                  opacity="0.35"
                  strokeLinecap="round"
                />
                <line
                  x1="40"
                  y1="186"
                  x2="92"
                  y2="186"
                  stroke={bin.stroke}
                  strokeWidth="1.5"
                  opacity="0.25"
                  strokeLinecap="round"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive quick selector footer under visual */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {bins.map((bin) => {
          const isActive = activeCategory === bin.id;
          return (
            <button
              key={bin.id}
              type="button"
              onClick={() => onSelectCategory(bin.id)}
              className={`px-3 py-2.5 rounded-xl text-left border transition-colors ${
                isActive
                  ? 'bg-[#BE185D] border-[#BE185D] text-white'
                  : 'bg-white border-[#F1D5E2] text-[#2B121F] hover:border-[#DB2777]'
              }`}
            >
              <div className="text-xs font-semibold truncate">{bin.label}</div>
              <div
                className={`text-[11px] truncate ${
                  isActive ? 'text-pink-100' : 'text-[#6E485A]'
                }`}
              >
                {bin.subtitle}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
