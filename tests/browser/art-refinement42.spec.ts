import {test,expect} from '@playwright/test';
test('study contents only offers facts when the painting has entries',async({page})=>{
 await page.goto('/study/art/painting/monet-05');await page.getByText('Contents of this study',{exact:true}).click();await expect(page.locator('.art-study-navigation a[href="#facts"]')).toHaveCount(0);
 await page.goto('/study/art/painting/vermeer-01');await page.getByText('Contents of this study',{exact:true}).click();await page.locator('.art-study-navigation a[href="#facts"]').click();await expect(page.locator('#facts')).toBeVisible();
});
test('a related study returns to the original connection card',async({page})=>{
 await page.goto('/study/art/painting/vermeer-01');const link=page.locator('.art-related h3 a').first(),origin=await link.getAttribute('href');await link.click();await expect(page).toHaveURL(/from=study&origin=vermeer-01/);await page.getByRole('link',{name:'← Return to the study you came from'}).click();await expect(page).toHaveURL(/painting\/vermeer-01#related-/);expect(origin).toContain('from=study');await expect(page.locator(new URL(page.url()).hash)).toBeVisible();
});
test('a painting reached inside a biography returns to the exact paragraph',async({page})=>{
 await page.goto('/study/art/painter/leonardo');const link=page.locator('#biography p[id] a[href*="from=biography"]').first();const passage=await link.locator('..').getAttribute('id');await link.click();await expect(page.getByRole('link',{name:'← Return to your biography passage'})).toBeVisible();await page.getByRole('link',{name:'← Return to your biography passage'}).click();await expect(page).toHaveURL(new RegExp('#'+passage+'$'));await expect(page.locator('#'+passage)).toBeVisible();
});
test('a failed reproduction can retry without disabling the study',async({page})=>{
 let requests=0;await page.route('**/images/art/vermeer-01.webp*',route=>++requests===1?route.abort():route.continue());await page.goto('/study/art/painting/vermeer-01');await expect(page.getByRole('button',{name:'Retry image',exact:true})).toBeVisible();await expect(page.getByRole('button',{name:/View fullscreen/})).toBeDisabled();await page.getByRole('button',{name:'Retry image',exact:true}).click();await expect.poll(()=>page.locator('.art-view-trigger img').evaluate((e:HTMLImageElement)=>e.complete&&e.naturalWidth>0)).toBeTruthy();await expect(page.getByRole('button',{name:/View fullscreen/})).toBeEnabled();await expect(page.locator('#essay')).toBeVisible();
});
test('image captions identify the object and lead to the structured description',async({page})=>{
 await page.goto('/study/art/painting/leonardo-01');const caption=page.locator('.art-main-painting>figcaption');await expect(caption).toContainText('Mona Lisa');await expect(caption).toContainText('recorded dimensions');await expect(caption).toContainText('not actual size');await caption.getByRole('link',{name:'Read the image description ↓'}).click();await expect(page.locator('#work-description')).toBeVisible();
});
test('term definitions open from the essay and return to the original passage',async({page})=>{
 await page.goto('/study/art/painting/leonardo-01');const term=page.locator('#essay .art-term-link').first(),origin=await term.locator('..').getAttribute('id');await term.click();await expect(page.locator('.art-terms[open]')).toBeVisible();await page.getByRole('link',{name:'← Return to the passage you were reading'}).click();await expect(page).toHaveURL(new RegExp('#'+origin+'$'));await expect(page.locator('#'+origin)).toBeFocused();
});
test('unavailable comparison selections explain the fallback',async({page})=>{
 await page.goto('/study/art/compare?left=missing&right=vermeer-01');await expect(page.locator('[role="status"]').filter({hasText:'One requested painting is unavailable'})).toBeVisible();await expect(page.getByRole('heading',{name:'Look at the relationship.'})).toBeVisible();
});
test('phone largest text keeps the subject context and image return usable',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/study/art/painting/cezanne-01');await page.getByText('Viewing comfort',{exact:true}).click();await page.getByLabel('Text size',{exact:true}).selectOption('1.3');await page.getByText('Viewing comfort',{exact:true}).click();await page.locator('.art-object-reading>summary').click();await expect(page.locator('.art-object-reading')).toContainText('A still life whose supports will not settle');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();await page.getByRole('button',{name:'Look again at the whole painting',exact:true}).click();await expect(page.locator('#work-image')).toBeVisible();
});

test('new subject context is searchable and opens its exact disclosure',async({page})=>{
 await page.goto('/study/art/scholarship?q=still%20life%20whose%20supports');const link=page.locator('a[href="/study/art/painting/cezanne-01#essay-object-context"]').first();await expect(link).toBeVisible();await link.click();await expect(page.locator('#essay-object-context')).toHaveAttribute('open','');await expect(page.locator('#essay-object-context')).toContainText('A still life whose supports will not settle');
});
