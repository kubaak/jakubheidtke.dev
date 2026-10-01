export interface ProjectLink {
  type: "website" | "github" | "frontend" | "backend";
  href: string;
}

export type ProjectSlug =
  | "plainlysmart"
  | "hostomat"
  | "personal-portfolio"
  | "tubester"
  | "i18n-process-tools"
  | "logistics-order-service"
  | "product-availability-and-reservations"
  | "gdpr-management";

export type ProjectType = "personal" | "professional";

export interface Project {
  slug: ProjectSlug;
  logo?: string;
  tags: string[];
  featured?: boolean;
  links: ProjectLink[];
  type: ProjectType;
}

export const projects: Project[] = [
  {
    slug: "plainlysmart",
    logo: "https://plainlysmart.com/icon.svg?icon.2dfw3bn2t1fcx.svg",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "next-intl",
      "React Hook Form",
      "Zod",
      "Cloudflare Turnstile",
      "Playwright",
      "AWS",
      "Serverless",
      "CDK",
      "CloudFormation",
    ],
    featured: true,
    links: [
      {
        type: "website",
        href: "https://plainlysmart.com",
      },
    ],
    type: "personal",
  },
  {
    slug: "hostomat",
    tags: ["NestJS", "Node.js", "TypeScript", "MongoDB", "Mongoose", "Jest"],
    featured: true,
    links: [
      {
        type: "github",
        href: "https://github.com/kubaak/hostomat-api",
      },
    ],
    type: "personal",
  },
  {
    slug: "personal-portfolio",
    logo: "https://www.jakubheidtke.com/JHGradientMaroon.svg",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "next-intl", "Playwright"],
    featured: true,
    links: [
      {
        type: "website",
        href: "https://jakubheidtke.com",
      },
      {
        type: "frontend",
        href: "https://github.com/kubaak/jakubheidtke.dev",
      },
    ],
    type: "personal",
  },
  {
    slug: "tubester",
    logo: "https://tubester.app/tubester_logo.png",
    tags: [
      ".NET",
      "C#",
      "React",
      "React Hook Form",
      "TypeScript",
      "PostgreSQL",
      "Hangfire",
      "AI",
      "RAG",
      "pgvector",
      "YouTube API",
      "Docker",
      "Kubernetes",
      "Prometheus",
      "Loki",
      "Grafana",
    ],
    featured: true,
    links: [
      {
        type: "website",
        href: "https://tubester.app",
      },
      {
        type: "frontend",
        href: "https://github.com/kubaak/tubester-client",
      },
      {
        type: "backend",
        href: "https://github.com/kubaak/tubester",
      },
    ],
    type: "personal",
  },
  {
    slug: "i18n-process-tools",
    tags: [
      ".NET",
      "TypeScript",
      "React",
      "React Hook Form",
      "Entity Framework Core",
      "GitLab API",
      "Octokit",
      "Kubernetes",
    ],
    featured: true,
    links: [],
    type: "professional",
  },
  {
    slug: "logistics-order-service",
    tags: [
      ".NET",
      "TypeScript",
      "React",
      "React Hook Form",
      "Dapper",
      "Kafka",
      "Azure Service Bus",
      "Hangfire",
      "Kubernetes",
    ],
    featured: false,
    links: [],
    type: "professional",
  },
  {
    slug: "product-availability-and-reservations",
    tags: [".NET", "TypeScript", "React", "Dapper", "Hangfire", "Kafka", "Kubernetes"],
    links: [],
    type: "professional",
  },
  {
    slug: "gdpr-management",
    tags: [".NET", "TypeScript", "React", "React Hook Form", "Dapper", "Hangfire", "Kafka", "RabbitMq", "Kubernetes"],
    links: [],
    type: "professional",
  },
];
