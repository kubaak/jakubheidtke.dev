import { ProjectCard } from "./ProjectCard";
import { Section } from "./Section";

interface Project {
  name: string;
  description: string;
  tags: string[];
  appHref?: string;
  githubHref?: string;
}

interface ProjectsProps {
  heading: string;
  items: Project[];
}

export function Projects({ heading, items }: ProjectsProps) {
  return (
    <Section id="projects">
      <h2 className="text-3xl font-extrabold">{heading}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {items.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </Section>
  );
}
