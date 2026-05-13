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
        'rounded-2xl border border-gray-100 bg-white p-4 shadow-lg sm:p-6',
        className,
      )}
    >
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div
          className={cn(
            'mx-auto flex size-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-5xl shadow-lg sm:mx-0 sm:size-28 sm:text-[3.25rem]',
          )}
          aria-hidden={typeof guide.image === 'string'}
        >
          {guide.image}
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <div className="mb-1 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h1 className="text-xl font-semibold text-[#111827] sm:text-2xl">{guide.name}</h1>
            {guide.verified ? (
              <Shield className="size-5 shrink-0 text-[#10B981]" aria-label="Verified guide" />
            ) : null}
          </div>

          <p className="mb-2 text-sm text-[#6B7280] sm:text-base">{guide.expertise}</p>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm sm:justify-start sm:text-base">
            <div className="flex items-center gap-1">
              <Star className="size-5 text-[#F97316] fill-[#F97316]" aria-hidden />
              <span className="font-medium text-[#111827]">{guide.rating}</span>
            </div>
            <span className="text-[#6B7280]">({guide.reviews} reviews)</span>
            <span className="hidden text-[#6B7280] sm:inline" aria-hidden>
              •
            </span>
            <span className="w-full text-center text-[#6B7280] sm:w-auto sm:text-left">
              {guide.totalTrips} trips
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <InfoStatTile variant="success" label="Availability" value={guide.availability} />
        <InfoStatTile variant="info" label="Response Time" value={guide.responseTime} />
      </div>
    </div>
  );
}
