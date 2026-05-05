import type { ReactNode } from 'react';
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
        'fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-gray-200 bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-4',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-[#6B7280]">{priceLabel}</p>
          <p className="text-2xl font-semibold text-[#1E3A8A] sm:text-3xl">{priceDisplay}</p>
        </div>
        <button
          type="button"
          onClick={onAction}
          className="min-h-[44px] shrink-0 rounded-full bg-[#1E3A8A] px-7 py-3 text-white transition-colors hover:bg-[#1c3578] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] sm:px-10"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
