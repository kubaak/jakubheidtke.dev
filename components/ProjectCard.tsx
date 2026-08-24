"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { Card } from "./Card";
import type { Project } from "@/data/content";

interface ProjectCardProps extends Project {
  detailsHref?: string;
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

export function ProjectCard({ name, description, tags, appHref, githubHref, detailsHref }: ProjectCardProps) {
  const hasAnyLink = Boolean(detailsHref || appHref || githubHref);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 360, damping: 24 }}
      className="h-full"
    >
      <Card
        className={cn(
          "group flex h-full flex-col border-gray-200 bg-white p-6 shadow-sm transition-colors",
          hasAnyLink ? "hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/10" : "hover:shadow-lg",
        )}
      >
        <h3 className="text-xl font-bold tracking-tight text-gray-950">{name}</h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>

        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {hasAnyLink && (
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {detailsHref && (
              <Link
                href={detailsHref}
                aria-label={`View details for ${name}`}
                className={cn(
                  linkBaseClasses,
                  "text-brand-700",
                  "border-brand-200 bg-brand-50",
                  "hover:border-brand-400 hover:bg-brand-100",
                  "focus-visible:outline-brand-600",
                )}
              >
                Project details
                <span aria-hidden="true" className={arrowClasses}>
                  →
                </span>
              </Link>
            )}

            {appHref && (
              <a
                href={appHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${name}`}
                className={cn(
                  linkBaseClasses,
                  "text-brand-700",
                  "border-brand-200 bg-brand-50",
                  "hover:border-brand-400 hover:bg-brand-100",
                  "focus-visible:outline-brand-600",
                )}
              >
                Live app
                <span aria-hidden="true" className={arrowClasses}>
                  →
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
                  "border-gray-200 bg-gray-50",
                  "hover:border-gray-400 hover:bg-gray-100 hover:text-gray-950",
                  "focus-visible:outline-gray-600",
                )}
              >
                GitHub
                <span aria-hidden="true" className={arrowClasses}>
                  →
                </span>
              </a>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
