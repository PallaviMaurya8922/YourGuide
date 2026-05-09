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
      <div className="border-b border-gray-50 bg-gradient-to-br from-[#F8FAFC] to-white px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
              Total spent
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-[#111827]">
              {formatINR(total)}
            </p>
          </div>
          <TravelerAvatarStack names={members.map((m) => m.name)} max={5} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-gray-100 sm:grid-cols-3">
        <div className="bg-white p-4">
          <p className="text-[10px] uppercase tracking-wide text-[#6B7280]">You paid</p>
          <p className="mt-1 text-sm font-semibold text-[#111827]">{formatINR(paid)}</p>
        </div>
        <div className="bg-white p-4">
          <p className="text-[10px] uppercase tracking-wide text-[#6B7280]">Your share</p>
          <p className="mt-1 text-sm font-semibold text-[#111827]">{formatINR(share)}</p>
        </div>
        <div className="col-span-2 bg-white p-4 sm:col-span-1">
          <p className="text-[10px] uppercase tracking-wide text-[#6B7280]">Balance</p>
          <p className="mt-1 text-sm font-semibold text-[#1E3A8A]">{netLine}</p>
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
    <div className="border-t border-gray-50 px-4 py-3 sm:px-5">
      <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
        Quick balances
      </p>
      <div className="flex flex-wrap gap-2">
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
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${tone}`}
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
