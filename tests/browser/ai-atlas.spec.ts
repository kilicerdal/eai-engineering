import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function openAtlas(page: Page) {
  await page.goto("/#about");
  const about = page.locator("#about");
  const disclosure = about.locator("details.main-architecture-toggle");
  if (!(await disclosure.evaluate((node: HTMLDetailsElement) => node.open))) {
    await disclosure.locator("summary").click();
  }
  await expect(about.getByRole("heading", { name: "Intelligence, connected.", exact: true })).toBeVisible();
  return about;
}

test("philosophy replaces resume panels and atlas interactions stay local", async ({ page }) => {
  const posts: string[] = [];
  page.on("request", request => { if (request.method() === "POST") posts.push(request.url()); });
  const about = await openAtlas(page);
  const disclosure = about.locator("details.main-architecture-toggle");
  await disclosure.locator("summary").click();
  await expect(about.getByRole("button", { name: "Retrieval path", exact: true })).toBeHidden();
  await disclosure.locator("summary").click();
  await expect(about.getByRole("button", { name: "Retrieval path", exact: true })).toBeVisible();
  await expect(about.getByRole("heading", { name: /Wonder asks the question/ })).toBeVisible();
  await expect(about).not.toContainText(/nine years|AWS Certified|TestNG|REST Assured/);
  await expect(about.locator(".node")).toHaveCount(18);
  await expect(about.locator(".wires path")).toHaveCount(20);
  await expect(about.locator(".wires path").first()).toHaveAttribute("d", /^M/);
  await about.getByRole("button", { name: "Retrieval path", exact: true }).click();
  await expect(about.locator('[data-node="retrieve"]')).not.toHaveClass(/dim/);
  await expect(about.locator('[data-node="runtime"]')).toHaveClass(/dim/);
  const validation = about.getByRole("button", { name: /Output validation schema/ });
  await validation.focus();
  await validation.press("Enter");
  await expect(validation).toHaveAttribute("aria-pressed", "true");
  await expect(about.locator("#ai-atlas-detail")).toContainText("Check schema validity");
  await about.getByRole("button", { name: "Agent & tools", exact: true }).click();
  await expect(about.locator('[data-node="tool"]')).not.toHaveClass(/dim/);
  await about.getByRole("button", { name: "Evaluation loop", exact: true }).click();
  await expect(about.locator('[data-node="evals"]')).not.toHaveClass(/dim/);
  await about.getByRole("button", { name: "Full architecture", exact: true }).click();
  await expect(about.locator(".dim")).toHaveCount(0);
  await expect(about).toContainText("CONCEPTUAL ARCHITECTURE");
  expect(posts).toEqual([]);
  await about.getByRole("link", { name: "Explore the Engineering Studio" }).click();
  await expect(page).toHaveURL(/\/engineering$/);
});

test("atlas layout and selected accessibility rules pass at supported widths", async ({ page }, info) => {
  const about = await openAtlas(page);
  await about.getByRole("button", { name: "Retrieval path", exact: true }).click();
  expect((await new AxeBuilder({ page }).include("#about").withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze()).violations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await about.screenshot({ path: `artifacts/engineering-story/atlas-${info.project.name}.png` });
  if (info.project.name === "desktop") {
    for (const width of [768, 1024, 1440, 1920, 2560]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(about.locator(".node").last()).toBeVisible();
      const bounds = await about.locator(".atlas-artwork-entry .heritage-row").boundingBox();
      expect(bounds).not.toBeNull();
      expect(Math.abs(bounds!.width - width)).toBeLessThan(1);
      expect(Math.abs(bounds!.x)).toBeLessThan(1);
      const atlas = await about.locator(".atlas").boundingBox();
      expect(atlas!.x).toBeGreaterThanOrEqual(0);
      expect(atlas!.x + atlas!.width).toBeLessThanOrEqual(width + 1);
    }
  }
});

test("principles connect to real destinations and evidence links distinguish conceptual roles", async ({ page }) => {
  const about = await openAtlas(page);
  const principles = about.getByRole("navigation", { name: "Explore the engineering principles" });
  await expect(principles.getByRole("link", { name: /Explore with purpose/ })).toHaveAttribute("href", "/chat");
  await expect(principles.getByRole("link", { name: /Build with care/ })).toHaveAttribute("href", "/engineering");
  await expect(principles.getByRole("link", { name: /Learn from evidence/ })).toHaveAttribute("href", "/engineering#case-studies");
  await expect(about.getByRole("complementary", { name: "Related project evidence" })).toHaveCount(0);
  await about.locator('[data-node="evals"]').click();
  await expect(about.getByRole("complementary", { name: "Related project evidence" })).toContainText("not a model evaluation benchmark");
  await about.locator('[data-node="traces"]').click();
  await expect(about.getByRole("link", { name: "Inspect the claim delivery record" })).toHaveAttribute("href", "/engineering/claim-twice#evidence");
  await about.locator('[data-node="runtime"]').click();
  await about.getByRole("link", { name: "Inspect checkout retry evidence" }).click();
  await expect(page).toHaveURL(/\/engineering\/order-once#business-outcomes$/);
  await expect(page.getByRole("heading", { name: /business|request|outcome/i }).first()).toBeVisible();
});
