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
          'flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:border-[#3B82F6]',
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
        'flex cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:border-[#3B82F6]',
        !interactive && 'cursor-default hover:border-gray-200',
      )}
    >
      <GuideAvatar image={image} size="md" />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h3 className="text-sm text-[#111827]">{name}</h3>
          <div className="flex shrink-0 items-center gap-1">
            <Star className="size-4 fill-[#F97316] text-[#F97316]" aria-hidden />
            <span className="text-sm text-[#111827]">{rating}</span>
          </div>
        </div>
        <p className="mb-2 text-xs text-[#6B7280]">
          {expertise} • {trips} trips
        </p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {languages.slice(0, 2).map((lang) => (
              <span key={lang} className="rounded-full bg-[#F9FAFB] px-2 py-1 text-xs text-[#6B7280]">
                {lang}
              </span>
            ))}
          </div>
          <span className="shrink-0 text-sm text-[#1E3A8A]">₹{pricePerHour}/hr</span>
        </div>
      </div>
    </div>
  );
}
