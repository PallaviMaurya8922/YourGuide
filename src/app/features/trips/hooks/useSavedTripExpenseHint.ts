import { useMemo } from 'react';
import { useTripExpenses } from '../../../context/TripExpensesContext';
import { formatINR } from '../../expenses/expenseUtils';

/** Live hint from split store when `saved-{id}` exists; otherwise falls back to mock label. */
export function useSavedTripExpenseHint(savedTripId: number, fallbackLabel: string) {
  const { trips } = useTripExpenses();

  return useMemo(() => {
    const linked = trips.find((t) => t.id === `saved-${savedTripId}`);
    if (!linked || linked.expenses.length === 0) return fallbackLabel;
    const total = linked.expenses.reduce((s, e) => s + e.amount, 0);
    const n = linked.expenses.length;
    return `${formatINR(total)} shared · ${n} expense${n === 1 ? '' : 's'}`;
  }, [trips, savedTripId, fallbackLabel]);
}
