import type { ReactNode } from 'react';
import { cn } from '../ui/utils';

export type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        'mb-2 text-sm font-semibold tracking-tight text-[#111827] sm:mb-3 sm:text-base md:text-lg',
        className,
      )}
    >
      {children}
    </h2>
  );
}
