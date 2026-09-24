export interface CourseMetadata { id: string; certificateUrl?: string; topics: string[]; }
export interface Certification { id: string; issuer: string; issuedAt?: string; credentialUrl?: string; skills?: string[]; }

export const courses = [
  {
    id: "aws-solutions-architect" as const,
    certificateUrl: "https://www.udemy.com/certificate/UC-8e298cda-8914-482d-91ec-064e5b17e708/",
    topics: [
      "AWS",
      "EC2",
      "Elastic Load Balancing",
      "Auto Scaling",
      "S3",
      "RDS",
      "DynamoDB",
      "Lambda",
      "API Gateway",
      "IAM",
      "VPC",
      "CloudFront",
      "Route 53",
      "SQS & SNS",
      "CloudWatch",
      "AWS Security",
      "High Availability & Disaster Recovery",
      "AWS Well-Architected Framework"
    ]
  },
  {
    id: "azure-developer" as const,
    certificateUrl: "https://www.udemy.com/certificate/UC-eaf202bd-3463-4d66-89ff-89f5da0f8c30/",
    topics: [
      "Microsoft Azure",
      "Azure App Service",
      "Azure Functions",
      "Azure Storage",
      "Cosmos DB",
      "Microsoft Entra ID",
      "Azure Key Vault",
      "Application Insights",
      "API Management",
      "Azure Containers"
    ]
  },
  {
    id: "redis" as const,
    certificateUrl: "https://www.udemy.com/certificate/UC-e6689370-8d23-46e6-b984-c537e72af619/",
    topics: [
      "Redis",
      "Caching",
      "Data Structures",
      "Streams",
      "Pub/Sub"
    ]
  },
  {
    id: "nodejs" as const,
    certificateUrl: "https://www.udemy.com/certificate/UC-62c3b77d-53c5-42b4-912e-cd362a629283/",
    topics: [
      "Node.js",
      "REST APIs",
      "GraphQL",
      "Authentication",
      "Backend Development"
    ]
  },
  {
    id: "nestjs" as const,
    certificateUrl: "https://www.udemy.com/certificate/UC-ea6057ea-ae6a-415d-a927-395a9bc93fd5/",
    topics: [
      "NestJS",
      "TypeScript",
      "REST APIs",
      "Dependency Injection",
      "Backend Architecture"
    ]
  },
  {
    id: "oauth" as const,
    certificateUrl: "https://www.udemy.com/certificate/UC-e0b8385e-0e43-4444-ad76-29073e18181f/",
    topics: [
      "OAuth 2.0",
      "OpenID Connect",
      "Authentication",
      "Authorization",
      "Security"
    ]
  },
  {
    id: "aspnet-core" as const,
    certificateUrl: "https://www.udemy.com/certificate/UC-02e9ee4d-8a7b-45e8-bb9e-ee303fae1a36/",
    topics: [
      "ASP.NET Core",
      "REST APIs",
      "Entity Framework Core",
      "Authentication & Authorization",
      "Azure Deployment"
    ]
  },
  {
    id: "dotnet-microservices" as const,
    certificateUrl: "https://www.udemy.com/certificate/UC-abd82dcd-51da-4b57-9949-d22f4f702c27/",
    topics: [
      "Microservices",
      "RabbitMQ",
      "MongoDB",
      "JWT",
      "Docker Compose"
    ]
  },
  {
    id: "sql-server" as const,
    certificateUrl: "https://www.udemy.com/certificate/UC-QOG4YRVW/",
    topics: [
      "SQL Server",
      "Backup & Restore",
      "Security",
      "SQL Server Agent",
      "Database Storage"
    ]
  }
] satisfies CourseMetadata[];

export const certifications: Certification[] = [];
export type Course = (typeof courses)[number];
