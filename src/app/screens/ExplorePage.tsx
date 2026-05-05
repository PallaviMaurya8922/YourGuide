import { Star, Filter, ChevronDown, Shield } from 'lucide-react';
import { useState } from 'react';
import { PillSearchInput } from '../components/commonComponents';

interface ExplorePageProps {
  onGuideClick: (guideId: string) => void;
}

export default function ExplorePage({ onGuideClick }: ExplorePageProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filterOptions = [
    { id: 'all', label: 'All Guides', icon: null },
    { id: 'hindi', label: 'Hindi', icon: null },
    { id: 'english', label: 'English', icon: null },
    { id: 'budget', label: '< ₹500', icon: null },
    { id: 'premium', label: '₹500+', icon: null },
    { id: 'top-rated', label: '4.5+', icon: Star }
  ];

  const guides = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      rating: 4.9,
      reviews: 156,
      languages: ['Hindi', 'English'],
      price: 400,
      image: '👨🏽',
      expertise: 'Heritage & Culture',
      verified: true,
      description: 'Expert in Varanasi ghats and temple history with 8+ years experience'
    },
    {
      id: '2',
      name: 'Priya Singh',
      rating: 4.8,
      reviews: 142,
      languages: ['Hindi', 'English', 'Japanese'],
      price: 500,
      image: '👩🏽',
      expertise: 'Religious Tourism',
      verified: true,
      description: 'Specialized in spiritual tours and religious ceremonies'
    },
    {
      id: '3',
      name: 'Amit Sharma',
      rating: 4.7,
      reviews: 98,
      languages: ['Hindi', 'English', 'French'],
      price: 450,
      image: '👨🏽',
      expertise: 'Food & History',
      verified: true,
      description: 'Food enthusiast sharing local cuisine and historical insights'
    },
    {
      id: '4',
      name: 'Sunita Verma',
      rating: 4.9,
      reviews: 203,
      languages: ['Hindi', 'English', 'German'],
      price: 550,
      image: '👩🏽',
      expertise: 'Art & Architecture',
      verified: true,
      description: 'Architecture graduate specializing in Mughal-era monuments'
    },
    {
      id: '5',
      name: 'Vikram Patel',
      rating: 4.6,
      reviews: 87,
      languages: ['Hindi', 'English', 'Spanish'],
      price: 350,
      image: '👨🏽',
      expertise: 'Local Culture',
      verified: true,
      description: 'Born and raised local sharing authentic cultural experiences'
    }
  ];

  return (
    <div className="min-h-full bg-white">
      {/* Hero: compact on phones, a bit roomier on larger widths */}
      <div className="rounded-b-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] px-4 pb-3 pt-[max(0.5rem,env(safe-area-inset-top))] sm:rounded-b-3xl sm:px-5 sm:pb-5 sm:pt-4">
        <div className="mb-2 sm:mb-3">
          <h1 className="text-lg font-semibold tracking-tight text-white sm:text-2xl">
            Explore Guides
          </h1>
          <p className="mt-0.5 text-xs leading-snug text-white/85 sm:mt-1 sm:text-sm">
            Verified experts in Varanasi
          </p>
        </div>

        <PillSearchInput
          placeholder="Name, language, expertise…"
          aria-label="Search guides"
        />
      </div>

      {/* City Selector */}
      <div className="border-b border-gray-200 px-4 py-2.5 sm:px-5 sm:py-3">
        <button className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6B7280]">Showing guides in</span>
            <span className="text-sm text-[#1E3A8A]">Varanasi</span>
          </div>
          <ChevronDown className="w-5 h-5 text-[#6B7280]" />
        </button>
      </div>

      {/* Filters */}
      <div className="border-b border-gray-200 px-4 py-2.5 sm:px-5 sm:py-3">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 sm:pb-2">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                if (selectedFilters.includes(filter.id)) {
                  setSelectedFilters(selectedFilters.filter(f => f !== filter.id));
                } else {
                  setSelectedFilters([...selectedFilters, filter.id]);
                }
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedFilters.includes(filter.id) || filter.id === 'all'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-[#F9FAFB] text-[#6B7280] border border-gray-200'
              }`}
            >
              {filter.icon && <filter.icon className="w-4 h-4" />}
              <span>{filter.label}</span>
            </button>
          ))}
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap bg-[#F9FAFB] text-[#6B7280] border border-gray-200">
            <Filter className="w-4 h-4" />
            More
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="bg-[#F9FAFB] px-4 py-2 sm:px-5 sm:py-2.5">
        <p className="text-sm text-[#6B7280]">{guides.length} verified guides available</p>
      </div>

      {/* Guide Cards */}
      <div className="space-y-4 px-4 py-3 pb-8 sm:px-5 sm:py-4">
        {guides.map((guide) => (
          <div
            key={guide.id}
            onClick={() => onGuideClick(guide.id)}
            className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-[#3B82F6] hover:shadow-lg transition-all"
          >
            <div className="flex gap-4 mb-3">
              <div className="w-20 h-20 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                {guide.image}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base text-[#111827]">{guide.name}</h3>
                    {guide.verified && (
                      <Shield className="w-4 h-4 text-[#10B981]" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#F97316] fill-[#F97316]" />
                    <span className="text-sm text-[#111827]">{guide.rating}</span>
                  </div>
                  <span className="text-xs text-[#6B7280]">({guide.reviews} reviews)</span>
                </div>

                <p className="text-xs text-[#6B7280]">{guide.expertise}</p>
              </div>
            </div>

            <p className="text-sm text-[#6B7280] mb-3 line-clamp-2">{guide.description}</p>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex gap-1.5 flex-wrap">
                {guide.languages.map((lang) => (
                  <span key={lang} className="text-xs bg-[#F9FAFB] text-[#6B7280] px-2.5 py-1 rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-base text-[#1E3A8A]">₹{guide.price}/hr</span>
                <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-full text-sm hover:bg-[#1E3A8A]/90 transition-all">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
