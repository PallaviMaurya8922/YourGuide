import type { LucideIcon } from 'lucide-react';
import { cn } from '../ui/utils';

export type CircleIconButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  /** Smaller, lighter control for dense headers (e.g. guide profile). */
  density?: 'default' | 'compact';
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
  density = 'default',
}: CircleIconButtonProps) {
  const compact = density === 'compact';
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full text-white backdrop-blur-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80',
        compact
          ? 'size-8 bg-white/12 ring-1 ring-white/25 hover:bg-white/20 sm:size-8'
          : 'size-8 bg-white/20 hover:bg-white/30 sm:size-9',
        className,
      )}
    >
      <Icon
        className={cn(compact ? 'size-3.5 sm:size-3.5' : 'size-4 sm:size-[18px]', iconClassName)}
        strokeWidth={2}
        aria-hidden
      />
    </button>
  );
}
