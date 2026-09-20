import { test, expect } from "@playwright/test";
import { routing, isLocale } from "../../i18n/routing";
import { resolvePreferredLocale } from "../../i18n/preference";

test("central locale definitions", () => {
  expect(routing.locales).toEqual(["en", "cs"]);
  expect(routing.defaultLocale).toBe("en");
});

for (const [languages, expected] of [
  [["cs-CZ", "en-US", "en"], "cs"],
  [["en-US", "cs-CZ"], "en"],
  [["de-DE", "cs-CZ", "en"], "cs"],
  [["de-DE", "fr-FR", "en-US"], "en"],
  [["de-DE", "fr-FR"], "en"],
  [[], "en"],
  ...["cs-CZ", "cs", "CS-cz"].map(language => [[language], "cs"] as const),
  ...["en-US", "en-GB", "en"].map(language => [[language], "en"] as const),
] as const) {
  test(`resolves ${JSON.stringify(languages)} to ${expected}`, () => {
    const result = resolvePreferredLocale(languages);
    expect(result).toBe(expected);
    expect(routing.locales).toContain(result);
  });
}

for (const value of ["en", "cs", "de", "", null, undefined, "cs-CZ", "EN", 1, {}, ["en"]]) {
  test(`validates locale ${JSON.stringify(value)}`, () => {
    expect(isLocale(value)).toBe(value === "en" || value === "cs");
  });
}

test("unsupported language strings never escape the resolver", () => {
  for (const language of ["", "de", "fr-FR", "en_US", "csharp", "__proto__", "constructor"]) {
    expect(resolvePreferredLocale([language])).toBe(routing.defaultLocale);
  }
});
