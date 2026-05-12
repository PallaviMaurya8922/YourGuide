import { motion } from 'framer-motion';

export type ApplyFiltersButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
};

export function ApplyFiltersButton({
  onClick,
  disabled,
  label = 'Apply filters',
}: ApplyFiltersButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 450, damping: 28 }}
      className="w-full rounded-full bg-[#1E3A8A] py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#1E3A8A]/20 transition-opacity disabled:cursor-not-allowed disabled:opacity-50 sm:py-3"
    >
      {label}
    </motion.button>
  );
}
