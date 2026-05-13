import { Sparkles } from 'lucide-react';

export function TripsInsightBanner() {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-[#BFDBFE]/60 bg-gradient-to-r from-[#EFF6FF] to-white px-2.5 py-1.5 shadow-sm sm:items-center sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-[#E5E7EB] sm:size-8 sm:rounded-lg">
        <Sparkles className="size-3 text-[#3B82F6] sm:size-3.5" aria-hidden />
      </div>
      <div className="min-w-0 flex-1 leading-tight">
        <p className="text-[10px] font-semibold text-[#1E3A8A] sm:text-[11px]">This week</p>
        <p className="mt-0.5 text-[11px] leading-snug text-[#4B5563] sm:mt-0.5 sm:text-xs sm:leading-snug">
          Varanasi trip has 3 stops left today. Open Journey to see what&apos;s next.
        </p>
      </div>
    </div>
  );
}
