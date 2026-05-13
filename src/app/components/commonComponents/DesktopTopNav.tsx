import type { LucideIcon } from 'lucide-react';
import { cn } from '../ui/utils';
import { SHELL_MAX_WIDTH_CLASS } from '../../shellLayout';

export type DesktopTopNavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
};

export type DesktopTopNavProps = {
  headline: string;
  items: DesktopTopNavItem[];
};

/**
 * Fixed top navigation for wide screens.
 * Mobile uses `MobileTabBar`.
 */
export function DesktopTopNav({ headline, items }: DesktopTopNavProps) {
  return (
    <header
      className={cn(
        'fixed left-1/2 top-0 z-40 hidden -translate-x-1/2 border-b border-gray-200/90 bg-white/95 pt-[max(0.25rem,env(safe-area-inset-top))] backdrop-blur-sm lg:block',
        SHELL_MAX_WIDTH_CLASS,
      )}
    >
      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 md:px-8 lg:px-10">
        <p className="min-w-0 truncate text-base font-semibold tracking-tight text-[#111827]">
          {headline}
        </p>
        <nav aria-label="Main" className="flex shrink-0 items-center gap-1">
          {items.map(({ id, label, icon: Icon, active, onClick }) => (
            <button
              key={id}
              type="button"
              onClick={onClick}
              className={cn(
                'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-[#EFF6FF] text-[#1E3A8A]'
                  : 'text-[#6B7280] hover:bg-gray-50 hover:text-[#111827]',
              )}
            >
              <Icon className="size-[1.125rem] shrink-0" strokeWidth={active ? 2.25 : 2} aria-hidden />
              <span className="hidden xl:inline">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

