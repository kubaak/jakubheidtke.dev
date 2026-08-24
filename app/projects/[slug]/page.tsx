import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import content from "@/data/content.json";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";
import { TechnologyList } from "@/components/TechnologyList";
import type { Content, Project } from "@/data/content";

const siteContent = content as Content;

function getProject(slug: string): Project | undefined {
  return siteContent.projects.items.find((project) => project.slug === slug);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return siteContent.projects.items.filter((project) => project.slug).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.name,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
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
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const { profile, navigation, footer } = siteContent;
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
            ← All projects
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-12">
            <div>
              {project.context && (
                <p className="text-sm font-semibold tracking-wider text-brand-600 uppercase">{project.context}</p>
              )}

              <h1 className="mt-3 text-4xl leading-tight font-extrabold sm:text-5xl">{project.name}</h1>

              {(project.appHref || project.githubHref) && (
                <div className="mt-7 flex flex-wrap gap-3">
                  {project.appHref && (
                    <a
                      href={project.appHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-brand-600 bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
                    >
                      Live app →
                    </a>
                  )}
                  {project.githubHref && (
                    <a
                      href={project.githubHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              )}

              <div className="mt-12">
                <section className="border-t pt-8 pb-8">
                  <h2 className="text-2xl font-bold">Overview</h2>
                  <p className="mt-4 max-w-3xl leading-relaxed text-gray-700">{details.overview}</p>
                </section>

                <DetailSection title="My Role" items={details.role} />
                <DetailSection title="Architecture & Technology" items={details.architecture} />
                <DetailSection title="Engineering Challenges" items={details.challenges} />
                <DetailSection title="Decisions & Trade-offs" items={details.decisions} />
                <DetailSection title="Results & Impact" items={details.results} />
              </div>
            </div>

            <aside aria-label="Project technologies" className="lg:pt-1">
              <h2 className="text-sm font-semibold tracking-wider text-brand-600 uppercase">Technologies</h2>
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
