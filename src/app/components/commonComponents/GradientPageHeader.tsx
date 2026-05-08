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
        'min-h-[10rem] pb-10 pt-[max(0.75rem,env(safe-area-inset-top))] sm:min-h-[11.5rem] sm:pb-12',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3 px-4 sm:px-6">{toolbar}</div>
    </header>
  );
}
