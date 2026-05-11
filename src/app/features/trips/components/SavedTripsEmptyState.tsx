import { motion } from 'framer-motion';
import { CalendarPlus, MapPin } from 'lucide-react';

export function SavedTripsEmptyState({ onPlan }: { onPlan?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-dashed border-[#BFDBFE] bg-gradient-to-b from-[#EFF6FF] to-white px-6 py-12 text-center shadow-sm"
    >
      <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-[#E5E7EB]">
        <MapPin className="size-8 text-[#93C5FD]" aria-hidden />
      </div>
      <h3 className="text-base font-semibold text-[#111827]">No saved trips yet</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#6B7280]">
        Plans you save from the planner will land here — with guides, dates, and split costs in one
        place.
      </p>
      <button
        type="button"
        onClick={onPlan}
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1E3A8A] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1c3578]"
      >
        <CalendarPlus className="size-4" aria-hidden />
        Plan a trip
      </button>
    </motion.div>
  );
}
