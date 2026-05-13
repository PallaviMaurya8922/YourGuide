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
      <div
        className={`flex-1 overflow-y-auto ${currentScreen === 'guide-profile' ? 'pb-2' : 'pb-16'}`}
      >
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {currentScreen !== 'guide-profile' && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto border-t border-gray-200 bg-white px-2 pb-[max(0.375rem,env(safe-area-inset-bottom))] pt-1.5">
          <div className="flex items-stretch justify-between gap-0.5">
            <button
              type="button"
              onClick={() => setCurrentScreen('home')}
              className={`flex min-h-[44px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1 transition-colors active:bg-gray-50 ${
                currentScreen === 'home' ? 'text-[#1E3A8A]' : 'text-[#6B7280]'
              }`}
            >
              <Home className="size-[1.125rem] shrink-0" strokeWidth={currentScreen === 'home' ? 2.25 : 2} />
              <span className="max-w-full truncate text-[10px] font-medium leading-none sm:text-[11px]">Home</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentScreen('explore')}
              className={`flex min-h-[44px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1 transition-colors active:bg-gray-50 ${
                currentScreen === 'explore' ? 'text-[#1E3A8A]' : 'text-[#6B7280]'
              }`}
            >
              <Compass className="size-[1.125rem] shrink-0" strokeWidth={currentScreen === 'explore' ? 2.25 : 2} />
              <span className="max-w-full truncate text-[10px] font-medium leading-none sm:text-[11px]">
                Explore
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentScreen('planner')}
              className={`flex min-h-[44px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1 transition-colors active:bg-gray-50 ${
                currentScreen === 'planner' ? 'text-[#1E3A8A]' : 'text-[#6B7280]'
              }`}
            >
              <Calendar className="size-[1.125rem] shrink-0" strokeWidth={currentScreen === 'planner' ? 2.25 : 2} />
              <span className="max-w-full truncate text-[10px] font-medium leading-none sm:text-[11px]">
                Planner
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentScreen('trips')}
              className={`flex min-h-[44px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1 transition-colors active:bg-gray-50 ${
                currentScreen === 'trips' ? 'text-[#1E3A8A]' : 'text-[#6B7280]'
              }`}
            >
              <MapPin className="size-[1.125rem] shrink-0" strokeWidth={currentScreen === 'trips' ? 2.25 : 2} />
              <span className="max-w-full truncate text-[10px] font-medium leading-none sm:text-[11px]">Trips</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentScreen('profile')}
              className={`flex min-h-[44px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1 transition-colors active:bg-gray-50 ${
                currentScreen === 'profile' ? 'text-[#1E3A8A]' : 'text-[#6B7280]'
              }`}
            >
              <User className="size-[1.125rem] shrink-0" strokeWidth={currentScreen === 'profile' ? 2.25 : 2} />
              <span className="max-w-full truncate text-[10px] font-medium leading-none sm:text-[11px]">
                Profile
              </span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}