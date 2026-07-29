interface NavigationItem {
  label: string;
  href: string;
}

interface Profile {
  name: string;
}

interface NavbarProps {
  profile: Profile;
  navigation: NavigationItem[];
}

export function Navbar({ profile, navigation }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-transparent">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="inline-flex items-center gap-2 whitespace-nowrap font-semibold tracking-tight">
          <img src="/JHGradientMaroon.svg" alt="JH" className="h-6 w-6 shrink-0" />
          <span className="leading-none">{profile.name}</span>
        </a>
        <nav className="hidden md:flex gap-6 text-sm">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-gray-600 hover:text-gray-900">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
