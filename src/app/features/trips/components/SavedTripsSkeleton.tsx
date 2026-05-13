export function SavedTripsSkeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
        >
          <div className="flex gap-2.5 p-3 sm:gap-3 sm:p-3.5">
            <div className="size-12 shrink-0 animate-pulse rounded-xl bg-gray-200/80 sm:size-[3.25rem] sm:rounded-2xl" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="h-3.5 w-[42%] max-w-[130px] animate-pulse rounded-md bg-gray-200/80 sm:h-4" />
              <div className="h-2.5 w-[65%] max-w-[180px] animate-pulse rounded-md bg-gray-100 sm:h-3" />
            </div>
          </div>
          <div className="border-t border-gray-50 px-3 py-2 sm:px-3.5 sm:py-2.5">
            <div className="mb-1.5 h-2.5 w-full animate-pulse rounded bg-gray-100 sm:mb-2 sm:h-3" />
            <div className="h-1.5 w-full animate-pulse rounded-full bg-gray-100" />
          </div>
          <div className="flex gap-2 border-t border-gray-50 p-3 sm:p-3.5">
            <div className="h-9 flex-1 animate-pulse rounded-full bg-gray-100 sm:h-10" />
            <div className="h-9 flex-1 animate-pulse rounded-full bg-gray-100 sm:h-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
