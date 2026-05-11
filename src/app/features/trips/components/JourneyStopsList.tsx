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
      <h3 className="mb-3 text-sm font-semibold text-[#111827]">Stops on this trip</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
              'w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition-all',
              selectedNode === node.id
                ? 'border-[#3B82F6] ring-1 ring-[#3B82F6]/20'
                : 'border-gray-100 hover:border-[#BFDBFE] hover:shadow-md',
            )}
          >
            <div className="flex gap-3">
              <div
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-xl',
                  node.current
                    ? 'bg-[#F97316] text-white'
                    : node.visited
                      ? 'bg-[#3B82F6] text-white'
                      : 'bg-[#F3F4F6] text-[#6B7280]',
                )}
              >
                {node.visited ? <Check className="size-5" aria-hidden /> : <MapPin className="size-5" aria-hidden />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold leading-snug text-[#111827]">{node.name}</h4>
                  <span className="shrink-0 rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[10px] font-semibold text-[#6B7280]">
                    Day {node.day}
                  </span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6B7280]">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3 shrink-0" aria-hidden />
                    {node.time}
                  </span>
                  {node.current ? (
                    <span className="font-medium text-[#EA580C]">You are here</span>
                  ) : null}
                </div>
                {node.note ? (
                  <div className="mt-2 flex items-start gap-2 rounded-lg bg-[#F9FAFB] p-2 text-xs text-[#6B7280]">
                    <StickyNote className="mt-0.5 size-3 shrink-0" aria-hidden />
                    <span>{node.note}</span>
                  </div>
                ) : null}
                {!node.visited && !node.note ? (
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#3B82F6]">
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
