import {test as base,expect} from '@playwright/test';
const test=base.extend<{readOnlyGuard:void}>({readOnlyGuard:[async({context},use)=>{
 const blocked:string[]=[];
 await context.route('**/*',route=>{
  const request=route.request(),url=new URL(request.url());
  if(!['GET','HEAD','OPTIONS'].includes(request.method())){
   blocked.push(request.method()+' '+url.pathname);
   return route.fulfill({status:503,json:{error:'Read-only production monitoring does not submit requests.'}});
  }
  // Optional dashboards may poll; no backend integration is exercised by this smoke suite.
  if(url.pathname.startsWith('/api/'))return route.fulfill({status:503,json:{error:'Integration not exercised by read-only monitoring.'}});
  return route.continue();
 });
 await use();
 expect(blocked,'Production smoke must never attempt a mutation or model request').toEqual([]);
 },{auto:true}]});

test('homepage showcases three projects without horizontal overflow',async({page})=>{
 const response=await page.goto('/');expect(response?.status()).toBe(200);
 await expect(page.locator('.main-project')).toHaveCount(3);
 await expect(page.locator('#contact').getByRole('link',{name:/Engineering challenges/})).toHaveAttribute('href',/^mailto:/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('Atlas is interactive after hydration',async({page})=>{
 await page.goto('/#about');const about=page.locator('#about');
 await about.getByText('Explore the AI Systems Atlas and design principles',{exact:true}).click();
 await about.getByRole('button',{name:'Retrieval path',exact:true}).click();
 await expect(about.locator('[data-node="retrieve"]')).not.toHaveClass(/dim/);
 await about.getByRole('button',{name:/Output validation schema/}).click();
 await expect(about.locator('#ai-atlas-detail')).toContainText('Check schema validity');
});

test('recorded engineering proof remains usable without a backend call',async({page})=>{
 await page.goto('/engineering/order-once');
 await page.getByRole('radio',{name:/Return the existing order/}).check();
 await page.getByRole('button',{name:'Reveal recorded result'}).click();
 await expect(page.getByRole('heading',{name:'One order. A confirmed retry.'})).toBeVisible();
 await expect(page.locator('.failure-response').nth(1)).toContainText('Original order returned');
});

test('hyphenated book search finds the real title',async({page})=>{
 await page.goto('/study/reading');
 await page.getByText('Looking for a particular book?',{exact:true}).click();
 await page.getByRole('searchbox',{name:'Find a book'}).fill('Melville Moby-Dick');
 await expect(page.getByRole('article',{name:'Moby Dick',exact:true})).toBeVisible();
 await expect(page.getByRole('link',{name:'Read Moby Dick',exact:true})).toHaveAttribute('href','/study/reading/2701');
});

test('tutor preserves a synthetic unsent draft across reload',async({page})=>{
 await page.goto('/study#ai-assistant');const input=page.locator('#ai-assistant').getByLabel('Your message');
 await input.fill('Synthetic monitor draft: explain a test fixture.');
 await expect(input).toHaveValue('Synthetic monitor draft: explain a test fixture.');
 await page.reload();await expect(input).toHaveValue('Synthetic monitor draft: explain a test fixture.');
});

test('study navigation reaches the reading room',async({page},info)=>{
 await page.goto('/study');
 if(info.project.name==='mobile')await page.locator('#study-menu-toggle').click();
 await page.locator('#study-navigation-links').getByRole('link',{name:'Reading room',exact:true}).click();
 await expect(page).toHaveURL(/\/study\/reading$/);
 await expect(page.getByRole('heading',{name:'A quiet place. A world of stories.'})).toBeVisible();
});

// Read-only interaction: no learner writing, model request, import or mutation.
test('Practice Lab opens an authored case and its bounded tool',async({page})=>{await page.goto('/engineering/practice');await expect(page.getByRole('heading',{name:/A small case/})).toBeVisible();await page.getByRole('link',{name:'Start with one small case →',exact:true}).click();await page.getByRole('button',{name:'Try a tool',exact:true}).click();await expect(page.getByRole('combobox',{name:/Choose one small tool/})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);});

test('recruiter tour opens a shareable project stop and advances',async({page})=>{
 await page.goto('/engineering/tour#checkout');
 await expect(page.getByRole('heading',{name:'One checkout. Even when the request repeats.',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Next stop →',exact:true}).click();
 await expect(page.getByRole('heading',{name:'A claim can arrive twice without becoming two claims.',exact:true})).toBeVisible();
 await expect(page.getByRole('link',{name:'Open the dated redelivery record ↗',exact:true})).toHaveAttribute('href','/evidence/claim-redelivery.json');
});
