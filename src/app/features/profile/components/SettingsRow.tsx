import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../components/ui/utils';

export type SettingsRowProps = {
  icon: LucideIcon;
  label: string;
  subtitle?: string;
  badge?: string;
  onClick?: () => void;
  isLast?: boolean;
};

export function SettingsRow({ icon: Icon, label, subtitle, badge, onClick, isLast }: SettingsRowProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.995 }}
      className={cn(
        'flex w-full items-center gap-2 px-2.5 py-2 text-left transition-colors hover:bg-[#FAFAFA] active:bg-[#F9FAFB] sm:gap-2.5 sm:px-3 sm:py-2',
        !isLast && 'border-b border-gray-100/90',
      )}
    >
      <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gray-100/80 text-[#64748B]">
        <Icon className="size-3.5" strokeWidth={1.85} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium leading-tight text-[#111827]">{label}</p>
        {subtitle ? (
          <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-[#9CA3AF] sm:text-[11px]">{subtitle}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {badge ? (
          <span className="rounded-full bg-orange-50/90 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-orange-800/90 ring-1 ring-orange-100/80">
            {badge}
          </span>
        ) : null}
        <ChevronRight className="size-3.5 text-[#D1D5DB]" aria-hidden />
      </div>
    </motion.button>
  );
}
