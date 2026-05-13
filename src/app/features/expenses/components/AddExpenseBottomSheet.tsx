import { useEffect, useMemo, useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '../../../components/ui/drawer';
import type { AddExpensePayload, SplitMember } from '../../../context/TripExpensesContext';
import { EXPENSE_CATEGORY_ORDER, EXPENSE_CATEGORY_META } from '../expenseCategories';
import type { ExpenseCategory } from '../../../types/tripExpense';
import { cn } from '../../../components/ui/utils';

type SplitMode = 'equal' | 'custom';

export function AddExpenseBottomSheet({
  open,
  onOpenChange,
  members,
  initialTitle,
  initialCategory,
  initialAmount,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: SplitMember[];
  initialTitle?: string;
  initialCategory?: ExpenseCategory;
  initialAmount?: string;
  onSubmit: (payload: AddExpensePayload) => void;
}) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [paidById, setPaidById] = useState('');
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const [splitMode, setSplitMode] = useState<SplitMode>('equal');
  const [customById, setCustomById] = useState<Record<string, string>>({});
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setTitle(initialTitle ?? '');
    setAmount(initialAmount ?? '');
    setCategory(initialCategory ?? 'food');
    const ids = members.map((m) => m.id);
    setPaidById(ids[0] ?? '');
    setParticipantIds(ids);
    setSplitMode('equal');
    setCustomById(Object.fromEntries(ids.map((id) => [id, ''])));
    setReceiptPreview(null);
  }, [open, initialTitle, initialCategory, initialAmount, members]);

  const toggleParticipant = (id: string) => {
    setParticipantIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev;
        return prev.filter((x) => x !== id);
      }
      return [...prev, id];
    });
  };

  const totalNum = Number(amount);
  const customValid = useMemo(() => {
    if (splitMode !== 'custom') return true;
    if (!Number.isFinite(totalNum) || totalNum <= 0) return false;
    let s = 0;
    for (const id of participantIds) {
      const v = Number(customById[id]);
      if (!Number.isFinite(v) || v < 0) return false;
      s += v;
    }
    return Math.abs(s - totalNum) < 0.5;
  }, [splitMode, totalNum, participantIds, customById]);

  const canSave =
    title.trim() &&
    Number.isFinite(totalNum) &&
    totalNum > 0 &&
    paidById &&
    participantIds.length > 0 &&
    customValid;

  const handleSave = () => {
    if (!canSave) return;
    const payload: AddExpensePayload = {
      description: title.trim(),
      amount: totalNum,
      paidByMemberId: paidById,
      splitBetweenMemberIds: participantIds,
      category,
      status: 'confirmed',
    };
    if (splitMode === 'custom') {
      const shares: Record<string, number> = {};
      for (const id of participantIds) {
        shares[id] = Number(customById[id]) || 0;
      }
      payload.customShares = shares;
    }
    onSubmit(payload);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] border-0 bg-white px-0 [&>div:first-child]:bg-gray-300">
        <DrawerHeader className="gap-1 border-b border-gray-100 p-0 px-4 pb-2 pt-2.5 text-left">
          <DrawerTitle className="text-base font-semibold text-[#111827]">Add expense</DrawerTitle>
          <p className="text-[11px] leading-snug text-[#6B7280] sm:text-xs">Keep it simple — we’ll handle the math.</p>
        </DrawerHeader>

        <div className="overflow-y-auto px-4 py-3">
          <label className="block">
            <span className="mb-0.5 block text-xs font-medium text-[#6B7280]">What was it?</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Rooftop dinner"
              className="box-border w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-[13px] leading-tight outline-none focus:border-[#3B82F6]"
            />
          </label>

          <label className="mt-3 block">
            <span className="mb-0.5 block text-xs font-medium text-[#6B7280]">Amount (₹)</span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="decimal"
              placeholder="0"
              className="box-border w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-[13px] leading-tight outline-none focus:border-[#3B82F6]"
            />
          </label>

          <p className="mb-1.5 mt-4 text-xs font-medium text-[#6B7280]">Category</p>
          <div className="flex flex-wrap gap-1.5">
            {EXPENSE_CATEGORY_ORDER.filter((c) => c !== 'other').map((c) => {
              const Meta = EXPENSE_CATEGORY_META[c];
              const Icon = Meta.icon;
              const on = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-medium leading-tight transition-colors',
                    on
                      ? 'border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A]'
                      : 'border-gray-200 bg-white text-[#6B7280]',
                  )}
                >
                  <Icon className="size-3.5 shrink-0" aria-hidden />
                  {Meta.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setCategory('other')}
              className={cn(
                'rounded-full border px-2.5 py-1.5 text-xs font-medium leading-tight transition-colors',
                category === 'other'
                  ? 'border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A]'
                  : 'border-gray-200 bg-white text-[#6B7280]',
              )}
            >
              Other
            </button>
          </div>

          <label className="mt-4 block">
            <span className="mb-0.5 block text-xs font-medium text-[#6B7280]">Paid by</span>
            <select
              value={paidById}
              onChange={(e) => setPaidById(e.target.value)}
              className="box-border w-full rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[13px] leading-tight outline-none focus:border-[#3B82F6]"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </label>

          <p className="mb-1.5 mt-4 text-xs font-medium text-[#6B7280]">Split between</p>
          <div className="flex flex-wrap gap-1.5">
            {members.map((m) => {
              const on = participantIds.includes(m.id);
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggleParticipant(m.id)}
                  className={cn(
                    'rounded-full px-2.5 py-1.5 text-xs font-medium leading-tight transition-colors',
                    on
                      ? 'bg-[#1E3A8A] text-white'
                      : 'border border-gray-200 bg-white text-[#6B7280]',
                  )}
                >
                  {m.name}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex rounded-lg border border-gray-200 p-0.5">
            <button
              type="button"
              onClick={() => setSplitMode('equal')}
              className={cn(
                'flex-1 rounded-md py-1.5 text-xs font-semibold leading-tight transition-colors',
                splitMode === 'equal' ? 'bg-[#1E3A8A] text-white' : 'text-[#6B7280]',
              )}
            >
              Equal split
            </button>
            <button
              type="button"
              onClick={() => setSplitMode('custom')}
              className={cn(
                'flex-1 rounded-md py-1.5 text-xs font-semibold leading-tight transition-colors',
                splitMode === 'custom' ? 'bg-[#1E3A8A] text-white' : 'text-[#6B7280]',
              )}
            >
              Custom amounts
            </button>
          </div>

          {splitMode === 'custom' ? (
            <div className="mt-2 space-y-1.5 rounded-lg bg-[#F9FAFB] p-2.5">
              {participantIds.map((id) => {
                const m = members.find((x) => x.id === id);
                if (!m) return null;
                return (
                  <div key={id} className="flex items-center gap-2">
                    <span className="w-24 shrink-0 truncate text-xs text-[#374151]">{m.name}</span>
                    <input
                      value={customById[id] ?? ''}
                      onChange={(e) =>
                        setCustomById((prev) => ({ ...prev, [id]: e.target.value }))
                      }
                      inputMode="decimal"
                      placeholder="₹"
                      className="box-border min-h-0 flex-1 rounded-md border border-gray-200 bg-white px-2 py-1.5 text-[13px] leading-tight"
                    />
                  </div>
                );
              })}
              <p className="text-[11px] text-[#6B7280]">
                Amounts should add up to the total ({Number.isFinite(totalNum) ? `₹${totalNum}` : '…'}
                ).
              </p>
            </div>
          ) : null}

          <label className="mt-4 flex cursor-pointer items-center gap-2.5 rounded-lg border border-dashed border-gray-200 bg-[#FAFAFA] px-3 py-2.5">
            <ImagePlus className="size-6 shrink-0 text-[#9CA3AF]" aria-hidden />
            <div className="min-w-0 text-left">
              <p className="text-xs font-medium text-[#374151] sm:text-[13px]">Receipt (optional)</p>
              <p className="text-[11px] leading-snug text-[#6B7280] sm:text-xs">PNG or JPG — preview only in this demo</p>
            </div>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                setReceiptPreview((prev) => {
                  if (prev) URL.revokeObjectURL(prev);
                  return f ? URL.createObjectURL(f) : null;
                });
              }}
            />
          </label>
          {receiptPreview ? (
            <div className="mt-2 overflow-hidden rounded-lg border border-gray-200">
              <img src={receiptPreview} alt="" className="max-h-32 w-full object-cover" />
            </div>
          ) : null}
        </div>

        <DrawerFooter className="gap-1.5 border-t border-gray-100 p-0 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2.5">
          <button
            type="button"
            disabled={!canSave}
            onClick={handleSave}
            className="w-full rounded-full bg-[#1E3A8A] py-2.5 text-sm font-semibold leading-tight text-white shadow-sm transition-opacity disabled:opacity-40"
          >
            Save expense
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-full border border-gray-200 py-2.5 text-sm font-medium leading-tight text-[#374151]"
          >
            Cancel
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
