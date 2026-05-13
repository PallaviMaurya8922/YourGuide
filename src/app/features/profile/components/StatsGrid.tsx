import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../components/ui/utils';

export type StatAccent = 'sky' | 'amber' | 'emerald' | 'rose';

export type ProfileStat = {
  label: string;
  value: string;
  icon: LucideIcon;
  accent: StatAccent;
};

const accentStyles: Record<
  StatAccent,
  { well: string; icon: string }
> = {
  sky: { well: 'bg-sky-50/90 text-sky-600', icon: 'text-sky-600' },
  amber: { well: 'bg-amber-50/90 text-amber-600', icon: 'text-amber-600' },
  emerald: { well: 'bg-emerald-50/90 text-emerald-600', icon: 'text-emerald-600' },
  rose: { well: 'bg-rose-50/90 text-rose-600', icon: 'text-rose-600' },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function StatsGrid({ stats }: { stats: ProfileStat[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-2 sm:gap-2.5"
    >
      {stats.map((stat) => {
        const a = accentStyles[stat.accent];
        return (
          <motion.div
            key={stat.label}
            variants={item}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center rounded-xl bg-white px-2 py-2.5 text-center shadow-[0_2px_12px_-4px_rgba(15,23,42,0.06)] ring-1 ring-gray-100/70 sm:rounded-2xl sm:py-3"
          >
            <div
              className={cn(
                'mb-1.5 flex size-7 items-center justify-center rounded-full shadow-inner shadow-black/[0.03]',
                a.well,
              )}
            >
              <stat.icon className={cn('size-3.5 shrink-0', a.icon)} strokeWidth={2} aria-hidden />
            </div>
            <p className="text-xl font-bold tabular-nums leading-none tracking-tight text-[#111827] sm:text-2xl">
              {stat.value}
            </p>
            <p className="mt-1 max-w-[10rem] text-[10px] font-medium leading-tight text-[#6B7280] sm:max-w-none sm:text-[11px]">
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
