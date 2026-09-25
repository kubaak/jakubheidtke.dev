import { test, expect } from "@playwright/test";
import { routing } from "../src/i18n/routing";
import { courses } from "../src/data/learning";
import { projects } from "../src/data/projects";
import { navigation } from "../src/data/site";
import en from "../messages/en.json" with { type: "json" };
import cs from "../messages/cs.json" with { type: "json" };

const messages = { en, cs };
for (const locale of routing.locales) {
  const t = messages[locale];
  for (const route of ["home", "projects"] as const) {
    test(`${locale} ${route} renders translated heading and metadata`, async ({ page }) => {
      await page.goto(`/${locale}${route === "home" ? "" : "/projects"}`);
      await expect(
        page.getByRole("heading", {
          name: route === "home" ? `Full-stack ${t.ui.engineer}` : t.pages.projectsTitle,
          exact: true,
        }),
      ).toBeVisible();
      await expect(page).toHaveTitle(t.meta[route].title + (route === "home" ? "" : " | Jakub Heidtke"));
      await expect(page.locator('\'meta[name="description"]\'')).toHaveAttribute("content", t.meta[route].description);
    });
  }

  test(`${locale} project loads localized case study`, async ({ page }) => {
    const translation = t.projects.items.tubester;
    const project = projects.find((p) => p.slug === "tubester")!;
    await page.goto(`/${locale}/projects/tubester`);
    await expect(page.getByRole("heading", { name: translation.name, exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: t.ui.overview, exact: true })).toBeVisible();
    await expect(page.getByText(t.ui[project.type], { exact: true })).toBeVisible();
    await expect(page).toHaveTitle(`${translation.name} | Jakub Heidtke`);
    await expect(page.locator('\'meta[name="description"]\'')).toHaveAttribute("content", translation.description);
  });

  for (const item of navigation) {
    test(`${locale} navbar preserves locale for ${item.href}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const nav = page.getByRole("navigation", { name: t.ui.primaryNav, exact: true });
      const href = `/${locale}${item.href.replace(/^\/(?=#|$)/, "")}`;
      await nav.locator(`a[href="${href}"]`).click();
      await expect(page).toHaveURL(href);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
    });
  }
}

for (const locale of routing.locales) {
  for (const project of projects) {
    test(`${locale} ${project.slug} preserves shared technologies and links`, async ({ page }) => {
      const copy = messages[locale].projects.items[project.slug];
      await page.goto(`/${locale}/projects/${project.slug}`);
      await expect(page.getByRole("heading", { name: copy.name, exact: true })).toBeVisible();
      const technologies = page.getByRole("complementary");
      for (const tag of project.tags) await expect(technologies.getByText(tag, { exact: true })).toBeVisible();
      for (const link of project.links) {
        await expect(page.locator(`main a[href="${link.href}"]`)).toHaveText(
          (copy.links as Record<string, string>)[link.type] + "\u2192",
        );
      }
    });
  }
}

for (const locale of routing.locales) {
  test(`${locale} learning preserves localized course names, literal topics and certificate URLs`, async ({ page }) => {
    const copy = messages[locale].learning;
    await page.goto(`/${locale}/learning`);
    for (const course of courses) {
      const card = page.locator(`main a[href="${course.certificateUrl}"]`);
      await expect(card.getByRole("heading")).toHaveText(copy.courses.items[course.id].name);
      for (const topic of course.topics) {
        await expect(card.getByText(topic, { exact: true })).toBeVisible();
      }
    }
  });

  test(`${locale} employment dates preserve their original localized presentation`, async ({ page }) => {
    await page.goto(`/${locale}/experience`);
    await expect(
      page.getByText(locale === "en" ? "Nov 2025 - Present" : "listopad 2025 \u2013 sou\u010dastnost", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(locale === "en" ? "Jan 2023 - Aug 2025" : "leden 2023 \u2013 srpen 2025", { exact: true }),
    ).toBeVisible();
  });
}
