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
    <div className={cn('rounded-xl px-3 py-2.5 sm:px-4 sm:py-3', v.box, className)}>
      <p className={cn('mb-0.5 text-xs font-medium sm:text-sm', v.label)}>{label}</p>
      <p className="text-sm text-[#111827] sm:text-base">{value}</p>
    </div>
  );
}
