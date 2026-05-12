import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../../components/ui/utils';

export type FilterToggleProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  /** `radio` = single-select circle; `check` = multi-select square */
  variant?: 'radio' | 'check';
  /** `joined` = row in a divided list; `card` = bordered cell (e.g. experience grid) */
  surface?: 'joined' | 'card';
  className?: string;
};

export function FilterToggle({
  label,
  selected,
  onSelect,
  variant = 'radio',
  surface = 'joined',
  className,
}: FilterToggleProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.995 }}
      transition={{ type: 'spring', stiffness: 520, damping: 38 }}
      className={cn(
        'flex w-full items-center gap-3 text-left transition-colors touch-manipulation sm:gap-3.5',
        surface === 'joined' &&
          'min-h-[44px] rounded-none px-3 py-2 sm:min-h-[44px] sm:px-3.5 sm:py-2.5',
        surface === 'card' &&
          'min-h-[44px] rounded-xl border border-gray-200/90 bg-white px-3 py-2 shadow-sm sm:px-3.5 sm:py-2.5',
        selected
          ? surface === 'card'
            ? 'border-[#BFDBFE] bg-[#EFF6FF] shadow-sm'
            : 'bg-[#EFF6FF]'
          : surface === 'joined'
            ? 'bg-white hover:bg-gray-50/80'
            : 'hover:bg-gray-50/60',
        className,
      )}
    >
      <span
        className={cn(
          'flex size-4 shrink-0 items-center justify-center border-[1.5px] transition-colors sm:size-[18px]',
          variant === 'radio' ? 'rounded-full' : 'rounded-[4px]',
          selected && variant === 'radio' && 'border-[#1E3A8A] bg-white',
          selected && variant === 'check' && 'border-[#1E3A8A] bg-[#1E3A8A] text-white',
          !selected && 'border-gray-300 bg-white',
        )}
        aria-hidden
      >
        {variant === 'check' && selected ? (
          <Check className="size-2.5 stroke-[3] sm:size-3" aria-hidden />
        ) : null}
        {variant === 'radio' && selected ? <span className="size-1.5 rounded-full bg-[#1E3A8A] sm:size-2" /> : null}
      </span>
      <span className="min-w-0 flex-1 text-[13px] font-medium leading-tight text-[#111827] sm:text-sm">{label}</span>
    </motion.button>
  );
}
