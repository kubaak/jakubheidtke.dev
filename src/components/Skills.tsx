"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useId, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiApachekafka,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiGithub,
  SiGitlab,
  SiGrafana,
  SiJavascript,
  SiKubernetes,
  SiMoq,
  SiMongodb,
  SiMongoose,
  SiNestjs,
  SiNewrelic,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRabbitmq,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiTypeorm,
  SiJest,
  SiVite,
} from "react-icons/si";
import { DiAws, DiLinux, DiMsqlServer, DiWindows } from "react-icons/di";
import { GrOracle } from "react-icons/gr";
import { TbBrandAzure, TbBrandCSharp } from "react-icons/tb";
import { VscAzureDevops } from "react-icons/vsc";

interface SkillsProps {
  skills: string[];
}

interface SkillIcon {
  color?: string;
  icon?: IconType;
  src?: string;
}

const brandedSkills: Record<string, SkillIcon> = {
  ".NET": { icon: SiDotnet, color: "#512BD4" },
  "C#": { icon: TbBrandCSharp, color: "#512BD4" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  "Nest.js": { icon: SiNestjs, color: "#E0234E" },
  "Express.js": { icon: SiExpress, color: "#000000" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "ASP.NET Core": { icon: SiDotnet, color: "#512BD4" },
  "Entity Framework Core": { src: "/skills/entity-framework-core.svg" },
  Dapper: { src: "/skills/dapper.svg" },
  TypeORM: { icon: SiTypeorm, color: "#FE0803" },
  MediatR: { src: "/skills/mediatr.svg" },
  Moq: { icon: SiMoq, color: "#5B5B5B" },
  xUnit: { src: "/skills/xunit.svg" },
  NUnit: { src: "/skills/nunit.svg" },
  React: { icon: SiReact, color: "#61DAFB" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  Redis: { icon: SiRedis, color: "#FF4438" },
  Mongoose: { icon: SiMongoose, color: "#880000" },
  Jest: { icon: SiJest, color: "#C21325" },
  Kafka: { icon: SiApachekafka, color: "#231F20" },
  "Azure Service Bus": { icon: TbBrandAzure, color: "#0078D4" },
  Hangfire: { src: "/skills/hangfire.svg" },
  Kubernetes: { icon: SiKubernetes, color: "#326CE5" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  "Azure SQL": { icon: TbBrandAzure, color: "#0078D4" },
  "SQL Server": { icon: DiMsqlServer, color: "#CC2927" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Oracle: { icon: GrOracle, color: "#F80000" },
  RabbitMQ: { icon: SiRabbitmq, color: "#FF6600" },
  "Azure DevOps": { icon: VscAzureDevops, color: "#0078D7" },
  GitLab: { icon: SiGitlab, color: "#FC6D26" },
  GitHub: { icon: SiGithub, color: "#181717" },
  Vite: { icon: SiVite, color: "#646CFF" },
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  AWS: { icon: DiAws, color: "#FF9900" },
  "New Relic": { icon: SiNewrelic, color: "#1CE783" },
  Grafana: { icon: SiGrafana, color: "#F46800" },
  Windows: { icon: DiWindows, color: "#0078D4" },
  Linux: { icon: DiLinux, color: "#000000" },
};

const skillGroups = [
  { label: "Languages", skills: ["C#", "JavaScript", "TypeScript"] },
  { label: "Backend development", skills: [".NET", "ASP.NET Core", "Node.js", "Nest.js", "Express.js"] },
  { label: "Frontend development", skills: ["React", "Next.js", "Vite", "Tailwind CSS"] },
  {
    label: "Data & persistence",
    skills: [
      "Entity Framework Core",
      "Dapper",
      "TypeORM",
      "PostgreSQL",
      "Azure SQL",
      "SQL Server",
      "MongoDB",
      "Mongoose",
      "Redis",
      "Oracle",
    ],
  },
  { label: "Quality & testing", skills: ["Moq", "xUnit", "NUnit", "Jest"] },
  { label: "Source control & CI/CD", skills: ["GitHub", "GitLab", "Azure DevOps"] },
  { label: "Distributed systems", skills: ["MediatR", "Kafka", "RabbitMQ", "Azure Service Bus", "Hangfire"] },
  {
    label: "Platform & observability",
    skills: ["Docker", "Kubernetes", "AWS", "New Relic", "Grafana", "Windows", "Linux"],
  },
];

interface SkillCarouselProps {
  label: string;
  skills: string[];
  sequence: number;
  reduceMotion: boolean | null;
}

function SkillCard({ skill, iconOnly = false }: { skill: string; iconOnly?: boolean }) {
  const item = brandedSkills[skill];
  const Icon = item?.icon;

  return (
    <div
      aria-label={iconOnly ? skill : undefined}
      title={iconOnly ? skill : undefined}
      className={`flex h-12 w-fit max-w-full items-center rounded-xl border border-gray-200 bg-white py-2 text-xl shadow-sm ${
        iconOnly ? "justify-center px-2.5" : "gap-3 px-2.5"
      }`}
    >
      {item?.src ? (
        <Image src={item.src} alt="" width={28} height={28} className="size-7 shrink-0 object-contain" />
      ) : Icon ? (
        <Icon aria-hidden="true" focusable="false" className="size-7 shrink-0" style={{ color: item?.color }} />
      ) : null}
      {!iconOnly && <span className="min-w-0 truncate text-sm font-semibold text-gray-700">{skill}</span>}
    </div>
  );
}

function SkillCarousel({ label, skills, sequence, reduceMotion }: SkillCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(() => sequence % skills.length);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = useId();

  function offsetFromActive(index: number) {
    const directOffset = index - activeIndex;
    const halfLength = skills.length / 2;

    if (directOffset > halfLength) {
      return directOffset - skills.length;
    }

    if (directOffset < -halfLength) {
      return directOffset + skills.length;
    }

    return directOffset;
  }

  useEffect(() => {
    if (isExpanded || reduceMotion || skills.length < 2) {
      return;
    }

    const interval = window.setInterval(
      () => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % skills.length);
      },
      5000 + sequence * 200,
    );

    return () => window.clearInterval(interval);
  }, [isExpanded, reduceMotion, sequence, skills.length]);

  return (
    <section aria-label={label}>
      <h3>
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={() => setIsExpanded((expanded) => !expanded)}
          className="flex w-full items-center justify-between gap-3 text-left text-xs font-bold tracking-[0.12em] text-brand-600 uppercase"
        >
          <span>{label}</span>
          <span
            aria-hidden="true"
            className={`text-lg leading-none transition-transform ${isExpanded ? "rotate-45" : ""}`}
          >
            +
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false} mode="wait">
        {isExpanded ? (
          <motion.ul
            key="all-skills"
            id={contentId}
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="mt-2 flex flex-wrap gap-1 overflow-hidden"
          >
            {skills.map((skill) => (
              <li key={skill}>
                <SkillCard skill={skill} />
              </li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            key="carousel"
            id={contentId}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative mt-2 h-12"
            style={{ perspective: "600px" }}
          >
            <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
              {skills.map((skill, index) => {
                const offset = offsetFromActive(index);
                const angle = offset * 36;
                const isVisible = Math.abs(offset) <= 1;
                const radians = (angle * Math.PI) / 180;

                return (
                  <motion.div
                    key={skill}
                    aria-hidden={offset !== 0}
                    animate={{
                      x: Math.sin(radians) * 76,
                      z: Math.cos(radians) * 76 - 76,
                      rotateY: -angle,
                      opacity: isVisible ? (offset === 0 ? 1 : 0.42) : 0,
                      scale: offset === 0 ? 1 : 0.92,
                    }}
                    transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 24 }}
                    className="absolute top-0 left-1/2 -ml-6"
                    style={{
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                      zIndex: 10 - Math.abs(offset),
                    }}
                  >
                    <SkillCard skill={skill} iconOnly />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function Skills({ skills }: SkillsProps) {
  const reduceMotion = useReducedMotion();
  const groupedSkills = skillGroups
    .map((group) => ({ ...group, skills: group.skills.filter((skill) => skills.includes(skill)) }))
    .filter((group) => group.skills.length > 0);
  const listedSkills = new Set(groupedSkills.flatMap((group) => group.skills));
  const remainingSkills = skills.filter((skill) => !listedSkills.has(skill));

  return (
    <>
      <div className="mt-5 grid gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-4">
        {groupedSkills.map((group, index) => (
          <SkillCarousel
            key={group.label}
            label={group.label}
            skills={group.skills}
            sequence={index}
            reduceMotion={reduceMotion}
          />
        ))}

        {remainingSkills.length > 0 && (
          <SkillCarousel
            label="Additional tools"
            skills={remainingSkills}
            sequence={groupedSkills.length}
            reduceMotion={reduceMotion}
          />
        )}
      </div>
    </>
  );
}
