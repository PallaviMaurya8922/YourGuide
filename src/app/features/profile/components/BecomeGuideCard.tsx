import { motion } from 'framer-motion';
import { Route, Sparkles } from 'lucide-react';

export type BecomeGuideCardProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
};

export function BecomeGuideCard({ title, description, actionLabel, onAction }: BecomeGuideCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.26 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#EA580C] via-[#F97316] to-[#FB923C] p-3 shadow-[0_6px_28px_-10px_rgba(234,88,12,0.45)] ring-1 ring-white/20 sm:p-3.5"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-white/10 blur-2xl" aria-hidden />
      <div className="relative flex items-start gap-2.5">
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold leading-tight tracking-tight text-white sm:text-base">{title}</h3>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/88 sm:text-xs">{description}</p>
        </div>
        <div className="relative flex shrink-0 flex-col items-center gap-0.5" aria-hidden>
          <div className="flex size-9 items-center justify-center rounded-xl bg-white/18 text-white shadow-inner shadow-black/10 ring-1 ring-white/25 backdrop-blur-[2px] sm:size-10">
            <Route className="size-4 opacity-95 sm:size-[1.05rem]" strokeWidth={2} />
          </div>
          <Sparkles className="size-3.5 text-white/35 sm:size-4" strokeWidth={2} />
        </div>
      </div>
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={onAction}
        className="relative mt-2.5 w-full rounded-full bg-white py-2 text-[12px] font-semibold tracking-tight text-[#C2410C] shadow-md shadow-orange-950/10 ring-1 ring-white/60 transition-colors hover:bg-white/95"
      >
        {actionLabel}
      </motion.button>
    </motion.div>
  );
}
