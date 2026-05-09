import { MapPin, Calendar, Clock, Plus, ReceiptIndianRupee, StickyNote, Check } from 'lucide-react';
import { useState } from 'react';
import { ScreenHero } from '../components/commonComponents';
import { PAGE_PAD_X } from '../shellLayout';

export type SavedTripCard = {
  id: number;
  city: string;
  dates: string;
  places: number;
};

export type TripsPageProps = {
  onOpenTripExpenses?: (trip: SavedTripCard) => void;
};

export default function TripsPage({ onOpenTripExpenses }: TripsPageProps) {
  const [activeTab, setActiveTab] = useState<'graph' | 'saved'>('graph');
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const journeyGraph = {
    trip: 'Varanasi Heritage Tour',
    date: 'April 15-17, 2026',
    currentDay: 2,
    nodes: [
      { id: 1, name: 'Kashi Vishwanath Temple', visited: true, day: 1, time: '6:00 AM', note: 'Amazing spiritual experience' },
      { id: 2, name: 'Dashashwamedh Ghat', visited: true, day: 1, time: '9:00 AM', note: '' },
      { id: 3, name: 'Manikarnika Ghat', visited: true, day: 1, time: '11:00 AM', note: 'Witnessed ancient rituals' },
      { id: 4, name: 'Sarnath', visited: true, day: 1, time: '3:00 PM', note: '' },
      { id: 5, name: 'BHU', visited: true, day: 2, time: '8:00 AM', note: 'Beautiful campus' },
      { id: 6, name: 'Ramnagar Fort', visited: false, day: 2, time: '11:00 AM', current: true, note: '' },
      { id: 7, name: 'Local Market', visited: false, day: 2, time: '2:00 PM', note: '' },
      { id: 8, name: 'Assi Ghat Aarti', visited: false, day: 2, time: '6:00 PM', note: '' }
    ]
  };

  const savedTrips = [
    {
      id: 1,
      city: 'Varanasi',
      dates: 'April 15-17, 2026',
      status: 'In Progress',
      places: 12,
      guide: 'Rajesh Kumar',
      image: '🕉️'
    },
    {
      id: 2,
      city: 'Agra',
      dates: 'March 10-12, 2026',
      status: 'Completed',
      places: 8,
      guide: 'Priya Singh',
      image: '🕌'
    },
    {
      id: 3,
      city: 'Jaipur',
      dates: 'Planned for May 2026',
      status: 'Upcoming',
      places: 15,
      guide: 'Not booked',
      image: '🏰'
    }
  ];

  const getNodePosition = (index: number, total: number) => {
    const radius = 100;
    const centerX = 150;
    const centerY = 150;
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;

    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  return (
    <div className="min-h-full bg-white">
      <ScreenHero
        className="rounded-b-3xl pb-6 pt-10 sm:pt-12"
        title="My Trips"
        subtitle="Track your journeys and saved plans"
        hideTitleFromLg
      />

      <div className={`border-b border-gray-200 py-4 ${PAGE_PAD_X}`}>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('graph')}
            className={`pb-2 px-1 transition-all ${
              activeTab === 'graph'
                ? 'text-[#1E3A8A] border-b-2 border-[#1E3A8A]'
                : 'text-[#6B7280]'
            }`}
          >
            Journey Graph
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-2 px-1 transition-all ${
              activeTab === 'saved'
                ? 'text-[#1E3A8A] border-b-2 border-[#1E3A8A]'
                : 'text-[#6B7280]'
            }`}
          >
            Saved Trips
          </button>
        </div>
      </div>

      {activeTab === 'graph' ? (
        <div className={`py-6 ${PAGE_PAD_X}`}>
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] p-5 text-white md:p-6">
            <h2 className="text-lg mb-1">{journeyGraph.trip}</h2>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{journeyGraph.date}</span>
              </div>
              <span>•</span>
              <span>Day {journeyGraph.currentDay} of 3</span>
            </div>
          </div>

          {/* Graph Visualization */}
          <div className="mb-6 rounded-2xl bg-[#F9FAFB] p-4 sm:p-6">
            <div className="relative mx-auto aspect-square w-full max-w-[17.5rem] md:max-w-xs">
              <svg className="h-full w-full" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
                {/* Draw connections */}
                {journeyGraph.nodes.map((node, index) => {
                  if (index < journeyGraph.nodes.length - 1) {
                    const pos1 = getNodePosition(index, journeyGraph.nodes.length);
                    const pos2 = getNodePosition(index + 1, journeyGraph.nodes.length);
                    return (
                      <line
                        key={`line-${index}`}
                        x1={pos1.x}
                        y1={pos1.y}
                        x2={pos2.x}
                        y2={pos2.y}
                        stroke={node.visited ? '#3B82F6' : '#E5E7EB'}
                        strokeWidth="2"
                      />
                    );
                  }
                  return null;
                })}

                {/* Draw nodes */}
                {journeyGraph.nodes.map((node, index) => {
                  const pos = getNodePosition(index, journeyGraph.nodes.length);
                  return (
                    <g key={node.id}>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="16"
                        fill={node.current ? '#F97316' : node.visited ? '#3B82F6' : '#E5E7EB'}
                        onClick={() => setSelectedNode(node.id)}
                        className="cursor-pointer"
                      />
                      {node.visited && !node.current && (
                        <text
                          x={pos.x}
                          y={pos.y}
                          textAnchor="middle"
                          dy="5"
                          fill="white"
                          fontSize="14"
                        >
                          ✓
                        </text>
                      )}
                      {node.current && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="20"
                          fill="none"
                          stroke="#F97316"
                          strokeWidth="2"
                          className="animate-ping"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs sm:gap-6 md:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#3B82F6] rounded-full" />
                <span className="text-[#6B7280]">Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#F97316] rounded-full" />
                <span className="text-[#6B7280]">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#E5E7EB] rounded-full" />
                <span className="text-[#6B7280]">Upcoming</span>
              </div>
            </div>
          </div>

          {/* Places List */}
          <div>
            <h3 className="mb-4 text-base text-[#111827] md:text-lg">All Places</h3>
            <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 xl:grid-cols-3">
              {journeyGraph.nodes.map((node) => (
                <div
                  key={node.id}
                  className={`bg-white border rounded-2xl p-4 transition-all ${
                    selectedNode === node.id
                      ? 'border-[#3B82F6] shadow-lg'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        node.current
                          ? 'bg-[#F97316] text-white'
                          : node.visited
                          ? 'bg-[#3B82F6] text-white'
                          : 'bg-[#F9FAFB] text-[#6B7280]'
                      }`}
                    >
                      {node.visited ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <MapPin className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm text-[#111827]">{node.name}</h4>
                        <span className="text-xs bg-[#F9FAFB] text-[#6B7280] px-2 py-1 rounded-full">
                          Day {node.day}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-2">
                        <Clock className="w-3 h-3" />
                        <span>{node.time}</span>
                        {node.current && (
                          <>
                            <span>•</span>
                            <span className="text-[#F97316]">Currently Here</span>
                          </>
                        )}
                      </div>

                      {node.note && (
                        <div className="flex items-start gap-2 bg-[#F9FAFB] rounded-lg p-2 text-xs text-[#6B7280]">
                          <StickyNote className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>{node.note}</span>
                        </div>
                      )}

                      {!node.visited && !node.note && (
                        <button className="text-xs text-[#3B82F6] flex items-center gap-1 mt-1">
                          <Plus className="w-3 h-3" />
                          Add Note
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={`py-6 pb-8 ${PAGE_PAD_X}`}>
          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-5 md:space-y-0 xl:grid-cols-3">
            {savedTrips.map((trip) => (
              <div key={trip.id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-[#3B82F6] transition-all">
                <div className="flex gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    {trip.image}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base text-[#111827]">{trip.city}</h3>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full ${
                          trip.status === 'In Progress'
                            ? 'bg-[#F97316]/10 text-[#F97316]'
                            : trip.status === 'Completed'
                            ? 'bg-[#10B981]/10 text-[#10B981]'
                            : 'bg-[#3B82F6]/10 text-[#3B82F6]'
                        }`}
                      >
                        {trip.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <Calendar className="w-3 h-3" />
                      <span>{trip.dates}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-3 border-t border-gray-100 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-4 text-sm">
                    <div>
                      <p className="text-[#6B7280] text-xs mb-0.5">Places</p>
                      <p className="text-[#111827]">{trip.places}</p>
                    </div>
                    <div>
                      <p className="text-[#6B7280] text-xs mb-0.5">Guide</p>
                      <p className="text-[#111827]">{trip.guide}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {onOpenTripExpenses ? (
                      <button
                        type="button"
                        onClick={() =>
                          onOpenTripExpenses({
                            id: trip.id,
                            city: trip.city,
                            dates: trip.dates,
                            places: trip.places,
                          })
                        }
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#3B82F6] bg-[#EFF6FF] px-3 py-2 text-xs font-semibold text-[#1E3A8A] hover:bg-[#DBEAFE]"
                      >
                        <ReceiptIndianRupee className="size-3.5 shrink-0" aria-hidden />
                        Split costs
                      </button>
                    ) : null}
                    <button type="button" className="text-[#3B82F6] text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State for no trips */}
          {savedTrips.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#F9FAFB] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-[#6B7280]" />
              </div>
              <h3 className="text-base text-[#111827] mb-2">No Saved Trips</h3>
              <p className="text-sm text-[#6B7280] mb-6">Start planning your first adventure!</p>
              <button className="bg-[#1E3A8A] text-white px-6 py-3 rounded-full">
                Plan a Trip
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
