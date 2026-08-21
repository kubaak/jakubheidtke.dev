import Image from "next/image";
import Link from "next/link";

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
    <header className="sticky top-0 z-50 border-b border-transparent bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="inline-flex items-center gap-2 whitespace-nowrap font-semibold tracking-tight">
            <Image src="/JHGradientMaroon.svg" alt="" width={24} height={24} className="shrink-0" />
            <span className="leading-none">{profile.name}</span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden gap-6 text-sm md:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="text-gray-600 hover:text-gray-900">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <nav aria-label="Mobile navigation" className="flex gap-5 overflow-x-auto pb-3 text-sm md:hidden">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="shrink-0 text-gray-600 hover:text-gray-900">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
