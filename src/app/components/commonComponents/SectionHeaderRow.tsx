import type { ReactNode } from 'react';
import { cn } from '../ui/utils';

export type SectionHeaderRowProps = {
  title: string;
  /** e.g. "See All" link or icon button */
  action?: ReactNode;
  className?: string;
};

/**
 * Row with section title and optional trailing action (mirrors repeated flex rows across screens).
 */
export function SectionHeaderRow({ title, action, className }: SectionHeaderRowProps) {
  return (
    <div className={cn('mb-4 flex items-center justify-between gap-2', className)}>
      <h2 className="text-lg font-medium text-[#111827] md:text-xl">{title}</h2>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
