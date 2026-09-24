export interface NavigationItem { id: string; href: string; }
export interface ContactLink { id: string; href: string; }
export interface Profile { name: string; email: string; photo: {src: string; alt: string}; hero: {primaryCta: {href: string}; secondaryCta: {href: string}}; }
export const profile = {
  name: "Jakub Heidtke",
  email: "mailto:jakub.heidtke@gmail.com",
  photo: {
    src: "/profile.jpg",
    alt: "Jakub Heidtke"
  },
  hero: {
    primaryCta: {
      href: "/projects"
    },
    secondaryCta: {
      href: "mailto:jakub.heidtke@gmail.com"
    }
  }
} satisfies Profile;
export const navigation = [
  {
    id: "about",
    href: "/about"
  },
  {
    id: "projects",
    href: "/projects"
  },
  {
    id: "experience",
    href: "/experience"
  },
  {
    id: "learning",
    href: "/learning"
  },
  {
    id: "contact",
    href: "/#contact"
  }
] satisfies NavigationItem[];
export const skills: string[] = [
  ".NET",
  "C#",
  "JavaScript",
  "TypeScript",
  "Nest.js",
  "Express.js",
  "Node.js",
  "ASP.NET Core",
  "Entity Framework Core",
  "Dapper",
  "TypeORM",
  "MediatR",
  "Moq",
  "xUnit",
  "NUnit",
  "React",
  "Mongoose",
  "Jest",
  "Kafka",
  "Azure Service Bus",
  "Hangfire",
  "Kubernetes",
  "Docker",
  "Azure SQL",
  "SQL Server",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Oracle",
  "RabbitMQ",
  "Azure DevOps",
  "GitLab",
  "GitHub",
  "Vite",
  "Next.js",
  "Tailwind CSS",
  "AWS",
  "New Relic",
  "Grafana",
  "Windows",
  "Linux"
];
export const contact = [
  {
    id: "email",
    href: "mailto:jakub.heidtke@gmail.com"
  },
  {
    id: "github",
    href: "https://www.github.com/kubaak"
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/jakub-heidtke"
  }
] satisfies ContactLink[];
