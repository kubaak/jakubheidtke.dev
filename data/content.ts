export interface Hero {
  tagline: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

export interface Profile {
  name: string;
  email: string;
  hero: Hero;
  photo: {
    src: string;
    alt: string;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface About {
  heading: string;
  paragraphs: string[];
  summaryPoints: string[];
  skills: string[];
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  appHref?: string;
  githubHref?: string;
}

export interface Projects {
  heading: string;
  items: Project[];
}

export interface ExperienceItem {
  role: string;
  company?: string;
  period: string;
  highlights: string[];
}

export interface Experience {
  heading: string;
  items: ExperienceItem[];
}

export interface EducationItem {
  school: string;
  period: string;
  degree: string;
  description?: string;
}

export interface Education {
  heading: string;
  items: EducationItem[];
}

export interface Certification {
  name: string;
  issuer: string;
  issuedAt?: string;
  credentialUrl?: string;
  skills?: string[];
}

export interface Course {
  name: string;
  topics?: string[];
  certificateUrl?: string;
}

export interface Learning {
  heading: string;
  formalEducation: {
    heading: string;
  };
  certifications: {
    heading: string;
    items: Certification[];
  };
  courses: {
    heading: string;
    items: Course[];
  };
}

export interface ContactLink {
  label: string;
  href: string;
}

export interface Contact {
  heading: string;
  description: string;
  links: ContactLink[];
}

export interface Footer {
  text: string;
}

export interface Content {
  profile: Profile;
  navigation: NavigationItem[];
  about: About;
  projects: Projects;
  experience: Experience;
  education: Education;
  learning: Learning;
  contact: Contact;
  footer: Footer;
}

