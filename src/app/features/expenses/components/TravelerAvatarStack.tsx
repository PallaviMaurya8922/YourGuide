import { cn } from '../../../components/ui/utils';

const PALETTES = [
  'bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]',
  'bg-gradient-to-br from-[#0D9488] to-[#14B8A6]',
  'bg-gradient-to-br from-[#C2410C] to-[#F97316]',
  'bg-gradient-to-br from-[#6B21A8] to-[#A855F7]',
];

export function TravelerAvatarStack({
  names,
  max = 4,
  className,
}: {
  names: string[];
  max?: number;
  className?: string;
}) {
  const shown = names.slice(0, max);
  const extra = names.length - shown.length;

  return (
    <div className={cn('flex items-center', className)}>
      <div className="flex -space-x-2">
        {shown.map((name, i) => (
          <div
            key={`${name}-${i}`}
            title={name}
            className={cn(
              'flex size-9 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold text-white shadow-sm',
              PALETTES[i % PALETTES.length],
            )}
          >
            {initials(name)}
          </div>
        ))}
      </div>
      {extra > 0 ? (
        <span className="ml-2 text-xs font-medium text-[#6B7280]">+{extra}</span>
      ) : null}
    </div>
  );
}

function initials(name: string) {
  const p = name.trim().split(/\s+/);
  if (p.length >= 2) return (p[0][0] + p[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
