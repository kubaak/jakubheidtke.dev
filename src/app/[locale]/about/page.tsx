import { pageLocale, type LocalePageProps } from "@/i18n/server";
import { profile, skills } from "../../../data/site";
import { pageMetadata } from "@/i18n/metadata";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Skills } from "@/components/Skills";

export async function generateMetadata({ params }: LocalePageProps) {
  return pageMetadata(await pageLocale(params), "about");
}

export default async function AboutPage({ params }: LocalePageProps) {
  const locale = await pageLocale(params);
  const t = await getTranslations({ locale });
  const paragraphs = t.raw("about.paragraphs") as string[];
  const summaryPoints = t.raw("about.summaryPoints") as string[];

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fffafc] text-gray-900">
      <Navbar />

      <main>
        <Section className="relative overflow-hidden border-b border-gray-200/80 pt-20 pb-16 sm:pt-24">
          <div className="absolute top-0 right-0 -z-10 h-72 w-2/3 rounded-full bg-brand-100/65 blur-3xl" />
          <Reveal>
            <h1 className="mt-4 text-5xl leading-[0.98] font-black tracking-[-0.055em] text-gray-950 sm:text-6xl">
              {t("about.heading")}
            </h1>
          </Reveal>
        </Section>

        <Section className="pt-14 pb-20">
          <div>
            {paragraphs.map((paragraph, index) => (
              <Reveal key={`${index}-${paragraph}`} delay={index * 0.06}>
                <p className="mt-5 max-w-3xl text-[1.05rem] leading-8 text-gray-600 first:mt-0">{paragraph}</p>
              </Reveal>
            ))}

            {summaryPoints.length > 0 && (
              <ul className="mt-5 list-inside list-disc space-y-1 text-sm text-gray-700">
                {summaryPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>

          <Reveal className="mt-14 border-t border-gray-200 pt-12">
            <h2 className="text-3xl font-black tracking-[-0.04em] text-gray-950">{t("ui.skills")}</h2>
            <Skills skills={skills} />
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name}. {t("footer.text")}
      </footer>
    </div>
  );
}
