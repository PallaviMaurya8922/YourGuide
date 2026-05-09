import type { PlannerTripSnapshot } from './context/TripExpensesContext';

export const PLANNER_ITINERARY_RESUME_KEY = 'yourguide:planner-itinerary-resume';

export function stashPlannerItineraryResume(snapshot: PlannerTripSnapshot): void {
  try {
    sessionStorage.setItem(PLANNER_ITINERARY_RESUME_KEY, JSON.stringify(snapshot));
  } catch {
    // private mode / quota
  }
}
