import type { LucideIcon } from 'lucide-react';
import { cn } from '../ui/utils';

export type CircleIconButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
};

/**
 * Circular translucent control for hero/toolbars (back, favorite, etc.).
 */
export function CircleIconButton({
  icon: Icon,
  label,
  onClick,
  className,
  iconClassName,
}: CircleIconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 sm:size-9',
        className,
      )}
    >
      <Icon className={cn('size-4 sm:size-[18px]', iconClassName)} aria-hidden />
    </button>
  );
}
