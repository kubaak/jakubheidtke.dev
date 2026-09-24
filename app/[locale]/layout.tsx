import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import SiteDocument from "@/components/SiteDocument";
import { routing } from "@/i18n/routing";
import { pageLocale, type LocalePageProps } from "@/i18n/server";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocalePageProps & { children: React.ReactNode }) {
  const locale = await pageLocale(params);
  const messages = await getMessages();
  return (
    <SiteDocument locale={locale}>
      <NextIntlClientProvider messages={{ ui: messages.ui, profile: messages.profile, projects: messages.projects, learning: messages.learning }}>{children}</NextIntlClientProvider>
    </SiteDocument>
  );
}
