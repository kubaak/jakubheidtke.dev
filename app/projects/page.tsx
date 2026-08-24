import type { Metadata } from "next";
import content from "@/data/content.json";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { Content } from "@/data/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected software engineering projects by Jakub Heidtke, covering .NET, distributed systems, TypeScript, React, backend architecture and SaaS development.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  const { profile, navigation, projects, footer } = content as Content;

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fffafc] text-gray-900">
      <Navbar profile={profile} navigation={navigation} />

      <main>
        <Section className="relative overflow-hidden border-b border-gray-200/80 pt-20 pb-16 sm:pt-24">
          <div className="absolute top-0 right-0 -z-10 h-72 w-2/3 rounded-full bg-brand-100/65 blur-3xl" />
          <Reveal>
            <h1 className="mt-4 max-w-3xl text-5xl leading-[0.98] font-black tracking-[-0.055em] text-gray-950 sm:text-6xl">
              Projects built for real-world complexity.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Selected product and engineering work spanning SaaS development, distributed systems, integrations,
              backend architecture, and full-stack applications.
            </p>
          </Reveal>
        </Section>

        <Section className="pt-14 pb-20">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.items.map((project, index) => (
              <Reveal key={project.name} delay={Math.min(index * 0.06, 0.24)} className="h-full">
                <ProjectCard {...project} detailsHref={project.slug ? `/projects/${project.slug}` : undefined} />
              </Reveal>
            ))}
          </div>
        </Section>
      </main>

      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name}. {footer.text}
      </footer>
    </div>
  );
}
