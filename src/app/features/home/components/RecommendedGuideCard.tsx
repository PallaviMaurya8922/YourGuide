import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { GuideAvatar } from '../../../components/commonComponents';

export type RecommendedGuideCardProps = {
  name: string;
  image: string;
  rating: number;
  expertise: string;
  trips: number;
  languages: string[];
  pricePerHour: number;
  onClick?: () => void;
};

export function RecommendedGuideCard({
  name,
  image,
  rating,
  expertise,
  trips,
  languages,
  pricePerHour,
  onClick,
}: RecommendedGuideCardProps) {
  const row = (
    <>
      <GuideAvatar image={image} size="xxs" className="ring-2 ring-white shadow-sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold leading-tight text-[#111827] sm:text-sm">{name}</p>
        <p className="mt-0.5 truncate text-[11px] leading-snug text-[#6B7280]">{expertise}</p>
        <p className="mt-0.5 text-[10px] font-medium text-[#9CA3AF]">{trips} trips</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {languages.slice(0, 3).map((lang) => (
            <span
              key={lang}
              className="rounded-full bg-[#F3F4F6] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#4B5563] ring-1 ring-gray-200/60 sm:text-[10px]"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end justify-between self-stretch py-0.5 pl-1">
        <div className="flex items-center gap-0.5 rounded-full bg-amber-50 px-1.5 py-0.5 ring-1 ring-amber-100/90">
          <Star className="size-2.5 fill-amber-500 text-amber-500" aria-hidden />
          <span className="text-[11px] font-bold tabular-nums text-[#111827]">{rating.toFixed(1)}</span>
        </div>
        <span className="text-[11px] font-bold tabular-nums text-[#1E3A8A] sm:text-xs">₹{pricePerHour}/hr</span>
      </div>
    </>
  );

  const shell =
    'flex gap-2.5 rounded-xl border border-gray-100 bg-white p-2.5 shadow-sm ring-1 ring-gray-50 sm:gap-3 sm:rounded-2xl sm:p-3';

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileTap={{ scale: 0.985 }}
        className={`${shell} w-full text-left transition-colors hover:border-[#BFDBFE] hover:bg-[#FAFBFF]`}
      >
        {row}
      </motion.button>
    );
  }

  return <div className={shell}>{row}</div>;
}
