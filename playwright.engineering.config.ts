import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  testMatch: ["**/chat-voice.spec.ts", "**/engineering-story.spec.ts", "**/connected-stories.spec.ts", "**/engineering-studio.spec.ts", "**/ai-atlas.spec.ts", "**/contact-desk.spec.ts"],
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 2,
  timeout: 30000,
  reporter: [
    ["list"],
    ["json", { outputFile: "artifacts/engineering-story/ui-results.json" }],
  ],
  outputDir: "test-results/engineering-story",
  use: {
    baseURL: "http://127.0.0.1:3040",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        deviceScaleFactor: 1,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: "RECRUITER_PORTAL_ENABLED=true npm run dev -- --hostname 127.0.0.1 --port 3040",
    url: "http://127.0.0.1:3040/engineering/order-once",
    reuseExistingServer: true,
    timeout: 60000,
  },
});
