import { LanguageSwitcher } from "./LanguageSwitcher";
import { profile, navigation } from "../data/site";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const t = useTranslations("ui");
  const nav = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 whitespace-nowrap font-bold tracking-tight text-gray-950"
          >
            <Image src="/JHGradientMaroon.svg" alt={t("logo")} width={28} height={28} className="shrink-0" />
            <span className="leading-none">{profile.name}</span>
          </Link>

          <div className="flex items-center gap-3">
            <nav aria-label={t("primaryNav")} className="hidden gap-7 text-sm font-medium md:flex">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-gray-500 transition-colors hover:text-brand-700">
                  {nav(item.id as "about" | "projects" | "experience" | "learning" | "contact")}
                </Link>
              ))}
            </nav>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <nav aria-label={t("mobileNav")} className="flex gap-5 overflow-x-auto pb-3 text-sm md:hidden">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="shrink-0 text-gray-600 hover:text-gray-900">
              {nav(item.id as "about" | "projects" | "experience" | "learning" | "contact")}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
