import { motion } from 'framer-motion';
import type { SplitExpense, SplitMember } from '../../../context/TripExpensesContext';
import {
  computeBalances,
  formatINR,
  findYouMemberId,
  tripTotalSpent,
  yourPaidTotal,
  yourShareOwed,
} from '../expenseUtils';
import { TravelerAvatarStack } from './TravelerAvatarStack';

export function TripSummaryCard({
  members,
  expenses,
}: {
  members: SplitMember[];
  expenses: SplitExpense[];
}) {
  const youId = findYouMemberId(members);
  const total = tripTotalSpent(expenses);
  const paid = yourPaidTotal(youId, expenses);
  const share = yourShareOwed(youId, expenses);
  const net = youId ? (computeBalances(members, expenses)[youId] ?? 0) : 0;

  const netLine =
    Math.abs(net) < 1
      ? 'You’re settled for this trip'
      : net > 0
        ? `You get back ${formatINR(net)}`
        : `You owe ${formatINR(Math.abs(net))}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
    >
      <div className="border-b border-gray-50 bg-gradient-to-br from-[#F8FAFC] to-white px-3 py-3 sm:px-4 sm:py-3.5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-wide text-[#6B7280] sm:text-[10px]">
              Total spent
            </p>
            <p className="mt-0.5 text-xl font-semibold tracking-tight text-[#111827] sm:mt-1 sm:text-2xl">
              {formatINR(total)}
            </p>
          </div>
          <TravelerAvatarStack names={members.map((m) => m.name)} max={5} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-gray-100 sm:grid-cols-3">
        <div className="bg-white p-3 sm:p-3.5">
          <p className="text-[9px] uppercase tracking-wide text-[#6B7280] sm:text-[10px]">You paid</p>
          <p className="mt-0.5 text-xs font-semibold text-[#111827] sm:mt-1 sm:text-sm">{formatINR(paid)}</p>
        </div>
        <div className="bg-white p-3 sm:p-3.5">
          <p className="text-[9px] uppercase tracking-wide text-[#6B7280] sm:text-[10px]">Your share</p>
          <p className="mt-0.5 text-xs font-semibold text-[#111827] sm:mt-1 sm:text-sm">{formatINR(share)}</p>
        </div>
        <div className="col-span-2 bg-white p-3 sm:col-span-1 sm:p-3.5">
          <p className="text-[9px] uppercase tracking-wide text-[#6B7280] sm:text-[10px]">Balance</p>
          <p className="mt-0.5 text-xs font-semibold leading-snug text-[#1E3A8A] sm:mt-1 sm:text-sm">{netLine}</p>
        </div>
      </div>
      <MiniBalanceStrip members={members} expenses={expenses} />
    </motion.div>
  );
}

function MiniBalanceStrip({
  members,
  expenses,
}: {
  members: SplitMember[];
  expenses: SplitExpense[];
}) {
  const bal = computeBalances(members, expenses);
  const sorted = [...members].sort(
    (a, b) => Math.abs(bal[b.id] ?? 0) - Math.abs(bal[a.id] ?? 0),
  );

  return (
    <div className="border-t border-gray-50 px-3 py-2 sm:px-4 sm:py-2.5">
      <p className="mb-1.5 text-[9px] font-medium uppercase tracking-wide text-[#6B7280] sm:mb-2 sm:text-[10px]">
        Quick balances
      </p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {sorted.slice(0, 5).map((m) => {
          const b = bal[m.id] ?? 0;
          const label =
            Math.abs(b) < 1 ? 'Settled' : b > 0 ? `+${formatINR(b)}` : `−${formatINR(Math.abs(b))}`;
          const tone =
            Math.abs(b) < 1
              ? 'bg-gray-100 text-[#6B7280]'
              : b > 0
                ? 'bg-emerald-50 text-emerald-800'
                : 'bg-rose-50 text-rose-800';
          return (
            <span
              key={m.id}
              className={`inline-flex max-w-full items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:py-1 sm:text-[11px] ${tone}`}
            >
              {m.name}
              <span className="opacity-80">·</span>
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
