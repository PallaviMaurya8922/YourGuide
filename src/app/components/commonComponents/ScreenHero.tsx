import type { ReactNode } from 'react';
import { cn } from '../ui/utils';

export type ScreenHeroProps = {
  title: string;
  subtitle?: string;
  /** Extra space below title block before optional children */
  titleSpacing?: 'default' | 'comfortable';
  /**
   * Dense header: tighter title→subtitle rhythm and less gap before children
   * (e.g. Explore search under title).
   */
  compact?: boolean;
  /** Use when `DesktopTopNav` shows the headline on wide screens. */
  hideTitleFromLg?: boolean;
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
  compact = false,
  hideTitleFromLg = false,
  children,
  className,
}: ScreenHeroProps) {
  return (
    <div
      className={cn(
        'rounded-b-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] px-3 pb-3 pt-[max(0.5rem,env(safe-area-inset-top))] text-left text-white sm:rounded-b-3xl sm:px-5 sm:pb-4 sm:pt-3 md:px-8 md:pb-5 lg:px-10',
        compact && 'pb-2.5 sm:pb-3.5',
        className,
      )}
    >
      <div
        className={cn(
          compact
            ? 'mb-2 sm:mb-2.5'
            : titleSpacing === 'comfortable'
              ? 'mb-3 sm:mb-4'
              : 'mb-1.5 sm:mb-2',
          hideTitleFromLg && 'lg:hidden',
        )}
      >
        <h1 className="text-lg font-semibold tracking-tight text-white sm:text-2xl md:text-3xl">
          {title}
        </h1>
        {subtitle ? (
          <p
            className={cn(
              compact
                ? 'mt-1 max-w-[22rem] text-[13px] leading-snug text-white/90 sm:max-w-none sm:text-sm sm:leading-snug'
                : 'mt-0.5 text-xs leading-snug text-white/85 sm:text-[15px] sm:leading-snug md:text-base',
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      {children ? (
        <div
          className={cn(
            'w-full [&>*]:w-full',
            compact
              ? 'mt-2 sm:mt-2.5 md:mx-auto md:max-w-lg lg:max-w-xl'
              : 'md:mx-auto md:max-w-lg lg:max-w-xl xl:max-w-2xl',
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
