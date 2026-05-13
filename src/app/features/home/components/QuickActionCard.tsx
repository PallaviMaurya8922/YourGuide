import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../components/ui/utils';
import { HOME_CARD_PAD, HOME_ICON_INNER, HOME_ICON_WELL } from '../homeTokens';

type QuickActionCardProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  iconBgClass: string;
  iconClass: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function QuickActionCard({
  icon: Icon,
  title,
  subtitle,
  iconBgClass,
  iconClass,
  onClick,
  disabled,
}: QuickActionCardProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={cn(
        'flex h-full min-h-[4.75rem] flex-col items-start rounded-xl border bg-white text-left shadow-sm ring-1 ring-gray-100/80 sm:min-h-[5rem] sm:rounded-2xl',
        HOME_CARD_PAD,
        disabled
          ? 'cursor-not-allowed border-dashed border-gray-200 bg-[#FAFAFA] text-[#9CA3AF] ring-gray-100'
          : 'border-gray-100 transition-colors hover:border-[#BFDBFE] hover:ring-[#BFDBFE]/40 active:bg-[#FAFBFF]',
      )}
    >
      <div
        className={cn(
          HOME_ICON_WELL,
          'mb-1',
          disabled ? 'bg-gray-100 ring-1 ring-gray-200/80' : iconBgClass,
        )}
      >
        <Icon className={cn(HOME_ICON_INNER, disabled ? 'text-[#9CA3AF]' : iconClass)} strokeWidth={1.85} aria-hidden />
      </div>
      <h3 className={cn('mb-0.5 text-[12px] font-semibold leading-tight sm:text-[13px]', disabled ? 'text-[#9CA3AF]' : 'text-[#111827]')}>
        {title}
      </h3>
      <p className="text-[10px] font-medium leading-snug text-[#6B7280] sm:text-[11px]">{subtitle}</p>
    </motion.button>
  );
}
