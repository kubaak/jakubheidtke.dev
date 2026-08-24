"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Course } from "@/data/content";
import { Card } from "./Card";

export function CourseCard({ name, topics, certificateUrl }: Course) {
  const reduceMotion = useReducedMotion();
  const card = (
    <Card className="h-full border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5 group-focus-visible:border-brand-400 group-focus-visible:ring-2 group-focus-visible:ring-brand-600 group-focus-visible:ring-offset-2">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold tracking-tight text-gray-950">{name}</h3>
        {certificateUrl && (
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-sm font-semibold text-brand-700 transition group-hover:border-brand-400 group-hover:bg-brand-100"
          >
            →
          </span>
        )}
      </div>

      {topics && topics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </Card>
  );

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 360, damping: 24 }}
      className="h-full"
    >
      {certificateUrl ? (
        <a
          href={certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View completion certificate for ${name}`}
          title={`View completion certificate for ${name}`}
          className="group block h-full rounded-2xl"
        >
          {card}
        </a>
      ) : (
        card
      )}
    </motion.div>
  );
}
