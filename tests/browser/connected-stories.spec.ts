import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
test("checkout business views show observed concurrency and payload-conflict outcomes", async ({
  page,
}) => {
  await page.goto("/engineering/order-once#business-outcomes");
  await page
    .getByRole("button", { name: "Three requests together", exact: true })
    .click();
  await expect(page.locator(".linked-outcome")).toContainText(
    "200 / 200 / 201",
  );
  await expect(page.locator(".linked-outcome")).toContainText("20 → 18");
  await page
    .getByRole("button", { name: "Same key, changed payload", exact: true })
    .click();
  await expect(page.locator(".linked-outcome")).toContainText("201 / 409");
  await expect(page.locator(".linked-outcome")).toContainText(
    "original order and stock remained intact",
  );
  await page.getByRole("link", { name: "Follow the healthcare case" }).click();
  await expect(
    page.getByRole("heading", { name: "The claim that arrived twice." }),
  ).toBeVisible();
});
test("healthcare redelivery and changed-content evidence stay distinct from payments or live AWS", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") posts.push(request.url());
  });
  await page.goto("/engineering/claim-twice");
  await page
    .getByRole("button", { name: /2\. Delivered again, same claim/ })
    .click();
  await expect(page.locator(".linked-outcome")).toContainText("201");
  await expect(page.locator(".linked-outcome")).toContainText(
    "Claim identity matches",
  );
  await page
    .getByRole("button", { name: /3\. Same object key, changed content/ })
    .click();
  await expect(page.locator(".linked-outcome")).toContainText("409");
  await expect(page.locator(".linked-outcome")).toContainText(
    "Withheld after conflict",
  );
  await expect(page.locator(".linked-outcome")).toContainText(
    "Synthetic input, not a payment",
  );
  await page
    .getByText("Capture provenance and local reproduction", { exact: true })
    .click();
  const downloadEvent = page.waitForEvent("download");
  await page
    .getByRole("link", { name: /Download the safe redelivery record/ })
    .click();
  const download = await downloadEvent;
  const capture = JSON.parse(await readFile((await download.path())!, "utf8"));
  expect(capture.realAWSCalls).toBe(0);
  expect(capture.modelCalls).toBe(0);
  expect(
    capture.stages.map((s: { persistedClaims: number }) => s.persistedClaims),
  ).toEqual([1, 1, 1]);
  expect(posts).toEqual([]);
});
test("healthcare story fits the viewport and passes selected accessibility checks", async ({
  page,
}, info) => {
  await page.goto("/engineering/claim-twice");
  await page
    .getByRole("button", { name: /2\. Delivered again, same claim/ })
    .click();
  await page
    .getByText("Capture provenance and local reproduction", { exact: true })
    .click();
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
    path: `artifacts/engineering-story/claims-${info.project.name}.png`,
    fullPage: true,
  });
});
test("selected healthcare card opens its case study while preserving a source link", async ({
  page,
}) => {
  await page.goto("/");
  const selected = page.locator("#project-0");
  await expect(
    selected.getByRole("link", { name: "Repository" }),
  ).toHaveAttribute(
    "href",
    "https://github.com/kilicerdal/ai-healthcare-quality-platform",
  );
  await selected
    .getByRole("link", { name: "Case study" })
    .click();
  await expect(page).toHaveURL(/\/engineering\/claim-twice$/);
});
test("invitation initialization strips a synthetic fragment without sending verification", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await page.goto("/recruiters/invite#invite=" + "a".repeat(64));
  await expect(
    page.getByRole("button", {
      name: "Send my verification link",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/recruiters\/invite$/);
  expect(posts).toEqual([]);
});
