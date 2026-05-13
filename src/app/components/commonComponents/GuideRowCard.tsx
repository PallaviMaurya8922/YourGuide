import { MapPin, Star } from 'lucide-react';
import { GuideAvatar } from './GuideAvatar';
import { cn } from '../ui/utils';

type GuideRowCardRich = {
  variant: 'rich';
  name: string;
  image: string;
  rating: number;
  expertise: string;
  trips: number;
  languages: string[];
  pricePerHour: number;
  onClick?: () => void;
};

type GuideRowCardSimple = {
  variant: 'simple';
  name: string;
  image: string;
  rating: number;
  city: string;
  onClick?: () => void;
};

export type GuideRowCardProps = GuideRowCardRich | GuideRowCardSimple;

export function GuideRowCard(props: GuideRowCardProps) {
  const { name, image, rating, onClick } = props;
  const interactive = Boolean(onClick);

  if (props.variant === 'simple') {
    const { city } = props;
    return (
      <div
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        onClick={onClick}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        className={cn(
          'flex cursor-pointer items-center gap-2.5 rounded-xl border border-gray-200 bg-white p-3 transition-all hover:border-[#3B82F6] sm:gap-3 sm:rounded-2xl sm:p-3.5 md:p-4',
          !interactive && 'cursor-default hover:border-gray-200',
        )}
      >
        <GuideAvatar image={image} size="sm" />
        <div className="min-w-0 flex-1">
          <h4 className="mb-0.5 text-sm text-[#111827]">{name}</h4>
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <MapPin className="size-3 shrink-0" aria-hidden />
            <span>{city}</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Star className="size-4 fill-[#F97316] text-[#F97316]" aria-hidden />
          <span className="text-sm text-[#111827]">{rating}</span>
        </div>
      </div>
    );
  }

  const { expertise, trips, languages, pricePerHour } = props;

  return (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-all hover:border-[#3B82F6] sm:gap-3.5 sm:rounded-2xl sm:p-3.5 md:gap-4 md:p-4',
        !interactive && 'cursor-default hover:border-gray-200',
      )}
    >
      <GuideAvatar image={image} size="md" />
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center justify-between gap-2 sm:mb-1">
          <h3 className="text-[13px] font-semibold text-[#111827] sm:text-sm">{name}</h3>
          <div className="flex shrink-0 items-center gap-1">
            <Star className="size-4 fill-[#F97316] text-[#F97316]" aria-hidden />
            <span className="text-sm text-[#111827]">{rating}</span>
          </div>
        </div>
        <p className="mb-1 text-[11px] leading-snug text-[#6B7280] sm:mb-1.5 sm:text-xs">
          {expertise} • {trips} trips
        </p>
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex flex-wrap gap-1">
            {languages.slice(0, 2).map((lang) => (
              <span
                key={lang}
                className="rounded-full bg-[#F9FAFB] px-1.5 py-0.5 text-[10px] text-[#6B7280] sm:px-2 sm:py-1 sm:text-xs"
              >
                {lang}
              </span>
            ))}
          </div>
          <span className="shrink-0 text-xs font-semibold text-[#1E3A8A] sm:text-sm">₹{pricePerHour}/hr</span>
        </div>
      </div>
    </div>
  );
}
