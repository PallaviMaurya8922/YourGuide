import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { ExpenseTrip } from '../../../context/TripExpensesContext';
import type { ExpenseCategory } from '../../../types/tripExpense';
import { getSmartNudgesForTrip } from '../data/smartNudges';

export function SmartTravelNudges({
  trip,
  onPrefillExpense,
  onAddPending,
}: {
  trip: ExpenseTrip;
  onPrefillExpense: (nudge: { title: string; category: ExpenseCategory; amount?: number }) => void;
  onAddPending: (nudge: { title: string; category: ExpenseCategory; amount: number }) => void;
}) {
  const nudges = getSmartNudgesForTrip(trip);

  return (
    <div className="space-y-2 sm:space-y-2.5">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Sparkles className="size-3.5 shrink-0 text-[#3B82F6] sm:size-4" aria-hidden />
        <h3 className="text-[13px] font-semibold text-[#111827] sm:text-sm">Smart suggestions</h3>
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        {nudges.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-[#BFDBFE]/80 bg-gradient-to-br from-[#EFF6FF] to-white p-3 shadow-sm sm:rounded-2xl sm:p-3.5"
          >
            <p className="text-[9px] font-semibold uppercase tracking-wide text-[#3B82F6] sm:text-[10px]">
              {n.sourceLabel}
            </p>
            <p className="mt-0.5 text-[13px] font-semibold leading-snug text-[#111827] sm:mt-1 sm:text-sm">
              {n.title}
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-[#6B7280] sm:mt-1 sm:text-xs">{n.subtitle}</p>
            <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-2.5 sm:gap-2">
              <button
                type="button"
                onClick={() =>
                  onPrefillExpense({
                    title: n.suggestedTitle,
                    category: n.suggestedCategory,
                    amount: n.suggestedAmount,
                  })
                }
                className="rounded-full bg-[#1E3A8A] px-2.5 py-1 text-[11px] font-semibold leading-tight text-white shadow-sm sm:px-3 sm:py-1.5 sm:text-xs"
              >
                Split this expense
              </button>
              {n.suggestedAmount != null ? (
                <button
                  type="button"
                  onClick={() =>
                    onAddPending({
                      title: `${n.suggestedTitle} (pending)`,
                      category: n.suggestedCategory,
                      amount: n.suggestedAmount!,
                    })
                  }
                  className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-semibold leading-tight text-[#374151] sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  Add pending split
                </button>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
