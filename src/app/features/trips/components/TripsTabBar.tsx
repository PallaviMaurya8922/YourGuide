import { LayoutGroup, motion } from 'framer-motion';
import { cn } from '../../../components/ui/utils';

type TabId = 'graph' | 'saved';

export function TripsTabBar({
  active,
  onChange,
  className,
}: {
  active: TabId;
  onChange: (tab: TabId) => void;
  className?: string;
}) {
  const tabs: { id: TabId; label: string }[] = [
    { id: 'graph', label: 'Journey' },
    { id: 'saved', label: 'Saved trips' },
  ];

  return (
    <LayoutGroup id="trips-tabs">
      <div
        className={cn(
          'flex w-full gap-px rounded-md border border-gray-100 bg-[#F3F4F6]/90 p-px shadow-inner sm:rounded-lg',
          className,
        )}
        role="tablist"
        aria-label="Trips sections"
      >
        {tabs.map((t) => {
          const isOn = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={isOn}
              onClick={() => onChange(t.id)}
              className={cn(
                'relative flex min-h-7 flex-1 items-center justify-center rounded-[5px] px-0.5 py-0.5 text-center text-[11px] font-semibold leading-tight transition-colors sm:min-h-8 sm:px-1 sm:py-1 sm:text-[12px]',
                isOn ? 'text-[#1E3A8A]' : 'text-[#6B7280] hover:text-[#374151]',
              )}
            >
              {isOn ? (
                <motion.span
                  layoutId="trips-tab-pill"
                  className="absolute inset-0 rounded-[5px] bg-white shadow-sm sm:rounded-md"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              ) : null}
              <span className="relative z-10 max-w-full truncate px-0.5">{t.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
