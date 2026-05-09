import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export function ExpenseFAB({ onClick, label = 'Add expense' }: { onClick: () => void; label?: string }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="fixed z-40 flex size-14 items-center justify-center rounded-full bg-[#1E3A8A] text-white shadow-lg shadow-[#1E3A8A]/25"
      style={{
        bottom: 'calc(5.25rem + env(safe-area-inset-bottom))',
        right: 'max(1rem, env(safe-area-inset-right))',
      }}
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
    >
      <Plus className="size-7" strokeWidth={2.25} aria-hidden />
    </motion.button>
  );
}
