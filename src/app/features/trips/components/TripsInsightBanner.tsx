import { Sparkles } from 'lucide-react';

export function TripsInsightBanner() {
  return (
    <div className="flex gap-3 rounded-2xl border border-[#BFDBFE]/60 bg-gradient-to-r from-[#EFF6FF] to-white px-4 py-3 shadow-sm">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#E5E7EB]">
        <Sparkles className="size-4 text-[#3B82F6]" aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-[#1E3A8A]">This week</p>
        <p className="mt-0.5 text-xs leading-relaxed text-[#4B5563]">
          Varanasi trip has 3 stops left today. Open Journey to see what&apos;s next.
        </p>
      </div>
    </div>
  );
}
