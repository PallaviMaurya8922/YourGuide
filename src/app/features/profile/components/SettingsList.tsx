import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { SettingsRow } from './SettingsRow';

export type SettingsListItem = {
  icon: LucideIcon;
  label: string;
  subtitle?: string;
  badge?: string;
  action?: string;
};

type SettingsListProps = {
  title: string;
  items: SettingsListItem[];
  onItemPress?: (action: string) => void;
};

export function SettingsList({ title, items, onItemPress }: SettingsListProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.25 }}
      className="space-y-1.5"
    >
      <h3 className="px-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">{title}</h3>
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm ring-1 ring-gray-50 sm:rounded-2xl">
        {items.map((item, index) => (
          <SettingsRow
            key={item.label}
            icon={item.icon}
            label={item.label}
            subtitle={item.subtitle}
            badge={item.badge}
            isLast={index === items.length - 1}
            onClick={() => item.action && onItemPress?.(item.action)}
          />
        ))}
      </div>
    </motion.section>
  );
}
