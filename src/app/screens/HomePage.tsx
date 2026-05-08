import { ArrowRight, Calendar, Headphones, MapPin, TrendingUp, Users } from 'lucide-react';
import {
  GuideRowCard,
  PillSearchInput,
  PromoCalloutCard,
  ScreenHero,
  SectionHeaderRow,
} from '../components/commonComponents';

interface HomePageProps {
  onNavigate: (screen: 'home' | 'explore' | 'planner' | 'trips' | 'profile') => void;
  onGuideClick: (guideId: string) => void;
}

export default function HomePage({ onNavigate, onGuideClick }: HomePageProps) {
  const popularCities = [
    { name: 'Varanasi', image: '🕉️', trips: '2.5k' },
    { name: 'Ayodhya', image: '🛕', trips: '1.8k' },
    { name: 'Agra', image: '🕌', trips: '3.2k' },
    { name: 'Jaipur', image: '🏰', trips: '2.9k' },
  ];

  const recommendedGuides = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      rating: 4.9,
      languages: ['Hindi', 'English'],
      price: 400,
      image: '👨🏽',
      expertise: 'Heritage & Culture',
      trips: 150,
    },
    {
      id: '2',
      name: 'Priya Singh',
      rating: 4.8,
      languages: ['Hindi', 'English', 'Japanese'],
      price: 500,
      image: '👩🏽',
      expertise: 'Religious Tourism',
      trips: 120,
    },
    {
      id: '3',
      name: 'Amit Sharma',
      rating: 4.7,
      languages: ['Hindi', 'English', 'French'],
      price: 450,
      image: '👨🏽',
      expertise: 'Food & History',
      trips: 95,
    },
  ];

  const trendingPlaces = [
    { name: 'Kashi Vishwanath Temple', city: 'Varanasi', visitors: '5k+' },
    { name: 'Taj Mahal', city: 'Agra', visitors: '10k+' },
    { name: 'Ram Mandir', city: 'Ayodhya', visitors: '8k+' },
  ];

  return (
    <div className="min-h-full bg-white">
      <ScreenHero
        className="px-5 pb-6 pt-10 sm:pb-8 sm:pt-12"
        title="Hello, Jitendra 👋"
        subtitle="Where do you want to explore today?"
        titleSpacing="comfortable"
      >
        <PillSearchInput
          placeholder="Search cities, guides, or places..."
          aria-label="Search cities, guides, or places"
          wrapperClassName="shadow-lg"
        />
      </ScreenHero>

      <div className="px-5 py-6">
        <SectionHeaderRow
          title="Popular Cities"
          action={
            <button type="button" className="text-sm text-[#3B82F6]">
              See All
            </button>
          }
        />

        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
          {popularCities.map((city) => (
            <div key={city.name} className="w-32 shrink-0">
              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-[#F9FAFB] to-white p-4 text-center">
                <div className="mb-2 text-4xl">{city.image}</div>
                <h3 className="mb-1 text-sm text-[#111827]">{city.name}</h3>
                <p className="text-xs text-[#6B7280]">{city.trips} trips</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 px-5">
        <PromoCalloutCard
          title="Book a Local Guide"
          description="Explore like a local with verified experts"
          actionLabel="Find Guides"
          onAction={() => onNavigate('explore')}
          decoration={<Users className="size-16" aria-hidden />}
        />
      </div>

      <div className="mb-6 px-5">
        <h2 className="mb-4 text-lg text-[#111827]">Quick Actions</h2>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="flex flex-col items-start rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:border-[#3B82F6]"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/10">
              <Users className="h-5 w-5 text-[#3B82F6]" />
            </div>
            <h3 className="mb-1 text-sm text-[#111827]">Book Guide</h3>
            <p className="text-xs text-[#6B7280]">Find local experts</p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('planner')}
            className="flex flex-col items-start rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:border-[#3B82F6]"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#10B981]/10">
              <Calendar className="h-5 w-5 text-[#10B981]" />
            </div>
            <h3 className="mb-1 text-sm text-[#111827]">Plan Trip</h3>
            <p className="text-xs text-[#6B7280]">Smart itineraries</p>
          </button>

          <button
            type="button"
            className="flex flex-col items-start rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:border-[#3B82F6]"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316]/10">
              <MapPin className="h-5 w-5 text-[#F97316]" />
            </div>
            <h3 className="mb-1 text-sm text-[#111827]">Explore Nearby</h3>
            <p className="text-xs text-[#6B7280]">Discover places</p>
          </button>

          <button
            type="button"
            className="flex flex-col items-start rounded-2xl border border-gray-200 bg-white p-4 opacity-50 transition-all hover:border-[#3B82F6]"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#6B7280]/10">
              <Headphones className="h-5 w-5 text-[#6B7280]" />
            </div>
            <h3 className="mb-1 text-sm text-[#111827]">Audio Guide</h3>
            <p className="text-xs text-[#6B7280]">Coming soon</p>
          </button>
        </div>
      </div>

      <div className="mb-6 px-5">
        <SectionHeaderRow
          title="Recommended Guides"
          action={
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="flex items-center gap-1 text-sm text-[#3B82F6]"
            >
              See All <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          }
        />

        <div className="space-y-3">
          {recommendedGuides.map((guide) => (
            <GuideRowCard
              key={guide.id}
              variant="rich"
              name={guide.name}
              image={guide.image}
              rating={guide.rating}
              expertise={guide.expertise}
              trips={guide.trips}
              languages={guide.languages}
              pricePerHour={guide.price}
              onClick={() => onGuideClick(guide.id)}
            />
          ))}
        </div>
      </div>

      <div className="px-5 pb-8">
        <SectionHeaderRow title="Trending Places" />

        <div className="space-y-3">
          {trendingPlaces.map((place) => (
            <div
              key={place.name}
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div>
                <h3 className="mb-1 text-sm text-[#111827]">{place.name}</h3>
                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                  <MapPin className="h-3 w-3" aria-hidden />
                  <span>{place.city}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#10B981]">
                <TrendingUp className="h-4 w-4" aria-hidden />
                <span className="text-xs">{place.visitors}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
