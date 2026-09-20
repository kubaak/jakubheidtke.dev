import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { getContent } from "@/data/getContent";
import { siteUrl } from "@/i18n/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) => {
    const paths = [
      "/",
      "/about",
      "/experience",
      "/learning",
      "/projects",
      ...getContent(locale).projects.items.flatMap((project) => (project.slug ? ["/projects/" + project.slug] : [])),
    ];
    return paths.map((href) => ({
      url: siteUrl + getPathname({ locale, href }),
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((language) => [language, siteUrl + getPathname({ locale: language, href })]),
        ),
      },
    }));
  });
}
