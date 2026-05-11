export type TripStatus = 'In Progress' | 'Completed' | 'Upcoming';

export type JourneyNode = {
  id: number;
  name: string;
  visited: boolean;
  day: number;
  time: string;
  note: string;
  current?: boolean;
};

export type JourneyGraphMock = {
  trip: string;
  date: string;
  currentDay: number;
  totalDays: number;
  nodes: JourneyNode[];
};

export const JOURNEY_GRAPH_MOCK: JourneyGraphMock = {
  trip: 'Varanasi Heritage Tour',
  date: 'April 15–17, 2026',
  currentDay: 2,
  totalDays: 3,
  nodes: [
    {
      id: 1,
      name: 'Kashi Vishwanath Temple',
      visited: true,
      day: 1,
      time: '6:00 AM',
      note: 'Amazing spiritual experience',
    },
    { id: 2, name: 'Dashashwamedh Ghat', visited: true, day: 1, time: '9:00 AM', note: '' },
    { id: 3, name: 'Manikarnika Ghat', visited: true, day: 1, time: '11:00 AM', note: 'Witnessed ancient rituals' },
    { id: 4, name: 'Sarnath', visited: true, day: 1, time: '3:00 PM', note: '' },
    { id: 5, name: 'BHU', visited: true, day: 2, time: '8:00 AM', note: 'Beautiful campus' },
    { id: 6, name: 'Ramnagar Fort', visited: false, day: 2, time: '11:00 AM', current: true, note: '' },
    { id: 7, name: 'Local Market', visited: false, day: 2, time: '2:00 PM', note: '' },
    { id: 8, name: 'Assi Ghat Aarti', visited: false, day: 2, time: '6:00 PM', note: '' },
  ],
};

export type SavedTripMock = {
  id: number;
  city: string;
  dates: string;
  status: TripStatus;
  places: number;
  guide: string;
  image: string;
  travelerCount: number;
  /** 0–100 journey completion (demo) */
  journeyProgress: number;
  /** Shown when no linked split group exists yet */
  expensePreviewLabel: string;
  insight: string;
};

export const SAVED_TRIPS_MOCK: SavedTripMock[] = [
  {
    id: 1,
    city: 'Varanasi',
    dates: 'Apr 15–17, 2026',
    status: 'In Progress',
    places: 12,
    guide: 'Rajesh Kumar',
    image: '🕉️',
    travelerCount: 3,
    journeyProgress: 62,
    expensePreviewLabel: '₹9,000 shared · 2 expenses',
    insight: 'Next: evening aarti — leave buffer for ghats.',
  },
  {
    id: 2,
    city: 'Agra',
    dates: 'Mar 10–12, 2026',
    status: 'Completed',
    places: 8,
    guide: 'Priya Singh',
    image: '🕌',
    travelerCount: 4,
    journeyProgress: 100,
    expensePreviewLabel: '₹24,400 settled',
    insight: 'Great pace — Taj at sunrise was the highlight.',
  },
  {
    id: 3,
    city: 'Jaipur',
    dates: 'May 2026 (TBC)',
    status: 'Upcoming',
    places: 15,
    guide: 'Not booked',
    image: '🏰',
    travelerCount: 2,
    journeyProgress: 12,
    expensePreviewLabel: 'No splits yet',
    insight: 'Add a guide early — weekends fill fast.',
  },
];
