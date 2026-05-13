import { User, MapPin, Star, Calendar, Heart, Settings, Bell, HelpCircle, LogOut, ChevronRight, Shield } from 'lucide-react';

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
    <div className="min-h-full bg-white pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] px-5 pt-12 pb-20 rounded-b-3xl">
        <h1 className="text-white text-2xl mb-1">Profile</h1>
        <p className="text-white/80 text-sm">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="px-5 -mt-12 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
              {user.image}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg text-[#111827]">{user.name}</h2>
                {user.verified && (
                  <Shield className="w-4 h-4 text-[#10B981]" />
                )}
              </div>
              <p className="text-sm text-[#6B7280] mb-1">{user.email}</p>
              <p className="text-xs text-[#6B7280]">Member since {user.memberSince}</p>
            </div>
          </div>

          <button className="w-full bg-[#1E3A8A] text-white py-2.5 rounded-full text-sm">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#F9FAFB] rounded-xl p-3 text-center">
              <stat.icon className="w-5 h-5 text-[#3B82F6] mx-auto mb-1" />
              <p className="text-lg text-[#111827] mb-0.5">{stat.value}</p>
              <p className="text-xs text-[#6B7280] leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Guides */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base text-[#111827]">Saved Guides</h3>
          <button className="text-sm text-[#3B82F6]">See All</button>
        </div>

        <div className="space-y-3">
          {savedGuides.map((guide) => (
            <div key={guide.id} className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 hover:border-[#3B82F6] transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {guide.image}
              </div>

              <div className="flex-1">
                <h4 className="text-sm text-[#111827] mb-0.5">{guide.name}</h4>
                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                  <MapPin className="w-3 h-3" />
                  <span>{guide.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-[#F97316] fill-[#F97316]" />
                <span className="text-sm text-[#111827]">{guide.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Sections */}
      {menuSections.map((section) => (
        <div key={section.title} className="px-5 mb-6">
          <h3 className="text-sm text-[#6B7280] mb-3">{section.title}</h3>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            {section.items.map((item, index) => (
              <button
                key={item.label}
                className={`w-full flex items-center justify-between p-4 hover:bg-[#F9FAFB] transition-all ${
                  index !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F9FAFB] rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#6B7280]" />
                  </div>
                  <span className="text-sm text-[#111827]">{item.label}</span>
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

      {/* Become a Guide */}
      <div className="px-5 mb-6">
        <div className="bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-2xl p-5 text-white">
          <h3 className="text-lg mb-2">Become a Guide</h3>
          <p className="text-white/90 text-sm mb-4">Share your local knowledge and earn money by guiding travelers</p>
          <button className="bg-white text-[#F97316] px-6 py-2.5 rounded-full text-sm">
            Apply Now
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="px-5">
        <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-[#6B7280] py-3 rounded-full hover:bg-[#F9FAFB] transition-all">
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>

      {/* App Version */}
      <div className="px-5 pt-6 text-center">
        <p className="text-xs text-[#6B7280]">Travellor Buddy v1.0.0</p>
      </div>
    </div>
  );
}
