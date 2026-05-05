import { Search } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../ui/utils';

export type PillSearchInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'className'
> & {
  wrapperClassName?: string;
  iconClassName?: string;
};

/**
 * Compact rounded search field for hero sections and toolbars.
 */
export const PillSearchInput = ({
  wrapperClassName,
  iconClassName,
  ...inputProps
}: PillSearchInputProps) => {
  return (
    <div
      className={cn(
        'flex min-h-[40px] items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-md sm:min-h-[44px] sm:gap-2.5 sm:px-4 sm:py-2',
        wrapperClassName,
      )}
    >
      <Search
        className={cn('size-4 shrink-0 text-[#6B7280] sm:size-[1.125rem]', iconClassName)}
        aria-hidden
      />
      <input
        type="search"
        enterKeyHint="search"
        className="min-h-0 min-w-0 flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] sm:text-[15px]"
        {...inputProps}
      />
    </div>
  );
};
