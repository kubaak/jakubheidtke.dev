"use client";

import { motion, useReducedMotion } from "motion/react";

interface TechnologyListProps {
  technologies: string[];
}

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const technologyVariants = {
  hidden: { opacity: 0, x: -12, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 380, damping: 26 },
  },
};

export function TechnologyList({ technologies }: TechnologyListProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.ul
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.35 }}
      variants={listVariants}
      className="mt-3 flex flex-col items-start gap-2 text-sm"
    >
      {technologies.map((technology) => (
        <motion.li
          key={technology}
          variants={technologyVariants}
          whileHover={reduceMotion ? undefined : { x: 4, scale: 1.04 }}
          className="rounded-full border border-gray-200 bg-white/70 px-3 py-1 font-medium shadow-sm shadow-brand-900/5 transition-colors hover:border-brand-300 hover:bg-brand-50"
        >
          {technology}
        </motion.li>
      ))}
    </motion.ul>
  );
}
