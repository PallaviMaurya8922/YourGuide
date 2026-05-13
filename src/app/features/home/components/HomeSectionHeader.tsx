import type { ReactNode } from 'react';
import { cn } from '../../../components/ui/utils';

type HomeSectionHeaderProps = {
  title: string;
  action?: ReactNode;
  className?: string;
};

export function HomeSectionHeader({ title, action, className }: HomeSectionHeaderProps) {
  return (
    <div className={cn('mb-2 flex items-end justify-between gap-2 sm:mb-2.5', className)}>
      <h2 className="text-sm font-semibold tracking-tight text-[#111827] sm:text-base">{title}</h2>
      {action ? <div className="shrink-0 pb-px">{action}</div> : null}
    </div>
  );
}
