import { Search } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../ui/utils';

export type PillSearchInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'className'
> & {
  wrapperClassName?: string;
  iconClassName?: string;
  /**
   * `onGradient`: softer chrome for use on blue hero (Explore, etc.).
   */
  variant?: 'default' | 'onGradient';
};

/**
 * Compact rounded search field for hero sections and toolbars.
 */
export const PillSearchInput = ({
  wrapperClassName,
  iconClassName,
  variant = 'default',
  ...inputProps
}: PillSearchInputProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 sm:gap-2 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2',
        variant === 'onGradient'
          ? 'min-h-9 shadow-sm shadow-black/10 ring-1 ring-white/40 transition-shadow duration-200 focus-within:ring-2 focus-within:ring-white/70 sm:min-h-10 md:min-h-11'
          : 'min-h-[38px] shadow-md sm:min-h-[42px] md:min-h-[44px]',
        wrapperClassName,
      )}
    >
      <Search
        className={cn(
          'size-4 shrink-0 text-[#6B7280]',
          variant === 'onGradient' ? 'sm:size-4' : 'sm:size-[1.125rem]',
          iconClassName,
        )}
        aria-hidden
      />
      <input
        type="search"
        enterKeyHint="search"
        className={cn(
          'min-h-0 min-w-0 flex-1 bg-transparent text-[#111827] outline-none placeholder:text-[#9CA3AF]',
          variant === 'onGradient'
            ? 'text-[13px] leading-normal sm:text-sm'
            : 'text-sm sm:text-[15px]',
        )}
        {...inputProps}
      />
    </div>
  );
};
