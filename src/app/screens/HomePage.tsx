import { Search, MapPin, Users, Calendar, Headphones, Star, TrendingUp, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (screen: 'home' | 'explore' | 'planner' | 'trips' | 'profile') => void;
  onGuideClick: (guideId: string) => void;
}

export default function HomePage({ onNavigate, onGuideClick }: HomePageProps) {
  const popularCities = [
    { name: 'Varanasi', image: '🕉️', trips: '2.5k' },
    { name: 'Ayodhya', image: '🛕', trips: '1.8k' },
    { name: 'Agra', image: '🕌', trips: '3.2k' },
    { name: 'Jaipur', image: '🏰', trips: '2.9k' }
  ];

  const recommendedGuides = [
    { id: '1', name: 'Rajesh Kumar', rating: 4.9, languages: ['Hindi', 'English'], price: 400, image: '👨🏽', expertise: 'Heritage & Culture', trips: 150 },
    { id: '2', name: 'Priya Singh', rating: 4.8, languages: ['Hindi', 'English', 'Japanese'], price: 500, image: '👩🏽', expertise: 'Religious Tourism', trips: 120 },
    { id: '3', name: 'Amit Sharma', rating: 4.7, languages: ['Hindi', 'English', 'French'], price: 450, image: '👨🏽', expertise: 'Food & History', trips: 95 }
  ];

  const trendingPlaces = [
    { name: 'Kashi Vishwanath Temple', city: 'Varanasi', visitors: '5k+' },
    { name: 'Taj Mahal', city: 'Agra', visitors: '10k+' },
    { name: 'Ram Mandir', city: 'Ayodhya', visitors: '8k+' }
  ];

  return (
    <div className="min-h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="mb-6">
          <h1 className="text-white text-2xl mb-1">Hello, Jitendra 👋</h1>
          <p className="text-white/80 text-sm">Where do you want to explore today?</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-full px-4 py-3 flex items-center gap-3 shadow-lg">
          <Search className="w-5 h-5 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search cities, guides, or places..."
            className="flex-1 outline-none text-sm text-[#111827]"
          />
        </div>
      </div>

      {/* Popular Cities */}
      <div className="px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg text-[#111827]">Popular Cities</h2>
          <button className="text-[#3B82F6] text-sm">See All</button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {popularCities.map((city) => (
            <div key={city.name} className="flex-shrink-0 w-32">
              <div className="bg-gradient-to-br from-[#F9FAFB] to-white border border-gray-200 rounded-2xl p-4 text-center">
                <div className="text-4xl mb-2">{city.image}</div>
                <h3 className="text-sm text-[#111827] mb-1">{city.name}</h3>
                <p className="text-xs text-[#6B7280]">{city.trips} trips</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="px-5 mb-6">
        <div className="bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h3 className="text-white mb-1">Book a Local Guide</h3>
            <p className="text-white/90 text-xs mb-3">Explore like a local with verified experts</p>
            <button
              onClick={() => onNavigate('explore')}
              className="bg-white text-[#F97316] px-4 py-2 rounded-full text-sm"
            >
              Find Guides
            </button>
          </div>
          <Users className="w-16 h-16 text-white/20" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mb-6">
        <h2 className="text-lg text-[#111827] mb-4">Quick Actions</h2>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('explore')}
            className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-start hover:border-[#3B82F6] transition-all"
          >
            <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <h3 className="text-sm text-[#111827] mb-1">Book Guide</h3>
            <p className="text-xs text-[#6B7280]">Find local experts</p>
          </button>

          <button
            onClick={() => onNavigate('planner')}
            className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-start hover:border-[#3B82F6] transition-all"
          >
            <div className="w-10 h-10 bg-[#10B981]/10 rounded-xl flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5 text-[#10B981]" />
            </div>
            <h3 className="text-sm text-[#111827] mb-1">Plan Trip</h3>
            <p className="text-xs text-[#6B7280]">Smart itineraries</p>
          </button>

          <button className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-start hover:border-[#3B82F6] transition-all">
            <div className="w-10 h-10 bg-[#F97316]/10 rounded-xl flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5 text-[#F97316]" />
            </div>
            <h3 className="text-sm text-[#111827] mb-1">Explore Nearby</h3>
            <p className="text-xs text-[#6B7280]">Discover places</p>
          </button>

          <button className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-start hover:border-[#3B82F6] transition-all opacity-50">
            <div className="w-10 h-10 bg-[#6B7280]/10 rounded-xl flex items-center justify-center mb-3">
              <Headphones className="w-5 h-5 text-[#6B7280]" />
            </div>
            <h3 className="text-sm text-[#111827] mb-1">Audio Guide</h3>
            <p className="text-xs text-[#6B7280]">Coming soon</p>
          </button>
        </div>
      </div>

      {/* Recommended Guides */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg text-[#111827]">Recommended Guides</h2>
          <button
            onClick={() => onNavigate('explore')}
            className="text-[#3B82F6] text-sm flex items-center gap-1"
          >
            See All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {recommendedGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => onGuideClick(guide.id)}
              className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:border-[#3B82F6] transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                {guide.image}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm text-[#111827]">{guide.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#F97316] fill-[#F97316]" />
                    <span className="text-sm text-[#111827]">{guide.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-[#6B7280] mb-2">{guide.expertise} • {guide.trips} trips</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {guide.languages.slice(0, 2).map((lang) => (
                      <span key={lang} className="text-xs bg-[#F9FAFB] text-[#6B7280] px-2 py-1 rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-[#1E3A8A]">₹{guide.price}/hr</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Places */}
      <div className="px-5 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg text-[#111827]">Trending Places</h2>
        </div>

        <div className="space-y-3">
          {trendingPlaces.map((place) => (
            <div key={place.name} className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm text-[#111827] mb-1">{place.name}</h3>
                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                  <MapPin className="w-3 h-3" />
                  <span>{place.city}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#10B981]">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs">{place.visitors}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
