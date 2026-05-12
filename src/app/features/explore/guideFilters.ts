export type LanguageId = 'hindi' | 'english' | 'bengali';
export type BudgetId = 'under500' | 'mid' | '1000plus';
export type RatingId = '4' | '4.5' | '5';
export type ExperienceId = 'heritage' | 'spiritual' | 'food' | 'photography';

export type GuideFiltersState = {
  language: LanguageId | null;
  budget: BudgetId | null;
  rating: RatingId | null;
  experiences: ExperienceId[];
};

export const defaultGuideFilters: GuideFiltersState = {
  language: null,
  budget: null,
  rating: null,
  experiences: [],
};

export function cloneGuideFilters(s: GuideFiltersState): GuideFiltersState {
  return { ...s, experiences: [...s.experiences] };
}

/** True when sheet-only dimensions differ from quick-row defaults (Hindi / Under ₹500 / 4.5+). */
export function hasExtendedFilters(s: GuideFiltersState): boolean {
  if (s.language === 'english' || s.language === 'bengali') return true;
  if (s.budget === 'mid' || s.budget === '1000plus') return true;
  if (s.rating === '4' || s.rating === '5') return true;
  if (s.experiences.length > 0) return true;
  return false;
}

export function countActiveFilters(s: GuideFiltersState): number {
  let n = 0;
  if (s.language) n += 1;
  if (s.budget) n += 1;
  if (s.rating) n += 1;
  n += s.experiences.length;
  return n;
}
