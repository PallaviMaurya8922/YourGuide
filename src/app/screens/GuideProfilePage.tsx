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
import { PAGE_PAD_X } from '../shellLayout';

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
    'pb-[calc(5.25rem+env(safe-area-inset-bottom))] sm:pb-[calc(5.5rem+env(safe-area-inset-bottom))]';

  return (
    <div className={`min-h-full bg-[#F4F6F8] ${pageBottomPad}`}>
      <GradientPageHeader
        compact
        toolbar={
          <>
            <CircleIconButton density="compact" icon={ArrowLeft} label="Go back" onClick={onBack} />
            <CircleIconButton density="compact" icon={Heart} label="Save guide to favorites" />
          </>
        }
      />

      <div className={`relative z-10 -mt-11 sm:-mt-12 ${PAGE_PAD_X}`}>
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

      <div className="relative z-10 mx-auto w-full max-w-3xl pt-2 sm:pt-3 lg:max-w-4xl xl:max-w-5xl">
        <div className={`space-y-4 sm:space-y-5 ${PAGE_PAD_X}`}>
          <section className="pt-1">
            <SectionTitle>About</SectionTitle>
            <p className="text-[13px] leading-[1.55] text-[#64748B] sm:text-sm sm:leading-relaxed">{guide.bio}</p>
          </section>

          <section>
            <SectionTitle>Details</SectionTitle>
            <div className="divide-y divide-gray-100/80 overflow-hidden rounded-xl border border-gray-100/70 bg-white px-3 shadow-sm ring-1 ring-gray-100/40">
              <div className="py-2 sm:py-2">
                <DetailListRow
                  icon={Languages}
                  iconClassName="text-[#3B82F6]"
                  label="Languages"
                  value={guide.languages.join(', ')}
                />
              </div>
              <div className="py-2 sm:py-2">
                <DetailListRow
                  icon={MapPin}
                  iconClassName="text-[#EA580C]"
                  label="Based in"
                  value={guide.city}
                />
              </div>
              <div className="py-2 sm:py-2">
                <DetailListRow
                  icon={GraduationCap}
                  iconClassName="text-[#059669]"
                  label="Education"
                  value={guide.education}
                />
              </div>
              <div className="py-2 sm:py-2">
                <DetailListRow
                  icon={Briefcase}
                  iconClassName="text-[#64748B]"
                  label="Experience"
                  value={guide.experience}
                />
              </div>
            </div>
          </section>

          <section>
            <SectionTitle>Specializations</SectionTitle>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {guide.specializations.map((spec) => (
                <span
                  key={spec}
                  className="rounded-full border border-slate-200/70 bg-slate-50/90 px-2.5 py-1 text-[11px] font-medium leading-none text-slate-700 shadow-sm shadow-slate-900/[0.03] sm:px-3 sm:text-xs"
                >
                  {spec}
                </span>
              ))}
            </div>
          </section>

          <section className="pb-1">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 sm:mb-3">
              <SectionTitle className="mb-0">Reviews ({guide.reviews})</SectionTitle>
              <button
                type="button"
                className="text-[12px] font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8] sm:text-sm"
              >
                See all
              </button>
            </div>

            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
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
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl sm:rounded-3xl md:max-w-lg lg:max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 h-1 w-10 rounded-full bg-gray-300 mx-auto sm:hidden" />

            <h2 id="booking-modal-title" className="mb-3 text-lg font-semibold text-[#111827]">
              Request Booking
            </h2>

            <div className="mb-5 space-y-3">
              <div>
                <label htmlFor="booking-date" className="mb-1.5 block text-xs font-medium text-[#6B7280]">
                  Select Date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label htmlFor="booking-duration" className="mb-1.5 block text-xs font-medium text-[#6B7280]">
                  Duration (hours)
                </label>
                <select
                  id="booking-duration"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                  defaultValue="2 hours"
                >
                  <option>2 hours</option>
                  <option>4 hours</option>
                  <option>6 hours</option>
                  <option>8 hours</option>
                </select>
              </div>

              <div>
                <label htmlFor="booking-notes" className="mb-1.5 block text-xs font-medium text-[#6B7280]">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="booking-notes"
                  className="h-22 w-full resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                  placeholder="Any specific requirements or preferences..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="min-h-[42px] flex-1 rounded-full border border-gray-200 py-2.5 text-sm font-medium text-[#6B7280] transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="min-h-[42px] flex-1 rounded-full bg-[#1E3A8A] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1c3578]"
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
