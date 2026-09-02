"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useSyncExternalStore } from "react";

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("themechange", onStoreChange);
      return () => window.removeEventListener("themechange", onStoreChange);
    },
    () => (document.documentElement.classList.contains("dark") ? "dark" : "light"),
    () => "light",
  );

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    document.documentElement.style.backgroundColor = nextTheme === "dark" ? "#120d10" : "#fffafc";
    window.localStorage.setItem("theme", nextTheme);
    window.dispatchEvent(new Event("themechange"));
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-gray-200 bg-white/80 text-gray-700 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      {isDark ? <FiSun aria-hidden="true" className="size-4" /> : <FiMoon aria-hidden="true" className="size-4" />}
    </button>
  );
}
