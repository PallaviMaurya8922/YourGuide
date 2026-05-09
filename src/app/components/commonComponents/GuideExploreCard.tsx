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
        'flex min-w-0 flex-col rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:border-[#3B82F6] hover:shadow-lg',
        interactive && 'cursor-pointer',
        !interactive && 'cursor-default hover:border-gray-200 hover:shadow-none',
        className,
      )}
      onClick={interactive ? () => onSelect?.(guide.id) : undefined}
      aria-label={interactive ? `Open guide: ${guide.name}` : undefined}
    >
      <div className="mb-3 flex gap-4">
        <GuideAvatar image={guide.image} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="text-base text-[#111827]">{guide.name}</h3>
              {guide.verified ? <Shield className="size-4 shrink-0 text-[#10B981]" aria-label="Verified" /> : null}
            </div>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-[#F97316] text-[#F97316]" aria-hidden />
              <span className="text-sm text-[#111827]">{guide.rating}</span>
            </div>
            <span className="text-xs text-[#6B7280]">({guide.reviews} reviews)</span>
          </div>
          <p className="text-xs text-[#6B7280]">{guide.expertise}</p>
        </div>
      </div>

      <p className="mb-3 line-clamp-2 flex-1 text-sm text-[#6B7280]">{guide.description}</p>

      <div className="mt-auto min-w-0 border-t border-gray-100 pt-3">
        <div className="mb-3 flex min-w-0 flex-wrap gap-1.5">
          {guide.languages.map((lang) => (
            <span key={lang} className="rounded-full bg-[#F9FAFB] px-2.5 py-1 text-xs text-[#6B7280]">
              {lang}
            </span>
          ))}
        </div>
        <div className="flex min-w-0 items-center justify-between gap-2">
          <span className="min-w-0 truncate text-base font-medium text-[#1E3A8A]">₹{guide.price}/hr</span>
          <button
            type="button"
            className="shrink-0 rounded-full bg-[#1E3A8A] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#1E3A8A]/90"
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
