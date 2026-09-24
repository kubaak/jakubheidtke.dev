export interface ExperienceEntry {
  id: string;
  company?: string;
  start: string;
  end: string | null;
}

export const experience = [
  {
    id: "independent" as const,
    start: "2025-11",
    end: null,
  },
  {
    id: "notino" as const,
    company: "Notino (devteam s.r.o.)",
    start: "2023-01",
    end: "2025-08",
  },
  {
    id: "oriflame" as const,
    company: "Oriflame (devteam s.r.o.)",
    start: "2021-09",
    end: "2022-12",
  },
  {
    id: "mscore" as const,
    company: "mScore",
    start: "2023-01",
    end: "2023-02",
  },
  {
    id: "unicorn-senior" as const,
    company: "Unicorn Systems",
    start: "2017-06",
    end: "2021-08",
  },
  {
    id: "unicorn-junior" as const,
    company: "Unicorn Systems",
    start: "2016-05",
    end: "2017-06",
  },
  {
    id: "korn-ferry" as const,
    company: "Korn Ferry",
    start: "2014-06",
    end: "2016-04",
  },
] satisfies ExperienceEntry[];
