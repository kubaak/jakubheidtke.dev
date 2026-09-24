import { pageLocale, type LocalePageProps } from "@/i18n/server";
import { profile } from "../../../data/site";
import { education } from "../../../data/education";
import { courses, certifications } from "../../../data/learning";
import { pageMetadata } from "@/i18n/metadata";
import { getMessages, getTranslations } from "next-intl/server";
import { Card } from "@/components/Card";
import { CourseCard } from "@/components/CourseCard";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export async function generateMetadata({ params }: LocalePageProps) {
  return pageMetadata(await pageLocale(params), "learning");
}

export default async function LearningPage({ params }: LocalePageProps) {
  const locale = await pageLocale(params);
  const t = await getTranslations({ locale });
  const messages = await getMessages({ locale });

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fffafc] text-gray-900">
      <Navbar />

      <main>
        <Section className="relative overflow-hidden border-b border-gray-200/80 pt-20 pb-16 sm:pt-24">
          <div className="absolute top-0 right-0 -z-10 h-72 w-2/3 rounded-full bg-brand-100/65 blur-3xl" />
          <Reveal>
            <h1 className="mt-4 max-w-4xl text-5xl leading-[0.98] font-black tracking-[-0.055em] text-gray-950 sm:text-6xl">
              {t("learning.heading")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">{t("pages.learningIntro")}</p>
          </Reveal>
        </Section>

        <Section className="pt-14">
          <Reveal>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-gray-950">
              {t("learning.formalEducation.heading")}
            </h2>
          </Reveal>

          <div className="mt-7 space-y-4">
            {education.map(({ id, period }, index) => (
              <Reveal key={id} delay={index * 0.06}>
                <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-brand-900/5">
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-gray-950">
                        {t(`education.items.${id}.school`)}
                      </h3>

                      <p className="mt-1 font-medium text-brand-700">
                        {t.has(`education.items.${id}.degree`) ? t(`education.items.${id}.degree`) : null}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-medium text-gray-500">{period}</p>
                  </div>

                  {t.has(`education.items.${id}.description`) && (
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
                      {t(`education.items.${id}.description`)}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {certifications.length > 0 && (
          <Section>
            <Reveal>
              <p className="text-xs font-bold tracking-[0.16em] text-brand-600 uppercase">{t("ui.credentials")}</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-gray-950">
                {t("learning.certifications.heading")}
              </h2>
            </Reveal>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {certifications.map((certification, index) => (
                <Reveal key={certification.id} delay={index * 0.06}>
                  <Card className="border-gray-200 bg-white shadow-sm">
                    <p className="text-sm text-gray-500">
                      {certification.issuer}
                      {certification.issuedAt && ` · ${certification.issuedAt}`}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold">
                      {messages.learning.certifications.items?.[certification.id]?.name}
                    </h3>

                    {certification.skills && certification.skills.length > 0 && (
                      <p className="mt-3 text-sm text-gray-600">{certification.skills.join(" · ")}</p>
                    )}

                    {certification.credentialUrl && (
                      <a
                        href={certification.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex text-sm font-medium text-brand-700 hover:text-brand-800 hover:underline"
                      >
                        {t("ui.credential")} →
                      </a>
                    )}
                  </Card>
                </Reveal>
              ))}
            </div>
          </Section>
        )}

        <Section>
          <Reveal>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-gray-950">
              {t("learning.courses.heading")}
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-600">{t("pages.coursesIntro")}</p>
          </Reveal>

          {courses.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {courses.map((course, index) => (
                <Reveal key={course.id} delay={Math.min(index * 0.06, 0.24)} className="h-full">
                  <CourseCard course={course} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-6 max-w-2xl border-t pt-5 text-gray-700">
              <p>{t("ui.emptyCourses")}</p>
            </div>
          )}
        </Section>
      </main>

      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name}. {t("footer.text")}
      </footer>
    </div>
  );
}
