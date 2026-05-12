import { motion } from 'framer-motion';
import { Check, MapPin } from 'lucide-react';
import type { JourneyNode } from '../data/tripsMock';
import { cn } from '../../../components/ui/utils';

export function JourneyPathVisualization({ nodes }: { nodes: JourneyNode[] }) {
  const visitedCount = nodes.filter((n) => n.visited).length;
  const progress = Math.round((visitedCount / nodes.length) * 100);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-2.5 shadow-sm sm:rounded-2xl sm:p-3">
      <div className="mb-2 flex items-center justify-between gap-2 sm:mb-3">
        <p className="text-[11px] font-medium text-[#6B7280] sm:text-xs">Route progress</p>
        <span className="text-[11px] font-semibold text-[#1E3A8A] sm:text-xs">{progress}%</span>
      </div>

      <div className="relative pb-1 sm:pb-2">
        <div className="pointer-events-none absolute left-3 right-3 top-4 h-0.5 bg-[#E5E7EB] sm:left-4 sm:right-4 sm:top-[18px]" />
        <motion.div
          className="pointer-events-none absolute left-3 top-4 h-0.5 max-w-[calc(100%-1.5rem)] bg-gradient-to-r from-[#3B82F6] to-[#1E3A8A] sm:left-4 sm:top-[18px] sm:max-w-[calc(100%-2rem)]"
          initial={{ width: 0 }}
          animate={{
            width:
              nodes.length < 2
                ? 0
                : `${Math.max(0, Math.min(100, ((visitedCount - 1) / (nodes.length - 1)) * 100))}%`,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 24 }}
        />

        <div className="relative flex gap-0 overflow-x-auto pb-0.5 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:pb-1">
          {nodes.map((node, index) => {
            return (
              <div
                key={node.id}
                className="flex min-w-[3.75rem] flex-1 flex-col items-center sm:min-w-[4.5rem]"
                style={{ flexBasis: `${100 / nodes.length}%` }}
              >
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.04, type: 'spring', stiffness: 380, damping: 22 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div
                    className={cn(
                      'flex size-7 items-center justify-center rounded-full border-2 shadow-sm sm:size-8',
                      node.current
                        ? 'border-[#FDBA74] bg-[#F97316] text-white ring-2 ring-[#FED7AA]'
                        : node.visited
                          ? 'border-[#93C5FD] bg-[#3B82F6] text-white'
                          : 'border-gray-200 bg-white text-[#9CA3AF]',
                    )}
                  >
                    {node.visited && !node.current ? (
                      <Check className="size-3 sm:size-3.5" strokeWidth={2.5} aria-hidden />
                    ) : (
                      <MapPin className="size-3 sm:size-3.5" aria-hidden />
                    )}
                  </div>
                  {node.current ? (
                    <motion.span
                      layoutId="pulse-ring"
                      className="pointer-events-none absolute top-0 size-7 rounded-full border-2 border-[#F97316] opacity-60 sm:size-8"
                      animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                    />
                  ) : null}
                </motion.div>
                <p
                  className="mt-1.5 line-clamp-2 w-full px-0.5 text-center text-[9px] font-medium leading-tight text-[#374151] sm:mt-2 sm:text-[11px]"
                  title={node.name}
                >
                  {node.name}
                </p>
                <span className="mt-0.5 text-[9px] text-[#9CA3AF]">D{node.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-1.5 text-center text-[9px] text-[#9CA3AF] sm:mt-2 sm:text-[10px]">
        Swipe horizontally on small screens to see all stops
      </p>
    </div>
  );
}
