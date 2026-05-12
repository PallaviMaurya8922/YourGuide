import { useState } from 'react';
import { ArrowLeft, Calendar, UserPlus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { PAGE_PAD_X } from '../../../shellLayout';
import type { ExpenseTrip, PlannerTripSnapshot } from '../../../context/TripExpensesContext';
import { useTripExpenses } from '../../../context/TripExpensesContext';
import type { ExpenseCategory } from '../../../types/tripExpense';
import { computeBalances, simplifySettlements } from '../expenseUtils';
import { AddExpenseBottomSheet } from './AddExpenseBottomSheet';
import { ExpenseFAB } from './ExpenseFAB';
import { ExpenseTimelineCard } from './ExpenseTimelineCard';
import { SettlementSection } from './SettlementSection';
import { SmartTravelNudges } from './SmartTravelNudges';
import { TripSummaryCard } from './TripSummaryCard';
import { findYouMemberId } from '../expenseUtils';

export function TripExpenseDetailScreen({
  trip,
  onBack,
  onViewPlannedTrip,
}: {
  trip: ExpenseTrip;
  onBack: () => void;
  onViewPlannedTrip?: (snapshot: PlannerTripSnapshot) => void;
}) {
  const { addExpense, removeExpense, confirmExpense, addMember } = useTripExpenses();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [prefill, setPrefill] = useState<{
    title?: string;
    category?: ExpenseCategory;
    amount?: string;
  }>({});

  const [friendName, setFriendName] = useState('');

  const youId = findYouMemberId(trip.members);
  const balances = computeBalances(trip.members, trip.expenses);
  const settlements = simplifySettlements(trip.members, balances);

  const openSheet = (p?: typeof prefill) => {
    setPrefill(p ?? {});
    setSheetOpen(true);
  };

  const handleNudgePending = (n: { title: string; category: ExpenseCategory; amount: number }) => {
    if (!youId) return;
    const payerId = trip.members.find((m) => m.id !== youId)?.id ?? youId;
    addExpense(trip.id, {
      description: n.title,
      amount: n.amount,
      paidByMemberId: payerId,
      splitBetweenMemberIds: trip.members.map((m) => m.id),
      category: n.category,
      status: 'pending',
    });
  };

  return (
    <div className="min-h-full bg-[#F9FAFB] pb-28 sm:pb-32">
      <header className="sticky top-0 z-20 rounded-b-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] px-3 pb-3 pt-[max(0.375rem,env(safe-area-inset-top))] text-white shadow-sm sm:rounded-b-3xl sm:px-4 sm:pb-3.5 md:px-5 md:pb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors hover:bg-white/25 sm:size-10"
            aria-label="Back to overview"
          >
            <ArrowLeft className="size-5" aria-hidden />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg md:text-xl">{trip.name}</h1>
            {trip.subtitle ? (
              <p className="truncate text-[11px] text-white/85 sm:text-xs md:text-sm">{trip.subtitle}</p>
            ) : null}
          </div>
          {trip.plannerSnapshot && onViewPlannedTrip ? (
            <button
              type="button"
              onClick={() => onViewPlannedTrip(trip.plannerSnapshot!)}
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1.5 text-[10px] font-semibold backdrop-blur-sm hover:bg-white/25 sm:gap-1.5 sm:px-3 sm:py-2 sm:text-xs"
            >
              <Calendar className="size-3.5" aria-hidden />
              Trip
            </button>
          ) : null}
        </div>
      </header>

      <div className={`space-y-3 py-3 sm:space-y-4 sm:py-4 ${PAGE_PAD_X}`}>
        <TripSummaryCard members={trip.members} expenses={trip.expenses} />

        <SmartTravelNudges
          trip={trip}
          onPrefillExpense={(n) =>
            openSheet({
              title: n.title,
              category: n.category,
              amount: n.amount != null ? String(Math.round(n.amount)) : undefined,
            })
          }
          onAddPending={handleNudgePending}
        />

        <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-3.5 md:p-4">
          <div className="mb-2 flex items-center justify-between gap-2 sm:mb-2.5">
            <h3 className="text-[13px] font-semibold text-[#111827] sm:text-sm">Travelers</h3>
          </div>
          <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-2">
            <input
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              placeholder="Friend’s name"
              className="min-h-10 flex-1 rounded-lg border border-gray-200 px-2.5 text-sm outline-none focus:border-[#3B82F6] sm:min-h-11 sm:rounded-xl sm:px-3"
            />
            <button
              type="button"
              onClick={() => {
                addMember(trip.id, friendName);
                setFriendName('');
              }}
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#1E3A8A] px-3 text-[13px] font-medium text-white sm:min-h-11 sm:gap-2 sm:rounded-xl sm:px-4 sm:text-sm"
            >
              <UserPlus className="size-4" aria-hidden />
              Add
            </button>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-[13px] font-semibold text-[#111827] sm:mb-2.5 sm:text-sm">Activity</h3>
          <AnimatePresence initial={false}>
            {trip.expenses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-dashed border-gray-200 bg-white px-4 py-7 text-center shadow-sm sm:rounded-2xl sm:px-5 sm:py-9"
              >
                <p className="text-sm font-medium text-[#374151]">No expenses yet</p>
                <p className="mt-1 text-xs text-[#6B7280]">
                  Tap + to log a meal, stay, or ticket — like a travel diary.
                </p>
              </motion.div>
            ) : (
              <ul className="space-y-2 sm:space-y-2.5">
                {trip.expenses.map((e) => (
                  <motion.li
                    key={e.id}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ExpenseTimelineCard
                      expense={e}
                      members={trip.members}
                      onRemove={() => removeExpense(trip.id, e.id)}
                    />
                    {e.status === 'pending' ? (
                      <button
                        type="button"
                        onClick={() => confirmExpense(trip.id, e.id)}
                        className="mt-2 w-full rounded-xl border border-emerald-200 bg-emerald-50 py-2 text-xs font-semibold text-emerald-800"
                      >
                        Confirm split
                      </button>
                    ) : null}
                  </motion.li>
                ))}
              </ul>
            )}
          </AnimatePresence>
        </div>

        <SettlementSection transfers={settlements} />
      </div>

      <ExpenseFAB onClick={() => openSheet()} />

      <AddExpenseBottomSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        members={trip.members}
        initialTitle={prefill.title}
        initialCategory={prefill.category}
        initialAmount={prefill.amount}
        onSubmit={(payload) => addExpense(trip.id, payload)}
      />
    </div>
  );
}
