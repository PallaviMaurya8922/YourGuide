import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  cloneGuideFilters,
  defaultGuideFilters,
  type BudgetId,
  type ExperienceId,
  type GuideFiltersState,
  type LanguageId,
  type RatingId,
} from '../guideFilters';
import { ApplyFiltersButton } from './ApplyFiltersButton';
import { FilterSection } from './FilterSection';
import { FilterToggle } from './FilterToggle';

const LANGUAGE_OPTIONS: { id: LanguageId; label: string }[] = [
  { id: 'hindi', label: 'Hindi' },
  { id: 'english', label: 'English' },
  { id: 'bengali', label: 'Bengali' },
];

const BUDGET_OPTIONS: { id: BudgetId; label: string }[] = [
  { id: 'under500', label: 'Under ₹500' },
  { id: 'mid', label: '₹500 – ₹1,000' },
  { id: '1000plus', label: '₹1,000+' },
];

const RATING_OPTIONS: { id: RatingId; label: string }[] = [
  { id: '4', label: '4.0+' },
  { id: '4.5', label: '4.5+' },
  { id: '5', label: '5.0' },
];

const EXPERIENCE_OPTIONS: { id: ExperienceId; label: string }[] = [
  { id: 'heritage', label: 'Heritage' },
  { id: 'spiritual', label: 'Spiritual' },
  { id: 'food', label: 'Food tour' },
  { id: 'photography', label: 'Photography' },
];

export type FiltersBottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applied: GuideFiltersState;
  onApply: (next: GuideFiltersState) => void;
};

export function FiltersBottomSheet({ open, onOpenChange, applied, onApply }: FiltersBottomSheetProps) {
  const [draft, setDraft] = useState<GuideFiltersState>(() => cloneGuideFilters(applied));

  useEffect(() => {
    if (open) setDraft(cloneGuideFilters(applied));
  }, [open, applied]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  const setLanguage = useCallback((id: LanguageId) => {
    setDraft((d) => ({ ...d, language: d.language === id ? null : id }));
  }, []);

  const setBudget = useCallback((id: BudgetId) => {
    setDraft((d) => ({ ...d, budget: d.budget === id ? null : id }));
  }, []);

  const setRating = useCallback((id: RatingId) => {
    setDraft((d) => ({ ...d, rating: d.rating === id ? null : id }));
  }, []);

  const toggleExperience = useCallback((id: ExperienceId) => {
    setDraft((d) => ({
      ...d,
      experiences: d.experiences.includes(id)
        ? d.experiences.filter((x) => x !== id)
        : [...d.experiences, id],
    }));
  }, []);

  const handleReset = useCallback(() => {
    setDraft(cloneGuideFilters(defaultGuideFilters));
  }, []);

  const handleApply = useCallback(() => {
    onApply(cloneGuideFilters(draft));
    onOpenChange(false);
  }, [draft, onApply, onOpenChange]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            key="explore-filters-backdrop"
            type="button"
            aria-label="Close filters"
            className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            key="explore-filters-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="filters-sheet-title"
            aria-describedby="filters-sheet-desc"
            className="pointer-events-none fixed inset-x-0 bottom-0 z-[61] mx-auto w-full max-w-md px-3 sm:max-w-lg sm:px-4"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 440, damping: 36, mass: 0.82 }}
          >
            <div className="pointer-events-auto flex max-h-[min(88dvh,calc(100svh-0.75rem))] min-h-0 w-full flex-col overflow-hidden rounded-t-2xl border border-gray-200/90 border-b-0 bg-white shadow-[0_-12px_40px_-8px_rgba(15,23,42,0.2)]">
              <header className="shrink-0 border-b border-gray-100 bg-white px-4 pb-3 pt-2.5">
                <div className="mx-auto mb-2.5 flex w-10 justify-center pt-0.5">
                  <div className="h-1 w-9 rounded-full bg-gray-300/95" aria-hidden />
                </div>
                <h2 id="filters-sheet-title" className="text-[17px] font-semibold leading-tight tracking-tight text-[#111827]">
                  Filters
                </h2>
                <p id="filters-sheet-desc" className="mt-1.5 text-[13px] leading-snug text-[#9CA3AF]">
                  Refine guides by language, budget, rating, and experience.
                </p>
              </header>

              <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-y-contain scroll-smooth [-webkit-overflow-scrolling:touch]">
                <div className="space-y-5 px-4 py-4">
                  <FilterSection title="Language">
                    {LANGUAGE_OPTIONS.map((o) => (
                      <FilterToggle
                        key={o.id}
                        label={o.label}
                        variant="radio"
                        surface="joined"
                        selected={draft.language === o.id}
                        onSelect={() => setLanguage(o.id)}
                      />
                    ))}
                  </FilterSection>

                  <FilterSection title="Budget">
                    {BUDGET_OPTIONS.map((o) => (
                      <FilterToggle
                        key={o.id}
                        label={o.label}
                        variant="radio"
                        surface="joined"
                        selected={draft.budget === o.id}
                        onSelect={() => setBudget(o.id)}
                      />
                    ))}
                  </FilterSection>

                  <FilterSection title="Rating">
                    {RATING_OPTIONS.map((o) => (
                      <FilterToggle
                        key={o.id}
                        label={o.label}
                        variant="radio"
                        surface="joined"
                        selected={draft.rating === o.id}
                        onSelect={() => setRating(o.id)}
                      />
                    ))}
                  </FilterSection>

                  <FilterSection title="Experience type" layout="grid">
                    {EXPERIENCE_OPTIONS.map((o) => (
                      <FilterToggle
                        key={o.id}
                        label={o.label}
                        variant="check"
                        surface="card"
                        selected={draft.experiences.includes(o.id)}
                        onSelect={() => toggleExperience(o.id)}
                      />
                    ))}
                  </FilterSection>
                </div>
              </div>

              <footer className="shrink-0 border-t border-gray-200 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_28px_-6px_rgba(15,23,42,0.12)] backdrop-blur-sm">
                <ApplyFiltersButton onClick={handleApply} />
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-2 flex min-h-11 w-full items-center justify-center rounded-xl py-2.5 text-sm font-medium text-[#6B7280] transition-colors hover:bg-gray-50 hover:text-[#374151] active:bg-gray-100"
                >
                  Reset filters
                </button>
              </footer>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
