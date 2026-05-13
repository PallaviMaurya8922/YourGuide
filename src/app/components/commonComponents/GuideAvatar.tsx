import { cn } from '../ui/utils';

export type GuideAvatarProps = {
  image: string;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses = {
  xxs: 'size-8 text-base leading-none rounded-md',
  xs: 'size-10 text-lg rounded-lg',
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
