import {
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Heart,
  Languages,
  MapPin,
} from 'lucide-react';
import { useState } from 'react';
import {
  CircleIconButton,
  DetailListRow,
  GradientPageHeader,
  GuideProfileSummaryCard,
  GuideReviewCard,
  SectionTitle,
  StickyBookingBar,
} from '../components/commonComponents';

interface GuideProfilePageProps {
  guideId: string;
  onBack: () => void;
}

export default function GuideProfilePage({ guideId, onBack }: GuideProfilePageProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const guide = {
    id: guideId,
    name: 'Rajesh Kumar',
    rating: 4.9,
    reviews: 156,
    totalTrips: 150,
    languages: ['Hindi', 'English', 'Bengali'],
    price: 400,
    image: '👨🏽',
    expertise: 'Heritage & Culture',
    verified: true,
    education: 'BA in History, BHU',
    experience: '8+ years',
    city: 'Varanasi',
    bio: 'Passionate about sharing the rich cultural heritage of Varanasi. Born and raised in the holy city, I have deep knowledge of ancient temples, ghats, and local traditions.',
    specializations: ['Temple Tours', 'Ghat Walking', 'Historical Sites', 'Cultural Ceremonies'],
    availability: 'Available Today',
    responseTime: '< 1 hour',
  };

  const reviews = [
    {
      id: 1,
      name: 'Amit Patel',
      rating: 5,
      date: 'April 2026',
      comment:
        "Rajesh was an excellent guide! His knowledge of Varanasi's history is incredible. Highly recommended for first-time visitors.",
      verified: true,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      rating: 5,
      date: 'March 2026',
      comment:
        'Amazing experience! Rajesh showed us hidden gems that we would have never found on our own. Very professional and friendly.',
      verified: true,
    },
    {
      id: 3,
      name: 'Priya Sharma',
      rating: 4,
      date: 'March 2026',
      comment:
        'Good guide with excellent local knowledge. Would have preferred a bit more time at each location, but overall great experience.',
      verified: true,
    },
  ];

  const pageBottomPad =
    'pb-[calc(7.5rem+env(safe-area-inset-bottom))] sm:pb-[calc(8rem+env(safe-area-inset-bottom))]';

  return (
    <div className={`min-h-full bg-[#F9FAFB] ${pageBottomPad}`}>
      <GradientPageHeader
        toolbar={
          <>
            <CircleIconButton icon={ArrowLeft} label="Go back" onClick={onBack} />
            <CircleIconButton icon={Heart} label="Save guide to favorites" />
          </>
        }
      />

      {/* Explicit stacking so the summary card always paints above the gradient (fixes overlap glitches in scroll containers). */}
      <div className="relative z-10 -mt-14 px-4 sm:-mt-[4.25rem] sm:px-6">
        <GuideProfileSummaryCard
          guide={{
            name: guide.name,
            image: guide.image,
            expertise: guide.expertise,
            verified: guide.verified,
            rating: guide.rating,
            reviews: guide.reviews,
            totalTrips: guide.totalTrips,
            availability: guide.availability,
            responseTime: guide.responseTime,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full space-y-6 px-4 pt-2 sm:space-y-8 sm:px-6 sm:pt-4">
        <section>
          <SectionTitle>About</SectionTitle>
          <p className="text-sm leading-relaxed text-[#6B7280] sm:text-base">{guide.bio}</p>
        </section>

        <section>
          <SectionTitle>Details</SectionTitle>
          <div className="space-y-4 sm:space-y-5">
            <DetailListRow
              icon={Languages}
              iconClassName="text-[#3B82F6]"
              label="Languages"
              value={guide.languages.join(', ')}
            />
            <DetailListRow
              icon={MapPin}
              iconClassName="text-[#F97316]"
              label="Based in"
              value={guide.city}
            />
            <DetailListRow
              icon={GraduationCap}
              iconClassName="text-[#10B981]"
              label="Education"
              value={guide.education}
            />
            <DetailListRow
              icon={Briefcase}
              iconClassName="text-[#6B7280]"
              label="Experience"
              value={guide.experience}
            />
          </div>
        </section>

        <section>
          <SectionTitle>Specializations</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {guide.specializations.map((spec) => (
              <span
                key={spec}
                className="rounded-full bg-[#3B82F6]/10 px-3 py-2 text-sm text-[#1E3A8A] sm:px-4 sm:text-base"
              >
                {spec}
              </span>
            ))}
          </div>
        </section>

        <section className="pb-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <SectionTitle className="mb-0">Reviews ({guide.reviews})</SectionTitle>
            <button
              type="button"
              className="text-sm font-medium text-[#3B82F6] hover:text-[#1c3578] sm:text-base"
            >
              See All
            </button>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <GuideReviewCard
                key={review.id}
                name={review.name}
                rating={review.rating}
                date={review.date}
                comment={review.comment}
                verified={review.verified}
              />
            ))}
          </div>
        </section>
      </div>

      <StickyBookingBar
        priceDisplay={<span>₹{guide.price}</span>}
        actionLabel="Book Guide"
        onAction={() => setShowBookingModal(true)}
      />

      {showBookingModal ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
          role="presentation"
          onClick={() => setShowBookingModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 h-1 w-12 rounded-full bg-gray-300 mx-auto sm:hidden" />

            <h2 id="booking-modal-title" className="mb-4 text-xl font-semibold text-[#111827]">
              Request Booking
            </h2>

            <div className="mb-6 space-y-4">
              <div>
                <label htmlFor="booking-date" className="mb-2 block text-sm text-[#6B7280]">
                  Select Date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label htmlFor="booking-duration" className="mb-2 block text-sm text-[#6B7280]">
                  Duration (hours)
                </label>
                <select
                  id="booking-duration"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                  defaultValue="2 hours"
                >
                  <option>2 hours</option>
                  <option>4 hours</option>
                  <option>6 hours</option>
                  <option>8 hours</option>
                </select>
              </div>

              <div>
                <label htmlFor="booking-notes" className="mb-2 block text-sm text-[#6B7280]">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="booking-notes"
                  className="h-24 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm"
                  placeholder="Any specific requirements or preferences..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="min-h-[44px] flex-1 rounded-full border border-gray-200 py-3 text-[#6B7280] transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="min-h-[44px] flex-1 rounded-full bg-[#1E3A8A] py-3 text-white transition-colors hover:bg-[#1c3578]"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
