import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Headphones, MapPin, Users } from 'lucide-react';
import { PAGE_PAD_X } from '../shellLayout';
import {
  CityCard,
  FeaturedGuideBanner,
  HomeHeader,
  HomeSearchBar,
  HomeSectionHeader,
  QuickActionCard,
  RecommendedGuideCard,
  TrendingPlaceRow,
} from '../features/home/components';
import { HOME_STACK } from '../features/home/homeTokens';

interface HomePageProps {
  onNavigate: (
    screen: 'home' | 'explore' | 'planner' | 'trips' | 'expenses' | 'profile' | 'audioguide',
  ) => void;
  onGuideClick: (guideId: string) => void;
}

const sectionMotion = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] },
};

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
    <div className="min-h-full bg-[#FAFAFA]">
      <HomeHeader title="Hello, Jitendra 👋" subtitle="Where do you want to explore today?">
        <HomeSearchBar placeholder="Search cities, guides, or places…" aria-label="Search cities, guides, or places" />
      </HomeHeader>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`${PAGE_PAD_X} pb-6 pt-3 sm:pb-8 sm:pt-3.5 ${HOME_STACK}`}
      >
        <motion.section {...sectionMotion} transition={{ ...sectionMotion.transition, delay: 0.02 }}>
          <HomeSectionHeader
            title="Popular cities"
            action={
              <button
                type="button"
                className="text-[12px] font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
              >
                See all
              </button>
            }
          />
          <div className="no-scrollbar -mx-0.5 flex gap-2 overflow-x-auto px-0.5 pb-0.5 sm:gap-2 md:grid md:grid-cols-4 md:gap-2 md:overflow-x-visible md:pb-0">
            {popularCities.map((city) => (
              <div key={city.name} className="w-[6.5rem] shrink-0 sm:w-[6.75rem] md:w-auto md:min-w-0">
                <CityCard name={city.name} emoji={city.image} tripsLabel={`${city.trips} trips`} />
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section {...sectionMotion} transition={{ ...sectionMotion.transition, delay: 0.05 }}>
          <FeaturedGuideBanner
            title="Book a local guide"
            description="Explore like a local with verified experts."
            actionLabel="Find guides"
            onAction={() => onNavigate('explore')}
          />
        </motion.section>

        <motion.section {...sectionMotion} transition={{ ...sectionMotion.transition, delay: 0.08 }}>
          <HomeSectionHeader title="Quick actions" />
          <div className="grid grid-cols-2 items-stretch gap-2 sm:gap-2.5 lg:grid-cols-4">
            <QuickActionCard
              icon={Users}
              title="Book guide"
              subtitle="Find local experts"
              iconBgClass="bg-[#3B82F6]/12 ring-1 ring-[#3B82F6]/15"
              iconClass="text-[#2563EB]"
              onClick={() => onNavigate('explore')}
            />
            <QuickActionCard
              icon={Calendar}
              title="Plan trip"
              subtitle="Smart itineraries"
              iconBgClass="bg-emerald-500/10 ring-1 ring-emerald-500/15"
              iconClass="text-emerald-600"
              onClick={() => onNavigate('planner')}
            />
            <QuickActionCard
              icon={MapPin}
              title="Explore nearby"
              subtitle="Discover places"
              iconBgClass="bg-orange-500/10 ring-1 ring-orange-500/15"
              iconClass="text-orange-600"
              onClick={() => onNavigate('explore')}
            />
            <QuickActionCard
              icon={Headphones}
              title="Audio guide"
              subtitle="Tours & photo narration"
              iconBgClass="bg-violet-500/10 ring-1 ring-violet-500/15"
              iconClass="text-violet-700"
              onClick={() => onNavigate('audioguide')}
            />
          </div>
        </motion.section>

        <motion.section {...sectionMotion} transition={{ ...sectionMotion.transition, delay: 0.1 }}>
          <HomeSectionHeader
            title="Recommended guides"
            action={
              <button
                type="button"
                onClick={() => onNavigate('explore')}
                className="inline-flex items-center gap-0.5 text-[12px] font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
              >
                See all
                <ArrowRight className="size-3.5" aria-hidden />
              </button>
            }
          />
          <div className="space-y-2 md:grid md:grid-cols-2 md:gap-2 md:space-y-0 lg:grid-cols-3 lg:gap-2.5">
            {recommendedGuides.map((guide) => (
              <RecommendedGuideCard
                key={guide.id}
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
        </motion.section>

        <motion.section {...sectionMotion} transition={{ ...sectionMotion.transition, delay: 0.12 }}>
          <HomeSectionHeader title="Trending places" />
          <div className="space-y-2 md:grid md:grid-cols-2 md:gap-2 md:space-y-0 lg:grid-cols-3 lg:gap-2.5">
            {trendingPlaces.map((place) => (
              <TrendingPlaceRow key={place.name} name={place.name} city={place.city} visitors={place.visitors} />
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
