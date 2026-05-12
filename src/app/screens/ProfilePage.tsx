import { User, MapPin, Star, Calendar, Heart, Settings, Bell, HelpCircle, LogOut, ChevronRight, Shield } from 'lucide-react';
import { GuideRowCard, PromoCalloutCard, ScreenHero } from '../components/commonComponents';
import { PAGE_PAD_X } from '../shellLayout';

export default function ProfilePage() {
  const user = {
    name: 'Jitendra Kumar',
    email: 'jitendra@example.com',
    phone: '+91 98765 43210',
    image: '👨🏽‍💼',
    memberSince: 'January 2026',
    verified: true
  };

  const stats = [
    { label: 'Trips Completed', value: '3', icon: MapPin },
    { label: 'Reviews Given', value: '5', icon: Star },
    { label: 'Guides Booked', value: '2', icon: Calendar },
    { label: 'Saved Places', value: '24', icon: Heart }
  ];

  const savedGuides = [
    { id: 1, name: 'Rajesh Kumar', city: 'Varanasi', rating: 4.9, image: '👨🏽' },
    { id: 2, name: 'Priya Singh', city: 'Varanasi', rating: 4.8, image: '👩🏽' },
    { id: 3, name: 'Amit Sharma', city: 'Agra', rating: 4.7, image: '👨🏽' }
  ];

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', action: 'edit-profile' },
        { icon: Shield, label: 'Verify Account', action: 'verify', badge: 'New' },
        { icon: Bell, label: 'Notifications', action: 'notifications' },
        { icon: Settings, label: 'Preferences', action: 'preferences' }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', action: 'help' },
        { icon: Star, label: 'Rate App', action: 'rate' },
        { icon: Settings, label: 'Settings', action: 'settings' }
      ]
    }
  ];

  return (
    <div className="min-h-full bg-white pb-6 sm:pb-8">
      <ScreenHero
        className="rounded-b-3xl pb-9 pt-7 sm:pb-12 sm:pt-9 md:pb-14"
        title="Profile"
        subtitle="Manage your account and preferences"
        hideTitleFromLg
      />

      <div className={`-mt-8 mb-4 sm:-mt-10 sm:mb-5 md:-mt-11 ${PAGE_PAD_X}`}>
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg sm:rounded-2xl sm:p-4 md:p-5">
          <div className="mb-3 flex flex-col items-center gap-3 sm:mb-3.5 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-3xl sm:h-20 sm:w-20 sm:rounded-2xl sm:text-4xl">
              {user.image}
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <div className="mb-0.5 flex items-center justify-center gap-1.5 sm:mb-1 sm:justify-start sm:gap-2">
                <h2 className="text-base font-semibold text-[#111827] sm:text-lg md:text-xl">{user.name}</h2>
                {user.verified && (
                  <Shield className="w-4 h-4 text-[#10B981]" />
                )}
              </div>
              <p className="mb-0.5 truncate text-xs text-[#6B7280] sm:text-sm">{user.email}</p>
              <p className="text-[10px] text-[#6B7280] sm:text-xs">Member since {user.memberSince}</p>
            </div>
          </div>

          <button className="w-full rounded-full bg-[#1E3A8A] py-2 text-xs font-semibold text-white sm:py-2.5 sm:text-sm">
            Edit Profile
          </button>
        </div>
      </div>

      <div className={`mb-4 sm:mb-5 ${PAGE_PAD_X}`}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5 md:gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-[#F9FAFB] p-2.5 text-center sm:rounded-xl sm:p-3 md:p-3.5">
              <stat.icon className="mx-auto mb-0.5 h-4 w-4 text-[#3B82F6] sm:mb-1 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              <p className="mb-0 text-base font-semibold text-[#111827] sm:mb-0.5 sm:text-lg md:text-xl">{stat.value}</p>
              <p className="text-[10px] leading-tight text-[#6B7280] sm:text-xs md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`mb-4 sm:mb-5 ${PAGE_PAD_X}`}>
        <div className="mb-3 flex items-center justify-between sm:mb-3.5">
          <h3 className="text-sm font-semibold text-[#111827] sm:text-base">Saved Guides</h3>
          <button className="text-sm text-[#3B82F6]">See All</button>
        </div>

        <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
          {savedGuides.map((guide) => (
            <GuideRowCard
              key={guide.id}
              variant="simple"
              name={guide.name}
              image={guide.image}
              rating={guide.rating}
              city={guide.city}
            />
          ))}
        </div>
      </div>

      <div className={`mb-4 space-y-4 sm:mb-5 sm:space-y-5 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 ${PAGE_PAD_X}`}>
      {menuSections.map((section) => (
        <div key={section.title}>
          <h3 className="mb-2 text-xs font-medium text-[#6B7280] sm:mb-2.5 sm:text-sm">{section.title}</h3>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white sm:rounded-2xl">
            {section.items.map((item, index) => (
              <button
                key={item.label}
                className={`flex w-full items-center justify-between p-3 transition-all hover:bg-[#F9FAFB] sm:p-3.5 md:p-4 ${
                  index !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F9FAFB] sm:size-10 sm:rounded-xl">
                    <item.icon className="size-[18px] text-[#6B7280] sm:size-5" />
                  </div>
                  <span className="truncate text-left text-xs font-medium text-[#111827] sm:text-sm">{item.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="bg-[#F97316]/10 text-[#F97316] text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-[#6B7280]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
      </div>

      <div className={`mb-4 sm:mb-5 ${PAGE_PAD_X}`}>
        <PromoCalloutCard
          title="Become a Guide"
          description="Share your local knowledge and earn money by guiding travelers"
          actionLabel="Apply Now"
        />
      </div>

      <div className={PAGE_PAD_X}>
        <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-2.5 text-[#6B7280] transition-all hover:bg-[#F9FAFB] sm:py-3">
          <LogOut className="size-4 sm:size-5" />
          <span className="text-xs font-medium sm:text-sm">Logout</span>
        </button>
      </div>

      <div className={`pt-4 text-center sm:pt-5 ${PAGE_PAD_X}`}>
        <p className="text-xs text-[#6B7280]">Travellor Buddy v1.0.0</p>
      </div>
    </div>
  );
}
