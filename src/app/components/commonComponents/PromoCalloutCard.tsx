import type { ReactNode } from 'react';
import { cn } from '../ui/utils';

export type PromoCalloutCardProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
  /** Decorative element on the right (e.g. icon) */
  decoration?: ReactNode;
  className?: string;
};

export function PromoCalloutCard({
  title,
  description,
  actionLabel,
  onAction,
  decoration,
  className,
}: PromoCalloutCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#FB923C] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5 md:p-6',
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <h3 className="mb-0.5 text-base font-semibold text-white sm:text-lg md:text-xl">{title}</h3>
        <p className="mb-2 text-xs leading-relaxed text-white/90 sm:mb-3 sm:text-sm md:text-[15px]">
          {description}
        </p>
        <button
          type="button"
          onClick={onAction}
          className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#F97316] shadow-sm transition-colors hover:bg-white/95 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          {actionLabel}
        </button>
      </div>
      {decoration ? (
        <div className="shrink-0 self-end text-white/20 sm:self-center">{decoration}</div>
      ) : null}
    </div>
  );
}
