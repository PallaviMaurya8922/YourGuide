import { ArrowLeft, Calendar, MapPin, ReceiptIndianRupee, Route, Sparkles, Users } from 'lucide-react';
import { useMemo } from 'react';
import { CircleIconButton } from '../components/commonComponents';
import { useTripExpenses } from '../context/TripExpensesContext';
import { formatINR } from '../features/expenses/expenseUtils';
import { getSavedTripById } from '../features/trips/data/tripsMock';
import type { TripStatus } from '../features/trips/data/tripsMock';
import type { SavedTripOpenPayload } from '../features/trips/types';
import { useSavedTripExpenseHint } from '../features/trips/hooks/useSavedTripExpenseHint';
import { PAGE_PAD_X } from '../shellLayout';
import { cn } from '../components/ui/utils';

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

type TripDetailPageProps = {
  tripId: number;
  onBack: () => void;
  onOpenSplit: (trip: SavedTripOpenPayload) => void;
  onOpenPlanner?: () => void;
};

export default function TripDetailPage({ tripId, onBack, onOpenSplit, onOpenPlanner }: TripDetailPageProps) {
  const trip = useMemo(() => getSavedTripById(tripId), [tripId]);
  const { trips } = useTripExpenses();
  const expenseHint = useSavedTripExpenseHint(tripId, trip?.expensePreviewLabel ?? '');
  const linkedId = `saved-${tripId}`;
  const linked = trips.find((t) => t.id === linkedId);
  const hasLiveExpenses = Boolean(linked && linked.expenses.length > 0);
  const expenseTotal = linked?.expenses.reduce((s, e) => s + e.amount, 0) ?? 0;

  if (!trip) {
    return (
      <div className={`flex min-h-full flex-col bg-[#F4F6F8] ${PAGE_PAD_X} pb-8 pt-4`}>
        <p className="text-sm text-[#6B7280]">Trip not found.</p>
        <button type="button" onClick={onBack} className="mt-4 text-sm font-semibold text-[#2563EB]">
          Back to trips
        </button>
      </div>
    );
  }

  const splitPayload: SavedTripOpenPayload = {
    id: trip.id,
    city: trip.city,
    dates: trip.dates,
    places: trip.places,
  };

  return (
    <div className="min-h-full bg-[#F4F6F8] pb-8">
      <header className="sticky top-0 z-20 border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
        <div className={`flex items-center gap-2 py-2.5 ${PAGE_PAD_X}`}>
          <CircleIconButton
            density="compact"
            icon={ArrowLeft}
            label="Back to trips"
            onClick={onBack}
            className="border border-gray-200/80 bg-white text-[#374151] shadow-sm hover:bg-gray-50"
            iconClassName="text-[#374151]"
          />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold tracking-tight text-[#111827]">{trip.city}</h1>
            <p className="truncate text-xs text-[#6B7280]">{trip.dates}</p>
          </div>
          <span
            className={cn(
              'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
              statusStyles(trip.status),
            )}
          >
            {trip.status}
          </span>
        </div>
      </header>

      <div className={`space-y-4 pt-3 ${PAGE_PAD_X}`}>
        <section className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white p-3 shadow-sm ring-1 ring-gray-100/60 sm:p-4">
          <div className="flex gap-3">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-2xl shadow-md sm:size-16 sm:text-3xl">
              {trip.image}
            </div>
            <div className="min-w-0 flex-1 space-y-2 text-sm">
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[#6B7280]">
                <span className="inline-flex items-center gap-1">
                  <Users className="size-3.5 shrink-0" aria-hidden />
                  {trip.travelerCount} travelers
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5 shrink-0" aria-hidden />
                  {trip.places} stops planned
                </span>
              </div>
              <p>
                <span className="text-[#9CA3AF]">Guide </span>
                <span className="font-medium text-[#111827]">{trip.guide}</span>
              </p>
              <div>
                <div className="mb-0.5 flex justify-between text-[10px] font-medium uppercase tracking-wide text-[#9CA3AF]">
                  <span>Journey</span>
                  <span>{trip.journeyProgress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#E5E7EB]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6]"
                    style={{ width: `${trip.journeyProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {trip.nextUp ? (
          <section className="rounded-xl border border-[#BFDBFE]/70 bg-white px-3 py-2.5 shadow-sm sm:px-4 sm:py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1E40AF]">Next up</p>
            <p className="mt-0.5 text-sm font-medium text-[#111827]">{trip.nextUp}</p>
          </section>
        ) : null}

        <section className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
          <div className="mb-2 flex items-center gap-1.5">
            <Sparkles className="size-4 text-[#3B82F6]" aria-hidden />
            <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B]">Insight</h2>
          </div>
          <p className="text-sm leading-relaxed text-[#4B5563]">{trip.insight}</p>
        </section>

        <section>
          <div className="mb-2 flex items-center gap-1.5">
            <Route className="size-4 text-[#1E3A8A]" aria-hidden />
            <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B]">Route & itinerary</h2>
          </div>
          {trip.hasItinerary && trip.itinerary?.length ? (
            <div className="space-y-3">
              {trip.itinerary.map((day) => (
                <div
                  key={day.day}
                  className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm ring-1 ring-gray-50"
                >
                  <div className="border-b border-gray-100 bg-[#FAFAFA] px-3 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9CA3AF]">
                      Day {day.day}
                    </p>
                    <p className="text-sm font-semibold text-[#111827]">{day.title}</p>
                  </div>
                  <ol className="divide-y divide-gray-50">
                    {day.stops.map((stop, i) => (
                      <li key={`${day.day}-${stop.name}-${i}`} className="flex items-start gap-2 px-3 py-2">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[10px] font-bold text-[#1E40AF]">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-[#111827]">{stop.name}</p>
                          {stop.time ? <p className="text-xs text-[#6B7280]">{stop.time}</p> : null}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-200 bg-[#FAFAFA] px-3 py-4 text-center sm:px-4">
              <Calendar className="mx-auto size-8 text-[#9CA3AF]" aria-hidden />
              <p className="mt-2 text-sm font-medium text-[#374151]">No saved itinerary yet</p>
              <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">
                When you build a route in Planner and save it, your day-by-day stops will show here.
              </p>
              {onOpenPlanner ? (
                <button
                  type="button"
                  onClick={onOpenPlanner}
                  className="mt-3 rounded-full bg-[#1E3A8A] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#1c3578]"
                >
                  Open planner
                </button>
              ) : null}
            </div>
          )}
        </section>

        <section>
          <div className="mb-2 flex items-center gap-1.5">
            <ReceiptIndianRupee className="size-4 text-[#3B82F6]" aria-hidden />
            <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B]">Split expenses</h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm ring-1 ring-gray-50">
            <div className="border-b border-[#E0E7FF] bg-[#F8FAFF] px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#3B82F6]">Group spend</p>
              <p className="mt-0.5 text-sm font-semibold text-[#1E3A8A]">{expenseHint}</p>
            </div>
            {hasLiveExpenses ? (
              <ul className="divide-y divide-gray-50">
                {linked!.expenses.map((e) => (
                  <li key={e.id} className="flex items-center justify-between gap-2 px-3 py-2">
                    <span className="min-w-0 truncate text-sm text-[#374151]">{e.description}</span>
                    <span className="shrink-0 text-sm font-semibold tabular-nums text-[#111827]">
                      {formatINR(e.amount)}
                    </span>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-2 bg-[#FAFAFA] px-3 py-2 text-sm font-semibold">
                  <span className="text-[#6B7280]">Total</span>
                  <span className="tabular-nums text-[#1E3A8A]">{formatINR(expenseTotal)}</span>
                </li>
              </ul>
            ) : (
              <p className="px-3 py-3 text-xs leading-relaxed text-[#6B7280]">
                Open Split to add shared expenses for this trip. Your group balances will stay linked to this
                saved trip.
              </p>
            )}
            <div className="border-t border-gray-100 p-2.5">
              <button
                type="button"
                onClick={() => onOpenSplit(splitPayload)}
                className="w-full rounded-full bg-[#1E3A8A] py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1c3578]"
              >
                {hasLiveExpenses ? 'Open split for this trip' : 'Start split for this trip'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
