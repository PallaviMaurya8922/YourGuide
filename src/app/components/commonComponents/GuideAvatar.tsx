import { cn } from '../ui/utils';

export type GuideAvatarProps = {
  image: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses = {
  sm: 'size-12 text-2xl rounded-xl',
  md: 'size-16 text-3xl rounded-2xl',
  lg: 'size-20 text-4xl rounded-2xl',
};

export function GuideAvatar({ image, size = 'md', className }: GuideAvatarProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]',
        sizeClasses[size],
        className,
      )}
      aria-hidden
    >
      {image}
    </div>
  );
}
