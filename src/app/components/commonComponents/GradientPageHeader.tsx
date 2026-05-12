import type { ReactNode } from 'react';
import { cn } from '../ui/utils';

export type GradientPageHeaderProps = {
  /** Typically toolbar row (back / actions). */
  toolbar: ReactNode;
  className?: string;
};

/**
 * Top gradient band with safe-area padding. Keeps toolbar out of notches
 * and uses a fixed stacking context below overlapping content.
 */
export function GradientPageHeader({ toolbar, className }: GradientPageHeaderProps) {
  return (
    <header
      className={cn(
        'relative isolate z-0 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]',
        // Reserve space under toolbar so overlap math stays predictable on all viewports
        'min-h-[7.25rem] pb-6 pt-[max(0.5rem,env(safe-area-inset-top))] sm:min-h-[8.5rem] sm:pb-8',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2 px-3 sm:gap-3 sm:px-5 md:px-8 lg:px-10">
        {toolbar}
      </div>
    </header>
  );
}
