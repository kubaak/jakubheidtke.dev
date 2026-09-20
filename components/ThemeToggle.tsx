"use client";
import { useTranslations } from "next-intl";

import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const t = useTranslations("ui");
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const label = theme === null ? t("toggleTheme") : isDark ? t("lightTheme") : t("darkTheme");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-gray-200 bg-white/80 text-gray-700 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <FiMoon aria-hidden="true" className="size-4 dark:hidden" />
      <FiSun aria-hidden="true" className="hidden size-4 dark:block" />
    </button>
  );
}
