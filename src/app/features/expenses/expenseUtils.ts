import type { ExpenseCategory } from '../../types/tripExpense';
import type { SplitExpense, SplitMember } from '../../context/TripExpensesContext';

export function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function sum(nums: number[]) {
  return nums.reduce((a, b) => a + b, 0);
}

/** Net balance per member: positive = should receive, negative = owes. */
export function computeBalances(
  members: SplitMember[],
  expenses: SplitExpense[],
): Record<string, number> {
  const balanceById = Object.fromEntries(members.map((m) => [m.id, 0])) as Record<string, number>;

  for (const e of expenses) {
    const between = e.splitBetweenMemberIds;
    const custom = e.customShares;
    let shares: Record<string, number>;

    if (custom && Object.keys(custom).length > 0) {
      shares = { ...custom };
      for (const id of between) {
        if (shares[id] === undefined) shares[id] = 0;
      }
    } else {
      const splitCount = between.length || 1;
      const share = e.amount / splitCount;
      shares = Object.fromEntries(between.map((id) => [id, share])) as Record<string, number>;
    }

    balanceById[e.paidByMemberId] = (balanceById[e.paidByMemberId] ?? 0) + e.amount;
    for (const mId of between) {
      const owed = shares[mId] ?? 0;
      balanceById[mId] = (balanceById[mId] ?? 0) - owed;
    }
  }

  return balanceById;
}

export type SettlementTransfer = {
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  amount: number;
};

export function simplifySettlements(
  members: SplitMember[],
  balanceById: Record<string, number>,
): SettlementTransfer[] {
  const EPS = 0.01;
  const creditors: { id: string; name: string; b: number }[] = [];
  const debtors: { id: string; name: string; b: number }[] = [];

  for (const m of members) {
    const b = balanceById[m.id] ?? 0;
    if (b > EPS) creditors.push({ id: m.id, name: m.name, b });
    else if (b < -EPS) debtors.push({ id: m.id, name: m.name, b: -b });
  }

  creditors.sort((a, b) => b.b - a.b);
  debtors.sort((a, b) => b.b - a.b);

  const out: SettlementTransfer[] = [];
  let i = 0;
  let j = 0;
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].b, creditors[j].b);
    if (pay > EPS) {
      out.push({
        fromId: debtors[i].id,
        fromName: debtors[i].name,
        toId: creditors[j].id,
        toName: creditors[j].name,
        amount: pay,
      });
    }
    debtors[i].b -= pay;
    creditors[j].b -= pay;
    if (debtors[i].b < EPS) i += 1;
    if (creditors[j].b < EPS) j += 1;
  }
  return out;
}

export function findYouMemberId(members: SplitMember[]) {
  const you = members.find((m) => m.name.toLowerCase() === 'you');
  return you?.id ?? members[0]?.id;
}

/** Total amount user paid across expenses (gross contribution). */
export function yourPaidTotal(youId: string | undefined, expenses: SplitExpense[]) {
  if (!youId) return 0;
  return sum(expenses.filter((e) => e.paidByMemberId === youId).map((e) => e.amount));
}

export function yourShareOwed(youId: string | undefined, expenses: SplitExpense[]) {
  if (!youId) return 0;
  let owed = 0;
  for (const e of expenses) {
    if (!e.splitBetweenMemberIds.includes(youId)) continue;
    if (e.customShares && Object.keys(e.customShares).length > 0) {
      owed += e.customShares[youId] ?? 0;
    } else {
      const n = e.splitBetweenMemberIds.length || 1;
      owed += e.amount / n;
    }
  }
  return owed;
}

export function tripTotalSpent(expenses: SplitExpense[]) {
  return sum(expenses.map((e) => e.amount));
}

export function settlementVolume(transfers: SettlementTransfer[]) {
  return sum(transfers.map((t) => t.amount));
}

export function parseTripDates(subtitle?: string) {
  if (!subtitle) return '';
  const part = subtitle.split('·')[0]?.trim() ?? '';
  return part;
}

export function defaultCategoryForDescription(desc: string): ExpenseCategory {
  const d = desc.toLowerCase();
  if (/hotel|stay|room|resort/.test(d)) return 'hotel';
  if (/lunch|dinner|food|meal|breakfast|restaurant|lassi/.test(d)) return 'food';
  if (/guide|tour/.test(d)) return 'guide';
  if (/taxi|uber|train|flight|bus|transport/.test(d)) return 'transport';
  if (/ticket|entry|monument/.test(d)) return 'tickets';
  if (/shop|souvenir|market/.test(d)) return 'shopping';
  return 'other';
}
