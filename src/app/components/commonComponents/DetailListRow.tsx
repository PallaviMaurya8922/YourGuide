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
    <div className="flex items-start gap-2.5 sm:items-center sm:gap-3">
      <div
        className={cn(
          'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-[#F4F6F8] ring-1 ring-gray-200/45 sm:mt-0 sm:size-8 sm:rounded-lg',
          iconWrapperClassName,
        )}
      >
        <Icon className={cn('size-3.5 sm:size-[15px]', iconClassName)} strokeWidth={2} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.04em] text-[#94A3B8]">{label}</p>
        <p className="mt-px text-[12px] leading-snug text-[#1F2937] sm:text-[13px]">{value}</p>
      </div>
    </div>
  );
}
