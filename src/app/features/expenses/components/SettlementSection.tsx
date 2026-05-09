import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import type { SettlementTransfer } from '../expenseUtils';
import { formatINR } from '../expenseUtils';

export function SettlementSection({
  transfers,
  youName = 'You',
}: {
  transfers: SettlementTransfer[];
  youName?: string;
}) {
  if (transfers.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 px-4 py-6 text-center">
        <p className="text-sm font-medium text-emerald-800">Everyone’s square</p>
        <p className="mt-1 text-xs text-emerald-700/90">No payments needed right now.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-[#111827]">Settle up</h3>
      <ul className="space-y-2">
        {transfers.map((t, i) => (
          <motion.li
            key={`${t.fromId}-${t.toId}-${i}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <p className="text-sm text-[#374151]">{humanizeSettlement(t, youName)}</p>
            <button
              type="button"
              onClick={() => {
                toast.success('UPI request ready', {
                  description: `${t.fromName} → ${t.toName} · ${formatINR(t.amount)}`,
                  duration: 3200,
                });
              }}
              className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-[#3B82F6] bg-[#EFF6FF] px-4 text-xs font-semibold text-[#1E3A8A] transition-colors hover:bg-[#DBEAFE] sm:w-auto"
            >
              <Smartphone className="size-4 shrink-0" aria-hidden />
              Pay with UPI
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function displayName(name: string, youLabel: string) {
  return name.toLowerCase() === 'you' ? youLabel : name;
}

function humanizeSettlement(t: SettlementTransfer, youLabel: string) {
  const from = displayName(t.fromName, youLabel);
  const to = displayName(t.toName, youLabel);
  if (t.fromName.toLowerCase() === 'you') {
    return (
      <>
        <span className="font-semibold text-[#111827]">You</span> owe{' '}
        <span className="font-semibold text-[#1E3A8A]">{formatINR(t.amount)}</span> to{' '}
        <span className="font-semibold text-[#111827]">{to}</span>
      </>
    );
  }
  if (t.toName.toLowerCase() === 'you') {
    return (
      <>
        <span className="font-semibold text-[#111827]">{from}</span> pays{' '}
        <span className="font-semibold text-[#1E3A8A]">{formatINR(t.amount)}</span> to{' '}
        <span className="font-semibold text-[#111827]">you</span>
      </>
    );
  }
  return (
    <>
      <span className="font-semibold text-[#111827]">{from}</span> pays{' '}
      <span className="font-semibold text-[#1E3A8A]">{formatINR(t.amount)}</span> to{' '}
      <span className="font-semibold text-[#111827]">{to}</span>
    </>
  );
}
