"use client";

import { useTranslations } from "next-intl";
import type { Project } from "../data/projects";
import { motion, useReducedMotion } from "motion/react";

export function ProjectLinks({ project }: { project: Project }) {
  const { links, slug } = project;
  const t = useTranslations("projects.items");
  const reduceMotion = useReducedMotion();

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {links.map(({ type, href }) => (
        <motion.a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
          whileTap={reduceMotion ? undefined : { y: 0, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 360, damping: 24 }}
          className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
        >
          {t(`${slug}.links.${type}`)}
          <span aria-hidden="true">→</span>
        </motion.a>
      ))}
    </div>
  );
}
