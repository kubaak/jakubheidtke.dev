export interface EducationEntry {
  id: string;
  period: string;
}

export const education = [
  {
    id: "masters" as const,
    period: "2016 - 2017",
  },
  {
    id: "bachelors" as const,
    period: "2013 - 2016",
  },
  {
    id: "vocational" as const,
    period: "2009 - 2012",
  },
] satisfies EducationEntry[];
