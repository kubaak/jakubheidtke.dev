import { test, expect } from "@playwright/test";
import { routing } from "../i18n/routing";
import en from "../data/content.en.json" with { type: "json" };
import cs from "../data/content.cs.json" with { type: "json" };

const slugs = en.projects.items.map((project) => project.slug);
const paths = ["", "/projects", "/learning", "/about", "/experience", ...slugs.map((slug) => "/projects/" + slug)];

for (const locale of routing.locales) {
  test(`exported ${locale} pages have localized HTML, links and SEO`, async ({ request, page }) => {
    await page.addInitScript(() => localStorage.setItem("preferredLocale", "cs"));
    for (const path of paths) {
      const url = "/" + locale + path;
      const response = await request.get(url);
      expect(response.status()).toBe(200);
      const html = await response.text();
      expect(html).toContain(`<html lang="${locale}"`);
      expect(html).toContain(`rel="canonical" href="https://jakubheidtke.com${url}"`);
      for (const alternate of routing.locales)
        expect(html).toContain(`hrefLang="${alternate}" href="https://jakubheidtke.com/${alternate}${path}"`);
      await page.goto(url);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page).toHaveURL(url);
      for (const href of await page
        .locator('a[href^="/"]')
        .evaluateAll((links) => links.map((link) => link.getAttribute("href")!))) {
        expect(href).toMatch(/^\/(en|cs)(\/|$|#|\?)/);
      }
    }
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
  });
}

const detectionCases = [
  { languages: ["cs-CZ", "en-US", "en"], expected: "cs" },
  { languages: ["cs-CZ", "en-US"], expected: "cs" },
  { languages: ["en-US", "cs-CZ"], expected: "en" },
  { languages: ["de-DE", "cs-CZ", "en"], expected: "cs" },
  { languages: ["de-DE", "fr-FR", "en-US"], expected: "en" },
  { languages: ["de-DE", "fr-FR"], expected: "en" },
  { languages: ["en-GB", "cs-CZ"], expected: "en" },
  { languages: ["CS-cz"], expected: "cs" },
  { languages: [], expected: "en" },
  { languages: ["cs-CZ"], stored: "en", expected: "en" },
  { languages: ["en-US"], stored: "cs", expected: "cs" },
  { languages: ["cs-CZ"], stored: "de", expected: "cs" },
];
for (const scenario of detectionCases) {
  test(`root detection ${JSON.stringify(scenario)}`, async ({ page }) => {
    await page.addInitScript(
      ({ languages, stored }) => {
        Object.defineProperty(navigator, "languages", { value: languages });
        Object.defineProperty(navigator, "language", { value: "de-DE" });
        if (stored) localStorage.setItem("preferredLocale", stored);
      },
      { languages: scenario.languages, stored: scenario.stored },
    );
    await page.goto("/");
    await expect(page).toHaveURL("/" + scenario.expected);
    await expect(page.locator("html")).toHaveAttribute("lang", scenario.expected);
    expect(await page.evaluate(() => localStorage.getItem("preferredLocale"))).toBe(scenario.stored ?? null);
  });
}

test("language dropdown switches the language after the page is rendered", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    // Check React diagnostics; static-server prefetch failures are a separate concern.
    if (message.type() === "error" && /script tag|hydrat/i.test(message.text())) errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/en/projects");
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  // The theme button receives its specific label after the client layout effect runs.
  await expect(page.getByRole("button", { name: /^Switch to (dark|light) mode$/ })).toBeVisible();

  const currentLanguage = page.getByRole("button", { name: "EN", exact: true });
  const alternative = page.getByRole("link", { name: "Switch to Czech", exact: true });
  await expect(currentLanguage).toBeVisible();
  await expect(currentLanguage).toHaveAttribute("aria-expanded", "false");
  await expect(alternative).toBeHidden();

  await currentLanguage.click();
  await expect(currentLanguage).toHaveAttribute("aria-expanded", "true");
  await expect(alternative).toBeVisible();
  await alternative.click();

  await expect(page).toHaveURL("/cs/projects");
  await expect(page.locator("html")).toHaveAttribute("lang", "cs");
  await expect(page.getByRole("heading", { name: "Projekty", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeHidden();
  await expect(page.getByRole("button", { name: "CS", exact: true })).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("link", { name: "Přepnout do angličtiny", exact: true })).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem("preferredLocale"))).toBe("cs");
  expect(errors).toEqual([]);
});

for (const path of ["", "/projects", "/learning", "/projects/tubester"]) {
  test(`language switch preserves ${path || "home"} and remembers explicit choice`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/en" + path);
    await page.getByRole("button", { name: /^(EN|CS)$/ }).click();
    await page.getByRole("link", { name: "Switch to Czech", exact: true }).click();
    await expect(page).toHaveURL("/cs" + path);
    await expect(page.locator("html")).toHaveAttribute("lang", "cs");
    expect(await page.evaluate(() => localStorage.getItem("preferredLocale"))).toBe("cs");
    await page.getByRole("button", { name: /^(EN|CS)$/ }).click();
    await page.getByRole("link", { name: "Přepnout do angličtiny", exact: true }).click();
    await expect(page).toHaveURL("/en" + path);
    expect(await page.evaluate(() => localStorage.getItem("preferredLocale"))).toBe("en");
    await page.goto("/");
    await expect(page).toHaveURL("/en");
    expect(errors).toEqual([]);
  });
}

