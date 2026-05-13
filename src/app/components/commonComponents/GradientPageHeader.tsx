import type { ReactNode } from 'react';
import { cn } from '../ui/utils';

export type GradientPageHeaderProps = {
  /** Typically toolbar row (back / actions). */
  toolbar: ReactNode;
  className?: string;
  /** Shorter header band for guide profile–style screens. */
  compact?: boolean;
};

/**
 * Top gradient band with safe-area padding. Keeps toolbar out of notches
 * and uses a fixed stacking context below overlapping content.
 */
export function GradientPageHeader({ toolbar, className, compact }: GradientPageHeaderProps) {
  return (
    <header
      className={cn(
        'relative isolate z-0 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]',
        compact
          ? 'min-h-[5.25rem] pb-3.5 pt-[max(0.35rem,env(safe-area-inset-top))] sm:min-h-[5.75rem] sm:pb-4'
          : 'min-h-[7.25rem] pb-6 pt-[max(0.5rem,env(safe-area-inset-top))] sm:min-h-[8.5rem] sm:pb-8',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-start justify-between px-3 sm:px-5 md:px-8 lg:px-10',
          compact ? 'gap-1.5 pt-0.5 sm:gap-2' : 'gap-2 sm:gap-3',
        )}
      >
        {toolbar}
      </div>
    </header>
  );
}
