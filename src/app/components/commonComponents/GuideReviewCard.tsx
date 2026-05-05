import { Shield, Star } from 'lucide-react';
import { cn } from '../ui/utils';

export type GuideReviewCardProps = {
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
  className?: string;
};

export function GuideReviewCard({
  name,
  rating,
  date,
  comment,
  verified,
  className,
}: GuideReviewCardProps) {
  return (
    <article className={cn('rounded-2xl bg-[#F9FAFB] p-4 sm:p-5', className)}>
      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div
            className="size-8 shrink-0 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] sm:size-9"
            aria-hidden
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-sm font-medium text-[#111827] sm:text-base">{name}</p>
              {verified ? (
                <Shield className="size-3 shrink-0 text-[#10B981] sm:size-3.5" aria-label="Verified" />
              ) : null}
            </div>
            <p className="text-xs text-[#6B7280]">{date}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Star className="size-4 text-[#F97316] fill-[#F97316]" aria-hidden />
          <span className="text-sm text-[#111827]">{rating}</span>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-[#6B7280] sm:text-base">{comment}</p>
    </article>
  );
}
