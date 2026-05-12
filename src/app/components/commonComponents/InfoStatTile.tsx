import { cn } from '../ui/utils';

export type InfoStatTileVariant = 'success' | 'info';

export type InfoStatTileProps = {
  label: string;
  value: string;
  variant: InfoStatTileVariant;
  className?: string;
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

export function InfoStatTile({ label, value, variant, className }: InfoStatTileProps) {
  const v = variantClasses[variant];
  return (
    <div className={cn('rounded-xl px-2.5 py-2 sm:px-3.5 sm:py-2.5', v.box, className)}>
      <p className={cn('mb-0 text-[11px] font-medium leading-tight sm:mb-0.5 sm:text-xs md:text-sm', v.label)}>
        {label}
      </p>
      <p className="text-sm font-semibold leading-tight text-[#111827] sm:text-[15px] md:text-base">{value}</p>
    </div>
  );
}
