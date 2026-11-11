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

test('test generation keeps the previous result and compares revisions from the same scenario',async({page})=>{
  const first='Verify that the cart total reflects the selected item quantity.';
  const second='Verify that a learner can change the study session length.';
  let nextCode='firstResult();';
  let improvePayload:Record<string,string>={};
  await page.route('**/api/generate-test',route=>route.fulfill({status:nextCode?200:503,json:nextCode?{code:nextCode}:{error:'Generation unavailable.'}}));
  await page.route('**/api/improve-test',route=>{
    improvePayload=route.request().postDataJSON();
    return route.fulfill({json:{code:'firstImprovement();'}});
  });
  await page.goto('/engineering#ai-test-generator');
  const tool=page.locator('#ai-test-generator');
  const input=tool.getByLabel('Describe Your Test Scenario');
  const generate=tool.getByRole('button',{name:'Generate Test Code'});
  await input.fill(first);
  await generate.click();
  await expect(tool.locator('pre').first()).toHaveText('firstResult();');
  await input.fill(second);
  await tool.getByLabel('Automation Framework').selectOption('pytest');
  await expect(tool.getByRole('status').filter({hasText:'previous scenario'})).toBeVisible();
  await tool.getByRole('button',{name:'Improve Generated Tests'}).click();
  await expect.poll(()=>improvePayload.requirements).toBe(first);
  expect(improvePayload.framework).toBe('playwright');
  nextCode='';
  await generate.click();
  await expect(tool.getByRole('alert')).toHaveText('Generation unavailable.');
  await expect(tool.locator('pre').first()).toHaveText('firstResult();');
  nextCode='secondResult();';
  await generate.click();
  await expect(tool.locator('pre').first()).toHaveText('secondResult();');
  await expect(tool.getByText('firstImprovement();',{exact:true})).toHaveCount(0);
});

test('CI analysis preserves completed evidence on retry and clears a pending request',async({page})=>{
  let response: 'success'|'empty'|'pending'='success';
  let release: (()=>void)|undefined;
  await page.route('**/api/ci-status', route=>route.fulfill({json:{live:true,runs:[]}}));
  await page.route('**/api/analyze-failure',async route=>{
    if(response==='pending') await new Promise<void>(resolve=>{release=resolve;});
    await route.fulfill({json:{answer:response==='empty'?'':'Synthetic failure explanation.'}}).catch(()=>undefined);
  });
  await page.goto('/engineering#qa-dashboard');
  const tool=page.locator('#ai-failure-analyzer');
  await tool.getByLabel('Failure Log').fill('Synthetic fixture: expected 4 but received 5.');
  const analyze=tool.getByRole('button',{name:'Analyze Failure'});
  await analyze.click();
  await expect(tool.getByText('Synthetic failure explanation.',{exact:true})).toBeVisible();
  response='empty';
  await analyze.click();
  await expect(tool.getByRole('alert')).toContainText('No analysis was returned');
  await expect(tool.getByText('Synthetic failure explanation.',{exact:true})).toBeVisible();
  await tool.getByLabel('Failure Log').fill('A separate synthetic fixture did not load.');
  await expect(tool.getByText(/analysis is for the previous input/)).toBeVisible();
  response='pending';
  await analyze.click();
  await expect.poll(()=>!!release).toBe(true);
  await tool.getByRole('button',{name:'Clear',exact:true}).click();
  release?.();
  await expect(tool.getByLabel('Failure Log')).toHaveValue('');
  await expect(tool.getByRole('heading',{name:'AI Failure Analysis'})).toHaveCount(0);
});

test('both test comparison panels copy and download their own code',async({page})=>{
  await page.addInitScript(()=>{
    let denied=true;
    Object.defineProperty(navigator,'clipboard',{value:{writeText:async(value:string)=>{
      if(denied){denied=false;throw new Error('Clipboard denied');}
      document.documentElement.dataset.copied=value;
    }}});
  });
  await page.route('**/api/generate-test',route=>route.fulfill({json:{code:'original();'}}));
  await page.route('**/api/improve-test',route=>route.fulfill({json:{code:'revised();'}}));
  await page.goto('/engineering#ai-test-generator');
  const tool=page.locator('#ai-test-generator');
  await tool.getByLabel('Describe Your Test Scenario').fill('Verify that a student can open a saved lesson.');
  await tool.getByRole('button',{name:'Generate Test Code'}).click();
  await tool.getByRole('button',{name:'Improve Generated Tests'}).click();
  for(const [title,code,file] of [['Original Generated Code','original();','generated.spec.ts'],['AI-Improved Code','revised();','improved_generated.spec.ts']]){
    const panel=tool.getByRole('region',{name:title,exact:true});
    const copy=panel.getByRole('button',{name:'Copy code'});
    if(title==='Original Generated Code'){
      await copy.click();
      await expect(panel.getByRole('status')).toContainText('Clipboard unavailable');
    }
    await copy.click();
    await expect(page.locator('html')).toHaveAttribute('data-copied',code);
    const event=page.waitForEvent('download');
    await panel.getByRole('button',{name:'Download File'}).click();
    const download=await event;
    expect(download.suggestedFilename()).toBe(file);
    const stream=await download.createReadStream();
    let contents='';
    for await(const chunk of stream!)contents+=chunk.toString();
    expect(contents).toBe(code);
  }
});

