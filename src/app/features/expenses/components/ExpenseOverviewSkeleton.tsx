export function ExpenseOverviewSkeleton() {
  return (
    <div className="space-y-4 px-4 py-2">
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-2xl bg-gradient-to-r from-gray-100 via-gray-200/80 to-gray-100"
            style={{ backgroundSize: '200% 100%', animationDuration: '1.5s' }}
          />
        ))}
      </div>
      {[0, 1, 2].map((i) => (
        <div
          key={`row-${i}`}
          className="h-28 animate-pulse rounded-2xl border border-gray-100 bg-gray-100/90"
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
}
