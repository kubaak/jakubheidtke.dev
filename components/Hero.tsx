"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Profile } from "@/data/content";

interface HeroProps {
  profile: Profile;
}

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero({ profile }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const [photoLoaded, setPhotoLoaded] = useState(false);

  return (
    <section id="home" className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_12%_12%,rgba(156,12,70,0.16),transparent_27%),radial-gradient(circle_at_83%_28%,rgba(227,187,203,0.7),transparent_25%)]" />
      <div className="mx-auto grid min-h-[39rem] max-w-6xl gap-12 px-4 pt-[4.5rem] pb-20 md:grid-cols-[1.08fr_0.92fr] md:items-center md:pt-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.11 } } }}
        >
          <motion.p
            variants={rise}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/75 px-3 py-1.5 text-xs font-bold tracking-[0.14em] text-brand-700 uppercase shadow-sm"
          >
            <span className="size-2 rounded-full bg-brand-500" />
            {profile.hero.tagline}
          </motion.p>

          <motion.h1
            variants={rise}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-4xl leading-[0.98] font-black tracking-[-0.055em] text-gray-950 sm:text-5xl lg:text-6xl"
          >
            <span className="text-brand-600">Full-stack</span> Engineer
          </motion.h1>

          <motion.p
            variants={rise}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-lg leading-8 text-gray-600"
          >
            {profile.hero.description}
          </motion.p>

          <motion.div
            variants={rise}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <motion.a
              href={profile.hero.primaryCta.href}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-colors hover:bg-brand-700"
            >
              {profile.hero.primaryCta.label} <span aria-hidden="true">→</span>
            </motion.a>
            <motion.a
              href={profile.hero.secondaryCta.href}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-brand-200 hover:bg-brand-50"
            >
              {profile.hero.secondaryCta.label}
            </motion.a>
          </motion.div>

          <motion.div
            variants={rise}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex items-center gap-5 text-sm text-gray-500"
          >
            <span>
              <strong className="font-bold text-gray-900">10+</strong> years shipping software
            </span>
            <span className="h-4 w-px bg-gray-300" />
            <span className="flex items-center gap-2">
              Remote · Czechia, EU
              <span className="flex -space-x-1.5" aria-label="European Union and Czech Republic">
                <span
                  className="size-8 overflow-hidden rounded-full border-2 border-white shadow-sm"
                  role="img"
                  aria-label="European Union flag"
                >
                  <Image
                    src="/flags/european-union.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span
                  className="size-8 overflow-hidden rounded-full border-2 border-white shadow-sm"
                  role="img"
                  aria-label="Czech Republic flag"
                >
                  <Image
                    src="/flags/czech-republic.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </span>
              </span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm md:mr-0"
        >
          <div className="absolute -inset-4 -z-10 rounded-full bg-brand-200/55 blur-2xl" />
          <div
            className="overflow-hidden rounded-full border border-white/90 bg-white p-3 shadow-2xl shadow-brand-900/15"
            style={{ perspective: 1200 }}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, rotateY: -180, scale: 0.86 }}
              animate={reduceMotion || photoLoaded ? { opacity: 1, rotateY: 0, scale: 1 } : undefined}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                width={520}
                height={520}
                preload
                onLoad={() => setPhotoLoaded(true)}
                className="aspect-square w-full rounded-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
