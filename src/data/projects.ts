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
  | "order-store-service"
  | "camunda-sink"
  | "camunda-source"
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
      "React",
      "TypeScript",
      "React Hook Form",
      "TanStack Query",
      "AG Grid",
      "Entity Framework Core",
      "SQL Server",
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
      "React",
      "TypeScript",
      "React Hook Form",
      "TanStack Query",
      "AG Grid",
      "Dapper",
      "SQL Server",
      "Kafka",
      "Azure Service Bus",
      "Hangfire",
      "Kubernetes",
      "New Relic",
    ],
    featured: false,
    links: [],
    type: "professional",
  },
  {
    slug: "order-store-service",
    tags: [
      ".NET",
      "ASP.NET Core",
      "Entity Framework Core",
      "SQL Server",
      "Azure Service Bus",
      "Event Hubs",
      "Polly",
      "Kubernetes",
      "Application Insights",
      "xUnit",
    ],
    featured: false,
    links: [],
    type: "professional",
  },
  {
    slug: "camunda-sink",
    tags: [
      ".NET",
      "ASP.NET Core",
      "Azure Service Bus",
      "Camunda",
      "Polly",
      "Azure Blob Storage",
      "Azure Table Storage",
      "Blazor",
      "Application Insights",
      "Docker",
      "Azure DevOps",
    ],
    featured: false,
    links: [],
    type: "professional",
  },
  {
    slug: "camunda-source",
    tags: [
      ".NET",
      "ASP.NET Core",
      "Camunda",
      "Azure Event Hubs",
      "Polly",
      "Application Insights",
      "Docker",
      "Kubernetes",
      "Azure DevOps",
      "xUnit",
    ],
    featured: false,
    links: [],
    type: "professional",
  },
  {
    slug: "product-availability-and-reservations",
    tags: [
      ".NET",
      "ASP.NET Core",
      "MediatR",
      "Dapper",
      "SQL Server",
      "Kafka",
      "CloudEvents",
      "Hangfire",
      "New Relic",
      "Azure Workload Identity",
      "Kubernetes",
      "xUnit",
    ],
    featured: false,
    links: [],
    type: "professional",
  },
  {
    slug: "gdpr-management",
    tags: [".NET", "TypeScript", "React", "React Hook Form", "Dapper", "Hangfire", "Kafka", "RabbitMQ", "Kubernetes"],
    links: [],
    type: "professional",
  },
];
