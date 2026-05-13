import { Headphones } from 'lucide-react';
import { PillSearchInput } from '../../../components/commonComponents';
import { PAGE_PAD_X } from '../../../shellLayout';
import { cn } from '../../../components/ui/utils';

export const AUDIOGUIDE_CITIES = ['All', 'Varanasi', 'Agra', 'Jaipur'] as const;
export type CityFilter = (typeof AUDIOGUIDE_CITIES)[number];

type AudioGuideDiscoverHeroProps = {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  city: CityFilter;
  onCityChange: (c: CityFilter) => void;
};

export function AudioGuideDiscoverHero({
  searchQuery,
  onSearchChange,
  city,
  onCityChange,
}: AudioGuideDiscoverHeroProps) {
  return (
    <div className={`space-y-3 pt-1 ${PAGE_PAD_X}`}>
      <div className="relative overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-[#5B21B6] via-[#6D28D9] to-[#7C3AED] px-4 py-4 text-white shadow-lg shadow-violet-900/15 ring-1 ring-white/10 sm:rounded-2xl sm:px-5 sm:py-4">
        <div className="pointer-events-none absolute -right-6 -top-6 size-32 rounded-full bg-white/10 blur-2xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-10 left-1/4 size-40 rounded-full bg-fuchsia-400/15 blur-3xl" aria-hidden />
        <div className="relative flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
            <Headphones className="size-3 text-white" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-100/90">Immersive audio</p>
            <h2 className="mt-0.5 text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
              Discover places through sound
            </h2>
            <p className="mt-1 max-w-md text-xs leading-relaxed text-violet-100/95 sm:text-sm">
              Curated walks with rich narration—plus optional AI stories from your own photos.
            </p>
          </div>
        </div>
        <div className="relative mt-3">
          <PillSearchInput
            variant="onGradient"
            wrapperClassName="w-full !py-2 !shadow-md !ring-white/30 sm:!py-2.5"
            iconClassName="!size-3 sm:!size-3.5"
            placeholder="Search cities, landmarks, or experiences"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search audio guides"
          />
        </div>
      </div>

      <div
        className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Filter by city"
      >
        {AUDIOGUIDE_CITIES.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={city === c}
            onClick={() => onCityChange(c)}
            className={cn(
              'shrink-0 rounded-full px-3 py-2 text-sm font-semibold transition-all active:scale-[0.98]',
              city === c
                ? 'bg-[#6D28D9] text-white shadow-md shadow-violet-900/20 ring-2 ring-violet-400/40'
                : 'bg-white text-[#374151] shadow-sm ring-1 ring-gray-200/90 hover:bg-violet-50/80 hover:ring-violet-200',
            )}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}