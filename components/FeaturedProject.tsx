"use client";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "motion/react";

interface FeaturedProjectProps {
  name: string;
  description: string;
  detailsHref: string;
  index: number;
}

export function FeaturedProject({ name, description, detailsHref }: FeaturedProjectProps) {
  const t = useTranslations("ui");
  const reduceMotion = useReducedMotion();

  return (
    <Link
      href={detailsHref}
      aria-label={t("projectDetails", { name })}
      className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
    >
      <motion.article
        whileHover={reduceMotion ? undefined : { y: -6 }}
        transition={{ type: "spring", stiffness: 360, damping: 24 }}
        className="relative flex min-h-60 h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors group-hover:border-brand-300 group-hover:shadow-xl group-hover:shadow-brand-900/10"
      >
        <h3 className="text-xl font-bold tracking-tight text-gray-950">{name}</h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>

        <div className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-brand-700 transition-colors group-hover:text-brand-900">
          {t("learnMore")}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            →
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
