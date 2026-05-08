import { Filter, Star, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  GuideExploreCard,
  PillSearchInput,
  ScreenHero,
  type GuideExploreCardGuide,
} from '../components/commonComponents';

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
    { id: 'top-rated', label: '4.5+', icon: Star },
  ];

  const guides: GuideExploreCardGuide[] = [
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
      description: 'Expert in Varanasi ghats and temple history with 8+ years experience',
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
      description: 'Specialized in spiritual tours and religious ceremonies',
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
      description: 'Food enthusiast sharing local cuisine and historical insights',
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
      description: 'Architecture graduate specializing in Mughal-era monuments',
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
      description: 'Born and raised local sharing authentic cultural experiences',
    },
  ];

  return (
    <div className="min-h-full bg-white">
      <ScreenHero title="Explore Guides" subtitle="Verified experts in Varanasi">
        <PillSearchInput placeholder="Name, language, expertise…" aria-label="Search guides" />
      </ScreenHero>

      <div className="border-b border-gray-200 px-4 py-2.5 sm:px-5 sm:py-3">
        <button type="button" className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6B7280]">Showing guides in</span>
            <span className="text-sm text-[#1E3A8A]">Varanasi</span>
          </div>
          <ChevronDown className="h-5 w-5 text-[#6B7280]" aria-hidden />
        </button>
      </div>

      <div className="border-b border-gray-200 px-4 py-2.5 sm:px-5 sm:py-3">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 sm:pb-2">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => {
                if (selectedFilters.includes(filter.id)) {
                  setSelectedFilters(selectedFilters.filter((f) => f !== filter.id));
                } else {
                  setSelectedFilters([...selectedFilters, filter.id]);
                }
              }}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-all ${
                selectedFilters.includes(filter.id) || filter.id === 'all'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'border border-gray-200 bg-[#F9FAFB] text-[#6B7280]'
              }`}
            >
              {filter.icon ? <filter.icon className="h-4 w-4" /> : null}
              <span>{filter.label}</span>
            </button>
          ))}
          <button
            type="button"
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-gray-200 bg-[#F9FAFB] px-4 py-2 text-sm text-[#6B7280]"
          >
            <Filter className="h-4 w-4" aria-hidden />
            More
          </button>
        </div>
      </div>

      <div className="bg-[#F9FAFB] px-4 py-2 sm:px-5 sm:py-2.5">
        <p className="text-sm text-[#6B7280]">{guides.length} verified guides available</p>
      </div>

      <div className="space-y-4 px-4 py-3 pb-8 sm:px-5 sm:py-4">
        {guides.map((guide) => (
          <GuideExploreCard key={guide.id} guide={guide} onSelect={onGuideClick} />
        ))}
      </div>
    </div>
  );
}
