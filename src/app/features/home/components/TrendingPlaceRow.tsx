import { MapPin, TrendingUp } from 'lucide-react';
import { HOME_CARD_PAD } from '../homeTokens';

type TrendingPlaceRowProps = {
  name: string;
  city: string;
  visitors: string;
};

export function TrendingPlaceRow({ name, city, visitors }: TrendingPlaceRowProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border border-gray-100 bg-white shadow-sm ring-1 ring-gray-50 sm:rounded-2xl ${HOME_CARD_PAD}`}
    >
      <div className="min-w-0 pr-2">
        <h3 className="mb-0.5 truncate text-[12px] font-semibold leading-tight text-[#111827] sm:text-sm">{name}</h3>
        <div className="flex items-center gap-1 text-[11px] text-[#6B7280]">
          <MapPin className="size-3 shrink-0 text-[#9CA3AF]" aria-hidden />
          <span className="truncate">{city}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1 text-[#059669]">
        <TrendingUp className="size-3.5" strokeWidth={2.25} aria-hidden />
        <span className="text-[11px] font-semibold tabular-nums sm:text-xs">{visitors}</span>
      </div>
    </div>
  );
}
