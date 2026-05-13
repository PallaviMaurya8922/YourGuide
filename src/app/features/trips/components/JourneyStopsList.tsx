import { motion } from 'framer-motion';
import { Check, Clock, MapPin, Plus, StickyNote } from 'lucide-react';
import type { JourneyNode } from '../data/tripsMock';
import { cn } from '../../../components/ui/utils';

export function JourneyStopsList({
  nodes,
  selectedNode,
  onSelectNode,
}: {
  nodes: JourneyNode[];
  selectedNode: number | null;
  onSelectNode: (id: number) => void;
}) {
  return (
    <div>
      <h3 className="mb-1.5 text-[13px] font-semibold text-[#111827] sm:mb-2 sm:text-sm">Stops on this trip</h3>
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2 xl:grid-cols-3">
        {nodes.map((node, index) => (
          <motion.button
            key={node.id}
            type="button"
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => onSelectNode(node.id)}
            className={cn(
              'w-full rounded-xl border bg-white p-2.5 text-left shadow-sm transition-all sm:rounded-2xl sm:p-3',
              selectedNode === node.id
                ? 'border-[#3B82F6] ring-1 ring-[#3B82F6]/20'
                : 'border-gray-100 hover:border-[#BFDBFE] hover:shadow-md',
            )}
          >
            <div className="flex gap-2 sm:gap-2.5">
              <div
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-lg sm:size-9 sm:rounded-xl',
                  node.current
                    ? 'bg-[#F97316] text-white'
                    : node.visited
                      ? 'bg-[#3B82F6] text-white'
                      : 'bg-[#F3F4F6] text-[#6B7280]',
                )}
              >
                {node.visited ? (
                  <Check className="size-3.5 sm:size-4" strokeWidth={2.5} aria-hidden />
                ) : (
                  <MapPin className="size-3.5 sm:size-4" aria-hidden />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-[13px] font-semibold leading-snug text-[#111827] sm:text-sm">{node.name}</h4>
                  <span className="shrink-0 rounded-full bg-[#F3F4F6] px-1.5 py-0.5 text-[9px] font-semibold text-[#6B7280] sm:px-2 sm:text-[10px]">
                    Day {node.day}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-[#6B7280] sm:mt-1.5 sm:gap-x-2 sm:text-xs">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3 shrink-0" aria-hidden />
                    {node.time}
                  </span>
                  {node.current ? (
                    <span className="font-medium text-[#EA580C]">You are here</span>
                  ) : null}
                </div>
                {node.note ? (
                  <div className="mt-1.5 flex items-start gap-1.5 rounded-md bg-[#F9FAFB] p-1.5 text-[11px] text-[#6B7280] sm:mt-2 sm:gap-2 sm:rounded-lg sm:p-2 sm:text-xs">
                    <StickyNote className="mt-0.5 size-3 shrink-0" aria-hidden />
                    <span>{node.note}</span>
                  </div>
                ) : null}
                {!node.visited && !node.note ? (
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-[#3B82F6] sm:mt-2 sm:text-xs">
                    <Plus className="size-3" aria-hidden />
                    Add note
                  </span>
                ) : null}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
