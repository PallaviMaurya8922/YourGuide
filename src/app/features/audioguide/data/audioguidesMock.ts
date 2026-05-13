export type AudioguideStop = {
  id: string;
  order: number;
  title: string;
  durationMins: number;
  /** Full text read by device narration when no `sampleAudioUrl` */
  narration: string;
  /** Optional hosted clip (falls back to narration on error) */
  sampleAudioUrl?: string;
};

export type AudioguideTour = {
  id: string;
  city: string;
  title: string;
  subtitle: string;
  coverEmoji: string;
  language: string;
  stops: AudioguideStop[];
};

export const AUDIOGUIDE_TOURS: AudioguideTour[] = [
  {
    id: 'varanasi-ghats',
    city: 'Varanasi',
    title: 'Ghats at dawn',
    subtitle: 'Riverside rituals, boats, and old lanes',
    coverEmoji: '🕉️',
    language: 'English · Hindi cues',
    stops: [
      {
        id: 'v1',
        order: 1,
        title: 'Dashashwamedh Ghat',
        durationMins: 4,
        narration:
          'Welcome to Dashashwamedh Ghat, one of the busiest and most dramatic ghats on the Ganges. Morning prayers and evening aarti draw pilgrims from across the world. Stand upstream a little for the best sound of bells and conches.',
      },
      {
        id: 'v2',
        order: 2,
        title: 'Manikarnika Ghat',
        durationMins: 5,
        narration:
          'Manikarnika is one of the oldest cremation ghats. Move respectfully, keep voices low, and avoid photography. The smoke you see carries deep meaning for families here—observe quietly from a distance.',
      },
      {
        id: 'v3',
        order: 3,
        title: 'Assi Ghat & sunrise boats',
        durationMins: 6,
        narration:
          'Assi marks where the river meets a historic creek. Boats leave before sunrise; negotiate politely and wear layers—the breeze is cool. Listen for oars and temple bells as the sky turns pink.',
      },
      {
        id: 'v4',
        order: 4,
        title: 'Kashi Vishwanath lane',
        durationMins: 7,
        narration:
          'The lanes around the temple are narrow and lively—watch your step, secure valuables, and follow local dress guidance. Small shops sell prasad and flowers; keep to the right when crowds thicken.',
      },
    ],
  },
  {
    id: 'agra-icons',
    city: 'Agra',
    title: 'Icons of Agra',
    subtitle: 'Taj timing, fort views, and old city bites',
    coverEmoji: '🕌',
    language: 'English',
    stops: [
      {
        id: 'a1',
        order: 1,
        title: 'Taj Mahal — sunrise approach',
        durationMins: 8,
        narration:
          'Arrive before gates open with tickets ready. Security is strict—small bags only. The marble changes colour with the sun; pause at the reflecting pool for symmetry photos before crowds build.',
      },
      {
        id: 'a2',
        order: 2,
        title: 'Agra Fort ramparts',
        durationMins: 6,
        narration:
          'From the fort you can spot the Taj in the haze. Walk the ramparts clockwise for shorter sun exposure in summer. Audio guides are available at the ticket counter if you want museum-style depth.',
      },
      {
        id: 'a3',
        order: 3,
        title: 'Old city snacks',
        durationMins: 5,
        narration:
          'Bedai kachori and jalebi are local breakfast classics. Choose busy stalls with high turnover, drink bottled water, and carry small change. End your loop back toward the station or your hotel route.',
      },
    ],
  },
  {
    id: 'jaipur-pink',
    city: 'Jaipur',
    title: 'Pink City sampler',
    subtitle: 'Gates, bazaars, and hill forts',
    coverEmoji: '🏰',
    language: 'English · Hindi cues',
    stops: [
      {
        id: 'j1',
        order: 1,
        title: 'Hawa Mahal façade',
        durationMins: 4,
        narration:
          'The Palace of Winds is best photographed from across the street in early light. The interior is compact—manage expectations and combine with the City Palace ticket if you plan a longer morning.',
      },
      {
        id: 'j2',
        order: 2,
        title: 'Johari Bazaar lanes',
        durationMins: 6,
        narration:
          'Jewellers and textile shops line tight lanes. Bargain politely, compare three shops before buying silver, and note that traffic includes two-wheelers—step into shop fronts when horns sound.',
      },
    ],
  },
];

export function getAudioguideTourById(id: string): AudioguideTour | undefined {
  return AUDIOGUIDE_TOURS.find((t) => t.id === id);
}

export function audioguideTotalMins(tour: AudioguideTour): number {
  return tour.stops.reduce((s, x) => s + x.durationMins, 0);
}
