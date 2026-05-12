import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Clock,
  Navigation,
  ReceiptIndianRupee,
  Sparkles,
} from 'lucide-react';
import { useLayoutEffect, useState } from 'react';
import type { CreateTripInput } from '../context/TripExpensesContext';
import { PLANNER_ITINERARY_RESUME_KEY } from '../plannerItineraryResume';
import { ScreenHero } from '../components/commonComponents';
import { PAGE_PAD_X } from '../shellLayout';

type BudgetId = 'budget' | 'moderate' | 'luxury';

/** Compact labels + single-line icons so three columns fit on narrow screens. */
const BUDGET_OPTIONS: { id: BudgetId; label: string; icon: string }[] = [
  { id: 'budget', label: 'Budget', icon: '💰' },
  { id: 'moderate', label: 'Moderate', icon: '🏨' },
  { id: 'luxury', label: 'Luxury', icon: '✨' },
];

export type PlannerPageProps = {
  onNavigateToSplit?: (plan: CreateTripInput) => void;
};

export default function PlannerPage({ onNavigateToSplit }: PlannerPageProps) {
  const [plannerState, setPlannerState] = useState<'input' | 'result'>('input');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDays, setSelectedDays] = useState('3');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<BudgetId | null>(null);

  useLayoutEffect(() => {
    let raw: string | null = null;
    try {
      raw = sessionStorage.getItem(PLANNER_ITINERARY_RESUME_KEY);
    } catch {
      return;
    }
    if (!raw) return;
    try {
      sessionStorage.removeItem(PLANNER_ITINERARY_RESUME_KEY);
    } catch {
      // ignore
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return;
    }
    if (!parsed || typeof parsed !== 'object') return;
    const snap = parsed as Record<string, unknown>;
    const city = typeof snap.city === 'string' ? snap.city : '';
    const daysRaw = snap.days;
    const days =
      typeof daysRaw === 'string'
        ? daysRaw
        : typeof daysRaw === 'number' && Number.isFinite(daysRaw)
          ? String(daysRaw)
          : '3';
    const interestsRaw = snap.interests;
    const interests = Array.isArray(interestsRaw)
      ? interestsRaw.filter((i): i is string => typeof i === 'string')
      : [];
    const b = snap.budget;
    const budget: BudgetId | null =
      b === 'budget' || b === 'moderate' || b === 'luxury' ? b : null;
    if (!city || !budget) return;
    setSelectedCity(city);
    setSelectedDays(days);
    setSelectedInterests(interests);
    setSelectedBudget(budget);
    setPlannerState('result');
  }, []);

  const interests = [
    { id: 'temples', label: 'Temples', icon: '🛕' },
    { id: 'food', label: 'Food', icon: '🍛' },
    { id: 'history', label: 'History', icon: '📜' },
    { id: 'culture', label: 'Culture', icon: '🎭' },
    { id: 'heritage', label: 'Heritage', icon: '🏛️' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'nature', label: 'Nature', icon: '🌳' },
  ];

  const itinerary = {
    city: 'Varanasi',
    days: 3,
    totalPlaces: 12,
    schedule: [
      {
        day: 1,
        title: 'Spiritual Heritage',
        places: [
          { name: 'Kashi Vishwanath Temple', time: '6:00 AM', duration: '2 hours', distance: 'Start' },
          { name: 'Dashashwamedh Ghat', time: '9:00 AM', duration: '1.5 hours', distance: '0.8 km' },
          { name: 'Manikarnika Ghat', time: '11:00 AM', duration: '1 hour', distance: '1.2 km' },
          { name: 'Lunch at Blue Lassi', time: '1:00 PM', duration: '1 hour', distance: '0.5 km' },
          { name: 'Sarnath', time: '3:00 PM', duration: '2 hours', distance: '10 km' },
        ],
      },
      {
        day: 2,
        title: 'Culture & History',
        places: [
          { name: 'Banaras Hindu University', time: '8:00 AM', duration: '2 hours', distance: 'Start' },
          { name: 'Ramnagar Fort', time: '11:00 AM', duration: '1.5 hours', distance: '14 km' },
          { name: 'Local Market Visit', time: '2:00 PM', duration: '2 hours', distance: '8 km' },
          { name: 'Ganga Aarti at Assi Ghat', time: '6:00 PM', duration: '1 hour', distance: '3 km' },
        ],
      },
      {
        day: 3,
        title: 'Hidden Gems',
        places: [
          { name: 'Tulsi Manas Temple', time: '7:00 AM', duration: '1 hour', distance: 'Start' },
          { name: 'Durga Temple', time: '9:00 AM', duration: '1 hour', distance: '2 km' },
          { name: 'Silk Weaving Workshop', time: '11:00 AM', duration: '2 hours', distance: '4 km' },
        ],
      },
    ],
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const canGenerate =
    Boolean(selectedCity) && selectedInterests.length > 0 && selectedBudget !== null;

  const generatePlan = () => {
    if (canGenerate) setPlannerState('result');
  };

  const budgetLabel = selectedBudget
    ? BUDGET_OPTIONS.find((b) => b.id === selectedBudget)?.label ?? ''
    : '';

  const displayCity = selectedCity || itinerary.city;
  const displayDays = Number.parseInt(selectedDays, 10);
  const daysLabel = Number.isFinite(displayDays) && displayDays > 0 ? displayDays : itinerary.days;

  if (plannerState === 'result') {
    return (
      <div className="min-h-full bg-[#F3F4F6] pb-8 sm:pb-10">
        <header className="relative overflow-hidden rounded-b-[1.25rem] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] px-3 pb-5 pt-[max(0.5rem,env(safe-area-inset-top))] text-white sm:rounded-b-[1.75rem] sm:px-5 sm:pb-7 sm:pt-[max(0.75rem,env(safe-area-inset-top))] md:px-8 lg:px-10">
          <button
            type="button"
            onClick={() => setPlannerState('input')}
            className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur-sm transition-colors hover:bg-white/25 sm:mb-3 sm:px-3 sm:py-1.5 sm:text-sm"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Edit trip
          </button>
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm sm:size-12 sm:rounded-2xl md:size-14">
              <Sparkles className="size-5 sm:size-6 md:size-7" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">Your itinerary</h1>
              <p className="mt-0.5 text-xs leading-snug text-white/85 sm:mt-1 sm:text-sm">
                {displayCity} · {daysLabel} {daysLabel === 1 ? 'day' : 'days'} · {itinerary.totalPlaces}{' '}
                stops
              </p>
              {budgetLabel ? (
                <p className="mt-1.5 inline-flex rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium text-white/95 sm:mt-2 sm:px-3 sm:py-1 sm:text-xs">
                  {budgetLabel} budget
                </p>
              ) : null}
            </div>
          </div>
        </header>

        <div className={`relative z-10 -mt-3 space-y-3 sm:-mt-4 sm:space-y-4 ${PAGE_PAD_X}`}>
          <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:gap-2">
            <button
              type="button"
              className="min-h-10 flex-1 rounded-full border border-[#3B82F6] bg-white px-3 py-2 text-[13px] font-semibold text-[#1E3A8A] shadow-sm transition-colors hover:bg-[#EFF6FF] sm:min-h-[44px] sm:min-w-0 sm:flex-none sm:px-4 sm:py-2.5 sm:text-sm"
            >
              Optimize route
            </button>
            <button
              type="button"
              className="min-h-10 flex-1 rounded-full border border-gray-200 bg-white px-3 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-gray-50 sm:min-h-[44px] sm:min-w-0 sm:flex-none sm:px-4 sm:py-2.5 sm:text-sm"
            >
              Edit plan
            </button>
            {onNavigateToSplit && selectedBudget ? (
              <button
                type="button"
                onClick={() =>
                  onNavigateToSplit({
                    name: `${displayCity} · ${daysLabel}-day plan`,
                    subtitle: `${itinerary.totalPlaces} stops · add friends on Split`,
                    plannerSnapshot: {
                      city: displayCity,
                      days: String(daysLabel),
                      interests: [...selectedInterests],
                      budget: selectedBudget,
                    },
                  })
                }
                className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-2 text-[13px] font-semibold text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-white/25 sm:min-h-[44px] sm:min-w-0 sm:flex-none sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                <ReceiptIndianRupee className="size-4 shrink-0" aria-hidden />
                Split expenses
              </button>
            ) : null}
            <button
              type="button"
              className="min-h-10 flex-1 rounded-full bg-[#1E3A8A] px-3 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1c3578] sm:min-h-[44px] sm:min-w-0 sm:flex-none sm:px-4 sm:py-2.5 sm:text-sm"
            >
              Save trip
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">
            {itinerary.schedule.map((day) => (
              <section
                key={day.day}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="flex items-center gap-2.5 border-b border-gray-100 bg-gradient-to-r from-[#F8FAFC] to-white px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 md:px-5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-xs font-bold text-white shadow-sm sm:size-11 sm:rounded-xl sm:text-sm md:size-12 md:text-base">
                    D{day.day}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-[#111827] sm:text-base md:text-lg">{day.title}</h2>
                    <p className="text-[11px] text-[#6B7280] sm:text-xs md:text-sm">
                      {day.places.length} {day.places.length === 1 ? 'stop' : 'stops'}
                    </p>
                  </div>
                </div>

                <ol className="divide-y divide-gray-100">
                  {day.places.map((place, index) => {
                    const isLast = index === day.places.length - 1;
                    return (
                      <li key={`${day.day}-${place.name}-${index}`} className="relative">
                        <div className="flex gap-0 sm:gap-1">
                          <div className="flex w-12 shrink-0 flex-col items-center border-r border-gray-100 bg-[#FAFBFC] py-3 sm:w-14 sm:py-3.5 md:w-16 md:py-4">
                            <div className="px-1 text-center text-[10px] font-semibold leading-tight text-[#1E40AF] sm:text-xs">
                              {place.time.split(' ').map((part, ti) => (
                                <span key={`${place.time}-${ti}`} className="block">
                                  {part}
                                </span>
                              ))}
                            </div>
                            {!isLast ? (
                              <span
                                className="mt-2 block h-8 w-px bg-gradient-to-b from-[#BFDBFE] to-transparent sm:h-10"
                                aria-hidden
                              />
                            ) : null}
                          </div>
                          <div className="min-w-0 flex-1 p-3 sm:p-3.5 md:p-4">
                            <h3 className="text-[13px] font-semibold leading-snug text-[#111827] sm:text-sm md:text-base">
                              {place.name}
                            </h3>
                            <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-[#6B7280] sm:mt-2 sm:gap-x-2 sm:text-xs md:text-sm">
                              <span className="inline-flex items-center gap-1">
                                <Clock className="size-3.5 shrink-0 opacity-80" aria-hidden />
                                {place.duration}
                              </span>
                              {place.distance !== 'Start' ? (
                                <span className="inline-flex items-center gap-1">
                                  <Navigation className="size-3.5 shrink-0 opacity-80" aria-hidden />
                                  {place.distance}
                                </span>
                              ) : (
                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 sm:text-xs">
                                  Starting point
                                </span>
                              )}
                            </div>
                            <button
                              type="button"
                              className="mt-2 inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#2563EB] hover:text-[#1d4ed8] sm:mt-2.5 sm:text-xs md:text-sm"
                            >
                              View on map
                              <ChevronRight className="size-3.5" aria-hidden />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl bg-gradient-to-r from-[#F97316] to-[#FB923C] p-3 shadow-sm sm:rounded-2xl sm:p-4 md:p-5">
            <h3 className="text-sm font-semibold text-white sm:text-base md:text-lg">Upgrade to Premium</h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-white/90 sm:mt-1 sm:text-xs md:text-sm">
              Dynamic route optimization, nearby picks, and offline maps.
            </p>
            <button
              type="button"
              className="mt-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#EA580C] shadow-sm transition-colors hover:bg-white/95 sm:mt-3 sm:px-4 sm:py-2 sm:text-sm"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white pb-8 sm:pb-10">
      <ScreenHero
        className="mb-4 rounded-b-3xl pb-4 pt-[max(2.25rem,env(safe-area-inset-top))] sm:mb-5 sm:pb-5 sm:pt-[max(2.75rem,env(safe-area-inset-top))]"
        title="Plan Your Trip"
        subtitle="Create a smart itinerary in minutes"
        hideTitleFromLg
      />

      <div className={`space-y-4 sm:space-y-5 ${PAGE_PAD_X}`}>
        <div>
          <label className="mb-2 block text-xs font-medium text-[#111827] sm:mb-2.5 sm:text-sm">Select City</label>
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-4 lg:gap-3">
            {['Varanasi', 'Ayodhya', 'Agra', 'Jaipur'].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`rounded-xl border p-3 text-center transition-all sm:rounded-2xl sm:p-3.5 md:p-4 ${
                  selectedCity === city
                    ? 'border-[#3B82F6] bg-[#3B82F6]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="mb-1 text-2xl sm:mb-1.5 sm:text-3xl" aria-hidden>
                  {city === 'Varanasi' ? '🕉️' : city === 'Ayodhya' ? '🛕' : city === 'Agra' ? '🕌' : '🏰'}
                </div>
                <span className="text-xs font-medium text-[#111827] sm:text-sm">{city}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#111827] sm:mb-2.5 sm:text-sm">Number of Days</label>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {['1', '2', '3', '4', '5'].map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDays(day)}
                className={`min-h-10 min-w-[2.5rem] flex-1 rounded-lg border py-2 text-xs font-medium transition-all sm:min-h-[44px] sm:min-w-0 sm:rounded-xl sm:py-2.5 sm:text-sm ${
                  selectedDays === day
                    ? 'border-[#3B82F6] bg-[#3B82F6]/5 text-[#3B82F6]'
                    : 'border-gray-200 text-[#6B7280] hover:border-gray-300'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#111827] sm:mb-2.5 sm:text-sm">Select Interests</label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {interests.map((interest) => (
              <button
                key={interest.id}
                type="button"
                onClick={() => toggleInterest(interest.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm ${
                  selectedInterests.includes(interest.id)
                    ? 'bg-[#1E3A8A] text-white'
                    : 'border border-gray-200 bg-[#F9FAFB] text-[#6B7280]'
                }`}
              >
                <span aria-hidden>{interest.icon}</span>
                {interest.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#111827] sm:mb-2.5 sm:text-sm">Budget Level</label>
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {BUDGET_OPTIONS.map((budget) => (
              <button
                key={budget.id}
                type="button"
                onClick={() => setSelectedBudget(budget.id)}
                className={`min-w-0 rounded-lg border p-2.5 text-center transition-all sm:rounded-xl sm:p-3 ${
                  selectedBudget === budget.id
                    ? 'border-[#3B82F6] bg-[#3B82F6]/5'
                    : 'border-gray-200 hover:border-[#3B82F6]/50'
                }`}
              >
                <div className="mb-1 text-2xl leading-none" aria-hidden>
                  {budget.icon}
                </div>
                <span className="block truncate text-xs text-[#111827]">{budget.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={generatePlan}
          disabled={!canGenerate}
          className={`w-full rounded-full py-3 text-sm font-semibold text-white transition-all sm:py-3.5 md:py-4 md:text-base ${
            canGenerate ? 'bg-[#1E3A8A] hover:bg-[#1E3A8A]/90' : 'cursor-not-allowed bg-gray-300'
          }`}
        >
          Generate Itinerary
        </button>

        <div className="rounded-xl border border-gray-200 bg-[#F9FAFB] p-3 sm:rounded-2xl sm:p-3.5 md:p-4">
          <div className="flex gap-2.5 sm:gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white sm:size-10 sm:rounded-xl">
              <Calendar className="size-[18px] text-[#3B82F6] sm:size-5" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-0.5 text-xs font-semibold text-[#111827] sm:mb-1 sm:text-sm">Smart Planning</h3>
              <p className="text-[11px] leading-relaxed text-[#6B7280] sm:text-xs">
                Our AI optimizes routes based on distance, timing, and your interests to create the perfect itinerary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
