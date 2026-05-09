import { formatDistanceToNow } from 'date-fns';
import { animate, motion, useMotionValue } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import type { SplitExpense, SplitMember } from '../../../context/TripExpensesContext';
import { categoryIcon, categoryLabel } from '../expenseCategories';
import { formatINR } from '../expenseUtils';
import { cn } from '../../../components/ui/utils';

export function ExpenseTimelineCard({
  expense,
  members,
  onRemove,
}: {
  expense: SplitExpense;
  members: SplitMember[];
  onRemove?: () => void;
}) {
  const payer = members.find((m) => m.id === expense.paidByMemberId)?.name ?? 'Someone';
  const Cat = categoryIcon(expense.category);
  const n = expense.splitBetweenMemberIds.length;
  const x = useMotionValue(0);

  const splitLabel =
    expense.customShares && Object.keys(expense.customShares).length > 0
      ? 'Custom split'
      : n <= 1
        ? 'Solo'
        : `Split ${n} ways`;

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ left: onRemove ? -88 : 0, right: 0 }}
        dragElastic={0.06}
        onDragEnd={(_, info) => {
          if (info.offset.x < -56 && onRemove) {
            onRemove();
            return;
          }
          animate(x, 0, { type: 'spring', stiffness: 380, damping: 28 });
        }}
        className={cn(
          'relative z-10 border border-gray-100 bg-white p-4 shadow-sm',
          expense.status === 'pending' && 'border-amber-200/80 bg-amber-50/40',
        )}
      >
        <div className="flex gap-3">
          <div
            className={cn(
              'flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#1E3A8A]',
              expense.status === 'pending' && 'bg-amber-100/80 text-amber-900',
            )}
          >
            <Cat className="size-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-[#111827]">{expense.description}</p>
              {expense.status === 'pending' ? (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-900">
                  Pending
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-xs text-[#6B7280]">
              {categoryLabel(expense.category)} · Paid by{' '}
              <span className="font-medium text-[#374151]">{payer}</span>
            </p>
            <p className="mt-0.5 text-xs text-[#9CA3AF]">
              {splitLabel} · {formatDistanceToNow(expense.createdAt, { addSuffix: true })}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-sm font-semibold text-[#1E3A8A]">{formatINR(expense.amount)}</p>
            {onRemove ? (
              <p className="mt-1 text-[10px] text-[#9CA3AF]">Swipe to remove</p>
            ) : null}
          </div>
        </div>
      </motion.div>
      {onRemove ? (
        <div
          className="absolute inset-y-0 right-0 z-0 flex w-20 items-center justify-center rounded-r-2xl bg-rose-50"
          aria-hidden
        >
          <Trash2 className="size-5 text-rose-500" />
        </div>
      ) : null}
    </div>
  );
}
