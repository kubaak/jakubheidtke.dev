import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { FeaturedProject } from "./FeaturedProject";
import { Section } from "./Section";
import type { Project } from "@/data/content";

interface ProjectsProps {
  heading: string;
  items: Project[];
  className?: string;
}

export function Projects({ heading, items, className }: ProjectsProps) {
  const t = useTranslations("ui");
  return (
    <Section id="projects" className={cn(className)}>
      <h2 className="text-3xl font-extrabold">{heading}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {items.map((project, index) => (
          <FeaturedProject
            key={project.name}
            name={project.name}
            description={project.description}
            detailsHref={`/projects/${project.slug}`}
            index={index}
          />
        ))}
      </div>

      <Link
        href="/projects"
        className="mt-8 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-800 hover:underline"
      >
        {t("viewAll")} →
      </Link>
    </Section>
  );
}
