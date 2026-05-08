import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Clock,
  Navigation,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { ScreenHero } from '../components/commonComponents';

type BudgetId = 'budget' | 'moderate' | 'luxury';

/** Compact labels + single-line icons so three columns fit on narrow screens. */
const BUDGET_OPTIONS: { id: BudgetId; label: string; icon: string }[] = [
  { id: 'budget', label: 'Budget', icon: '💰' },
  { id: 'moderate', label: 'Moderate', icon: '🏨' },
  { id: 'luxury', label: 'Luxury', icon: '✨' },
];

export default function PlannerPage() {
  const [plannerState, setPlannerState] = useState<'input' | 'result'>('input');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDays, setSelectedDays] = useState('3');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<BudgetId | null>(null);

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

  if (plannerState === 'result') {
    return (
      <div className="min-h-full bg-[#F3F4F6] pb-10">
        <header className="relative overflow-hidden rounded-b-[1.75rem] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] px-4 pb-8 pt-[max(0.75rem,env(safe-area-inset-top))] text-white sm:px-5 sm:pb-10">
          <button
            type="button"
            onClick={() => setPlannerState('input')}
            className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Edit trip
          </button>
          <div className="flex items-start gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm sm:size-14">
              <Sparkles className="size-6 sm:size-7" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Your itinerary</h1>
              <p className="mt-1 text-sm text-white/85">
                {itinerary.city} · {itinerary.days} days · {itinerary.totalPlaces} stops
              </p>
              {budgetLabel ? (
                <p className="mt-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/95">
                  {budgetLabel} budget
                </p>
              ) : null}
            </div>
          </div>
        </header>

        <div className="relative z-10 -mt-4 space-y-4 px-4 sm:px-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-2">
            <button
              type="button"
              className="min-h-[44px] flex-1 rounded-full border border-[#3B82F6] bg-white px-4 py-2.5 text-sm font-semibold text-[#1E3A8A] shadow-sm transition-colors hover:bg-[#EFF6FF] sm:min-w-0 sm:flex-none"
            >
              Optimize route
            </button>
            <button
              type="button"
              className="min-h-[44px] flex-1 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-[#374151] shadow-sm transition-colors hover:bg-gray-50 sm:min-w-0 sm:flex-none"
            >
              Edit plan
            </button>
            <button
              type="button"
              className="min-h-[44px] flex-1 rounded-full bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1c3578] sm:min-w-0 sm:flex-none"
            >
              Save trip
            </button>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {itinerary.schedule.map((day) => (
              <section
                key={day.day}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-[#F8FAFC] to-white px-4 py-3.5 sm:px-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-sm font-bold text-white shadow-sm sm:size-12 sm:text-base">
                    D{day.day}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-[#111827] sm:text-lg">{day.title}</h2>
                    <p className="text-xs text-[#6B7280] sm:text-sm">
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
                          <div className="flex w-14 shrink-0 flex-col items-center border-r border-gray-100 bg-[#FAFBFC] py-4 sm:w-16">
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
                          <div className="min-w-0 flex-1 p-3.5 sm:p-4">
                            <h3 className="text-sm font-semibold leading-snug text-[#111827] sm:text-base">
                              {place.name}
                            </h3>
                            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6B7280] sm:text-sm">
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
                              className="mt-3 inline-flex items-center gap-0.5 text-xs font-semibold text-[#2563EB] hover:text-[#1d4ed8] sm:text-sm"
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

          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#F97316] to-[#FB923C] p-4 shadow-sm sm:p-5">
            <h3 className="text-base font-semibold text-white sm:text-lg">Upgrade to Premium</h3>
            <p className="mt-1 text-xs leading-relaxed text-white/90 sm:text-sm">
              Dynamic route optimization, nearby picks, and offline maps.
            </p>
            <button
              type="button"
              className="mt-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#EA580C] shadow-sm transition-colors hover:bg-white/95"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white pb-10">
      <ScreenHero
        className="mb-6 rounded-b-3xl px-5 pb-6 pt-[max(3rem,env(safe-area-inset-top))]"
        title="Plan Your Trip"
        subtitle="Create a smart itinerary in minutes"
      />

      <div className="space-y-6 px-5">
        <div>
          <label className="mb-3 block text-sm text-[#111827]">Select City</label>
          <div className="grid grid-cols-2 gap-3">
            {['Varanasi', 'Ayodhya', 'Agra', 'Jaipur'].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`rounded-2xl border p-4 text-center transition-all ${
                  selectedCity === city
                    ? 'border-[#3B82F6] bg-[#3B82F6]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="mb-2 text-3xl" aria-hidden>
                  {city === 'Varanasi' ? '🕉️' : city === 'Ayodhya' ? '🛕' : city === 'Agra' ? '🕌' : '🏰'}
                </div>
                <span className="text-sm text-[#111827]">{city}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm text-[#111827]">Number of Days</label>
          <div className="flex gap-3">
            {['1', '2', '3', '4', '5'].map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDays(day)}
                className={`min-h-[44px] flex-1 rounded-xl border py-3 text-sm transition-all ${
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
          <label className="mb-3 block text-sm text-[#111827]">Select Interests</label>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <button
                key={interest.id}
                type="button"
                onClick={() => toggleInterest(interest.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition-all ${
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
          <label className="mb-3 block text-sm text-[#111827]">Budget Level</label>
          <div className="grid grid-cols-3 gap-3">
            {BUDGET_OPTIONS.map((budget) => (
              <button
                key={budget.id}
                type="button"
                onClick={() => setSelectedBudget(budget.id)}
                className={`min-w-0 rounded-xl border p-3 text-center transition-all ${
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
          className={`w-full rounded-full py-4 text-white transition-all ${
            canGenerate ? 'bg-[#1E3A8A] hover:bg-[#1E3A8A]/90' : 'cursor-not-allowed bg-gray-300'
          }`}
        >
          Generate Itinerary
        </button>

        <div className="rounded-2xl border border-gray-200 bg-[#F9FAFB] p-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
              <Calendar className="h-5 w-5 text-[#3B82F6]" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 text-sm text-[#111827]">Smart Planning</h3>
              <p className="text-xs leading-relaxed text-[#6B7280]">
                Our AI optimizes routes based on distance, timing, and your interests to create the perfect itinerary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
