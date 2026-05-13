import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../../components/ui/utils';

export type FilterChipProps = {
  label: string;
  icon?: LucideIcon | null;
  selected: boolean;
  onClick: () => void;
  /** `compact` for horizontal quick-filter row */
  variant?: 'default' | 'compact';
  className?: string;
};

export function FilterChip({
  label,
  icon: Icon,
  selected,
  onClick,
  variant = 'default',
  className,
}: FilterChipProps) {
  return (
    <motion.button
      type="button"
      layout
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 520, damping: 32 }}
      className={cn(
        'inline-flex max-w-full shrink-0 items-center justify-center gap-1 rounded-full text-center font-semibold leading-none tracking-tight transition-colors',
        variant === 'compact'
          ? 'min-h-8 gap-0.5 px-2.5 py-1 text-[11px] sm:min-h-9 sm:gap-1 sm:px-3 sm:py-1.5 sm:text-[12px]'
          : 'min-h-9 gap-1 px-3 py-1.5 text-[12px] sm:min-h-10 sm:gap-1.5 sm:px-3.5 sm:text-[13px]',
        selected
          ? 'bg-[#1E3A8A] text-white shadow-sm shadow-[#1E3A8A]/25'
          : 'bg-[#F9FAFB] text-[#4B5563] ring-1 ring-inset ring-gray-200/90 hover:bg-gray-50',
        className,
      )}
    >
      {Icon ? (
        <Icon
          className={cn(
            'shrink-0 opacity-95',
            variant === 'compact' ? 'size-3 sm:size-3.5' : 'size-3.5 sm:size-4',
          )}
          strokeWidth={2}
          aria-hidden
        />
      ) : null}
      <span className="truncate">{label}</span>
    </motion.button>
  );
}
