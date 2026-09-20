import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getContent } from "@/data/getContent";
import { pageLocale } from "@/i18n/server";
import { isLocale, type Locale } from "@/i18n/routing";
import { localizedMetadata } from "@/i18n/metadata";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";
import { TechnologyList } from "@/components/TechnologyList";
import { ProjectLinks } from "@/components/ProjectLinks";
import type { Project } from "@/data/content";

function getProject(locale: Locale, slug: string): Project | undefined {
  return getContent(locale).projects.items.find((project) => project.slug === slug);
}

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  return getContent(params.locale).projects.items.flatMap(({ slug }) => (slug ? [{ slug }] : []));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await pageLocale(params);
  const project = getProject(locale, slug);

  if (!project) {
    notFound();
  }

  return localizedMetadata(locale, `/projects/${slug}`, project.name, project.description);
}

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

interface DetailSectionProps {
  title: string;
  items?: string[];
}

function DetailSection({ title, items }: DetailSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="border-t py-8 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-bold">{title}</h2>
      <ul className="mt-4 max-w-3xl space-y-3 text-gray-700">
        {items.map((item) => (
          <li key={item} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const locale = await pageLocale(params);
  const project = getProject(locale, slug);

  if (!project) {
    notFound();
  }

  const { profile, navigation, footer } = getContent(locale);
  const t = await getTranslations("ui");
  const details = project.details ?? { overview: project.description };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white text-gray-900">
      <Navbar profile={profile} navigation={navigation} />

      <main>
        <Section className="pt-10 pb-8">
          <Link
            href="/projects"
            className="inline-flex text-sm font-medium text-gray-600 hover:text-brand-700 hover:underline"
          >
            ← {t("allProjects")}
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-12">
            <div>
              {project.context && (
                <p className="text-sm font-semibold tracking-wider text-brand-600 uppercase">{project.context}</p>
              )}

              <h1 className="mt-3 text-4xl leading-tight font-extrabold sm:text-5xl">{project.name}</h1>

              <ProjectLinks links={project.links} />

              <div className="mt-12">
                <section className="border-t pt-8 pb-8">
                  <h2 className="text-2xl font-bold">{t("overview")}</h2>
                  <p className="mt-4 max-w-3xl leading-relaxed text-gray-700">{details.overview}</p>
                </section>

                <DetailSection title={t("role")} items={details.role} />
                <DetailSection title={t("architecture")} items={details.architecture} />
                <DetailSection title={t("challenges")} items={details.challenges} />
                <DetailSection title={t("decisions")} items={details.decisions} />
                <DetailSection title={t("results")} items={details.results} />
              </div>
            </div>

            <aside aria-label={t("projectTechnologies")} className="lg:pt-1">
              <h2 className="text-sm font-semibold tracking-wider text-brand-600 uppercase">{t("technologies")}</h2>
              <TechnologyList technologies={project.tags} />
            </aside>
          </div>
        </Section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name}. {footer.text}
      </footer>
    </div>
  );
}
