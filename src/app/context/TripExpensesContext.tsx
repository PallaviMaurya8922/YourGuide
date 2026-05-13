import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ExpenseCategory } from '../types/tripExpense';

export type { ExpenseCategory };

export type SplitMember = { id: string; name: string };

export type SplitExpense = {
  id: string;
  description: string;
  amount: number;
  paidByMemberId: string;
  splitBetweenMemberIds: string[];
  createdAt: number;
  category: ExpenseCategory;
  /** When set, overrides equal split (amounts in INR, should sum to `amount` for participants). */
  customShares?: Record<string, number>;
  status?: 'pending' | 'confirmed';
};

/** Saved when a split group is created from the planner so we can reopen that itinerary. */
export type PlannerTripSnapshot = {
  city: string;
  days: string;
  interests: string[];
  budget: 'budget' | 'moderate' | 'luxury';
};

export type CreateTripInput = {
  name: string;
  subtitle?: string;
  plannerSnapshot?: PlannerTripSnapshot;
};

export type ExpenseTrip = {
  id: string;
  name: string;
  subtitle?: string;
  plannerSnapshot?: PlannerTripSnapshot;
  members: SplitMember[];
  expenses: SplitExpense[];
  createdAt: number;
};

export type AddExpensePayload = {
  description: string;
  amount: number;
  paidByMemberId: string;
  splitBetweenMemberIds: string[];
  category?: ExpenseCategory;
  customShares?: Record<string, number>;
  status?: 'pending' | 'confirmed';
};

type TripExpensesContextValue = {
  trips: ExpenseTrip[];
  selectedTripId: string | null;
  setSelectedTripId: (id: string | null) => void;
  createTrip: (input: CreateTripInput) => string;
  getOrCreateTripForSavedTrip: (
    savedTripId: number,
    meta: { city: string; dates: string; places: number },
  ) => string;
  addMember: (tripId: string, name: string) => void;
  addExpense: (tripId: string, input: AddExpensePayload) => void;
  confirmExpense: (tripId: string, expenseId: string) => void;
  removeExpense: (tripId: string, expenseId: string) => void;
};

const TripExpensesContext = createContext<TripExpensesContextValue | null>(null);

const INITIAL_TRIPS: ExpenseTrip[] = [
  {
    id: 'trip-demo-varanasi',
    name: 'Varanasi weekend',
    subtitle: 'Apr 15–17, 2026 · 12 stops',
    members: [
      { id: 'demo_v_m1', name: 'You' },
      { id: 'demo_v_m2', name: 'Rahul' },
      { id: 'demo_v_m3', name: 'Aman' },
    ],
    expenses: [
      {
        id: 'demo_v_e1',
        description: 'Heritage hotel — 2 nights',
        amount: 7200,
        paidByMemberId: 'demo_v_m1',
        splitBetweenMemberIds: ['demo_v_m1', 'demo_v_m2', 'demo_v_m3'],
        createdAt: Date.now() - 1000 * 60 * 60 * 26,
        category: 'hotel',
        status: 'confirmed',
      },
      {
        id: 'demo_v_e2',
        description: 'Street food crawl',
        amount: 1800,
        paidByMemberId: 'demo_v_m2',
        splitBetweenMemberIds: ['demo_v_m1', 'demo_v_m2', 'demo_v_m3'],
        createdAt: Date.now() - 1000 * 60 * 60 * 8,
        category: 'food',
        status: 'confirmed',
      },
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: 'trip-demo-agra',
    name: 'Agra family trip',
    subtitle: 'Mar 10–12, 2026 · 8 places',
    members: [
      { id: 'demo_a_m1', name: 'You' },
      { id: 'demo_a_m2', name: 'Priya' },
    ],
    expenses: [
      {
        id: 'demo_a_pending_guide',
        description: 'Guide — Taj & Fort (pending)',
        amount: 2400,
        paidByMemberId: 'demo_a_m2',
        splitBetweenMemberIds: ['demo_a_m1', 'demo_a_m2'],
        createdAt: Date.now() - 1000 * 60 * 60 * 2,
        category: 'guide',
        status: 'pending',
      },
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
  },
];

export function TripExpensesProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<ExpenseTrip[]>(INITIAL_TRIPS);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(
    INITIAL_TRIPS[0]?.id ?? null,
  );

  const createTrip = useCallback((input: CreateTripInput) => {
    const id = `trip_${Date.now()}`;
    const youId = `m_you_${id}`;
    setTrips((prev) => [
      {
        id,
        name: input.name,
        subtitle: input.subtitle,
        plannerSnapshot: input.plannerSnapshot,
        members: [{ id: youId, name: 'You' }],
        expenses: [],
        createdAt: Date.now(),
      },
      ...prev,
    ]);
    setSelectedTripId(id);
    return id;
  }, []);

  const getOrCreateTripForSavedTrip = useCallback(
    (savedTripId: number, meta: { city: string; dates: string; places: number }) => {
      const id = `saved-${savedTripId}`;
      setTrips((prev) => {
        if (prev.some((t) => t.id === id)) return prev;
        const youId = `m_you_${id}`;
        return [
          {
            id,
            name: `${meta.city} trip`,
            subtitle: `${meta.dates} · ${meta.places} places`,
            members: [{ id: youId, name: 'You' }],
            expenses: [],
            createdAt: Date.now(),
          },
          ...prev,
        ];
      });
      setSelectedTripId(id);
      return id;
    },
    [],
  );

  const addMember = useCallback((tripId: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const memberId = `m_${Math.random().toString(16).slice(2)}`;
    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId
          ? { ...t, members: [...t.members, { id: memberId, name: trimmed }] }
          : t,
      ),
    );
  }, []);

  const addExpense = useCallback((tripId: string, input: AddExpensePayload) => {
    const expenseId = `e_${Math.random().toString(16).slice(2)}`;
    const category: ExpenseCategory = input.category ?? 'other';
    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId
          ? {
              ...t,
              expenses: [
                {
                  id: expenseId,
                  description: input.description,
                  amount: input.amount,
                  paidByMemberId: input.paidByMemberId,
                  splitBetweenMemberIds: input.splitBetweenMemberIds,
                  createdAt: Date.now(),
                  category,
                  customShares: input.customShares,
                  status: input.status ?? 'confirmed',
                },
                ...t.expenses,
              ],
            }
          : t,
      ),
    );
  }, []);

  const confirmExpense = useCallback((tripId: string, expenseId: string) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId
          ? {
              ...t,
              expenses: t.expenses.map((e) =>
                e.id === expenseId ? { ...e, status: 'confirmed' as const } : e,
              ),
            }
          : t,
      ),
    );
  }, []);

  const removeExpense = useCallback((tripId: string, expenseId: string) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId
          ? { ...t, expenses: t.expenses.filter((e) => e.id !== expenseId) }
          : t,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({
      trips,
      selectedTripId,
      setSelectedTripId,
      createTrip,
      getOrCreateTripForSavedTrip,
      addMember,
      addExpense,
      confirmExpense,
      removeExpense,
    }),
    [
      trips,
      selectedTripId,
      createTrip,
      getOrCreateTripForSavedTrip,
      addMember,
      addExpense,
      confirmExpense,
      removeExpense,
    ],
  );

  return (
    <TripExpensesContext.Provider value={value}>{children}</TripExpensesContext.Provider>
  );
}

export function useTripExpenses() {
  const ctx = useContext(TripExpensesContext);
  if (!ctx) {
    throw new Error('useTripExpenses must be used within TripExpensesProvider');
  }
  return ctx;
}
