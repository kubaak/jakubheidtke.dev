import { test, expect } from "@playwright/test";
import { readPreferredLocale, storePreferredLocale } from "../../src/i18n/preference";
import { routing, type Locale } from "../../src/i18n/routing";

let values: Map<string, string>;
let original: PropertyDescriptor | undefined;
test.beforeEach(() => {
  values = new Map();
  original = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    },
  });
});
test.afterEach(() => {
  if (original) Object.defineProperty(globalThis, "localStorage", original);
  else Reflect.deleteProperty(globalThis, "localStorage");
});

for (const stored of [...routing.locales, "de", "", null, "cs-CZ", "EN"]) {
  test(`reads stored preference ${JSON.stringify(stored)}`, () => {
    if (stored !== null) values.set("preferredLocale", stored);
    expect(readPreferredLocale()).toBe(stored === "en" || stored === "cs" ? stored : undefined);
  });
}

for (const locale of routing.locales) {
  test(`persists explicit ${locale} choice`, () => {
    storePreferredLocale(locale);
    expect(values.get("preferredLocale")).toBe(locale);
    expect(readPreferredLocale()).toBe(locale);
  });
}

test("rejects invalid runtime values without overwriting a valid preference", () => {
  storePreferredLocale(routing.defaultLocale);
  for (const value of ["de", "", null, undefined, "cs-CZ", {}, ["en"]]) {
    storePreferredLocale(value as Locale);
    expect(values.get("preferredLocale")).toBe(routing.defaultLocale);
  }
});

test("blocked storage is safe for both reads and writes", () => {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    get() { throw new Error("Storage blocked"); },
  });
  expect(readPreferredLocale()).toBeUndefined();
  expect(() => storePreferredLocale(routing.defaultLocale)).not.toThrow();
});
