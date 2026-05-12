import { motion } from 'framer-motion';
import { Settings2, Star } from 'lucide-react';
import type { GuideFiltersState } from '../guideFilters';
import { hasExtendedFilters } from '../guideFilters';
import { FilterChip } from './FilterChip';
import { cn } from '../../../components/ui/utils';

export type QuickFiltersRowProps = {
  value: GuideFiltersState;
  onChange: (next: GuideFiltersState) => void;
  onOpenSheet: () => void;
  className?: string;
};

export function QuickFiltersRow({ value, onChange, onOpenSheet, className }: QuickFiltersRowProps) {
  const patch = (partial: Partial<GuideFiltersState>) => {
    onChange({ ...value, ...partial, experiences: [...value.experiences] });
  };

  const hindiOn = value.language === 'hindi';
  const topRatedOn = value.rating === '4.5';
  const budgetOn = value.budget === 'under500';
  const showAdvancedDot = hasExtendedFilters(value);

  return (
    <div className={cn('-mx-1', className)}>
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto px-1 py-0.5 [-webkit-overflow-scrolling:touch]">
        <FilterChip
          label="Hindi"
          selected={hindiOn}
          variant="compact"
          onClick={() => patch({ language: hindiOn ? null : 'hindi' })}
        />
        <FilterChip
          label="Top rated"
          icon={Star}
          selected={topRatedOn}
          variant="compact"
          onClick={() => patch({ rating: topRatedOn ? null : '4.5' })}
        />
        <FilterChip
          label="Under ₹500"
          selected={budgetOn}
          variant="compact"
          onClick={() => patch({ budget: budgetOn ? null : 'under500' })}
        />
        <motion.button
          type="button"
          layout
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 520, damping: 32 }}
          onClick={onOpenSheet}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#F9FAFB] py-1.5 pl-2.5 pr-3 text-[12px] font-semibold text-[#374151] ring-1 ring-inset ring-gray-200/90 transition-colors hover:bg-gray-50 sm:gap-2 sm:py-2 sm:pl-3 sm:pr-3.5 sm:text-[13px]"
          aria-label="Open all filters"
        >
          <span className="relative flex size-7 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100 sm:size-8">
            <Settings2 className="size-3.5 text-[#1E3A8A] sm:size-4" strokeWidth={2} aria-hidden />
            {showAdvancedDot ? (
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[#3B82F6] ring-2 ring-white sm:size-2.5" />
            ) : null}
          </span>
          <span>Filters</span>
        </motion.button>
      </div>
    </div>
  );
}
