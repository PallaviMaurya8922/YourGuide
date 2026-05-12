import type { ReactNode } from 'react';
import { cn } from '../../../components/ui/utils';

export type FilterSectionProps = {
  title: string;
  children: ReactNode;
  /** `list` = divided vertical stack; `grid` = two columns (experience) */
  layout?: 'list' | 'grid';
  className?: string;
};

export function FilterSection({ title, children, layout = 'list', className }: FilterSectionProps) {
  return (
    <section className={cn('space-y-2', className)}>
      <h3 className="px-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#374151]">{title}</h3>
      {layout === 'list' ? (
        <div className="overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-sm">
          <div className="flex flex-col divide-y divide-gray-100">{children}</div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">{children}</div>
      )}
    </section>
  );
}
