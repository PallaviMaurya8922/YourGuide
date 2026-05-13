import { Shield, Star } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../ui/utils';
import { InfoStatTile } from './InfoStatTile';

export type GuideProfileSummary = {
  name: string;
  image: ReactNode;
  expertise: string;
  verified?: boolean;
  rating: number;
  reviews: number;
  totalTrips: number;
  availability: string;
  responseTime: string;
};

export type GuideProfileSummaryCardProps = {
  guide: GuideProfileSummary;
  className?: string;
};

/**
 * Hero overlap card: avatar + identity + quick stats. Must sit in a parent with `relative z-10`.
 */
export function GuideProfileSummaryCard({ guide, className }: GuideProfileSummaryCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-200/60 bg-white/95 p-3 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.1)] ring-1 ring-gray-100/80 sm:p-4',
        className,
      )}
    >
      <div className="mb-3 flex flex-col gap-3 sm:mb-3.5 sm:flex-row sm:items-start sm:gap-3.5">
        <div
          className={cn(
            'mx-auto flex size-20 shrink-0 items-center justify-center rounded-xl border-2 border-white bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-[2.35rem] shadow-md shadow-blue-900/15 sm:mx-0 sm:size-[5.25rem] sm:rounded-2xl sm:text-[2.65rem]',
          )}
          aria-hidden={typeof guide.image === 'string'}
        >
          {guide.image}
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <div className="mb-0.5 flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
            <h1 className="text-lg font-semibold leading-tight tracking-tight text-[#111827] sm:text-xl">
              {guide.name}
            </h1>
            {guide.verified ? (
              <Shield className="size-[1.05rem] shrink-0 text-emerald-500 sm:size-4" strokeWidth={2.25} aria-label="Verified guide" />
            ) : null}
          </div>

          <p className="mb-1.5 text-[13px] leading-snug text-[#6B7280] sm:text-sm">{guide.expertise}</p>

          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 text-[13px] sm:justify-start sm:text-sm">
            <div className="flex items-center gap-0.5">
              <Star className="size-3.5 shrink-0 text-[#F97316] fill-[#F97316] sm:size-4" aria-hidden />
              <span className="font-semibold tabular-nums text-[#111827]">{guide.rating}</span>
            </div>
            <span className="text-[#9CA3AF]">({guide.reviews} reviews)</span>
            <span className="hidden text-[#D1D5DB] sm:inline" aria-hidden>
              ·
            </span>
            <span className="w-full text-center text-[#6B7280] sm:w-auto sm:text-left">{guide.totalTrips} trips</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        <InfoStatTile variant="success" label="Availability" value={guide.availability} compact />
        <InfoStatTile variant="info" label="Response Time" value={guide.responseTime} compact />
      </div>
    </div>
  );
}
