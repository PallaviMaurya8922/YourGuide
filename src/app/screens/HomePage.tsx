import { ArrowRight, Calendar, Headphones, MapPin, TrendingUp, Users } from 'lucide-react';
import {
  GuideRowCard,
  PillSearchInput,
  PromoCalloutCard,
  ScreenHero,
  SectionHeaderRow,
} from '../components/commonComponents';
import { PAGE_PAD_X } from '../shellLayout';

interface HomePageProps {
  onNavigate: (screen: 'home' | 'explore' | 'planner' | 'trips' | 'expenses' | 'profile') => void;
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
        className="pt-7 pb-4 sm:pb-6 sm:pt-10"
        title="Hello, Jitendra 👋"
        subtitle="Where do you want to explore today?"
        titleSpacing="default"
        hideTitleFromLg
      >
        <PillSearchInput
          placeholder="Search cities, guides, or places..."
          aria-label="Search cities, guides, or places"
          wrapperClassName="shadow-lg"
        />
      </ScreenHero>

      <div className={`${PAGE_PAD_X} py-4 sm:py-5`}>
        <SectionHeaderRow
          title="Popular Cities"
          action={
            <button type="button" className="text-sm text-[#3B82F6]">
              See All
            </button>
          }
        />

        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1.5 sm:gap-2.5 sm:pb-2 md:grid md:grid-cols-4 md:gap-3 md:overflow-x-visible md:pb-0">
          {popularCities.map((city) => (
            <div key={city.name} className="w-[7.25rem] shrink-0 sm:w-28 md:w-auto md:min-w-0">
              <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-[#F9FAFB] to-white p-3 text-center sm:rounded-2xl sm:p-3.5 md:p-4">
                <div className="mb-1 text-3xl sm:mb-1.5 sm:text-4xl md:text-5xl">{city.image}</div>
                <h3 className="mb-0.5 text-xs font-medium text-[#111827] sm:text-sm md:text-base">{city.name}</h3>
                <p className="text-xs text-[#6B7280]">{city.trips} trips</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`mb-4 sm:mb-5 ${PAGE_PAD_X}`}>
        <PromoCalloutCard
          title="Book a Local Guide"
          description="Explore like a local with verified experts"
          actionLabel="Find Guides"
          onAction={() => onNavigate('explore')}
          decoration={<Users className="size-10 opacity-90 sm:size-12 md:size-14" aria-hidden />}
        />
      </div>

      <div className={`mb-4 sm:mb-5 ${PAGE_PAD_X}`}>
        <h2 className="mb-3 text-base font-semibold text-[#111827] sm:text-lg md:text-xl">Quick Actions</h2>

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-4 lg:gap-3">
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="flex flex-col items-start rounded-xl border border-gray-200 bg-white p-3 transition-all hover:border-[#3B82F6] sm:rounded-2xl sm:p-3.5 md:p-4"
          >
            <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-[#3B82F6]/10 sm:mb-2.5 sm:size-10 sm:rounded-xl md:size-11">
              <Users className="size-[18px] text-[#3B82F6] sm:size-5 md:size-[22px]" />
            </div>
            <h3 className="mb-0.5 text-xs font-semibold text-[#111827] sm:text-sm md:text-base">Book Guide</h3>
            <p className="text-[11px] text-[#6B7280] sm:text-xs">Find local experts</p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('planner')}
            className="flex flex-col items-start rounded-xl border border-gray-200 bg-white p-3 transition-all hover:border-[#3B82F6] sm:rounded-2xl sm:p-3.5 md:p-4"
          >
            <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-[#10B981]/10 sm:mb-2.5 sm:size-10 sm:rounded-xl md:size-11">
              <Calendar className="size-[18px] text-[#10B981] sm:size-5 md:size-[22px]" />
            </div>
            <h3 className="mb-0.5 text-xs font-semibold text-[#111827] sm:text-sm md:text-base">Plan Trip</h3>
            <p className="text-[11px] text-[#6B7280] sm:text-xs">Smart itineraries</p>
          </button>

          <button
            type="button"
            className="flex flex-col items-start rounded-xl border border-gray-200 bg-white p-3 transition-all hover:border-[#3B82F6] sm:rounded-2xl sm:p-3.5 md:p-4"
          >
            <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-[#F97316]/10 sm:mb-2.5 sm:size-10 sm:rounded-xl md:size-11">
              <MapPin className="size-[18px] text-[#F97316] sm:size-5 md:size-[22px]" />
            </div>
            <h3 className="mb-0.5 text-xs font-semibold text-[#111827] sm:text-sm md:text-base">Explore Nearby</h3>
            <p className="text-[11px] text-[#6B7280] sm:text-xs">Discover places</p>
          </button>

          <button
            type="button"
            className="flex flex-col items-start rounded-xl border border-gray-200 bg-white p-3 opacity-50 transition-all hover:border-[#3B82F6] sm:rounded-2xl sm:p-3.5 md:p-4"
          >
            <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-[#6B7280]/10 sm:mb-2.5 sm:size-10 sm:rounded-xl md:size-11">
              <Headphones className="size-[18px] text-[#6B7280] sm:size-5 md:size-[22px]" />
            </div>
            <h3 className="mb-0.5 text-xs font-semibold text-[#111827] sm:text-sm md:text-base">Audio Guide</h3>
            <p className="text-[11px] text-[#6B7280] sm:text-xs">Coming soon</p>
          </button>
        </div>
      </div>

      <div className={`mb-4 sm:mb-5 ${PAGE_PAD_X}`}>
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

        <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 lg:grid-cols-3">
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

      <div className={`${PAGE_PAD_X} pb-6 sm:pb-8`}>
        <SectionHeaderRow title="Trending Places" />

        <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 lg:grid-cols-3">
          {trendingPlaces.map((place) => (
            <div
              key={place.name}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 sm:rounded-2xl sm:p-3.5"
            >
              <div className="min-w-0 pr-2">
                <h3 className="mb-0.5 truncate text-xs font-semibold text-[#111827] sm:text-sm">{place.name}</h3>
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
