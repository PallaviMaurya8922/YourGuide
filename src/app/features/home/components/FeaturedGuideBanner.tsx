import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

type FeaturedGuideBannerProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
};

export function FeaturedGuideBanner({ title, description, actionLabel, onAction }: FeaturedGuideBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F97316] via-[#FB923C] to-[#FDBA74] p-3.5 shadow-md shadow-orange-500/12 ring-1 ring-white/20 sm:p-4"
    >
      <div className="relative z-10 max-w-[85%]">
        <h3 className="text-[15px] font-semibold leading-tight tracking-tight text-white sm:text-base">{title}</h3>
        <p className="mt-1 text-[11px] leading-snug text-white/90 sm:text-xs">{description}</p>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={onAction}
        className="relative z-10 mt-3 w-full rounded-full bg-white py-2 text-[12px] font-semibold text-[#C2410C] shadow-sm transition-colors hover:bg-white/95 sm:mt-3.5 sm:py-2.5 sm:text-sm"
      >
        {actionLabel}
      </motion.button>

      <div className="pointer-events-none absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5" aria-hidden>
        <Users className="size-9 text-white/25 sm:size-10" strokeWidth={1.5} />
      </div>
    </motion.div>
  );
}
