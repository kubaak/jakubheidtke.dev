import en from "./content.en.json";
import cs from "./content.cs.json";

import type { Content } from "./content";
import type { Locale } from "@/i18n/routing";

const content: Record<Locale, Content> = { en, cs };

export function getContent(locale: Locale): Content {
  return content[locale];
}
