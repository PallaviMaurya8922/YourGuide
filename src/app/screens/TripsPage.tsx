import { AnimatePresence, motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ScreenHero } from '../components/commonComponents';
import {
  JourneyPathVisualization,
  JourneyStopsList,
  JOURNEY_GRAPH_MOCK,
  SAVED_TRIPS_MOCK,
  SavedTripCard,
  SavedTripsEmptyState,
  SavedTripsSkeleton,
  TripsInsightBanner,
  TripsTabBar,
} from '../features/trips';
import type { SavedTripOpenPayload } from '../features/trips/types';
import { PAGE_PAD_X } from '../shellLayout';

/** @deprecated Use SavedTripOpenPayload — kept for existing imports */
export type SavedTripCard = SavedTripOpenPayload;

export type TripsPageProps = {
  onOpenTripExpenses?: (trip: SavedTripOpenPayload) => void;
  onViewTripDetails?: (trip: SavedTripOpenPayload) => void;
  onPlanTrip?: () => void;
};

export default function TripsPage({ onOpenTripExpenses, onViewTripDetails, onPlanTrip }: TripsPageProps) {
  const [activeTab, setActiveTab] = useState<'graph' | 'saved'>('graph');
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [savedLoading, setSavedLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setSavedLoading(false), 380);
    return () => window.clearTimeout(t);
  }, []);

  const journey = JOURNEY_GRAPH_MOCK;
  const savedTrips = SAVED_TRIPS_MOCK;

  return (
    <div className="min-h-full bg-[#F9FAFB]">
      <ScreenHero
        className="rounded-b-3xl pb-3.5 pt-7 sm:pb-5 sm:pt-10"
        title="My Trips"
        subtitle="Journey progress, saved plans, and shared costs"
        hideTitleFromLg
      />

      <div className="sticky top-0 z-20 border-b border-gray-200/80 bg-[#F9FAFB]/90 backdrop-blur-md">
        <div className={`space-y-1.5 py-1.5 sm:space-y-2 sm:py-2 ${PAGE_PAD_X}`}>
          <TripsInsightBanner />
          <TripsTabBar active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'graph' ? (
          <motion.div
            key="graph"
            role="tabpanel"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className={`space-y-3 py-3 ${PAGE_PAD_X} pb-24 sm:space-y-4 sm:py-4 sm:pb-28`}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] p-3 text-white shadow-md sm:p-4"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                Active journey
              </p>
              <h2 className="mt-0.5 text-base font-semibold tracking-tight sm:text-lg md:text-xl">
                {journey.trip}
              </h2>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-white/85 sm:mt-2 sm:gap-x-2.5 sm:text-sm">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3 shrink-0 opacity-90 sm:size-3.5" aria-hidden />
                  {journey.date}
                </span>
                <span className="text-white/50">·</span>
                <span>
                  Day {journey.currentDay} of {journey.totalDays}
                </span>
              </div>
              <div className="mt-3 sm:mt-3.5">
                <div className="mb-0.5 flex justify-between text-[10px] font-medium uppercase tracking-wide text-white/70">
                  <span>Trip pace</span>
                  <span>
                    {journey.nodes.filter((n) => n.visited).length}/{journey.nodes.length} stops
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                  <motion.div
                    className="h-full rounded-full bg-white"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(journey.nodes.filter((n) => n.visited).length / journey.nodes.length) * 100}%`,
                    }}
                    transition={{ type: 'spring', stiffness: 120, damping: 22 }}
                  />
                </div>
              </div>
            </motion.div>

            <JourneyPathVisualization nodes={journey.nodes} />
            <JourneyStopsList
              nodes={journey.nodes}
              selectedNode={selectedNode}
              onSelectNode={setSelectedNode}
            />
          </motion.div>
        ) : (
          <motion.div
            key="saved"
            role="tabpanel"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className={`py-3 ${PAGE_PAD_X} pb-24 sm:py-4 sm:pb-28`}
          >
            {savedLoading ? (
              <SavedTripsSkeleton />
            ) : savedTrips.length === 0 ? (
              <SavedTripsEmptyState onPlan={onPlanTrip} />
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 [&>*]:min-w-0 xl:grid-cols-3">
                {savedTrips.map((trip) => (
                  <SavedTripCard
                    key={trip.id}
                    trip={trip}
                    expenseFallbackLabel={trip.expensePreviewLabel}
                    onOpenTripExpenses={onOpenTripExpenses}
                    onViewDetails={onViewTripDetails}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
