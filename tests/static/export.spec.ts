import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { test, expect } from "@playwright/test";
import { projects } from "../../data/projects";
import { routing } from "../../i18n/routing";

test("every exported page declares the same root favicon in its static head", async () => {
  const files = await readdir(resolve("out"), { recursive: true });
  const hrefs = new Set<string>();
  for (const file of files.filter((file) => file.endsWith(".html"))) {
    const html = await readFile(resolve("out", file), "utf8");
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1] ?? "";
    const icons = head.match(/<link\b[^>]*\brel="(?:shortcut )?icon"[^>]*>/g) ?? [];
    expect(icons, file).toHaveLength(1);
    const href = icons[0]!.match(/\bhref="([^"]+)"/)?.[1];
    expect(href, file).toMatch(/^\/favicon\.ico(?:\?[^"\s]+)?$/);
    hrefs.add(href!);
    expect(icons[0]).toContain('type="image/x-icon"');
    expect(icons[0]).toContain('sizes="96x96"');
    const url = new URL(href!, `https://jakubheidtke.com/${file.replace(/\.html$/, "")}`);
    expect(url.pathname).toBe("/favicon.ico");
    expect(await readFile(resolve("out", url.pathname.slice(1)))).toEqual(
      await readFile(resolve("src/app/favicon.ico")),
    );
  }
  for (const file of ["index.html", "en.html", "cs.html"]) expect(files).toContain(file);
  expect(hrefs.size).toBe(1);
});

test("exported favicon is a square 96px PNG-backed ICO and crawling is allowed", async () => {
  const ico = await readFile(resolve("out/favicon.ico"));
  expect(ico.readUInt16LE(0)).toBe(0);
  expect(ico.readUInt16LE(2)).toBe(1);
  expect(ico.readUInt16LE(4)).toBe(1);
  expect([ico[6], ico[7]]).toEqual([96, 96]);
  const offset = ico.readUInt32LE(18);
  const png = ico.subarray(offset, offset + ico.readUInt32LE(14));
  expect(png.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([96, 96]);
  const robots = await readFile(resolve("out/robots.txt"), "utf8");
  expect(robots).toMatch(/User-Agent: \*\s+Allow: \//i);
  expect(robots).not.toMatch(/^Disallow:\s*\S+/im);
});

// The inspected export uses en.html and en/projects.html (no trailingSlash).
for (const locale of routing.locales) {
  for (const route of [
    "",
    "/about",
    "/experience",
    "/projects",
    "/learning",
    ...projects.map((project) => `/projects/${project.slug}`),
  ]) {
    test(`static export contains /${locale}${route}`, async () => {
      const html = await readFile(resolve("out", `${locale}${route}.html`), "utf8");
      expect(html).toContain(`<html lang="${locale}"`);
      expect(html).toContain('rel="canonical"');
    });
  }
}
