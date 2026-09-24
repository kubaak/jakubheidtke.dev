"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { Card } from "./Card";
import type { Project } from "../data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const copy = useTranslations("projects.items");
  const { slug, logo, tags } = project;
  const name = copy(`${slug}.name`);
  const description = copy(`${slug}.description`);
  const context = copy.has(`${slug}.context`) ? copy(`${slug}.context`) : undefined;
  const detailsHref = `/projects/${slug}`;
  const t = useTranslations("ui");
  const reduceMotion = useReducedMotion();
  const contextLabel = context?.replace(/\s+(project|projekt)$/i, "");
  const isProfessional = /^(professional|profesní)$/i.test(contextLabel ?? "");

  const card = (
    <Card
      className={cn(
        "group relative flex h-full flex-col border-gray-200 bg-white p-6 shadow-sm transition-colors",
        detailsHref ? "hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/10" : "hover:shadow-lg",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {logo && <Image src={logo} alt="" width={32} height={32} className="size-8 shrink-0 object-contain" />}
          <h3 className="min-w-0 break-words text-xl font-bold tracking-tight text-gray-950">{name}</h3>
        </div>
        {context && (
          <span
            className={cn(
              "max-w-[50%] shrink-0 rounded-full px-2.5 py-1 text-right text-xs font-semibold",
              isProfessional
                ? "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-1 dark:ring-inset dark:ring-blue-300/20"
                : "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-1 dark:ring-inset dark:ring-emerald-300/20",
            )}
          >
            {contextLabel}
          </span>
        )}
      </div>

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
