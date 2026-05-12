import { Shield, Star } from 'lucide-react';
import { GuideAvatar } from './GuideAvatar';
import { cn } from '../ui/utils';

export type GuideExploreCardGuide = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  languages: string[];
  price: number;
  image: string;
  expertise: string;
  verified?: boolean;
  description: string;
};

export type GuideExploreCardProps = {
  guide: GuideExploreCardGuide;
  onSelect?: (id: string) => void;
  className?: string;
};

export function GuideExploreCard({ guide, onSelect, className }: GuideExploreCardProps) {
  const interactive = Boolean(onSelect);

  return (
    <article
      className={cn(
        'flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-3 transition-all hover:border-[#3B82F6] hover:shadow-lg sm:rounded-2xl sm:p-3.5 md:p-4',
        interactive && 'cursor-pointer',
        !interactive && 'cursor-default hover:border-gray-200 hover:shadow-none',
        className,
      )}
      onClick={interactive ? () => onSelect?.(guide.id) : undefined}
      aria-label={interactive ? `Open guide: ${guide.name}` : undefined}
    >
      <div className="mb-2 flex gap-3 sm:mb-2.5 sm:gap-3.5 md:gap-4">
        <GuideAvatar image={guide.image} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-start justify-between gap-2 sm:mb-1">
            <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
              <h3 className="text-sm font-semibold text-[#111827] sm:text-base">{guide.name}</h3>
              {guide.verified ? <Shield className="size-4 shrink-0 text-[#10B981]" aria-label="Verified" /> : null}
            </div>
          </div>
          <div className="mb-1 flex items-center gap-1.5 sm:mb-1.5 sm:gap-2">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Star className="size-3.5 fill-[#F97316] text-[#F97316] sm:size-4" aria-hidden />
              <span className="text-xs font-medium text-[#111827] sm:text-sm">{guide.rating}</span>
            </div>
            <span className="text-[10px] text-[#6B7280] sm:text-xs">({guide.reviews})</span>
          </div>
          <p className="text-[11px] text-[#6B7280] sm:text-xs">{guide.expertise}</p>
        </div>
      </div>

      <p className="mb-2 line-clamp-2 flex-1 text-xs leading-relaxed text-[#6B7280] sm:mb-2.5 sm:text-sm">
        {guide.description}
      </p>

      <div className="mt-auto min-w-0 border-t border-gray-100 pt-2 sm:pt-2.5 md:pt-3">
        <div className="mb-2 flex min-w-0 flex-wrap gap-1 sm:mb-2.5 sm:gap-1.5">
          {guide.languages.map((lang) => (
            <span
              key={lang}
              className="rounded-full bg-[#F9FAFB] px-2 py-0.5 text-[10px] text-[#6B7280] sm:px-2.5 sm:py-1 sm:text-xs"
            >
              {lang}
            </span>
          ))}
        </div>
        <div className="flex min-w-0 items-center justify-between gap-2">
          <span className="min-w-0 truncate text-sm font-semibold text-[#1E3A8A] sm:text-base">₹{guide.price}/hr</span>
          <button
            type="button"
            className="shrink-0 rounded-full bg-[#1E3A8A] px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#1E3A8A]/90 sm:px-4 sm:py-2 sm:text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(guide.id);
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
}
