import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage has one connected studio and keeps chat and learning distinct", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".engineering-studio")).toHaveCount(1);
  await expect(page.locator(".studio-case")).toHaveCount(2);
  await expect(page.locator(".studio-project")).toHaveCount(4);
  await expect(page.locator(".atlas-hero .primary")).toHaveAttribute(
    "href",
    "#ai-assistant",
  );
  await expect(
    page.getByRole("heading", { name: "Intelligence in practice." }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Put an idea to work." }),
  ).toHaveCount(0);
  await expect(page.locator(".atlas-dai-invitation")).toBeVisible();
  const studio = page.getByRole("navigation", {
    name: "Engineering Studio navigation",
  });
  await studio.getByRole("link", { name: /Projects/ }).click();
  await expect(page).toHaveURL(/#projects$/);
  await page
    .locator("#project-0")
    .getByRole("link", { name: "Case study" })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "The claim that arrived twice.",
      level: 1,
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Engineering Studio", exact: true })
    .click();
  await expect(page).toHaveURL(/\/engineering#projects$/);
});

test("workspace deep links preserve keyboard navigation and entered requirements", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") posts.push(request.url());
  });
  await page.route("**/api/ci-status", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Local UI test: no external CI request" }),
    }),
  );
  await page.goto("/engineering#ai-test-generator");
  const tab = page.getByRole("tab", { name: "AI-assisted test planning" });
  await expect(tab).toHaveAttribute("aria-selected", "true");
  const input = page.locator("#generator-requirements");
  await input.fill("Synthetic requirements retained when navigating tools.");
  await tab.focus();
  await tab.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Role alignment" })).toBeFocused();
  await expect(
    page.getByRole("tab", { name: "Role alignment" }),
  ).toHaveAttribute("aria-selected", "true");
  await page.getByRole("tab", { name: "Role alignment" }).press("ArrowLeft");
  await expect(input).toHaveValue(
    "Synthetic requirements retained when navigating tools.",
  );
  await page.getByRole("button", { name: "Close workspace" }).click();
  await expect(input).toBeHidden();
  await page.getByRole("button", { name: "Open workspace" }).click();
  await expect(input).toHaveValue(
    "Synthetic requirements retained when navigating tools.",
  );
  expect(posts).toEqual([]);
});

test("legacy tool hashes and project-to-tool connections open the existing workspace", async ({
  page,
}) => {
  await page.goto("/#ai-test-generator");
  await expect(
    page.getByRole("tab", { name: "AI-assisted test planning" }),
  ).toHaveAttribute("aria-selected", "true");
  await page.goto("/engineering#projects");
  await page
    .locator("#project-1")
    .getByRole("link", { name: "Plan tests" })
    .click();
  await expect(page.locator("#generator-requirements")).toBeVisible();
  await expect(
    page.locator("#project-1").getByRole("link", { name: "Repository" }),
  ).toHaveAttribute(
    "href",
    "https://github.com/kilicerdal/playwright-ai-automation",
  );
});

test("studio fits desktop and mobile and passes selected accessibility checks", async ({
  page,
}, info) => {
  await page.goto("/engineering");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.screenshot({
    path: `artifacts/engineering-story/studio-${info.project.name}.png`,
    fullPage: true,
  });
  await page.goto("/#engineering");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    (
      await new AxeBuilder({ page })
        .include(".engineering-studio")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});
