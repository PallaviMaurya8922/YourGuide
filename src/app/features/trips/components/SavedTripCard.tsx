import { motion } from 'framer-motion';
import { Calendar, ReceiptIndianRupee, Route, Users } from 'lucide-react';
import type { SavedTripOpenPayload } from '../types';
import type { SavedTripMock, TripStatus } from '../data/tripsMock';
import { useSavedTripExpenseHint } from '../hooks/useSavedTripExpenseHint';
import { cn } from '../../../components/ui/utils';

function statusStyles(status: TripStatus) {
  switch (status) {
    case 'In Progress':
      return 'bg-[#FFF7ED] text-[#C2410C] ring-1 ring-[#FDBA74]/60';
    case 'Completed':
      return 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100';
    default:
      return 'bg-[#EFF6FF] text-[#1E40AF] ring-1 ring-[#BFDBFE]';
  }
}

export function SavedTripCard({
  trip,
  expenseFallbackLabel,
  onOpenTripExpenses,
  onViewDetails,
}: {
  trip: SavedTripMock;
  expenseFallbackLabel: string;
  onOpenTripExpenses?: (trip: SavedTripOpenPayload) => void;
  onViewDetails?: (trip: SavedTripOpenPayload) => void;
}) {
  const expenseHint = useSavedTripExpenseHint(trip.id, expenseFallbackLabel);

  const payload: SavedTripOpenPayload = {
    id: trip.id,
    city: trip.city,
    dates: trip.dates,
    places: trip.places,
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.992 }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:border-[#BFDBFE] hover:shadow-md"
    >
      <div className="flex gap-2 p-2.5 sm:gap-2.5 sm:p-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-lg shadow-sm sm:size-12 sm:rounded-xl sm:text-xl">
          {trip.image}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-[15px] font-semibold leading-tight tracking-tight text-[#111827] sm:text-base">
                {trip.city}
              </h3>
              <p className="mt-0.5 flex min-w-0 items-center gap-1 text-[11px] text-[#6B7280] sm:text-xs">
                <Calendar className="size-3 shrink-0 opacity-80" aria-hidden />
                <span className="truncate">{trip.dates}</span>
              </p>
            </div>
            <span
              className={cn(
                'shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide sm:px-2 sm:text-[10px]',
                statusStyles(trip.status),
              )}
            >
              {trip.status}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 border-t border-gray-50 px-2.5 py-2 sm:px-3 sm:py-2.5">
        <div className="grid grid-cols-2 gap-1.5 text-xs sm:gap-2 sm:text-sm">
          <div className="rounded-lg bg-[#F9FAFB] px-2 py-1.5 sm:px-2.5 sm:py-2">
            <p className="text-[9px] font-medium uppercase tracking-wide text-[#9CA3AF] sm:text-[10px]">
              Travelers
            </p>
            <p className="mt-0.5 flex items-center gap-1 font-semibold text-[#111827]">
              <Users className="size-3 shrink-0 text-[#6B7280]" aria-hidden />
              {trip.travelerCount}
            </p>
          </div>
          <div className="rounded-lg bg-[#F9FAFB] px-2 py-1.5 sm:px-2.5 sm:py-2">
            <p className="text-[9px] font-medium uppercase tracking-wide text-[#9CA3AF] sm:text-[10px]">Guide</p>
            <p className="mt-0.5 truncate font-medium leading-snug text-[#374151]">{trip.guide}</p>
          </div>
          <div className="col-span-2 rounded-lg bg-[#F9FAFB] px-2 py-1.5 sm:px-2.5 sm:py-2">
            <p className="text-[9px] font-medium uppercase tracking-wide text-[#9CA3AF] sm:text-[10px]">Stops</p>
            <p className="mt-0.5 font-semibold leading-snug text-[#111827]">{trip.places} places on route</p>
          </div>
          <div className="col-span-2 flex min-w-0 items-start gap-1.5 rounded-lg border border-[#E0E7FF] bg-[#F8FAFF] px-2 py-1.5 sm:gap-2 sm:px-2.5 sm:py-2">
            <ReceiptIndianRupee className="mt-0.5 size-3.5 shrink-0 text-[#3B82F6]" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-semibold uppercase tracking-wide text-[#3B82F6] sm:text-[10px]">
                Group spend
              </p>
              <p className="break-words text-[13px] font-semibold leading-snug text-[#1E3A8A] sm:text-sm">
                {expenseHint}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-0.5 flex items-center justify-between text-[9px] font-medium uppercase tracking-wide text-[#9CA3AF] sm:text-[10px]">
            <span className="flex items-center gap-1">
              <Route className="size-3" aria-hidden />
              Journey
            </span>
            <span>{trip.journeyProgress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#E5E7EB]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6]"
              initial={{ width: 0 }}
              animate={{ width: `${trip.journeyProgress}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 22 }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-1.5 border-t border-gray-100 p-2.5 sm:gap-2 sm:p-3">
        {onViewDetails ? (
          <button
            type="button"
            onClick={() => onViewDetails(payload)}
            className="inline-flex min-h-9 min-w-0 flex-1 items-center justify-center gap-1 rounded-full bg-[#1E3A8A] px-2 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1c3578] sm:min-h-10 sm:gap-1.5 sm:px-2.5 sm:text-xs"
          >
            <span className="truncate">View details</span>
          </button>
        ) : null}
        {onOpenTripExpenses ? (
          <button
            type="button"
            onClick={() => onOpenTripExpenses(payload)}
            className="inline-flex min-h-9 min-w-0 flex-1 items-center justify-center gap-1 rounded-full border border-[#3B82F6] bg-[#EFF6FF] px-2 text-[11px] font-semibold text-[#1E3A8A] transition-colors hover:bg-[#DBEAFE] sm:min-h-10 sm:gap-1.5 sm:px-2.5 sm:text-xs"
          >
            <ReceiptIndianRupee className="size-3.5 shrink-0 sm:size-4" aria-hidden />
            <span className="truncate">Split costs</span>
          </button>
        ) : null}
      </div>
    </motion.article>
  );
}
