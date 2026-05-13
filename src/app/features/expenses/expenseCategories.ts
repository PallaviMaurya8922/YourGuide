import {
  Bus,
  Hotel,
  type LucideIcon,
  MapPin,
  ShoppingBag,
  Ticket,
  UtensilsCrossed,
  Users,
} from 'lucide-react';
import type { ExpenseCategory } from '../../types/tripExpense';

export type { ExpenseCategory };

export const EXPENSE_CATEGORY_ORDER: ExpenseCategory[] = [
  'hotel',
  'food',
  'guide',
  'transport',
  'tickets',
  'shopping',
  'other',
];

export const EXPENSE_CATEGORY_META: Record<
  ExpenseCategory,
  { label: string; icon: LucideIcon }
> = {
  hotel: { label: 'Hotel', icon: Hotel },
  food: { label: 'Food', icon: UtensilsCrossed },
  guide: { label: 'Guide', icon: Users },
  transport: { label: 'Transport', icon: Bus },
  tickets: { label: 'Tickets', icon: Ticket },
  shopping: { label: 'Shopping', icon: ShoppingBag },
  other: { label: 'Other', icon: MapPin },
};

export function categoryIcon(category: ExpenseCategory) {
  return EXPENSE_CATEGORY_META[category]?.icon ?? EXPENSE_CATEGORY_META.other.icon;
}

export function categoryLabel(category: ExpenseCategory) {
  return EXPENSE_CATEGORY_META[category]?.label ?? 'Other';
}
