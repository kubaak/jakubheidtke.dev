import { test, expect } from "@playwright/test";
import { createTranslator } from "next-intl";
import { projects } from "../../src/data/projects";
import { navigation, contact } from "../../src/data/site";
import { experience } from "../../src/data/experience";
import { education } from "../../src/data/education";
import { courses } from "../../src/data/learning";
import en from "../../messages/en.json" with { type: "json" };
import cs from "../../messages/cs.json" with { type: "json" };

function structure(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(structure);
  if (value && typeof value === "object")
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, structure(item)]));
  return typeof value;
}

test("English and Czech catalogs have symmetrical structures", () => {
  expect(structure(cs)).toEqual(structure(en));
});

for (const locale of ["en", "cs"] as const) {
  const translated = { en, cs }[locale];
  test(`${locale} translations cover every shared entry without duplicating metadata`, () => {
    const keys = (value: object) => Object.keys(value).sort();
    expect(keys(translated.projects.items)).toEqual(projects.map((item) => item.slug).sort());
    expect(keys(translated.nav)).toEqual(navigation.map((item) => item.id).sort());
    expect(keys(translated.contact.links)).toEqual(contact.map((item) => item.id).sort());
    expect(keys(translated.experience.items)).toEqual(experience.map((item) => item.id).sort());
    expect(keys(translated.education.items)).toEqual(education.map((item) => item.id).sort());
    expect(keys(translated.learning.courses.items)).toEqual(courses.map((item) => item.id).sort());
    for (const project of projects) {
      const copy = translated.projects.items[project.slug];
      expect(keys(copy.links)).toEqual(project.links.map((item) => item.type).sort());
      for (const key of ["tags", "logo", "slug", "featured"]) expect(copy).not.toHaveProperty(key);
    }
    expect(translated.profile).not.toHaveProperty("email");
    expect(translated.about).not.toHaveProperty("skills");
    for (const course of courses)
      expect(translated.learning.courses.items[course.id]).not.toHaveProperty("certificateUrl");
  });

  test(`${locale} catalog resolves localized project copy and link labels`, () => {
    const errors: Error[] = [];
    const t = createTranslator({ locale, messages: translated, onError: (error) => errors.push(error) });
    expect(t("profile.hero.description")).toBe(translated.profile.hero.description);
    expect(t.raw("about.paragraphs")).toEqual(translated.about.paragraphs);
    for (const project of projects) {
      const copy = translated.projects.items[project.slug];
      expect(t(`projects.items.${project.slug}.name`)).toBe(copy.name);
      expect(t(`projects.items.${project.slug}.description`)).toBe(copy.description);
      for (const link of project.links) expect((copy.links as Record<string, string>)[link.type]).toBeTruthy();
    }
    expect(errors).toEqual([]);
  });
}