test('role alignment enforces the request limit and keeps previous results on failure',async({page})=>{
  const requests:string[]=[];
  await page.route('**/api/match',route=>{
    requests.push(route.request().postDataJSON().job_description);
    return requests.length===1?route.fulfill({json:{analysis:'Synthetic comparison for the first role.'}}):route.fulfill({status:429,json:{}});
  });
  await page.goto('/engineering#job-matcher');
  const tool=page.locator('#job-matcher'),input=tool.getByLabel('Paste a Job Description'),submit=tool.getByRole('button',{name:'Analyze Job Match'});
  await input.fill('x'.repeat(3001));
  await expect(submit).toBeDisabled();
  await expect(input).toHaveValue('x'.repeat(3001));
  await input.fill('x'.repeat(3000));
  await submit.click();
  await expect(tool.getByText('Synthetic comparison for the first role.')).toBeVisible();
  const revised='A different role focused on software quality.';
  await input.fill(revised);
  await expect(tool.getByRole('status')).toContainText('previous description');
  await submit.click();
  await expect(tool.getByRole('alert')).toContainText('request limit');
  await expect(input).toHaveValue(revised);
  await expect(tool.getByText('Synthetic comparison for the first role.')).toBeVisible();
  expect(requests).toEqual(['x'.repeat(3000),revised]);
});

test('project link reopens and focuses the planner even when its hash is already selected', async ({page})=>{
  await page.goto('/engineering#ai-test-generator');
  const requirements=page.locator('#generator-requirements');
  await requirements.fill('Keep this synthetic draft while revisiting the same project link.');
  await page.getByRole('button',{name:'Close workspace'}).click();
  await page.locator('#project-0').getByRole('link',{name:'Plan tests'}).click();
  await expect(page.getByRole('tabpanel',{name:'AI-assisted test planning'})).toBeFocused();
  await expect(requirements).toHaveValue('Keep this synthetic draft while revisiting the same project link.');
});

test('workflow investigation shares refreshed runs and preserves the selected evidence on failure or cancellation',async({page})=>{
  let fetches=0,lookups=0;
  const run={id:42,name:'Synthetic tests',repository:'playwright-ai-automation',conclusion:'failure',status:'completed',createdAt:'2026-01-01T10:00:00Z',url:'https://example.org/synthetic'};
  await page.route('**/api/ci-status',route=>{
    fetches++;
    return fetches===1?route.fulfill({status:503,json:{error:'Offline'}}):route.fulfill({json:{live:true,runs:[run]}});
  });
  let release!:()=>void;
  const gate=new Promise<void>(resolve=>{release=resolve;});
  await page.route('**/api/github-failure?**',async route=>{
    lookups++;
    if(lookups===2)return route.fulfill({json:{source:'verified'}});
    if(lookups===3)await gate;
    await route.fulfill({json:{source:'VERIFIED GITHUB METADATA',evidence:'Synthetic workflow evidence.'}});
  });
  await page.goto('/engineering#qa-dashboard');
  await expect(page.getByText(/Current workflow status is unavailable/)).toBeVisible();
  await page.getByRole('button',{name:/Refresh CI Data/}).click();
  const select=page.getByLabel('Failed GitHub workflow');
  await select.selectOption('playwright-ai-automation:42');
  const load=page.getByRole('button',{name:'Load GitHub Failure'});
  await load.click();
  await expect(page.getByText(/VERIFIED GITHUB METADATA · playwright-ai-automation · Run 42/)).toBeVisible();
  await load.click();
  await expect(page.getByRole('alert').filter({hasText:'incomplete evidence'})).toBeVisible();
  await expect(page.getByText('Synthetic workflow evidence.',{exact:true})).toBeVisible();
  await load.click();
  try {
    await expect.poll(()=>lookups).toBe(3);
    await page.getByRole('button',{name:'Load Demo Failure'}).click();
  } finally {release();}
  await expect(page.getByText('SIMULATED DEMO',{exact:true})).toBeVisible();
  await expect(page.getByText('Synthetic workflow evidence.',{exact:true})).toHaveCount(0);
  await page.getByRole('button',{name:'Analyze with AI'}).click();
  await expect(page.locator('#failure-log')).toBeFocused();
  await expect(page.locator('#failure-log')).toHaveValue(/^SIMULATED DEMO\n/);
  expect(fetches).toBe(2);
});

test('long workflow evidence keeps attribution and final error in the analyzer',async({page})=>{
  await page.route('**/api/ci-status',route=>route.fulfill({json:{live:true,runs:[]}}));
  await page.route('**/api/github-failure?**',route=>route.fulfill({json:{
    source:'REAL GITHUB ACTIONS LOGS',evidence:'Start of synthetic run\n'+'x'.repeat(3200)+'\nFinal timeout in synthetic test.'
  }}));
  await page.goto('/engineering#qa-dashboard');
  await page.getByRole('button',{name:'Investigate Real Historical Failure'}).click();
  await page.getByRole('button',{name:'Analyze with AI'}).click();
  const text=await page.locator('#failure-log').inputValue();
  expect(text).toHaveLength(3000);
  expect(text).toMatch(/^REAL GITHUB ACTIONS LOGS · ai-healthcare-quality-platform · Run 38679023819/);
  expect(text).toContain('[Middle omitted');
  expect(text).toMatch(/Final timeout in synthetic test\.$/);
});
