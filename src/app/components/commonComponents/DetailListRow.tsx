import type { LucideIcon } from 'lucide-react';
import { cn } from '../ui/utils';

export type DetailListRowProps = {
  icon: LucideIcon;
  iconWrapperClassName?: string;
  /** Tailwind color classes for the icon stroke/fill */
  iconClassName?: string;
  label: string;
  value: string;
};

export function DetailListRow({
  icon: Icon,
  iconWrapperClassName,
  iconClassName,
  label,
  value,
}: DetailListRowProps) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <div
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F9FAFB] sm:size-11',
          iconWrapperClassName,
        )}
      >
        <Icon className={cn('size-5 sm:size-[22px]', iconClassName)} aria-hidden />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="mb-0.5 text-xs text-[#6B7280]">{label}</p>
        <p className="text-sm leading-snug text-[#111827] sm:text-base">{value}</p>
      </div>
    </div>
  );
}
