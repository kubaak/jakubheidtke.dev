"use client";
import { useEffect, useId, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { storePreferredLocale } from "@/i18n/preference";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("ui");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownId = useId();

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <div
      ref={containerRef}
      aria-label={t("language")}
      className="relative text-xs font-semibold"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={dropdownId}
        onClick={() => setOpen(!open)}
        className="inline-flex h-9 items-center gap-1 rounded-lg px-2 text-brand-700 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        {locale.toUpperCase()}
        <FiChevronDown aria-hidden="true" className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        id={dropdownId}
        hidden={!open}
        className="absolute right-0 top-full z-10 mt-2 min-w-20 rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
      >
        {routing.locales
          .filter((target) => target !== locale)
          .map((target) => (
            <Link
              key={target}
              href={pathname}
              locale={target}
              aria-label={t(target)}
              className="block rounded-md px-3 py-2 text-gray-700 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-brand-600"
              onClick={(event) => {
                setOpen(false);
                storePreferredLocale(target);
                // Preserve optional query and fragment as well as the pathname.
                if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
                  event.preventDefault();
                  router.replace(pathname + window.location.search + window.location.hash, { locale: target });
                }
              }}
            >
              {target.toUpperCase()}
            </Link>
          ))}
      </div>
    </div>
  );
}
