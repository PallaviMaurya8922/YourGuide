import { motion } from 'framer-motion';
import { SettingsRow } from './SettingsRow';
import type { SettingsListItem } from './SettingsList';

export type SettingsSectionGroup = {
  title: string;
  items: SettingsListItem[];
};

type SettingsGroupedPanelProps = {
  sections: SettingsSectionGroup[];
  onItemPress?: (action: string) => void;
};

export function SettingsGroupedPanel({ sections, onItemPress }: SettingsGroupedPanelProps) {
  const flatCount = sections.reduce((n, s) => n + s.items.length, 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-2xl border border-gray-200/55 bg-white/95 shadow-[0_2px_16px_-6px_rgba(15,23,42,0.06)] ring-1 ring-gray-100/40"
    >
      {sections.map((section, sIndex) => (
        <div key={section.title}>
          <div
            className={
              sIndex > 0
                ? 'border-t border-gray-100/90 bg-[#FAFAFA]/80 px-2.5 py-1.5 sm:px-3'
                : 'bg-[#FAFAFA]/80 px-2.5 py-1.5 sm:px-3'
            }
          >
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8]">{section.title}</h3>
          </div>
          {section.items.map((item, itemIndex) => {
            const flatIdx =
              sections.slice(0, sIndex).reduce((acc, sec) => acc + sec.items.length, 0) + itemIndex;
            const isLast = flatIdx === flatCount - 1;
            return (
              <SettingsRow
                key={`${section.title}-${item.label}`}
                icon={item.icon}
                label={item.label}
                subtitle={item.subtitle}
                badge={item.badge}
                isLast={isLast}
                onClick={() => item.action && onItemPress?.(item.action)}
              />
            );
          })}
        </div>
      ))}
    </motion.section>
  );
}
