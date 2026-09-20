"use client";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { Card } from "./Card";
import type { Project } from "@/data/content";

interface ProjectCardProps extends Project {
  detailsHref?: string;
}

export function ProjectCard({ name, description, tags, detailsHref }: ProjectCardProps) {
  const t = useTranslations("ui");
  const reduceMotion = useReducedMotion();

  const card = (
    <Card
      className={cn(
        "group relative flex h-full flex-col border-gray-200 bg-white p-6 shadow-sm transition-colors",
        detailsHref ? "hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/10" : "hover:shadow-lg",
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

      {detailsHref && (
        <div className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-brand-700 transition-colors group-hover:text-brand-900">
          {t("learnMore")}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            →
          </span>
        </div>
      )}
    </Card>
  );

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 360, damping: 24 }}
      className="h-full"
    >
      {detailsHref ? (
        <Link
          href={detailsHref}
          aria-label={t("projectDetails", { name })}
          className="block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
        >
          {card}
        </Link>
      ) : (
        card
      )}
    </motion.div>
  );
}
