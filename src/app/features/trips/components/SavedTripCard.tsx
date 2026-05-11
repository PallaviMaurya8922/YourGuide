import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar,
  ChevronDown,
  MapPin,
  ReceiptIndianRupee,
  Route,
  Sparkles,
  Users,
} from 'lucide-react';
import { useState } from 'react';
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
}: {
  trip: SavedTripMock;
  expenseFallbackLabel: string;
  onOpenTripExpenses?: (trip: SavedTripOpenPayload) => void;
}) {
  const [expanded, setExpanded] = useState(false);
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
      {/* Top */}
      <div className="flex gap-3 p-4 pb-3">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-2xl shadow-sm">
          {trip.image}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold tracking-tight text-[#111827]">
                {trip.city}
              </h3>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[#6B7280]">
                <Calendar className="size-3 shrink-0 opacity-80" aria-hidden />
                <span className="truncate">{trip.dates}</span>
              </p>
            </div>
            <span
              className={cn(
                'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide',
                statusStyles(trip.status),
              )}
            >
              {trip.status}
            </span>
          </div>
        </div>
      </div>

      {/* Middle */}
      <div className="space-y-3 border-t border-gray-50 px-4 py-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-[#F9FAFB] px-3 py-2">
            <p className="text-[10px] font-medium uppercase tracking-wide text-[#9CA3AF]">Travelers</p>
            <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-[#111827]">
              <Users className="size-3.5 text-[#6B7280]" aria-hidden />
              {trip.travelerCount}
            </p>
          </div>
          <div className="rounded-xl bg-[#F9FAFB] px-3 py-2">
            <p className="text-[10px] font-medium uppercase tracking-wide text-[#9CA3AF]">Guide</p>
            <p className="mt-0.5 truncate font-medium text-[#374151]">{trip.guide}</p>
          </div>
          <div className="col-span-2 rounded-xl bg-[#F9FAFB] px-3 py-2">
            <p className="text-[10px] font-medium uppercase tracking-wide text-[#9CA3AF]">Stops</p>
            <p className="mt-0.5 font-semibold text-[#111827]">{trip.places} places on route</p>
          </div>
          <div className="col-span-2 flex items-start gap-2 rounded-xl border border-[#E0E7FF] bg-[#F8FAFF] px-3 py-2.5">
            <ReceiptIndianRupee className="mt-0.5 size-4 shrink-0 text-[#3B82F6]" aria-hidden />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#3B82F6]">
                Group spend
              </p>
              <p className="text-sm font-semibold text-[#1E3A8A]">{expenseHint}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between text-[10px] font-medium uppercase tracking-wide text-[#9CA3AF]">
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

      {/* Bottom CTAs */}
      <div className="flex flex-col gap-2 border-t border-gray-100 p-4 sm:flex-row sm:items-stretch">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#1E3A8A] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1c3578]"
        >
          View trip
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="size-4" aria-hidden />
          </motion.span>
        </button>
        {onOpenTripExpenses ? (
          <button
            type="button"
            onClick={() => onOpenTripExpenses(payload)}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#3B82F6] bg-[#EFF6FF] px-4 text-sm font-semibold text-[#1E3A8A] transition-colors hover:bg-[#DBEAFE]"
          >
            <ReceiptIndianRupee className="size-4 shrink-0" aria-hidden />
            Split costs
          </button>
        ) : null}
      </div>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-gray-100 bg-[#FAFBFC]"
          >
            <div className="space-y-3 p-4">
              <div className="flex gap-2 rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-100">
                <Sparkles className="size-4 shrink-0 text-[#3B82F6]" aria-hidden />
                <p className="text-xs leading-relaxed text-[#4B5563]">{trip.insight}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-[#6B7280]">
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 ring-1 ring-gray-100">
                  <MapPin className="size-3" aria-hidden />
                  {trip.city} route saved
                </span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
