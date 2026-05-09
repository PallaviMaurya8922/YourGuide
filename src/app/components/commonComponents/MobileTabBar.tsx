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
        'fixed bottom-0 left-1/2 z-30 -translate-x-1/2 border-gray-200 bg-white/95 px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] backdrop-blur-sm max-lg:border-t lg:hidden',
        className,
      )}
    >
      <div className="flex items-stretch justify-between gap-0.5 md:gap-1 md:px-2 md:pt-2 lg:justify-center lg:gap-2 lg:px-1 lg:pt-0 xl:gap-3">
        {items.map(({ id, label, icon: Icon, active, onClick }) => (
          <button
            key={id}
            type="button"
            onClick={onClick}
            className={cn(
              'flex min-h-[44px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1 transition-colors active:bg-gray-50 md:min-h-[52px] md:gap-1 md:py-1.5',
              active ? 'text-[#1E3A8A]' : 'text-[#6B7280]',
            )}
          >
            <Icon
              className="size-[1.125rem] shrink-0 md:size-5"
              strokeWidth={active ? 2.25 : 2}
              aria-hidden
            />
            <span className="max-w-full truncate text-[10px] font-medium leading-none sm:text-[11px] md:text-xs">
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
