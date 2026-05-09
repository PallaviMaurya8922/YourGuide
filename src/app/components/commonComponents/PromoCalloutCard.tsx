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
        'flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#FB923C] p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:p-6',
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 text-lg text-white md:text-xl">{title}</h3>
        <p className="mb-3 text-sm text-white/90 md:text-[15px]">{description}</p>
        <button
          type="button"
          onClick={onAction}
          className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#F97316] transition-colors hover:bg-white/95"
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
