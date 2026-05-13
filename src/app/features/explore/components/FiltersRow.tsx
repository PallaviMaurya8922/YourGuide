import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { PAGE_PAD_X } from '../../../shellLayout';
import type { GuideFiltersState } from '../guideFilters';
import { FiltersBottomSheet } from './FiltersBottomSheet';
import { QuickFiltersRow } from './QuickFiltersRow';

export type FiltersRowProps = {
  city: string;
  filters: GuideFiltersState;
  onFiltersChange: (next: GuideFiltersState) => void;
  onLocationPress?: () => void;
};

export function FiltersRow({ city, filters, onFiltersChange, onLocationPress }: FiltersRowProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <section className={`border-b border-gray-100 bg-white ${PAGE_PAD_X} pb-2 pt-1 sm:pb-2.5 sm:pt-1.5`}>
        <div className="mb-2 flex items-start justify-between gap-2 sm:mb-2.5 sm:items-center">
          <button
            type="button"
            onClick={onLocationPress}
            className="flex min-w-0 flex-1 items-start gap-2 rounded-xl py-0.5 text-left transition-colors active:bg-gray-50 sm:items-center sm:gap-2.5"
          >
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#1E3A8A] sm:mt-0 sm:size-9">
              <MapPin className="size-3.5 sm:size-4" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-wide text-[#9CA3AF] sm:text-[11px]">
                Guides in
              </span>
              <span className="mt-0.5 flex items-center gap-1 text-sm font-semibold text-[#111827] sm:text-[15px]">
                <span className="truncate">{city}</span>
                <ChevronDown className="size-3.5 shrink-0 text-[#9CA3AF] sm:size-4" aria-hidden />
              </span>
            </span>
          </button>
        </div>

        <QuickFiltersRow value={filters} onChange={onFiltersChange} onOpenSheet={() => setSheetOpen(true)} />
      </section>

      <FiltersBottomSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        applied={filters}
        onApply={onFiltersChange}
      />
    </>
  );
}
