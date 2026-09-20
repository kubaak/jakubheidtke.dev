import { test, expect } from "@playwright/test";
import { routing } from "../i18n/routing";
import contentEn from "../data/content.en.json" with { type: "json" };
import contentCs from "../data/content.cs.json" with { type: "json" };
import en from "../messages/en.json" with { type: "json" };
import cs from "../messages/cs.json" with { type: "json" };

const messages = { en, cs };
for (const locale of routing.locales) {
  const t = messages[locale];
  const content = { en: contentEn, cs: contentCs }[locale];
  for (const route of ["home", "projects"] as const) {
    test(`${locale} ${route} renders translated heading and metadata`, async ({ page }) => {
      await page.goto(`/${locale}${route === "home" ? "" : "/projects"}`);
      await expect(page.getByRole("heading", {
        name: route === "home" ? `Full-stack ${t.ui.engineer}` : t.pages.projectsTitle,
        exact: true,
      })).toBeVisible();
      await expect(page).toHaveTitle(t.meta[route].title + (route === "home" ? "" : " | Jakub Heidtke"));
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", t.meta[route].description);
    });
  }

  test(`${locale} project loads localized case study`, async ({ page }) => {
    const project = content.projects.items.find(item => item.slug === "tubester")!;
    await page.goto(`/${locale}/projects/tubester`);
    await expect(page.getByRole("heading", { name: project.name, exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: t.ui.overview, exact: true })).toBeVisible();
    expect(project.context).toBeTruthy();
    await expect(page.getByText(project.context!, { exact: true })).toBeVisible();
    await expect(page).toHaveTitle(`${project.name} | Jakub Heidtke`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", project.description);
  });

  for (const item of content.navigation) {
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
