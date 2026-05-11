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
          'flex w-full gap-1 rounded-2xl border border-gray-100 bg-[#F3F4F6]/80 p-1 shadow-inner',
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
                'relative flex-1 rounded-xl py-2.5 text-center text-sm font-semibold transition-colors',
                isOn ? 'text-[#1E3A8A]' : 'text-[#6B7280] hover:text-[#374151]',
              )}
            >
              {isOn ? (
                <motion.span
                  layoutId="trips-tab-pill"
                  className="absolute inset-0 rounded-xl bg-white shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              ) : null}
              <span className="relative z-10">{t.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
