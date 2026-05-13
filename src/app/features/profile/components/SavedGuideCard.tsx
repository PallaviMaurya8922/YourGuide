import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Star } from 'lucide-react';
import { GuideAvatar } from '../../../components/commonComponents';

export type SavedGuideCardProps = {
  name: string;
  city: string;
  specialty: string;
  rating: number;
  image: string;
  onClick?: () => void;
};

export function SavedGuideCard({ name, city, specialty, rating, image, onClick }: SavedGuideCardProps) {
  const className =
    'group flex w-full items-center gap-2 rounded-[0.875rem] border border-gray-100/90 bg-white/90 p-2 text-left shadow-sm shadow-gray-900/[0.04] ring-1 ring-gray-100/50 transition-[box-shadow,background-color,border-color] duration-200 sm:gap-2.5 sm:rounded-xl sm:p-2.5 ' +
    (onClick
      ? 'cursor-pointer hover:border-slate-200/90 hover:bg-white hover:shadow-md hover:shadow-gray-900/[0.06] active:scale-[0.99]'
      : 'cursor-default');

  const inner = (
    <>
      <GuideAvatar
        image={image}
        size="xxs"
        className="ring-2 ring-gray-100/90 shadow-sm shadow-gray-900/5"
      />
      <div className="min-w-0 flex-1 py-0.5">
        <p className="truncate text-sm font-semibold leading-tight tracking-tight text-[#111827]">{name}</p>
        <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] font-medium text-[#6B7280]">
          <MapPin className="size-2.5 shrink-0 text-[#9CA3AF]" aria-hidden />
          <span className="truncate">{city}</span>
        </p>
        <p className="mt-0.5 truncate text-[10px] leading-snug text-[#9CA3AF]">{specialty}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 self-stretch pl-0.5">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5 rounded-full bg-amber-50/95 px-1.5 py-0.5 ring-1 ring-amber-100/70">
            <Star className="size-2.5 fill-amber-500 text-amber-500" aria-hidden />
            <span className="text-[11px] font-bold tabular-nums text-[#111827]">{rating.toFixed(1)}</span>
          </div>
          <ChevronRight className="size-4 shrink-0 text-[#D1D5DB] transition-colors group-hover:text-[#9CA3AF]" aria-hidden />
        </div>
      </div>
    </>
  );

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileTap={{ scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 480, damping: 32 }}
        className={className}
      >
        {inner}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {inner}
    </motion.div>
  );
}
