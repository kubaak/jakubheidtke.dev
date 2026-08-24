import type { Metadata } from "next";
import content from "@/data/content.json";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
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
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white text-gray-900">
      <Navbar profile={profile} navigation={navigation} />

      <main>
        <Section className="pt-14 pb-10">
          <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">Projects</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            Selected product and engineering work spanning SaaS development, distributed systems, integrations, backend
            architecture, and full-stack applications.
          </p>
        </Section>

        <Section className="pt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.items.map((project) => (
              <ProjectCard
                key={project.name}
                {...project}
                detailsHref={project.slug ? `/projects/${project.slug}` : undefined}
              />
            ))}
          </div>
        </Section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name}. {footer.text}
      </footer>
    </div>
  );
}
