import { useEffect, useState } from 'react';
import { useTripExpenses, type PlannerTripSnapshot } from '../context/TripExpensesContext';
import {
  ExpenseOverviewSkeleton,
  SplitOverviewScreen,
  TripExpenseDetailScreen,
} from '../features/expenses';

export type ExpenseSplitPageProps = {
  onViewPlannedTrip?: (snapshot: PlannerTripSnapshot) => void;
};

export default function ExpenseSplitPage({ onViewPlannedTrip }: ExpenseSplitPageProps) {
  const { trips, selectedTripId, setSelectedTripId, createTrip } = useTripExpenses();
  const [view, setView] = useState<'overview' | 'detail'>('overview');
  const [overviewLoading, setOverviewLoading] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setOverviewLoading(false), 420);
    return () => window.clearTimeout(id);
  }, []);

  const activeTrip = trips.find((t) => t.id === selectedTripId) ?? null;

  useEffect(() => {
    if (view === 'detail' && selectedTripId && !trips.some((t) => t.id === selectedTripId)) {
      setView('overview');
    }
  }, [view, selectedTripId, trips]);

  if (view === 'detail' && activeTrip) {
    return (
      <TripExpenseDetailScreen
        trip={activeTrip}
        onBack={() => setView('overview')}
        onViewPlannedTrip={onViewPlannedTrip}
      />
    );
  }

  return (
    <SplitOverviewScreen
      trips={trips}
      selectedTripId={selectedTripId}
      onSelectTrip={(id) => {
        setSelectedTripId(id);
        setView('detail');
      }}
      onCreateTrip={() => {
        createTrip({
          name: `Trip ${trips.length + 1}`,
          subtitle: 'Add travelers & expenses',
        });
        setView('detail');
      }}
      isLoading={overviewLoading}
      skeleton={<ExpenseOverviewSkeleton />}
    />
  );
}
