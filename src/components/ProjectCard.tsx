import { cn } from "../lib/cn";
import { Card } from "./Card";

interface ProjectCardProps {
  name: string;
  description: string;
  tags: string[];
  appHref?: string;
  githubHref?: string;
}

const linkBaseClasses = cn(
  "group/link inline-flex items-center gap-1.5",
  "rounded-md border border-transparent px-3 py-1.5",
  "text-sm font-medium",
  "transition-all duration-200",
  "hover:scale-105 hover:shadow-sm",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
);

const arrowClasses = cn(
  "transition-transform duration-200",
  "group-hover/link:translate-x-0.5",
  "group-hover/link:-translate-y-0.5",
);

export function ProjectCard({ name, description, tags, appHref, githubHref }: ProjectCardProps) {
  const hasAnyLink = Boolean(appHref || githubHref);

  return (
    <Card
      className={cn("transition", hasAnyLink ? "group ring-2 ring-brand-200 hover:ring-brand-400" : "hover:shadow")}
    >
      <h3 className="text-lg font-semibold">{name}</h3>

      <p className="mt-2 text-sm text-gray-600">{description}</p>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-gray-100 px-2 py-1">
            {tag}
          </span>
        ))}
      </div>

      {hasAnyLink && (
        <div className="mt-4 flex flex-wrap gap-3">
          {appHref && (
            <a
              href={appHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${name}`}
              className={cn(
                linkBaseClasses,
                "text-brand-700",
                "group-hover:border-brand-300",
                "group-hover:bg-brand-100",
                "group-hover:shadow-sm",
                "hover:border-brand-400",
                "hover:bg-brand-200",
                "focus-visible:outline-brand-600",
              )}
            >
              Live app
              <span aria-hidden="true" className={arrowClasses}>
                ↗
              </span>
            </a>
          )}

          {githubHref && (
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${name} on GitHub`}
              className={cn(
                linkBaseClasses,
                "text-gray-700",
                "group-hover:border-gray-300",
                "group-hover:bg-gray-200",
                "group-hover:text-gray-950",
                "group-hover:shadow-sm",
                "hover:border-gray-400",
                "hover:bg-gray-300",
                "focus-visible:outline-gray-600",
              )}
            >
              GitHub
              <span aria-hidden="true" className={arrowClasses}>
                ↗
              </span>
            </a>
          )}
        </div>
      )}
    </Card>
  );
}
