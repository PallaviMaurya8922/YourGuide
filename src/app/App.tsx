import { useState } from 'react';
import { Home, Compass, Calendar, MapPin, User } from 'lucide-react';
import { MobileTabBar } from './components/commonComponents';
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

      {currentScreen !== 'guide-profile' && (
        <MobileTabBar
          className="max-w-md"
          items={[
            {
              id: 'home',
              label: 'Home',
              icon: Home,
              active: currentScreen === 'home',
              onClick: () => setCurrentScreen('home'),
            },
            {
              id: 'explore',
              label: 'Explore',
              icon: Compass,
              active: currentScreen === 'explore',
              onClick: () => setCurrentScreen('explore'),
            },
            {
              id: 'planner',
              label: 'Planner',
              icon: Calendar,
              active: currentScreen === 'planner',
              onClick: () => setCurrentScreen('planner'),
            },
            {
              id: 'trips',
              label: 'Trips',
              icon: MapPin,
              active: currentScreen === 'trips',
              onClick: () => setCurrentScreen('trips'),
            },
            {
              id: 'profile',
              label: 'Profile',
              icon: User,
              active: currentScreen === 'profile',
              onClick: () => setCurrentScreen('profile'),
            },
          ]}
        />
      )}
    </div>
  );
}