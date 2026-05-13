import { cn } from '../ui/utils';

export type InfoStatTileVariant = 'success' | 'info';

export type InfoStatTileProps = {
  label: string;
  value: string;
  variant: InfoStatTileVariant;
  className?: string;
  /** Tighter pills for guide profile card. */
  compact?: boolean;
};

const variantClasses: Record<InfoStatTileVariant, { box: string; label: string }> = {
  success: {
    box: 'bg-[#10B981]/10',
    label: 'text-[#059669]',
  },
  info: {
    box: 'bg-[#3B82F6]/10',
    label: 'text-[#2563EB]',
  },
};

export function InfoStatTile({ label, value, variant, className, compact }: InfoStatTileProps) {
  const v = variantClasses[variant];
  return (
    <div
      className={cn(
        'ring-1 ring-black/[0.04]',
        compact
          ? 'rounded-xl px-3 py-2.5 sm:px-3.5 sm:py-3'
          : 'rounded-xl px-2.5 py-2 sm:px-3.5 sm:py-2.5',
        v.box,
        className,
      )}
    >
      <p
        className={cn(
          'font-medium leading-tight',
          compact
            ? 'mb-0 text-[11px] font-semibold uppercase tracking-[0.06em] sm:text-[11px]'
            : 'mb-0 text-[11px] sm:mb-0.5 sm:text-xs md:text-sm',
          v.label,
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'font-semibold leading-snug text-[#111827]',
          compact ? 'mt-1 text-[13px] leading-snug sm:text-sm' : 'text-sm sm:text-[15px] md:text-base',
        )}
      >
        {value}
      </p>
    </div>
  );
}
