import { pageLocale, type LocalePageProps } from "@/i18n/server";
import { profile } from "../../../data/site";
import { projects } from "../../../data/projects";
import { pageMetadata } from "@/i18n/metadata";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export async function generateMetadata({ params }: LocalePageProps) {
  return pageMetadata(await pageLocale(params), "projects");
}

export default async function ProjectsPage({ params }: LocalePageProps) {
  const locale = await pageLocale(params);
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fffafc] text-gray-900">
      <Navbar />

      <main>
        <Section className="relative overflow-hidden border-b border-gray-200/80 pt-20 pb-16 sm:pt-24">
          <div className="absolute top-0 right-0 -z-10 h-72 w-2/3 rounded-full bg-brand-100/65 blur-3xl" />
          <Reveal>
            <h1 className="mt-4 max-w-3xl text-5xl leading-[0.98] font-black tracking-[-0.055em] text-gray-950 sm:text-6xl">
              {t("pages.projectsTitle")}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">{t("pages.projectsIntro")}</p>
          </Reveal>
        </Section>

        <Section className="pt-14 pb-20">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => {
              return (
                <Reveal key={project.slug} delay={Math.min(index * 0.06, 0.24)} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              );
            })}
          </div>
        </Section>
      </main>

      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name}. {t("footer.text")}
      </footer>
    </div>
  );
}
