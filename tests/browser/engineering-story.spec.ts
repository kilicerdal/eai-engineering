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
  await expect(page.locator("#predict").getByRole("status")).toContainText(
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
test("homepage offers clear engineering and learning entries with chat available", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.locator(".atlas-hero .atlas-button.primary"),
  ).toHaveAttribute("href", "/engineering");
  await expect(page.locator('.atlas-hero .atlas-learning-entry')).toHaveAttribute('href','/study');
  await expect(page.locator('.atlas-hero .home-chat-link[href="/chat"]')).toHaveAttribute('href','/chat');
  await expect(
    page.getByRole("link", { name: "Explore Engineering Studio", exact: true }),
  ).toHaveAttribute("href", "/engineering");
  await page.getByRole("link", { name: "Explore Engineering Studio", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Engineering you can inspect.",
    }),
  ).toBeVisible();
});

test('homepage section links support keyboard jumps without legacy route redirects', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'Homepage sections' });
  for (const [name, id] of [['Projects', 'project-work'], ['Learning', 'learning'], ['Solve & explore', 'artwork'], ['Contact', 'contact']]) {
    await navigation.getByRole('link', { name, exact: true }).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(`/#${id}$`));
    await expect(page.locator(`#${id}`)).toBeFocused();
    const bounds = await page.locator(`#${id}`).boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.y).toBeGreaterThanOrEqual(50);
    expect(bounds!.y).toBeLessThan(150);
    await expect(navigation.getByRole('link', { name, exact: true })).toHaveAttribute('aria-current', 'location');
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('the original About background loads near its section rather than at first paint', async ({ page }) => {
  const artworkRequests: string[] = [];
  page.on('request', request => {
    if (request.url().includes('orbital-score.webp')) artworkRequests.push(request.url());
  });
  await page.goto('/');
  await expect(page.locator('.home-primary-actions')).toBeVisible();
  expect(artworkRequests).toHaveLength(0);
  await page.goto('/#about');
  await expect.poll(() => artworkRequests.length).toBeGreaterThan(0);
  const original = page.locator('#about .about-artwork-entry .heritage-row-picture img');
  await expect(original).toHaveAttribute('src', /orbital-score\.webp/);
  await expect.poll(() => original.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
});

test("hero preserves original artwork and starts one high-priority image request", async ({ page, context }) => {
  const session = await context.newCDPSession(page);
  await session.send("Network.enable");
  await session.send("Network.setCacheDisabled", { cacheDisabled: true });
  const requests: { url: string; priority: string }[] = [];
  session.on("Network.requestWillBeSent", event => {
    if (event.request.url.includes("gobekli-intelligence-vitruvian-v2.webp")) {
      requests.push({ url: event.request.url, priority: event.request.initialPriority });
    }
  });
  await page.goto("/");
  const hero = page.locator(".atlas-landscape");
  await expect(hero).toHaveAttribute("fetchpriority", "high");
  await expect(hero).toHaveAttribute("loading", "eager");
  await expect.poll(() => hero.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(requests).toHaveLength(1);
  expect(requests[0].priority).toBe("High");
  const imageUrl = new URL(requests[0].url);
  expect(imageUrl.searchParams.get("url")).toBe("/images/threshold/gobekli-intelligence-vitruvian-v2.webp");
  expect(imageUrl.searchParams.get("q")).toBe("75");
});
