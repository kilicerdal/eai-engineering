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
    "/chat",
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


test("Studio backgrounds reach both viewport edges on wide displays", async ({ page }, info) => {
  if (info.project.name !== "desktop") return;
  for (const route of ["/", "/engineering"]) {
    await page.goto(route);
    for (const width of [1920, 2560]) {
      await page.setViewportSize({ width, height: 1080 });
      for (const id of ["case-studies", "projects", "tools"]) {
        const bounds = await page.locator(`#${id}`).evaluate(el => {
          const style = getComputedStyle(el, "::before");
          const rect = el.getBoundingClientRect();
          const imageWidth = parseFloat(style.width);
          return { width: imageWidth, left: rect.left + rect.width / 2 - imageWidth / 2 };
        });
        expect(bounds.width).toBe(width);
        expect(Math.abs(bounds.left)).toBeLessThan(1);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});

test('test result links land on the interactive evidence for each download', async ({page}) => {
  for (const [path, anchor] of [['order-once', 'business-outcomes'], ['claim-twice', 'delivery']]) {
    await page.goto('/');
    await page.locator(`a[href="/engineering/${path}#${anchor}"]`).click();
    const evidence = page.locator('#' + anchor);
    await expect(evidence).toBeInViewport();
    const alternate = evidence.getByRole('button').nth(1);
    await alternate.click();
    await expect(alternate).toHaveAttribute('aria-pressed','true');
  }
});

test('new chat and case entry preserve a full history of unsent drafts', async ({page}) => {
  const saved = Array.from({length:30}, (_,i) => ({
    id:`saved-${i}`, title:`Saved ${i}`, mode:'general', messages:[], updatedAt:i, draft:`My draft ${i}`,
  }));
  await page.goto('/');
  await page.evaluate(items => localStorage.setItem('erdal-ai-conversations-v31', JSON.stringify(items)), saved);
  await page.goto('/chat?case=order-once');
  await expect(page.getByText(/You have 30 saved chats/)).toBeVisible();
  const newChat = page.getByRole('button',{name:'+ New chat',exact:true});
  if (!await newChat.isVisible()) await page.getByRole('button',{name:'Show sidebar'}).click();
  await newChat.click();
  await page.reload();
  await expect(page.getByRole('textbox',{name:'Your message'})).toHaveValue('My draft 0');
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('erdal-ai-conversations-v31')!))).toEqual(saved);
});

test('draft-only chats can be searched and the selected draft survives refresh', async ({page}) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('erdal-ai-conversations-v31',JSON.stringify(
    ['First draft','Second draft'].map((draft,i)=>({id:'draft-'+i, mode:'general',title:'New conversation',messages:[],updatedAt:i,draft}))
  )));
  await page.goto('/#ai-assistant');
  await expect(page).toHaveURL(/\/chat$/);
  const search = page.getByRole('searchbox',{name:'Search conversations'});
  if (!await search.isVisible()) await page.getByRole('button',{name:'Show sidebar'}).click();
  await search.fill('Second');
  await page.getByRole('button',{name:'Second draft',exact:true}).click();
  await page.reload();
  await expect(page.getByRole('textbox',{name:'Your message'})).toHaveValue('Second draft');
});

test('older tabs preserve a newer saved draft and keep their own edits visible', async ({page, context}) => {
  await page.goto('/chat');
  const draft = page.getByRole('textbox',{name:'Your message'});
  await draft.fill('Starting draft');
  const other = await context.newPage();
  await other.goto('/chat');
  const newer = other.getByRole('textbox',{name:'Your message'});
  await expect(newer).toHaveValue('Starting draft');
  await newer.fill('Latest saved version');
  await draft.fill('My separate edits');
  await expect(page.getByText(/Another tab updated your chats/)).toBeVisible();
  await expect(draft).toHaveValue('My separate edits');
  await other.reload();
  await expect(newer).toHaveValue('Latest saved version');
});

test('damaged chat records survive a reload and remain recoverable', async ({page}) => {
  await page.goto('/');
  await page.evaluate(()=>localStorage.setItem('erdal-ai-conversations-v31','{"partial":'));
  await page.goto('/chat');
  await expect(page.getByText(/Saving is paused to protect it/)).toBeVisible();
  await page.getByRole('textbox',{name:'Your message'}).fill('Temporary work');
  await page.reload();
  await expect(page.getByText(/Saving is paused to protect it/)).toBeVisible();
  expect(await page.evaluate(()=>localStorage.getItem('erdal-ai-conversations-v31'))).toBe('{"partial":');
});

test('unsent CI notes stay with their chat and are cleared on reload',async({page})=>{
  await page.goto('/chat');
  await page.getByRole('combobox',{name:'AI assistant mode'}).selectOption('testing');
  await page.getByLabel('Add context',{exact:true}).click();
  await page.getByText('Analyze a CI log',{exact:true}).click();
  const log=page.getByRole('textbox',{name:'Redacted CI log'});
  await log.fill('Synthetic build log for the first project');
  const newChat=page.getByRole('button',{name:'+ New chat',exact:true});
  if (!await newChat.isVisible()) await page.getByRole('button',{name:'Show sidebar'}).click();
  await newChat.click();
  if (!await log.isVisible()) {
    if (!await page.getByText('Analyze a CI log',{exact:true}).isVisible()) await page.getByLabel('Add context',{exact:true}).click();
    if (!await log.isVisible()) await page.getByText('Analyze a CI log',{exact:true}).click();
  }
  await expect(log).toHaveValue('');
  if (!await newChat.isVisible()) await page.getByRole('button',{name:'Show sidebar'}).click();
  await page.getByRole('button',{name:'New conversation',exact:true}).last().click();
  if (!await log.isVisible()) {
    if (!await page.getByText('Analyze a CI log',{exact:true}).isVisible()) await page.getByLabel('Add context',{exact:true}).click();
    if (!await log.isVisible()) await page.getByText('Analyze a CI log',{exact:true}).click();
  }
  await expect(log).toHaveValue('Synthetic build log for the first project');
  expect(await page.evaluate(()=>localStorage.getItem('erdal-ai-conversations-v31'))).not.toContain('Synthetic build log');
});