test("URL wins over browser and stored preferences in either direction", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "languages", { value: ["cs-CZ"] });
    localStorage.setItem("preferredLocale", "cs");
  });
  await page.goto("/en/projects");
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  await page.reload();
  await expect(page).toHaveURL("/en/projects");
  await page.evaluate(() => localStorage.setItem("preferredLocale", "en"));
  await page.getByRole("button", { name: /^(EN|CS)$/ }).click();
  await page.getByRole("link", { name: "Switch to Czech", exact: true }).click();
  await page.evaluate(() => localStorage.setItem("preferredLocale", "en"));
  await page.goto("/cs/learning");
  await expect(page.getByRole("heading", { name: "Vzdělání a profesní rozvoj", exact: true })).toBeVisible();
});

test("switch preserves query and fragment; storage failure does not break navigation", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "languages", { value: ["cs-CZ"] });
    Storage.prototype.getItem = () => {
      throw new Error("Storage blocked");
    };
    Storage.prototype.setItem = () => {
      throw new Error("Storage blocked");
    };
  });
  await page.goto("/");
  await expect(page).toHaveURL("/cs");
  await page.goto("/en/projects/tubester?source=test#details");
  await page.getByRole("button", { name: /^(EN|CS)$/ }).click();
  await page.getByRole("link", { name: "Switch to Czech", exact: true }).click();
  await expect(page).toHaveURL("/cs/projects/tubester?source=test#details");
});

test("root is noindex; removed/unsupported routes return 404; sitemap contains all locale/slug combinations", async ({
  request,
}) => {
  const root = await request.get("/");
  expect(await root.text()).toContain("noindex, follow");
  for (const path of [
    "/de",
    "/de/projects",
    "/projects",
    "/learning",
    "/about",
    "/experience",
    "/en/projects/unknown",
  ]) {
    expect((await request.get(path)).status()).toBe(404);
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const locale of routing.locales)
    for (const path of paths) expect(sitemap).toContain(`https://jakubheidtke.com/${locale}${path}`);
  expect(cs.projects.items.map((project) => project.slug)).toEqual(slugs);
});

test("direct Czech URL respects URL over English browser and storage", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "languages", { value: ["en-US"] });
    localStorage.setItem("preferredLocale", "en");
  });
  await page.goto("/cs/projects");
  await expect(page.getByRole("heading", { name: "Projekty", exact: true })).toBeVisible();
  await page.reload();
  await expect(page).toHaveURL("/cs/projects");
  expect(await page.evaluate(() => localStorage.getItem("preferredLocale"))).toBe("en");
});

test("root redirect replaces its history entry", async ({ page }) => {
  await page.goto("/en/learning");
  await page.goto("/");
  await expect(page).toHaveURL("/en");
  await page.goBack();
  await expect(page).toHaveURL("/en/learning");
});

test("mobile navbar keeps language switcher visible and usable", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/en/projects/tubester");
  const switcher = page.getByRole("link", { name: "Switch to Czech", exact: true });
  await page.getByRole("button", { name: /^(EN|CS)$/ }).click();
  await expect(switcher).toBeInViewport();
  await switcher.click();
  await expect(page).toHaveURL("/cs/projects/tubester");
  await expect(page.getByRole("navigation", { name: "Mobilní navigace" })).toBeVisible();
});

for (const source of ["explicit", "system"] as const) {
  test(`language switch preserves dark theme from ${source} preference`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: source === "system" ? "dark" : "light" });
    await page.goto("/en/projects/tubester");
    if (source === "explicit") {
      await page.getByRole("button", { name: "Switch to dark mode", exact: true }).click();
    }
    const root = page.locator("html");
    await expect(root).toHaveClass(/dark/);
    const background = await page.locator("body").evaluate(element => getComputedStyle(element).backgroundColor);
    for (const [label, url] of [
      ["Switch to Czech", "/cs/projects/tubester"],
      ["Přepnout do angličtiny", "/en/projects/tubester"],
    ]) {
      await page.getByRole("button", { name: /^(EN|CS)$/ }).click();
      await page.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(url);
      await expect(root).toHaveClass(/dark/);
      await expect(root).toHaveCSS("color-scheme", "dark");
      await expect(page.locator("body")).toHaveCSS("background-color", background);
      expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(source === "explicit" ? "dark" : null);
    }
    await page.reload();
    await expect(root).toHaveClass(/dark/);
    await expect(page.getByRole("button", { name: "Switch to light mode", exact: true })).toBeVisible();
  });
}
