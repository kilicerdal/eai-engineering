import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('gallery offers 112 works, painter and era routes, and saves without touching other work',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('existing-work-check','preserve me'));
 await page.goto('/study/art');await expect(page.getByRole('status').filter({hasText:/^112 paintings$/})).toBeVisible();
 await expect(page.locator('.art-tile')).toHaveCount(12);
 await page.getByRole('button',{name:'Save Mona Lisa to My Gallery',exact:true}).click();
 await page.getByRole('link',{name:/^My Art ·/}).click();await expect(page.locator('.art-my-art .art-tile')).toHaveCount(1);
 await page.reload();await expect(page.locator('.art-tile h3')).toHaveText('Mona Lisa →');
 expect(await page.evaluate(()=>localStorage.getItem('existing-work-check'))).toBe('preserve me');
 await page.getByRole('link',{name:'Painters',exact:true}).click();await expect(page.locator('.art-painter-card')).toHaveCount(21);
 await page.getByRole('link',{name:'Paintings',exact:true}).click();await page.getByRole('button',{name:'Through the eras',exact:true}).click();await expect(page.locator('.art-timeline article')).toHaveCount(9);
 await page.getByRole('button',{name:'See these paintings →'}).first().click();await expect(page.getByRole('status').filter({hasText:/^18 paintings$/})).toBeVisible();
});
test('painting keeps proportions, fullscreen supports Escape and restores focus',async({page})=>{
 await page.goto('/study/art/painting/leonardo-01');const trigger=page.getByRole('button',{name:'View Mona Lisa fullscreen'});await trigger.click();const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
 await page.getByRole('button',{name:'Look closer',exact:true}).click();await expect(page.locator('.art-viewer-canvas')).toHaveClass(/is-zoomed/);await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(trigger).toBeFocused();
 expect(await page.locator('.art-view-trigger img').evaluate(e=>getComputedStyle(e).objectFit)).toBe('contain');
 expect((await new AxeBuilder({page}).include('main').withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);
 await page.screenshot({path:'artifacts/art-room/painting-desktop.png',fullPage:true});
});
test('damaged gallery is left intact and saves disabled',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('dai-art-gallery-v1','broken record'));
 await page.goto('/study/art');await expect(page.getByRole('alert').filter({hasText:/gallery/i})).toBeVisible();await expect(page.getByRole('button',{name:'Save Mona Lisa to My Gallery',exact:true})).toBeDisabled();expect(await page.evaluate(()=>localStorage.getItem('dai-art-gallery-v1'))).toBe('broken record');
});
for(const width of [390,1440])test(`gallery and painter are readable at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/study/art');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);expect(await page.locator('main').evaluate(e=>getComputedStyle(e).backgroundColor)).toBe('rgb(245, 241, 232)');
 expect((await new AxeBuilder({page}).include('main').withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);
 await page.screenshot({path:`artifacts/art-room/gallery-${width}.png`,fullPage:true});
 await page.goto('/study/art/painter/monet');await expect(page.getByRole('heading',{name:'Claude Monet',exact:true})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await page.screenshot({path:`artifacts/art-room/painter-${width}.png`,fullPage:true});
});
