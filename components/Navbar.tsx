import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

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
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 whitespace-nowrap font-bold tracking-tight text-gray-950"
          >
            <Image src="/JHGradientMaroon.svg" alt="logo" width={28} height={28} className="shrink-0" />
            <span className="leading-none">{profile.name}</span>
          </Link>

          <div className="flex items-center gap-3">
            <nav aria-label="Primary navigation" className="hidden gap-7 text-sm font-medium md:flex">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-gray-500 transition-colors hover:text-brand-700">
                  {item.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>

        <nav aria-label="Mobile navigation" className="flex gap-5 overflow-x-auto pb-3 text-sm md:hidden">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="shrink-0 text-gray-600 hover:text-gray-900">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
