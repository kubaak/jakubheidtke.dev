export interface ProjectLink { type: "website" | "github" | "frontend" | "backend"; href: string; }
export interface ProjectMetadata { slug: string; logo?: string; tags: string[]; featured?: boolean; links: ProjectLink[]; }

export const projects = [
  {
    slug: "plainlysmart" as const,
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
      "Playwright"
    ],
    featured: true,
    links: [
      {
        type: "website",
        href: "https://plainlysmart.com"
      }
    ]
  },
  {
    slug: "hostomat" as const,
    tags: [
      "NestJS",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "Jest"
    ],
    featured: true,
    links: [
      {
        type: "github",
        href: "https://github.com/kubaak/hostomat-api"
      }
    ]
  },
  {
    slug: "personal-portfolio" as const,
    logo: "https://www.jakubheidtke.com/JHGradientMaroon.svg",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "next-intl",
      "Playwright"
    ],
    featured: true,
    links: [
      {
        type: "website",
        href: "https://jakubheidtke.com"
      },
      {
        type: "frontend",
        href: "https://github.com/kubaak/jakubheidtke.dev"
      }
    ]
  },
  {
    slug: "tubester" as const,
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
      "Grafana"
    ],
    featured: true,
    links: [
      {
        type: "website",
        href: "https://tubester.app"
      },
      {
        type: "frontend",
        href: "https://github.com/kubaak/tubester-client"
      },
      {
        type: "backend",
        href: "https://github.com/kubaak/tubester"
      }
    ]
  },
  {
    slug: "i18n-process-tools" as const,
    tags: [
      ".NET",
      "TypeScript",
      "React",
      "React Hook Form",
      "Entity Framework Core",
      "GitLab API",
      "Octokit",
      "Kubernetes"
    ],
    featured: true,
    links: []
  },
  {
    slug: "logistics-order-service" as const,
    tags: [
      ".NET",
      "TypeScript",
      "React",
      "React Hook Form",
      "Dapper",
      "Kafka",
      "Azure Service Bus",
      "Hangfire",
      "Kubernetes"
    ],
    featured: false,
    links: []
  },
  {
    slug: "product-availability-and-reservations" as const,
    tags: [
      ".NET",
      "TypeScript",
      "React",
      "Dapper",
      "Hangfire",
      "Kafka",
      "Kubernetes"
    ],
    links: []
  },
  {
    slug: "gdpr-management" as const,
    tags: [
      ".NET",
      "TypeScript",
      "React",
      "React Hook Form",
      "Dapper",
      "Hangfire",
      "Kafka",
      "RabbitMq",
      "Kubernetes"
    ],
    links: []
  }
] satisfies ProjectMetadata[];

export type ProjectSlug = (typeof projects)[number]["slug"];

export type Project = (typeof projects)[number];
