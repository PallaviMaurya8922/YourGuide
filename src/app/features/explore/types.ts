export type ExploreLanguage = 'any' | 'hindi' | 'english' | 'bengali';

export type ExploreBudget = 'any' | 'under500' | '500-1000' | '1000plus';

export type ExploreRating = 'any' | '4' | '4.5' | '5';

export type ExploreExperience = 'heritage' | 'spiritual' | 'food' | 'photography';

export type ExploreFilterState = {
  language: ExploreLanguage;
  budget: ExploreBudget;
  rating: ExploreRating;
  experience: ExploreExperience[];
};

export const DEFAULT_EXPLORE_FILTERS: ExploreFilterState = {
  language: 'any',
  budget: 'any',
  rating: 'any',
  experience: [],
};

export function exploreFiltersActive(f: ExploreFilterState): boolean {
  return (
    f.language !== 'any' ||
    f.budget !== 'any' ||
    f.rating !== 'any' ||
    f.experience.length > 0
  );
}
