import type { ExpenseCategory } from '../../../types/tripExpense';
import type { ExpenseTrip } from '../../../context/TripExpensesContext';

export type SmartExpenseNudge = {
  id: string;
  title: string;
  subtitle: string;
  suggestedTitle: string;
  suggestedCategory: ExpenseCategory;
  suggestedAmount?: number;
  /** Shown as contextual “AI” hint */
  sourceLabel: string;
};

/** Dummy + rule-based nudges — feels contextual without a backend. */
export function getSmartNudgesForTrip(trip: ExpenseTrip): SmartExpenseNudge[] {
  const nudges: SmartExpenseNudge[] = [];

  if (trip.plannerSnapshot) {
    nudges.push({
      id: `nudge-tickets-${trip.id}`,
      title: 'Museum & site entries',
      subtitle: `Based on your ${trip.plannerSnapshot.city} plan — add ticket splits as you book.`,
      suggestedTitle: 'Monument tickets',
      suggestedCategory: 'tickets',
      suggestedAmount: 800,
      sourceLabel: 'Planner',
    });
  }

  nudges.push({
    id: `nudge-hotel-${trip.id}`,
    title: 'Hotel booking',
    subtitle: 'When your stay is confirmed, split it with the group in one tap.',
    suggestedTitle: 'Hotel — night 1',
    suggestedCategory: 'hotel',
    suggestedAmount: 4500,
    sourceLabel: 'Trip assistant',
  });

  nudges.push({
    id: `nudge-guide-${trip.id}`,
    title: 'Guide booking',
    subtitle: 'We can add a shared guide fee everyone splits evenly.',
    suggestedTitle: 'Local guide — half day',
    suggestedCategory: 'guide',
    suggestedAmount: 1200,
    sourceLabel: 'Guide Connect',
  });

  return nudges;
}
