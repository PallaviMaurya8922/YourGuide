export function SavedTripsSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
        >
          <div className="flex gap-3 p-4">
            <div className="size-14 shrink-0 animate-pulse rounded-2xl bg-gray-200/80" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-[42%] max-w-[140px] animate-pulse rounded-md bg-gray-200/80" />
              <div className="h-3 w-[65%] max-w-[200px] animate-pulse rounded-md bg-gray-100" />
            </div>
          </div>
          <div className="border-t border-gray-50 px-4 py-3">
            <div className="mb-2 h-3 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-2 w-full animate-pulse rounded-full bg-gray-100" />
          </div>
          <div className="flex gap-2 border-t border-gray-50 p-4">
            <div className="h-10 flex-1 animate-pulse rounded-full bg-gray-100" />
            <div className="h-10 flex-1 animate-pulse rounded-full bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
