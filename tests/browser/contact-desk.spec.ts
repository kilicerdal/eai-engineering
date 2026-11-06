import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("contact desk offers distinct email drafts and a working copy action", async ({ page, context, baseURL }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: baseURL! });
  await page.goto("/#contact");
  const desk = page.locator("#contact");
  await expect(desk.getByRole("heading", { name: /A worthwhile question/ })).toBeVisible();
  for (const [title, subject] of [["Engineering challenges", "Engineering challenge | eAI"], ["Collaborations", "Collaboration | eAI"], ["Project questions", "Project question | eAI"]]) {
    const href = await desk.getByRole("link", { name: new RegExp(title) }).getAttribute("href");
    const url = new URL(href!);
    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe("hello@eai.engineering");
    expect(url.searchParams.get("subject")).toBe(subject);
    expect(url.searchParams.get("body")).toBeTruthy();
  }
  await desk.getByRole("button", { name: "Copy email address" }).click();
  await expect(desk.getByRole("status")).toHaveText("Email address copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("hello@eai.engineering");
  await expect(page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/kilicerdal");
  await desk.getByRole("link", { name: "Explore the engineering work" }).click();
  await expect(page).toHaveURL(/\/engineering$/);
});

test("contact desk handles unavailable clipboard and fits with selected accessibility checks", async ({ page }, info) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => { throw new Error("Clipboard unavailable in test"); } } }));
  await page.goto("/#contact");
  const desk = page.locator("#contact");
  await desk.getByRole("button", { name: "Copy email address" }).click();
  await expect(desk.getByRole("status")).toContainText("Select the email address");
  expect((await new AxeBuilder({ page }).include("#contact").include(".atlas-footer").withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze()).violations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  if (info.project.name === "desktop") expect(await desk.evaluate(el => el.getBoundingClientRect().height)).toBeLessThan(700);
  await desk.screenshot({ path: `artifacts/engineering-story/contact-${info.project.name}.png` });
});
