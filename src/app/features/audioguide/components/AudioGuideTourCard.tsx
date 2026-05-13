import { Clock, Heart, MapPin, Play } from 'lucide-react';
import type { AudioguideTour } from '../data/audioguidesMock';
import { cn } from '../../../components/ui/utils';

type AudioGuideTourCardProps = {
  tour: AudioguideTour;
  totalMins: number;
  isBookmarked: boolean;
  isPreviewing: boolean;
  onOpenTour: () => void;
  onPreview: () => void;
  onToggleBookmark: () => void;
};

export function AudioGuideTourCard({
  tour,
  totalMins,
  isBookmarked,
  isPreviewing,
  onOpenTour,
  onPreview,
  onToggleBookmark,
}: AudioGuideTourCardProps) {
  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-[1.25rem] border border-gray-100/90 bg-white shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)] ring-1 ring-gray-100/80 transition-all duration-200',
        'hover:border-violet-200/80 hover:shadow-[0_12px_28px_-8px_rgba(91,33,182,0.12)] hover:ring-violet-100/60 active:scale-[0.99]',
      )}
    >
      <button
        type="button"
        onClick={onOpenTour}
        className="flex w-full min-h-[44px] gap-3 p-3 text-left sm:gap-3.5 sm:p-3.5"
        aria-label={`Open audio guide: ${tour.title}`}
      >
        <div
          className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700 via-violet-600 to-fuchsia-500 text-2xl shadow-inner shadow-black/10 sm:size-[4.25rem] sm:text-[1.65rem]"
          aria-hidden
        >
          <span className="drop-shadow-sm">{tour.coverEmoji}</span>
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent" />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-[#0F172A] sm:text-base">
            {tour.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#64748B] sm:text-[13px]">{tour.subtitle}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-[#64748B] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 text-[#475569]">
              <MapPin className="size-2.5 shrink-0 text-violet-500" aria-hidden />
              {tour.city}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-2.5 shrink-0 text-violet-400" aria-hidden />
              {totalMins} min · {tour.stops.length} stops
            </span>
          </div>
        </div>
      </button>

      <div className="flex items-center justify-between gap-2 border-t border-gray-50/90 bg-gradient-to-b from-white to-[#FAFAFF] px-3 py-2.5 sm:px-3.5 sm:py-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
          className={cn(
            'inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors sm:min-h-0 sm:py-2.5',
            isPreviewing
              ? 'border-violet-300 bg-violet-50 text-violet-900'
              : 'border-violet-200/90 bg-white text-violet-800 hover:bg-violet-50',
          )}
          aria-pressed={isPreviewing}
          aria-label={isPreviewing ? `Stop preview of ${tour.title}` : `Preview ${tour.title}`}
        >
          <Play className={cn('size-3 shrink-0', isPreviewing && 'fill-current')} aria-hidden />
          {isPreviewing ? 'Stop preview' : 'Preview'}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark();
          }}
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors',
            isBookmarked
              ? 'border-rose-200 bg-rose-50 text-rose-600'
              : 'border-gray-200 bg-white text-gray-400 hover:border-violet-200 hover:text-violet-600',
          )}
          aria-pressed={isBookmarked}
          aria-label={isBookmarked ? `Remove ${tour.title} from saved` : `Save ${tour.title}`}
        >
          <Heart
            className={cn('size-3', isBookmarked && 'fill-rose-500 text-rose-500')}
            strokeWidth={1.75}
          />
        </button>
      </div>
    </article>
  );
}
