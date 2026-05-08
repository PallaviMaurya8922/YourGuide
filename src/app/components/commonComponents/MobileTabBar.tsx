import type { LucideIcon } from 'lucide-react';
import { cn } from '../ui/utils';

export type MobileTabBarItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
};

export type MobileTabBarProps = {
  items: MobileTabBarItem[];
  className?: string;
};

export function MobileTabBar({ items, className }: MobileTabBarProps) {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 mx-auto max-w-md border-t border-gray-200 bg-white px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]',
        className,
      )}
    >
      <div className="flex items-stretch justify-between gap-0.5">
        {items.map(({ id, label, icon: Icon, active, onClick }) => (
          <button
            key={id}
            type="button"
            onClick={onClick}
            className={cn(
              'flex min-h-[44px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1 transition-colors active:bg-gray-50',
              active ? 'text-[#1E3A8A]' : 'text-[#6B7280]',
            )}
          >
            <Icon className="size-[1.125rem] shrink-0" strokeWidth={active ? 2.25 : 2} aria-hidden />
            <span className="max-w-full truncate text-[10px] font-medium leading-none sm:text-[11px]">
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
