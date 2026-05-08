import type { ReactNode } from 'react';
import { cn } from '../ui/utils';

export type ScreenHeroProps = {
  title: string;
  subtitle?: string;
  /** Extra space below title block before optional children */
  titleSpacing?: 'default' | 'comfortable';
  children?: ReactNode;
  className?: string;
};

/**
 * Top-of-screen gradient header used across tab roots (Home, Explore, Profile, Trips, Planner input).
 * Matches safe-area and responsive padding used on Explore.
 */
export function ScreenHero({
  title,
  subtitle,
  titleSpacing = 'default',
  children,
  className,
}: ScreenHeroProps) {
  return (
    <div
      className={cn(
        'rounded-b-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] px-4 pb-4 pt-[max(0.75rem,env(safe-area-inset-top))] text-white sm:rounded-b-3xl sm:px-5 sm:pb-5 sm:pt-4',
        className,
      )}
    >
      <div
        className={cn(
          titleSpacing === 'comfortable' ? 'mb-5 sm:mb-6' : 'mb-2 sm:mb-3',
        )}
      >
        <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-sm leading-snug text-white/85 sm:text-[15px]">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
