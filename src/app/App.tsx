import { useState } from 'react';
import { Home, Compass, Calendar, MapPin, User } from 'lucide-react';
import HomePage from './screens/HomePage';
import ExplorePage from './screens/ExplorePage';
import PlannerPage from './screens/PlannerPage';
import TripsPage from './screens/TripsPage';
import ProfilePage from './screens/ProfilePage';
import GuideProfilePage from './screens/GuideProfilePage';

type Screen = 'home' | 'explore' | 'planner' | 'trips' | 'profile' | 'guide-profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);

  const navigateToGuideProfile = (guideId: string) => {
    setSelectedGuideId(guideId);
    setCurrentScreen('guide-profile');
  };

  const navigateBack = () => {
    setCurrentScreen('explore');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomePage onNavigate={setCurrentScreen} onGuideClick={navigateToGuideProfile} />;
      case 'explore':
        return <ExplorePage onGuideClick={navigateToGuideProfile} />;
      case 'planner':
        return <PlannerPage />;
      case 'trips':
        return <TripsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'guide-profile':
        return <GuideProfilePage guideId={selectedGuideId || ''} onBack={navigateBack} />;
      default:
        return <HomePage onNavigate={setCurrentScreen} onGuideClick={navigateToGuideProfile} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#F9FAFB] max-w-md mx-auto relative">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {currentScreen !== 'guide-profile' && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-4 py-3 safe-area-inset-bottom">
          <div className="flex items-center justify-around">
            <button
              onClick={() => setCurrentScreen('home')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                currentScreen === 'home' ? 'text-[#1E3A8A]' : 'text-[#6B7280]'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs">Home</span>
            </button>

            <button
              onClick={() => setCurrentScreen('explore')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                currentScreen === 'explore' ? 'text-[#1E3A8A]' : 'text-[#6B7280]'
              }`}
            >
              <Compass className="w-6 h-6" />
              <span className="text-xs">Explore</span>
            </button>

            <button
              onClick={() => setCurrentScreen('planner')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                currentScreen === 'planner' ? 'text-[#1E3A8A]' : 'text-[#6B7280]'
              }`}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-xs">Planner</span>
            </button>

            <button
              onClick={() => setCurrentScreen('trips')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                currentScreen === 'trips' ? 'text-[#1E3A8A]' : 'text-[#6B7280]'
              }`}
            >
              <MapPin className="w-6 h-6" />
              <span className="text-xs">Trips</span>
            </button>

            <button
              onClick={() => setCurrentScreen('profile')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                currentScreen === 'profile' ? 'text-[#1E3A8A]' : 'text-[#6B7280]'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}