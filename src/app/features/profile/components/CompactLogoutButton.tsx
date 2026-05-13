import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

export function CompactLogoutButton({ onClick }: { onClick?: () => void }) {
  return (
    <div className="flex justify-center">
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-[12px] font-medium text-[#6B7280] shadow-sm transition-colors hover:border-gray-300 hover:bg-[#F9FAFB] hover:text-[#374151]"
      >
        <LogOut className="size-3.5" strokeWidth={2} aria-hidden />
        Log out
      </motion.button>
    </div>
  );
}
