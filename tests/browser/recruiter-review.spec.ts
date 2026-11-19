import {test,expect} from '@playwright/test';

test('recruiter shortcut exposes the three project demos, evidence and source in one step',async({page})=>{
 await page.goto('/');const shortcut=page.locator('.home-start-help');await expect(shortcut).toHaveText('For recruiters');await shortcut.click();await expect(page).toHaveURL(/\/engineering\/tour$/);const cards=page.locator('.tour-review-grid article');await expect(cards).toHaveCount(3);
 for(let i=0;i<3;i++){await expect(cards.nth(i).getByRole('link',{name:'Demo →',exact:true})).toHaveAttribute('href',/^\/engineering\//);await expect(cards.nth(i).getByRole('link',{name:'Source ↗',exact:true})).toHaveAttribute('href',/^https:\/\/github.com\/kilicerdal\//);await expect(cards.nth(i).getByRole('link',{name:'Evidence →',exact:true})).toHaveAttribute('href',/#evidence$/);}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('the settlement tour links the same dated V4.1 summary used by its case study',async({page,request})=>{
 await page.goto('/engineering/tour#settlement');const link=page.getByRole('link',{name:'Open the dated V4.1 summary ↗',exact:true});await expect(link).toHaveAttribute('href','/evidence/settlementlab-v41/summary.json');const response=await request.get((await link.getAttribute('href'))!);expect(response.status()).toBe(200);const capture=await response.json();expect(capture.version).toBe('4.1.0');expect(capture.controls.cases).toBe(145);expect(capture.day.planned_trades).toBe(240);await page.getByRole('link',{name:'Inspect the settlement case →',exact:true}).click();await expect(page.locator('#evidence')).toContainText('145');
});

test('claim review distinguishes website captures, older previews and repository releases',async({page})=>{
 await page.goto('/engineering/projects');const details=page.locator('.project-claim-review');await details.locator('summary').click();await expect(details).toContainText('Historical V3 screenshot');await expect(details).toContainText('v4.2.0');await expect(details).toContainText('Authored illustration');await expect(details.getByRole('link',{name:/v8.0.0/})).toHaveAttribute('href','https://github.com/kilicerdal/healthcare-quality-lab/releases/tag/v8.0.0');
});

test('checkout evidence, contribution scope and contact remain reachable without starting services',async({page})=>{
 const writes:string[]=[];page.on('request',request=>{if(request.method()==='POST')writes.push(request.url());});await page.goto('/engineering/order-once');await expect(page.locator('#ownership')).toContainText('AI');await page.getByRole('radio',{name:/Return the existing order/}).check();await page.getByRole('button',{name:'Reveal recorded result'}).click();await expect(page.getByRole('heading',{name:'One order. A confirmed retry.'})).toBeVisible();await page.goto('/#contact');await expect(page.locator('#contact').getByRole('link',{name:/Engineering challenges/})).toHaveAttribute('href',/^mailto:hello@eai\.engineering\?/);expect(writes).toEqual([]);
});

test('keyboard skip and mobile navigation preserve focus and fit the viewport',async({page})=>{
 await page.goto('/');const skip=page.getByRole('link',{name:'Skip to main content',exact:true});await skip.focus();await skip.press('Enter');await expect(page.locator('#hero-title')).toBeFocused();if(page.viewportSize()!.width<=760){const menu=page.getByRole('button',{name:/^Menu/});await menu.focus();await menu.press('ArrowDown');await expect(page.locator('#atlas-nav a').first()).toBeFocused();await page.keyboard.press('Escape');await expect(menu).toBeFocused();await expect(menu).toHaveAttribute('aria-expanded','false');}expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
