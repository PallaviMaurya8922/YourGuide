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
        'fixed bottom-0 left-1/2 z-30 -translate-x-1/2 border-gray-200 bg-white/95 px-1.5 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] backdrop-blur-sm max-lg:border-t lg:hidden',
        className,
      )}
    >
      <div className="flex items-stretch justify-between gap-0.5 px-0.5 sm:px-1 md:gap-1 md:px-2 md:pt-1.5 lg:justify-center lg:gap-2 lg:px-1 lg:pt-0 xl:gap-3">
        {items.map(({ id, label, icon: Icon, active, onClick }) => (
          <button
            key={id}
            type="button"
            onClick={onClick}
            className={cn(
              'flex min-h-[44px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1 transition-colors sm:min-h-[46px]',
              active
                ? 'bg-[#EFF6FF] font-semibold text-[#1E3A8A] shadow-sm shadow-blue-900/5 ring-1 ring-[#BFDBFE]/80'
                : 'font-medium text-[#6B7280] active:bg-gray-50',
            )}
          >
            <Icon
              className="size-[17px] shrink-0 sm:size-[18px] md:size-5"
              strokeWidth={active ? 2.35 : 2}
              aria-hidden
            />
            <span className="max-w-full truncate text-[9px] leading-tight text-current sm:text-[10px] md:text-[11px]">
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
