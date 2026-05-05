import { MapPin, Calendar, Clock, Navigation, Plus, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function PlannerPage() {
  const [plannerState, setPlannerState] = useState<'input' | 'result'>('input');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDays, setSelectedDays] = useState('3');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = [
    { id: 'temples', label: 'Temples', icon: '🛕' },
    { id: 'food', label: 'Food', icon: '🍛' },
    { id: 'history', label: 'History', icon: '📜' },
    { id: 'culture', label: 'Culture', icon: '🎭' },
    { id: 'heritage', label: 'Heritage', icon: '🏛️' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'nature', label: 'Nature', icon: '🌳' }
  ];

  const itinerary = {
    city: 'Varanasi',
    days: 3,
    totalPlaces: 12,
    schedule: [
      {
        day: 1,
        title: 'Spiritual Heritage',
        places: [
          { name: 'Kashi Vishwanath Temple', time: '6:00 AM', duration: '2 hours', distance: 'Start' },
          { name: 'Dashashwamedh Ghat', time: '9:00 AM', duration: '1.5 hours', distance: '0.8 km' },
          { name: 'Manikarnika Ghat', time: '11:00 AM', duration: '1 hour', distance: '1.2 km' },
          { name: 'Lunch at Blue Lassi', time: '1:00 PM', duration: '1 hour', distance: '0.5 km' },
          { name: 'Sarnath', time: '3:00 PM', duration: '2 hours', distance: '10 km' }
        ]
      },
      {
        day: 2,
        title: 'Culture & History',
        places: [
          { name: 'Banaras Hindu University', time: '8:00 AM', duration: '2 hours', distance: 'Start' },
          { name: 'Ramnagar Fort', time: '11:00 AM', duration: '1.5 hours', distance: '14 km' },
          { name: 'Local Market Visit', time: '2:00 PM', duration: '2 hours', distance: '8 km' },
          { name: 'Ganga Aarti at Assi Ghat', time: '6:00 PM', duration: '1 hour', distance: '3 km' }
        ]
      },
      {
        day: 3,
        title: 'Hidden Gems',
        places: [
          { name: 'Tulsi Manas Temple', time: '7:00 AM', duration: '1 hour', distance: 'Start' },
          { name: 'Durga Temple', time: '9:00 AM', duration: '1 hour', distance: '2 km' },
          { name: 'Silk Weaving Workshop', time: '11:00 AM', duration: '2 hours', distance: '4 km' }
        ]
      }
    ]
  };

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const generatePlan = () => {
    if (selectedCity && selectedInterests.length > 0) {
      setPlannerState('result');
    }
  };

  if (plannerState === 'result') {
    return (
      <div className="min-h-full bg-white pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] px-5 pt-12 pb-6 rounded-b-3xl mb-6">
          <button
            onClick={() => setPlannerState('input')}
            className="text-white text-sm mb-4 flex items-center gap-1"
          >
            ← Back to Input
          </button>
          <h1 className="text-white text-2xl mb-1">Your Itinerary</h1>
          <p className="text-white/80 text-sm">{itinerary.city} • {itinerary.days} Days • {itinerary.totalPlaces} Places</p>
        </div>

        {/* Action Buttons */}
        <div className="px-5 mb-6 flex gap-3">
          <button className="flex-1 border border-[#3B82F6] text-[#3B82F6] py-2.5 rounded-full text-sm">
            Optimize Route
          </button>
          <button className="flex-1 border border-gray-200 text-[#6B7280] py-2.5 rounded-full text-sm">
            Edit Plan
          </button>
          <button className="flex-1 bg-[#1E3A8A] text-white py-2.5 rounded-full text-sm">
            Save
          </button>
        </div>

        {/* Day-wise Itinerary */}
        <div className="px-5 space-y-6">
          {itinerary.schedule.map((day) => (
            <div key={day.day}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-xl flex items-center justify-center text-white">
                  <span className="text-lg">Day {day.day}</span>
                </div>
                <div>
                  <h2 className="text-base text-[#111827]">{day.title}</h2>
                  <p className="text-xs text-[#6B7280]">{day.places.length} places</p>
                </div>
              </div>

              <div className="space-y-3">
                {day.places.map((place, index) => (
                  <div key={index} className="relative">
                    {index < day.places.length - 1 && (
                      <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-200" />
                    )}

                    <div className="bg-white border border-gray-200 rounded-2xl p-4 hover:border-[#3B82F6] transition-all">
                      <div className="flex gap-3">
                        <div className="w-12 h-12 bg-[#F9FAFB] rounded-xl flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-[#3B82F6]" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-sm text-[#111827] mb-1">{place.name}</h3>

                          <div className="flex items-center gap-3 text-xs text-[#6B7280] mb-2">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{place.time}</span>
                            </div>
                            <span>•</span>
                            <span>{place.duration}</span>
                            {place.distance !== 'Start' && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Navigation className="w-3 h-3" />
                                  <span>{place.distance}</span>
                                </div>
                              </>
                            )}
                          </div>

                          <button className="text-xs text-[#3B82F6] flex items-center gap-1">
                            View on Map
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade Banner */}
        <div className="mx-5 mt-6 bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-2xl p-5">
          <h3 className="text-white mb-1">Upgrade to Premium</h3>
          <p className="text-white/90 text-xs mb-3">Get dynamic route optimization, nearby suggestions, and more</p>
          <button className="bg-white text-[#F97316] px-4 py-2 rounded-full text-sm">
            Learn More
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] px-5 pt-12 pb-6 rounded-b-3xl mb-6">
        <h1 className="text-white text-2xl mb-1">Plan Your Trip</h1>
        <p className="text-white/80 text-sm">Create a smart itinerary in minutes</p>
      </div>

      {/* Input Form */}
      <div className="px-5 space-y-6">
        {/* City Selection */}
        <div>
          <label className="text-sm text-[#111827] mb-3 block">Select City</label>
          <div className="grid grid-cols-2 gap-3">
            {['Varanasi', 'Ayodhya', 'Agra', 'Jaipur'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`border rounded-2xl p-4 text-center transition-all ${
                  selectedCity === city
                    ? 'border-[#3B82F6] bg-[#3B82F6]/5'
                    : 'border-gray-200'
                }`}
              >
                <div className="text-3xl mb-2">
                  {city === 'Varanasi' ? '🕉️' : city === 'Ayodhya' ? '🛕' : city === 'Agra' ? '🕌' : '🏰'}
                </div>
                <span className="text-sm text-[#111827]">{city}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Number of Days */}
        <div>
          <label className="text-sm text-[#111827] mb-3 block">Number of Days</label>
          <div className="flex gap-3">
            {['1', '2', '3', '4', '5'].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDays(day)}
                className={`flex-1 border rounded-xl py-3 transition-all ${
                  selectedDays === day
                    ? 'border-[#3B82F6] bg-[#3B82F6]/5 text-[#3B82F6]'
                    : 'border-gray-200 text-[#6B7280]'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="text-sm text-[#111827] mb-3 block">Select Interests</label>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${
                  selectedInterests.includes(interest.id)
                    ? 'bg-[#1E3A8A] text-white'
                    : 'bg-[#F9FAFB] text-[#6B7280] border border-gray-200'
                }`}
              >
                <span>{interest.icon}</span>
                <span className="text-sm">{interest.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Budget Level */}
        <div>
          <label className="text-sm text-[#111827] mb-3 block">Budget Level</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'budget', label: 'Budget', icon: '💰' },
              { id: 'moderate', label: 'Moderate', icon: '💰💰' },
              { id: 'luxury', label: 'Luxury', icon: '💰💰💰' }
            ].map((budget) => (
              <button
                key={budget.id}
                className="border border-gray-200 rounded-xl p-3 text-center hover:border-[#3B82F6] transition-all"
              >
                <div className="text-xl mb-1">{budget.icon}</div>
                <span className="text-xs text-[#111827]">{budget.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePlan}
          disabled={!selectedCity || selectedInterests.length === 0}
          className={`w-full py-4 rounded-full text-white transition-all ${
            selectedCity && selectedInterests.length > 0
              ? 'bg-[#1E3A8A] hover:bg-[#1E3A8A]/90'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Generate Itinerary
        </button>

        {/* Info Box */}
        <div className="bg-[#F9FAFB] rounded-2xl p-4 border border-gray-200">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm text-[#111827] mb-1">Smart Planning</h3>
              <p className="text-xs text-[#6B7280]">Our AI optimizes routes based on distance, timing, and your interests to create the perfect itinerary.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
