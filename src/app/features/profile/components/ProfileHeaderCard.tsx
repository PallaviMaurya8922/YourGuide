import { motion } from 'framer-motion';
import { LogOut, ShieldCheck } from 'lucide-react';

export type ProfileHeaderCardProps = {
  name: string;
  email: string;
  avatar: string;
  verified: boolean;
  travelerTagline: string;
  onEditProfile?: () => void;
  onLogout?: () => void;
};

export function ProfileHeaderCard({
  name,
  email,
  avatar,
  verified,
  travelerTagline,
  onEditProfile,
  onLogout,
}: ProfileHeaderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white/95 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:rounded-[1.125rem]"
    >
      <div className="p-3 sm:p-3.5">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div
            className="flex size-[3rem] shrink-0 items-center justify-center rounded-[0.875rem] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-[1.35rem] shadow-md shadow-blue-900/15 ring-2 ring-white/90 sm:size-[3.25rem] sm:text-2xl"
            aria-hidden
          >
            {avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="truncate text-[15px] font-semibold leading-tight tracking-tight text-[#111827] sm:text-base">
                {name}
              </h2>
              {verified ? (
                <ShieldCheck
                  className="size-[1.05rem] shrink-0 text-emerald-500 sm:size-4"
                  strokeWidth={2.25}
                  aria-label="Verified account"
                />
              ) : null}
            </div>
            <p className="mt-1 truncate text-[12px] leading-snug text-[#6B7280]">{email}</p>
            <p className="mt-1 text-[11px] leading-snug text-[#9CA3AF]">{travelerTagline}</p>
          </div>
        </div>

        <div className="mt-3 flex items-stretch gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={onEditProfile}
            className="min-h-[40px] flex-1 rounded-full bg-[#1E3A8A] px-3 text-[12px] font-semibold text-white shadow-sm shadow-blue-900/20 transition-colors hover:bg-[#172554]"
          >
            Edit profile
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            className="inline-flex min-h-[40px] shrink-0 items-center justify-center gap-1 rounded-full border border-gray-200/90 bg-white/80 px-3 text-[12px] font-medium text-[#6B7280] transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-[#374151]"
          >
            <LogOut className="size-3.5 opacity-80" strokeWidth={2} aria-hidden />
            <span className="hidden xs:inline sm:inline">Log out</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
