import { useState } from 'react';
import { Toaster } from 'sonner';
import { Home, Compass, Calendar, MapPin, User, ReceiptIndianRupee } from 'lucide-react';
import { DesktopTopNav, MobileTabBar } from './components/commonComponents';
import { useTripExpenses } from './context/TripExpensesContext';
import { cn } from './components/ui/utils';
import { SHELL_CONTAINER_CLASS, SHELL_MAX_WIDTH_CLASS } from './shellLayout';
import HomePage from './screens/HomePage';
import ExplorePage from './screens/ExplorePage';
import PlannerPage from './screens/PlannerPage';
import TripsPage from './screens/TripsPage';
import ProfilePage from './screens/ProfilePage';
import GuideProfilePage from './screens/GuideProfilePage';
import ExpenseSplitPage from './screens/ExpenseSplitPage';
import { stashPlannerItineraryResume } from './plannerItineraryResume';

type Screen =
  | 'home'
  | 'explore'
  | 'planner'
  | 'trips'
  | 'expenses'
  | 'profile'
  | 'guide-profile';

function headlineFor(screen: Screen) {
  switch (screen) {
    case 'home':
      return 'Hello, Jitendra 👋';
    case 'explore':
      return 'Explore Guides';
    case 'planner':
      return 'Plan Your Trip';
    case 'trips':
      return 'My Trips';
    case 'expenses':
      return 'Split Expenses';
    case 'profile':
      return 'Profile';
    case 'guide-profile':
      return 'Guide Profile';
    default:
      return 'Guide Connect';
  }
}

export default function App() {
  const { createTrip, getOrCreateTripForSavedTrip } = useTripExpenses();
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
        return (
          <PlannerPage
            onNavigateToSplit={(plan) => {
              createTrip(plan);
              setCurrentScreen('expenses');
            }}
          />
        );
      case 'trips':
        return (
          <TripsPage
            onPlanTrip={() => setCurrentScreen('planner')}
            onOpenTripExpenses={(trip) => {
              getOrCreateTripForSavedTrip(trip.id, {
                city: trip.city,
                dates: trip.dates,
                places: trip.places,
              });
              setCurrentScreen('expenses');
            }}
          />
        );
      case 'expenses':
        return (
          <ExpenseSplitPage
            onViewPlannedTrip={(snapshot) => {
              stashPlannerItineraryResume(snapshot);
              setCurrentScreen('planner');
            }}
          />
        );
      case 'profile':
        return <ProfilePage />;
      case 'guide-profile':
        return <GuideProfilePage guideId={selectedGuideId || ''} onBack={navigateBack} />;
      default:
        return <HomePage onNavigate={setCurrentScreen} onGuideClick={navigateToGuideProfile} />;
    }
  };

  return (
    <div className={`flex h-screen flex-col bg-[#F9FAFB] ${SHELL_CONTAINER_CLASS}`}>
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast: 'rounded-2xl border border-gray-100 shadow-lg',
            title: 'text-sm font-semibold text-[#111827]',
            description: 'text-xs text-[#6B7280]',
          },
        }}
      />
      <DesktopTopNav
        headline={headlineFor(currentScreen)}
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
            id: 'expenses',
            label: 'Split',
            icon: ReceiptIndianRupee,
            active: currentScreen === 'expenses',
            onClick: () => setCurrentScreen('expenses'),
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
      <div
        className={cn(
          'flex-1 overflow-y-auto overflow-x-hidden',
          'lg:pt-14',
          currentScreen === 'guide-profile'
            ? 'pb-2'
            : 'pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-[calc(4.5rem+env(safe-area-inset-bottom))]',
        )}
      >
        {renderScreen()}
      </div>

      {currentScreen !== 'guide-profile' && (
        <MobileTabBar
          className={SHELL_MAX_WIDTH_CLASS}
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
              id: 'expenses',
              label: 'Split',
              icon: ReceiptIndianRupee,
              active: currentScreen === 'expenses',
              onClick: () => setCurrentScreen('expenses'),
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