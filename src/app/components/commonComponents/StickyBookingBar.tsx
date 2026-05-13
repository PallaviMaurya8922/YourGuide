import type { ReactNode } from 'react';
import { SHELL_MAX_WIDTH_CLASS } from '../../shellLayout';
import { cn } from '../ui/utils';

export type StickyBookingBarProps = {
  priceLabel?: string;
  priceDisplay: ReactNode;
  actionLabel: string;
  onAction: () => void;
  className?: string;
};

/**
 * Fixed bottom bar for guide-style flows (inside max-width shells).
 */
export function StickyBookingBar({
  priceLabel = 'Hourly Rate',
  priceDisplay,
  actionLabel,
  onAction,
  className,
}: StickyBookingBarProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-1/2 z-40 -translate-x-1/2 border-gray-200/90 bg-white/95 px-3 py-2.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_-8px_rgba(15,23,42,0.08)] backdrop-blur-md sm:px-5 sm:py-3 md:px-8 lg:px-10 max-lg:border-t',
        SHELL_MAX_WIDTH_CLASS,
        'lg:bottom-6 lg:w-max lg:max-w-lg lg:rounded-2xl lg:border lg:shadow-lg xl:max-w-xl',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 lg:flex-nowrap">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wide text-[#9CA3AF]">{priceLabel}</p>
          <p className="text-xl font-semibold tabular-nums leading-tight text-[#1E3A8A] sm:text-2xl">{priceDisplay}</p>
        </div>
        <button
          type="button"
          onClick={onAction}
          className="min-h-[40px] shrink-0 rounded-full bg-[#1E3A8A] px-5 py-2 text-[13px] font-semibold text-white shadow-sm shadow-blue-900/20 transition-colors hover:bg-[#1c3578] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] sm:min-h-[42px] sm:px-6 sm:text-sm"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
