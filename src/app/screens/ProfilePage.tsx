import { motion } from 'framer-motion';
import { User, MapPin, Star, Calendar, Heart, Settings, Bell, HelpCircle, Shield } from 'lucide-react';
import { ScreenHero } from '../components/commonComponents';
import { PAGE_PAD_X } from '../shellLayout';
import {
  BecomeGuideCard,
  ProfileHeaderCard,
  SavedGuideCard,
  SettingsGroupedPanel,
  StatsGrid,
  type ProfileStat,
  type SettingsListItem,
  type SettingsSectionGroup,
} from '../features/profile/components';

const SECTION_GAP = 'space-y-2.5 sm:space-y-3';

export default function ProfilePage() {
  const user = {
    name: 'Jitendra Kumar',
    email: 'jitendra@example.com',
    avatar: '👨🏽‍💼',
    verified: true,
    travelerTagline: 'Explorer since 2026',
  };

  const stats: ProfileStat[] = [
    { label: 'Trips Completed', value: '3', icon: MapPin, accent: 'sky' },
    { label: 'Reviews Given', value: '5', icon: Star, accent: 'amber' },
    { label: 'Guides Booked', value: '2', icon: Calendar, accent: 'emerald' },
    { label: 'Saved Places', value: '24', icon: Heart, accent: 'rose' },
  ];

  const savedGuides = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      city: 'Varanasi',
      specialty: 'Ghat walks & sunrise rituals',
      rating: 4.9,
      image: '👨🏽',
    },
    {
      id: 2,
      name: 'Priya Singh',
      city: 'Varanasi',
      specialty: 'Street food & old city',
      rating: 4.8,
      image: '👩🏽',
    },
    {
      id: 3,
      name: 'Amit Sharma',
      city: 'Agra',
      specialty: 'Heritage & photography',
      rating: 4.7,
      image: '👨🏽',
    },
  ];

  const accountItems: SettingsListItem[] = [
    {
      icon: User,
      label: 'Edit Profile',
      subtitle: 'Photo, bio, and travel preferences',
      action: 'edit-profile',
    },
    {
      icon: Shield,
      label: 'Verify Account',
      subtitle: 'Unlock bookings and payouts faster',
      badge: 'New',
      action: 'verify',
    },
    { icon: Bell, label: 'Notifications', subtitle: 'Trip reminders & messages', action: 'notifications' },
    { icon: Settings, label: 'Preferences', subtitle: 'Language, currency, accessibility', action: 'preferences' },
  ];

  const supportItems: SettingsListItem[] = [
    { icon: HelpCircle, label: 'Help Center', subtitle: 'FAQs, safety, and policies', action: 'help' },
    { icon: Star, label: 'Rate the app', subtitle: 'Share feedback on the store', action: 'rate' },
    { icon: Settings, label: 'App settings', subtitle: 'Data, storage, and legal', action: 'settings' },
  ];

  const settingsSections: SettingsSectionGroup[] = [
    { title: 'Account', items: accountItems },
    { title: 'Support', items: supportItems },
  ];

  return (
    <div className="min-h-full bg-[#F4F6F8] pb-4 sm:pb-6">
      <ScreenHero
        className="rounded-b-[1.25rem] pb-4 pt-[max(0.45rem,env(safe-area-inset-top))] sm:rounded-b-3xl sm:pb-5 sm:pt-2.5 md:pb-6"
        title="Profile"
        subtitle="Your traveler hub"
        hideTitleFromLg
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`${PAGE_PAD_X} -mt-4 space-y-2.5 sm:-mt-5 sm:space-y-3`}
      >
        <ProfileHeaderCard
          name={user.name}
          email={user.email}
          avatar={user.avatar}
          verified={user.verified}
          travelerTagline={user.travelerTagline}
          onLogout={() => {}}
        />

        <section className={SECTION_GAP}>
          <div className="px-0.5">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8]">Travel stats</h3>
          </div>
          <StatsGrid stats={stats} />
        </section>

        <section className={SECTION_GAP}>
          <div className="flex items-center justify-between gap-2 px-0.5">
            <h3 className="text-sm font-semibold tracking-tight text-[#111827]">Saved guides</h3>
            <button
              type="button"
              className="text-[11px] font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8] sm:text-xs"
            >
              See all
            </button>
          </div>
          <div className="space-y-1.5">
            {savedGuides.map((guide) => (
              <SavedGuideCard
                key={guide.id}
                name={guide.name}
                city={guide.city}
                specialty={guide.specialty}
                rating={guide.rating}
                image={guide.image}
              />
            ))}
          </div>
        </section>

        <SettingsGroupedPanel sections={settingsSections} />

        <BecomeGuideCard
          title="Become a guide"
          description="Host authentic experiences and earn on your schedule."
          actionLabel="Apply now"
        />

        <p className="pb-0.5 pt-0.5 text-center text-[10px] font-medium text-[#9CA3AF]">Travellor Buddy v1.0.0</p>
      </motion.div>
    </div>
  );
}
