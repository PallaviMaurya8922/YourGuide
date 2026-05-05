import { ArrowLeft, Star, MapPin, Languages, GraduationCap, Briefcase, Shield, Clock, Heart } from 'lucide-react';
import { useState } from 'react';

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
    responseTime: '< 1 hour'
  };

  const reviews = [
    {
      id: 1,
      name: 'Amit Patel',
      rating: 5,
      date: 'April 2026',
      comment: 'Rajesh was an excellent guide! His knowledge of Varanasi\'s history is incredible. Highly recommended for first-time visitors.',
      verified: true
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      rating: 5,
      date: 'March 2026',
      comment: 'Amazing experience! Rajesh showed us hidden gems that we would have never found on our own. Very professional and friendly.',
      verified: true
    },
    {
      id: 3,
      name: 'Priya Sharma',
      rating: 4,
      date: 'March 2026',
      comment: 'Good guide with excellent local knowledge. Would have preferred a bit more time at each location, but overall great experience.',
      verified: true
    }
  ];

  return (
    <div className="min-h-full bg-white">
      {/* Header Image */}
      <div className="relative bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] h-48">
        <button
          onClick={onBack}
          className="absolute top-12 left-5 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button className="absolute top-12 right-5 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Card */}
      <div className="px-5 -mt-16 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
          <div className="flex gap-4 mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-2xl flex items-center justify-center text-5xl flex-shrink-0 border-4 border-white shadow-lg">
              {guide.image}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl text-[#111827]">{guide.name}</h1>
                {guide.verified && (
                  <Shield className="w-5 h-5 text-[#10B981]" />
                )}
              </div>

              <p className="text-sm text-[#6B7280] mb-2">{guide.expertise}</p>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-[#F97316] fill-[#F97316]" />
                  <span className="text-base text-[#111827]">{guide.rating}</span>
                </div>
                <span className="text-sm text-[#6B7280]">({guide.reviews} reviews)</span>
                <span className="text-sm text-[#6B7280]">• {guide.totalTrips} trips</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#10B981]/10 rounded-xl px-3 py-2">
              <p className="text-xs text-[#10B981] mb-0.5">Availability</p>
              <p className="text-sm text-[#111827]">{guide.availability}</p>
            </div>
            <div className="bg-[#3B82F6]/10 rounded-xl px-3 py-2">
              <p className="text-xs text-[#3B82F6] mb-0.5">Response Time</p>
              <p className="text-sm text-[#111827]">{guide.responseTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="px-5 mb-6">
        <h2 className="text-base text-[#111827] mb-3">About</h2>
        <p className="text-sm text-[#6B7280] leading-relaxed">{guide.bio}</p>
      </div>

      {/* Details */}
      <div className="px-5 mb-6">
        <h2 className="text-base text-[#111827] mb-3">Details</h2>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F9FAFB] rounded-xl flex items-center justify-center">
              <Languages className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#6B7280] mb-0.5">Languages</p>
              <p className="text-sm text-[#111827]">{guide.languages.join(', ')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F9FAFB] rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#F97316]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#6B7280] mb-0.5">Based in</p>
              <p className="text-sm text-[#111827]">{guide.city}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F9FAFB] rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#10B981]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#6B7280] mb-0.5">Education</p>
              <p className="text-sm text-[#111827]">{guide.education}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F9FAFB] rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-[#6B7280]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#6B7280] mb-0.5">Experience</p>
              <p className="text-sm text-[#111827]">{guide.experience}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div className="px-5 mb-6">
        <h2 className="text-base text-[#111827] mb-3">Specializations</h2>
        <div className="flex flex-wrap gap-2">
          {guide.specializations.map((spec) => (
            <span key={spec} className="bg-[#3B82F6]/10 text-[#1E3A8A] px-3 py-2 rounded-full text-sm">
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base text-[#111827]">Reviews ({guide.reviews})</h2>
          <button className="text-sm text-[#3B82F6]">See All</button>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-[#F9FAFB] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-full" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm text-[#111827]">{review.name}</p>
                      {review.verified && (
                        <Shield className="w-3 h-3 text-[#10B981]" />
                      )}
                    </div>
                    <p className="text-xs text-[#6B7280]">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#F97316] fill-[#F97316]" />
                  <span className="text-sm text-[#111827]">{review.rating}</span>
                </div>
              </div>
              <p className="text-sm text-[#6B7280]">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-5 py-4 safe-area-inset-bottom">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-[#6B7280]">Hourly Rate</p>
            <p className="text-2xl text-[#1E3A8A]">₹{guide.price}</p>
          </div>
          <button
            onClick={() => setShowBookingModal(true)}
            className="bg-[#1E3A8A] text-white px-8 py-3 rounded-full hover:bg-[#1E3A8A]/90 transition-all"
          >
            Book Guide
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 max-w-md mx-auto">
          <div className="bg-white rounded-t-3xl w-full p-6 safe-area-inset-bottom">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

            <h2 className="text-xl text-[#111827] mb-4">Request Booking</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-[#6B7280] mb-2 block">Select Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-[#6B7280] mb-2 block">Duration (hours)</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
                  <option>2 hours</option>
                  <option>4 hours</option>
                  <option>6 hours</option>
                  <option>8 hours</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-[#6B7280] mb-2 block">Special Requests (Optional)</label>
                <textarea
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm h-24 resize-none"
                  placeholder="Any specific requirements or preferences..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 border border-gray-200 text-[#6B7280] py-3 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-[#1E3A8A] text-white py-3 rounded-full"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
