import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('first visit presents three starts before optional help and keeps specialist entrances',async({page})=>{
 await page.goto('/start');const choices=page.getByRole('region',{name:'Choose a starting point'});
 await expect(choices.getByRole('link')).toHaveCount(3);
 await expect(choices.getByRole('link',{name:'Solve a problem →'})).toHaveAttribute('href','/engineering/problem');
 await expect(choices.getByRole('link',{name:'Learn something →'})).toHaveAttribute('href','/study');
 await expect(page.getByRole('heading',{name:'Welcome. Start with one small thing.'})).toBeHidden();
 await page.locator('.welcome-more > summary').click();await expect(page.getByRole('link',{name:'Reading Room · find a book'})).toBeVisible();
 expect((await new AxeBuilder({page}).include('main').withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);
});
test('Continue opens the unfinished book directly without rewriting either book',async({page})=>{
 const raw=JSON.stringify({version:1,positions:{11:{section:2,updatedAt:100},12:{section:1,updatedAt:90}},notes:[],bookmarks:[]});
 await page.addInitScript(value=>{localStorage.setItem('dai-reading-library-v1',value);localStorage.setItem('dai-reading-shelf-v1',JSON.stringify({'11':'Finished','12':'Reading'}));},raw);
 await page.goto('/study');await expect(page.getByRole('link',{name:'Continue learning',exact:false})).toHaveAttribute('href','/study/reading/12');
 expect(await page.evaluate(()=>localStorage.getItem('dai-reading-library-v1'))).toBe(raw);
 await page.goto('/your-space');const primary=page.getByRole('region',{name:'Continue saved work'}).locator(':scope > ul');await expect(primary.locator('h3 a')).toHaveAttribute('href','/study/reading/12');expect(await page.evaluate(()=>localStorage.getItem('dai-reading-library-v1'))).toBe(raw);
});
test('phone intro is compact, activity anchor works and optional explanation remains available',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/study');
 const hero=page.locator('.studio-hero');expect((await hero.boundingBox())!.height).toBeLessThan(680);
 await page.getByRole('link',{name:'Choose a room'}).click();await expect(page.getByRole('navigation',{name:'Choose a learning room'})).toBeInViewport();
 await expect(page.getByRole('link',{name:'Reading Room Find a book and settle in.'})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.screenshot({path:'artifacts/simple-entry/study-phone.png',fullPage:true});
 await page.goto('/study/reading');expect((await page.locator('.rr-hero').boundingBox())!.height).toBeLessThan(500);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.screenshot({path:'artifacts/simple-entry/reading-phone.png',fullPage:true});
});
