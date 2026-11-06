import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
const route = "/engineering/order-once";
test("prediction, protected replay and injected defect use recorded data without executing APIs", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") posts.push(request.url());
  });
  await page.goto(route);
  await expect(
    page.getByRole("button", { name: "Reveal recorded result" }),
  ).toBeDisabled();
  const answer = page.getByRole("radio", { name: /Return the existing order/ });
  await answer.focus();
  await answer.press("Space");
  await page.getByRole("button", { name: "Reveal recorded result" }).click();
  await expect(
    page.getByRole("heading", { name: "One order. A confirmed retry." }),
  ).toBeFocused();
  await expect(page.locator(".failure-response").nth(1)).toContainText(
    "HTTP 200",
  );
  await expect(page.locator(".failure-response").nth(1)).toContainText(
    "Original order returned",
  );
  await page
    .getByRole("button", { name: "Injected duplicate defect", exact: true })
    .click();
  await expect(page.locator(".failure-response").nth(1)).toContainText(
    "HTTP 201",
  );
  await expect(page.locator(".failure-response").nth(1)).toContainText(
    "Different order created",
  );
  await expect(
    page.getByRole("heading", { name: "When a retry becomes another order." }),
  ).toBeVisible();
  expect(posts).toEqual([]);
});
test("a different prediction receives an explanation and can be reset accessibly", async ({
  page,
}) => {
  await page.goto(route);
  await page.getByRole("radio", { name: /Create another order/ }).check();
  await page.getByRole("button", { name: "Reveal recorded result" }).click();
  await expect(page.getByRole("status")).toContainText(
    "The healthy control returned the existing order",
  );
  await page.getByRole("button", { name: "Try the prediction again" }).click();
  await expect(
    page.getByRole("radio", { name: /Return the existing order/ }),
  ).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Reveal recorded result" }),
  ).toBeDisabled();
});
test("complete evidence download preserves provenance and pinned source references", async ({
  page,
}) => {
  await page.goto(route);
  await page
    .getByText("Capture identity, full step record and reproduction", {
      exact: true,
    })
    .click();
  const downloadEvent = page.waitForEvent("download");
  await page
    .getByRole("link", { name: /Download the complete safe JSON record/ })
    .click();
  const download = await downloadEvent;
  const path = await download.path();
  expect(path).toBeTruthy();
  const capture = JSON.parse(await readFile(path!, "utf8"));
  expect(capture.origin).toBe("authored-offline-example");
  expect(capture.modelCalls).toBe(0);
  expect(capture.divergence.actual.sameOrder).toBe(false);
  for (const link of await page.locator(".failure-source-grid a").all())
    expect(await link.getAttribute("href")).toContain(
      "/blob/" + capture.source.commit + "/",
    );
  expect(JSON.stringify(capture)).not.toMatch(
    /demo-pass|postgresql:\/\/|atlas_session=|OPENAI_API_KEY/,
  );
});
test("the revealed story and expanded evidence fit the viewport and selected accessibility rules", async ({
  page,
}, info) => {
  await page.goto(route);
  await page.getByRole("radio", { name: /Return the existing order/ }).check();
  await page.getByRole("button", { name: "Reveal recorded result" }).click();
  await page
    .getByRole("button", { name: "Injected duplicate defect", exact: true })
    .click();
  await page
    .getByText("Capture identity, full step record and reproduction", {
      exact: true,
    })
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
    path: `artifacts/engineering-story/${info.project.name}.png`,
    fullPage: true,
  });
});
test("homepage keeps chat primary and offers the working case-study entry", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.locator(".atlas-hero .atlas-button.primary"),
  ).toHaveAttribute("href", "#ai-assistant");
  await expect(
    page.getByRole("link", { name: "Explore Engineering Studio" }),
  ).toHaveAttribute("href", "/engineering");
  await page.getByRole("link", { name: "Explore Engineering Studio" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Engineering you can inspect.",
    }),
  ).toBeVisible();
});
