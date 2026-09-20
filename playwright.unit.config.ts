import { defineConfig } from "@playwright/test";

// Pure helpers and filesystem contracts need neither a browser nor a server.
export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/unit/**/*.spec.ts", "**/static/**/*.spec.ts"],
  fullyParallel: true,
  workers: 2,
});
