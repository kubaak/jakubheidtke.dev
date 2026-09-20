import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "./navigation";
import { routing, type Locale } from "./routing";

export const siteUrl = "https://jakubheidtke.com";

export function localizedMetadata(locale: Locale, href: string, title: string, description: string): Metadata {
  const url = getPathname({ locale, href });
  return {
    metadataBase: new URL(siteUrl),
    title: href === "/" ? title : `${title} | Jakub Heidtke`,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((language) => [language, getPathname({ locale: language, href })]),
      ),
    },
    openGraph: {
      type: "website",
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      alternateLocale: locale === "cs" ? "en_US" : "cs_CZ",
      url,
      siteName: "jakubheidtke.com",
      title,
      description,
      images: [{ url: "/profile.jpg", alt: "Jakub Heidtke", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/profile.jpg"] },
  };
}
export async function pageMetadata(locale: Locale, page: "home" | "about" | "projects" | "experience" | "learning") {
  const t = await getTranslations({ locale, namespace: "meta" });
  return localizedMetadata(locale, page === "home" ? "/" : "/" + page, t(`${page}.title`), t(`${page}.description`));
}
