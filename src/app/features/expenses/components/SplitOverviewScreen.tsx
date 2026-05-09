import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Plus, ReceiptIndianRupee, Users } from 'lucide-react';
import { ScreenHero } from '../../../components/commonComponents';
import { PAGE_PAD_X } from '../../../shellLayout';
import type { ExpenseTrip } from '../../../context/TripExpensesContext';
import {
  computeBalances,
  formatINR,
  parseTripDates,
  settlementVolume,
  simplifySettlements,
  sum,
  tripTotalSpent,
} from '../expenseUtils';
import { TravelerAvatarStack } from './TravelerAvatarStack';
import { cn } from '../../../components/ui/utils';

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function SplitOverviewScreen({
  trips,
  selectedTripId,
  onSelectTrip,
  onCreateTrip,
  isLoading,
  skeleton,
}: {
  trips: ExpenseTrip[];
  selectedTripId: string | null;
  onSelectTrip: (id: string) => void;
  onCreateTrip: () => void;
  isLoading?: boolean;
  skeleton?: ReactNode;
}) {
  const totalShared = sum(trips.map((t) => tripTotalSpent(t.expenses)));
  const travelerCount = sum(trips.map((t) => t.members.length));
  const yourNetAgg = sum(
    trips.map((t) => {
      const you = t.members.find((m) => m.name.toLowerCase() === 'you');
      if (!you) return 0;
      const bal = computeBalances(t.members, t.expenses)[you.id] ?? 0;
      return bal;
    }),
  );

  const netLabel =
    Math.abs(yourNetAgg) < 1
      ? 'All caught up'
      : yourNetAgg > 0
        ? `You’re owed ${formatINR(yourNetAgg)}`
        : `You owe ${formatINR(Math.abs(yourNetAgg))}`;

  return (
    <div className="min-h-full bg-[#F9FAFB] pb-28">
      <ScreenHero
        title="Trip expenses"
        subtitle="Split costs with your travel group — light and simple"
        hideTitleFromLg
      />

      <div className={`relative z-10 -mt-3 space-y-5 ${PAGE_PAD_X} pb-6`}>
        {isLoading && skeleton ? (
          skeleton
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-2 sm:gap-3"
            >
              <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <p className="text-[10px] font-medium uppercase tracking-wide text-[#6B7280] sm:text-xs">
                  Shared
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-[#111827] sm:text-base">
                  {formatINR(totalShared)}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <p className="text-[10px] font-medium uppercase tracking-wide text-[#6B7280] sm:text-xs">
                  Trips
                </p>
                <p className="mt-1 flex items-baseline gap-1 text-sm font-semibold text-[#111827] sm:text-base">
                  {trips.length}
                  <Users className="size-3.5 text-[#9CA3AF]" aria-hidden />
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <p className="text-[10px] font-medium uppercase tracking-wide text-[#6B7280] sm:text-xs">
                  Your net
                </p>
                <p className="mt-1 line-clamp-2 text-xs font-semibold leading-tight text-[#1E3A8A] sm:text-sm">
                  {netLabel}
                </p>
              </div>
            </motion.div>

            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-[#111827] sm:text-base">Active trips</h2>
              <span className="text-xs text-[#6B7280]">
                {travelerCount} travelers across groups
              </span>
            </div>

            {trips.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-sm">
                <ReceiptIndianRupee className="mx-auto mb-3 size-10 text-[#93C5FD]" aria-hidden />
                <p className="text-sm font-medium text-[#111827]">No trips yet</p>
                <p className="mt-1 text-xs text-[#6B7280]">
                  Start from Planner or My Trips, or create a group here.
                </p>
                <button
                  type="button"
                  onClick={onCreateTrip}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1E3A8A] px-5 text-sm font-medium text-white shadow-sm"
                >
                  <Plus className="size-4" aria-hidden />
                  New split group
                </button>
              </div>
            ) : (
              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="space-y-3"
              >
                {trips.map((trip) => {
                  const spent = tripTotalSpent(trip.expenses);
                  const balances = computeBalances(trip.members, trip.expenses);
                  const transfers = simplifySettlements(trip.members, balances);
                  const vol = settlementVolume(transfers);
                  const progress =
                    spent <= 0 ? 0 : Math.min(100, Math.round((1 - vol / spent) * 100));

                  const active = trip.id === selectedTripId;

                  return (
                    <motion.li key={trip.id} variants={cardVariants} layout>
                      <button
                        type="button"
                        onClick={() => onSelectTrip(trip.id)}
                        className={cn(
                          'flex w-full min-w-0 flex-col gap-3 rounded-2xl border bg-white p-4 text-left shadow-sm transition-all',
                          active
                            ? 'border-[#3B82F6] ring-1 ring-[#3B82F6]/20'
                            : 'border-gray-100 hover:border-gray-200 hover:shadow-md',
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[#111827] sm:text-base">
                              {trip.name}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-[#6B7280]">
                              {parseTripDates(trip.subtitle) || trip.subtitle || 'Dates TBC'}
                            </p>
                          </div>
                          <ChevronRight className="size-5 shrink-0 text-[#9CA3AF]" aria-hidden />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <TravelerAvatarStack names={trip.members.map((m) => m.name)} max={4} />
                          <span className="text-xs text-[#6B7280]">
                            {trip.members.length}{' '}
                            {trip.members.length === 1 ? 'traveler' : 'travelers'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-end justify-between gap-2 border-t border-gray-50 pt-3">
                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-[#6B7280]">
                              Outstanding
                            </p>
                            <p className="text-sm font-semibold text-[#1E3A8A]">
                              {vol < 1 ? 'Settled' : formatINR(vol)}
                            </p>
                          </div>
                          <div className="min-w-[120px] flex-1 sm:max-w-[200px]">
                            <div className="mb-1 flex justify-between text-[10px] text-[#6B7280]">
                              <span>Split health</span>
                              <span>{spent <= 0 ? '—' : `${progress}%`}</span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-[#E5E7EB]">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6]"
                                initial={{ width: 0 }}
                                animate={{ width: `${spent <= 0 ? 0 : progress}%` }}
                                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}

            {trips.length > 0 ? (
              <button
                type="button"
                onClick={onCreateTrip}
                className="flex w-full min-h-11 items-center justify-center gap-2 rounded-2xl border border-dashed border-[#BFDBFE] bg-[#EFF6FF] py-3 text-sm font-medium text-[#1E3A8A] transition-colors hover:bg-[#DBEAFE]"
              >
                <Plus className="size-4" aria-hidden />
                New split group
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
