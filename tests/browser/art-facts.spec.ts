import {test,expect} from '@playwright/test';
test('facts are optional and keep source and interpretation together',async({page})=>{
 await page.goto('/study/art/painting/vermeer-01');const facts=page.locator('section.art-facts');await expect(facts).toBeVisible();await expect(facts.locator('.art-fact-entry')).toHaveCount(5);await expect(facts.locator('.art-fact-entry:visible')).toHaveCount(3);
 const entry=facts.locator('.art-fact-entry').first();await entry.locator(':scope > details > summary').click();await expect(entry.getByText('Why it matters',{exact:true})).toBeVisible();await expect(entry.locator('a[target="_blank"]')).toHaveAttribute('href',/^https:/);
 await facts.locator('.art-facts-more>summary').click();await expect(facts.locator('.art-fact-entry:visible')).toHaveCount(5);
});
test('deep links reveal an entry inside More to discover',async({page})=>{
 await page.goto('/study/art/painter/caravaggio#caravaggio-fact-5');const target=page.locator('#caravaggio-fact-5');await expect(target).toHaveAttribute('open','');await expect(target.locator(':scope > summary')).toBeVisible();await expect(page.locator('.art-facts-more')).toHaveAttribute('open','');
});
test('scholarship search finds a fact and opens its exact passage',async({page})=>{
 await page.goto('/study/art/scholarship?q=A%20cardinal%E2%80%99s%20practical%20support');const link=page.locator('a[href$="#caravaggio-fact-3"]').first();await expect(link).toBeVisible();await link.click();await expect(page.locator('#caravaggio-fact-3')).toHaveAttribute('open','');
});
test('expanded facts remain within a narrow screen',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/study/art/painter/matisse');const facts=page.locator('section.art-facts');await facts.locator('.art-fact-entry summary').first().click();await facts.locator('.art-facts-more>summary').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();await expect(facts.locator('.art-fact-entry:visible')).toHaveCount(5);
});
test('a fact returns to the full study even after choosing the introduction',async({page})=>{
 await page.goto('/study/art/painting/vermeer-01');await page.getByRole('button',{name:/Introduction ·/}).click();
 const entry=page.locator('.art-facts .art-fact-entry').first();await entry.locator(':scope > details > summary').click();await entry.getByRole('link',{name:'Return to the full study →'}).click();
 await expect(page.locator('main.art-room')).toHaveAttribute('data-reading-depth','full');await expect(page.locator('#essay')).toBeVisible();
});
test('painter facts return to the biography without leaving the painter',async({page})=>{
 await page.goto('/study/art/painter/dali#dali-fact-1');await page.locator('#dali-fact-1').getByRole('link',{name:'Return to the full study →'}).click();await expect(page).toHaveURL(/painter\/dali#biography$/);await expect(page.locator('#biography')).toBeVisible();
});
test('source evidence is optional and painter facts point to the correct work',async({page})=>{
 await page.goto('/study/art/painter/kahlo#kahlo-fact-1');const entry=page.locator('#kahlo-fact-1');const evidence=entry.locator('.art-fact-evidence');
 await expect(evidence).not.toHaveAttribute('open','');await entry.locator('a.art-fact-work').click();await expect(page).toHaveURL(/painting\/kahlo-01$/);await expect(page.getByRole('heading',{level:1})).toContainText('Cropped Hair');
});
test('largest text supports facts, evidence and return on a phone',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/study/art/painter/pollock');await page.getByText('Viewing comfort',{exact:true}).click();await page.getByLabel('Text size',{exact:true}).selectOption('1.3');
 await page.goto('/study/art/painter/pollock#pollock-fact-3');const entry=page.locator('#pollock-fact-3');await entry.locator('.art-fact-evidence>summary').click();await expect(entry.locator('.art-fact-evidence')).toHaveAttribute('open','');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();await expect(entry.getByRole('link',{name:/external source, opens in a new tab/})).toHaveAttribute('target','_blank');
 await entry.getByRole('link',{name:'Return to the full study →'}).click();await expect(page).toHaveURL(/#biography$/);await expect(page.locator('#biography')).toBeVisible();
});
