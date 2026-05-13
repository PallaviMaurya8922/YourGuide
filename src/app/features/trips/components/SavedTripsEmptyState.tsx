import { motion } from 'framer-motion';
import { CalendarPlus, MapPin } from 'lucide-react';

export function SavedTripsEmptyState({ onPlan }: { onPlan?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-dashed border-[#BFDBFE] bg-gradient-to-b from-[#EFF6FF] to-white px-4 py-8 text-center shadow-sm sm:px-6 sm:py-10"
    >
      <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#E5E7EB] sm:mb-3.5 sm:size-14 sm:rounded-2xl">
        <MapPin className="size-6 text-[#93C5FD] sm:size-7" aria-hidden />
      </div>
      <h3 className="text-[15px] font-semibold text-[#111827] sm:text-base">No saved trips yet</h3>
      <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-[#6B7280] sm:mt-2 sm:text-sm">
        Plans you save from the planner will land here — with guides, dates, and split costs in one
        place.
      </p>
      <button
        type="button"
        onClick={onPlan}
        className="mt-4 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-[#1E3A8A] px-5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1c3578] sm:mt-5 sm:min-h-11 sm:gap-2 sm:px-6 sm:text-sm"
      >
        <CalendarPlus className="size-4" aria-hidden />
        Plan a trip
      </button>
    </motion.div>
  );
}
