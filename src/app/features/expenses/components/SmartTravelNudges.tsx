import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { ExpenseTrip } from '../../../context/TripExpensesContext';
import type { ExpenseCategory } from '../../../types/tripExpense';
import { getSmartNudgesForTrip } from '../data/smartNudges';
import { cn } from '../../../components/ui/utils';

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
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-[#3B82F6]" aria-hidden />
        <h3 className="text-sm font-semibold text-[#111827]">Smart suggestions</h3>
      </div>
      <div className="space-y-2">
        {nudges.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-[#BFDBFE]/80 bg-gradient-to-br from-[#EFF6FF] to-white p-4 shadow-sm"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#3B82F6]">
              {n.sourceLabel}
            </p>
            <p className="mt-1 text-sm font-semibold text-[#111827]">{n.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">{n.subtitle}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  onPrefillExpense({
                    title: n.suggestedTitle,
                    category: n.suggestedCategory,
                    amount: n.suggestedAmount,
                  })
                }
                className={cn(
                  'min-h-9 rounded-full bg-[#1E3A8A] px-4 text-xs font-semibold text-white shadow-sm',
                )}
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
                  className="min-h-9 rounded-full border border-gray-200 bg-white px-4 text-xs font-semibold text-[#374151]"
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
