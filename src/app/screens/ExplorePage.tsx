import { useState } from 'react';
import { GuideExploreCard, type GuideExploreCardGuide } from '../components/commonComponents';
import { defaultGuideFilters, FiltersRow, GuidesExploreHeader, type GuideFiltersState } from '../features/explore';
import { PAGE_PAD_X } from '../shellLayout';

interface ExplorePageProps {
  onGuideClick: (guideId: string) => void;
}

export default function ExplorePage({ onGuideClick }: ExplorePageProps) {
  const [filters, setFilters] = useState<GuideFiltersState>(() => ({ ...defaultGuideFilters }));

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
      <GuidesExploreHeader />

      <FiltersRow city="Varanasi" filters={filters} onFiltersChange={setFilters} />

      <div className={`bg-[#F9FAFB] py-1.5 sm:py-2 ${PAGE_PAD_X}`}>
        <p className="text-xs text-[#6B7280] sm:text-sm md:text-base">
          {guides.length} verified guides available
        </p>
      </div>

      <div
        className={`grid min-w-0 grid-cols-1 gap-3 py-2 pb-6 sm:pb-7 md:grid-cols-2 md:py-3 md:pb-8 xl:grid-cols-3 [&>*]:min-w-0 ${PAGE_PAD_X}`}
      >
        {guides.map((guide) => (
          <GuideExploreCard key={guide.id} className="h-full" guide={guide} onSelect={onGuideClick} />
        ))}
      </div>
    </div>
  );
}
