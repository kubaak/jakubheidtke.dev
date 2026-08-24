"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
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
  "React.js": { icon: SiReact, color: "#61DAFB" },
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
  { label: "Frontend development", skills: ["React.js", "Next.js", "Vite", "Tailwind CSS"] },
  { label: "Data & persistence", skills: ["Entity Framework Core", "Dapper", "TypeORM", "PostgreSQL", "Azure SQL", "SQL Server", "MongoDB", "Mongoose", "Redis", "Oracle"] },
  { label: "Quality & testing", skills: ["Moq", "xUnit", "NUnit", "Jest"] },
  { label: "Source control & CI/CD", skills: ["GitHub", "GitLab", "Azure DevOps"] },
  { label: "Distributed systems", skills: ["MediatR", "Kafka", "RabbitMQ", "Azure Service Bus", "Hangfire"] },
  { label: "Platform & observability", skills: ["Docker", "Kubernetes", "AWS", "New Relic", "Grafana", "Windows", "Linux"] },
];

export function Skills({ skills }: SkillsProps) {
  const reduceMotion = useReducedMotion();
  const groupedSkills = skillGroups
    .map((group) => ({ ...group, skills: group.skills.filter((skill) => skills.includes(skill)) }))
    .filter((group) => group.skills.length > 0);
  const listedSkills = new Set(groupedSkills.flatMap((group) => group.skills));
  const remainingSkills = skills.filter((skill) => !listedSkills.has(skill));

  function renderSkill(skill: string) {
    const item = brandedSkills[skill];
    const Icon = item?.icon;

    return (
      <li key={skill}>
        <motion.div
          whileHover={reduceMotion ? undefined : { y: -2, x: 2 }}
          transition={{ type: "spring", stiffness: 420, damping: 22 }}
          className="flex h-10 items-center gap-3 rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 text-xl shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50"
        >
          {item?.src ? (
            <Image src={item.src} alt="" width={28} height={28} className="size-7 shrink-0 object-contain" />
          ) : Icon ? (
            <Icon aria-hidden="true" focusable="false" className="size-7 shrink-0" style={{ color: item?.color }} />
          ) : null}
          <span className="truncate text-sm font-semibold text-gray-700">{skill}</span>
        </motion.div>
      </li>
    );
  }

  return (
    <>
      <div className="mt-5 space-y-6">
        {groupedSkills.map((group) => (
          <section key={group.label} aria-label={group.label}>
            <h3 className="text-xs font-bold tracking-[0.12em] text-brand-600 uppercase">{group.label}</h3>
            <ul className="mt-2 space-y-1.5">{group.skills.map(renderSkill)}</ul>
          </section>
        ))}

        {remainingSkills.length > 0 && (
          <section aria-label="Additional technologies">
            <h3 className="text-xs font-bold tracking-[0.12em] text-brand-600 uppercase">Additional tools</h3>
            <ul className="mt-2 space-y-1.5">{remainingSkills.map(renderSkill)}</ul>
          </section>
        )}
      </div>
    </>
  );
}
