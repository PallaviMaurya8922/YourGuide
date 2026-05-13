import { motion } from 'framer-motion';
import { HOME_CARD_PAD } from '../homeTokens';

type CityCardProps = {
  name: string;
  emoji: string;
  tripsLabel: string;
  onClick?: () => void;
};

export function CityCard({ name, emoji, tripsLabel, onClick }: CityCardProps) {
  const body = (
    <>
      <div className="mb-1 text-2xl leading-none sm:text-[1.65rem]" aria-hidden>
        {emoji}
      </div>
      <h3 className="mb-0.5 truncate text-[11px] font-semibold leading-tight text-[#111827] sm:text-xs">{name}</h3>
      <p className="text-[10px] font-medium leading-tight text-[#6B7280] sm:text-[11px]">{tripsLabel}</p>
    </>
  );

  const shell = `${HOME_CARD_PAD} rounded-xl border border-gray-100/90 bg-gradient-to-b from-white to-[#F9FAFB] text-center shadow-sm ring-1 ring-gray-100/80 sm:rounded-2xl`;

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
        className={`block w-full ${shell} transition-colors hover:border-[#BFDBFE] hover:ring-[#BFDBFE]/50`}
      >
        {body}
      </motion.button>
    );
  }

  return <div className={shell}>{body}</div>;
}
