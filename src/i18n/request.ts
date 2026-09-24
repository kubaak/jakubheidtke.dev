import { locale as getRootLocale } from "next/root-params";
import { getRequestConfig } from "next-intl/server";
import { isLocale, routing } from "./routing";

export default getRequestConfig(async ({ locale: localeOverride }) => {
  const requested = localeOverride ?? (await getRootLocale());
  const locale = isLocale(requested) ? requested : routing.defaultLocale;
  return {
    locale,
    messages: (
      await import(`../../messages/${locale}.json`, {
        with: { type: "json" },
      })
    ).default,
  };
});
