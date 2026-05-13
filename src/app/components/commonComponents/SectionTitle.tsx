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
        'mb-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-[#64748B] sm:mb-2 sm:text-[11px] sm:tracking-[0.08em]',
        className,
      )}
    >
      {children}
    </h2>
  );
}
