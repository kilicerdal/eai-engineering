import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const personal={version:1,notes:{},collections:[],recent:[],next:null,textSize:1,focus:false,notices:true};
test('desktop artwork remains beside the essay and overview preserves the full study',async({page})=>{
 await page.setViewportSize({width:1440,height:960});await page.goto('/study/art/painting/leonardo-01');
 await expect(page.locator('.art-painting-story #essay')).toBeVisible();
 const count=await page.locator('#essay .art-editorial-body>section').count();expect(count).toBeGreaterThan(7);
 await page.getByRole('button',{name:/^Introduction ·/}).click();await expect(page.locator('#essay')).toBeHidden();
 await page.getByRole('button',{name:/^Full study ·/}).click();await expect(page.locator('#essay')).toBeVisible();
 await page.locator('#essay-section-3').scrollIntoViewIfNeeded();
 const figure=await page.locator('#work-image').boundingBox(),passage=await page.locator('#essay-section-3').boundingBox();
 expect(figure!.y).toBeGreaterThanOrEqual(0);expect(figure!.y).toBeLessThan(40);expect(figure!.x+figure!.width).toBeLessThan(passage!.x);
 await page.screenshot({path:'artifacts/art-room/reading-desktop.png'});
});
test('phone comparisons keep independent zoom and captions while swapping works',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/study/art/compare?left=leonardo-01&right=vermeer-01');
 await page.getByRole('button',{name:'Inspect independently · first work',exact:true}).click();
 const slider=page.locator('[data-work=first]').getByLabel('Artwork magnification');await slider.fill('2.2');
 await page.getByRole('button',{name:'Second work',exact:true}).click();await expect(page.locator('[data-work=first]')).toBeHidden();await expect(page.locator('[data-work=second] h2')).toBeVisible();
 await page.getByRole('button',{name:'First work',exact:true}).click();await expect(slider).toHaveValue('2.2');
 await page.getByRole('button',{name:'Both',exact:true}).click();await expect(page.locator('[data-work=second] h2')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test('paper discussion resumes without overwriting its previous place and survives backup parsing',async({page})=>{
 await page.addInitScript(state=>{if(!localStorage.getItem('dai-art-personal-v1'))localStorage.setItem('dai-art-personal-v1',JSON.stringify({...state,reading:{'leonardo-paper-4':{section:'leonardo-paper-4-materials',completed:false}}}));},personal);
 await page.goto('/study/art/on-paper');const resume=page.getByRole('link',{name:'Continue studying your saved sheet ↓'});await expect(resume).toBeVisible();await resume.click();
 await expect(page.locator('#leonardo-paper-4')).toHaveAttribute('open','');await expect(page.locator('#leonardo-paper-4-materials')).toHaveAttribute('open','');
 await expect(page.locator('#leonardo-paper-4-materials')).toBeInViewport();
 await page.locator('#leonardo-paper-4').getByRole('button',{name:'Back (verso)',exact:true}).click();await expect(page.locator('#leonardo-paper-4 .art-side-caption')).toContainText('Stage design');
 await page.reload();await expect(page.locator('#leonardo-paper-4-materials')).toHaveAttribute('open','');
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('dai-art-personal-v1')!).reading['leonardo-paper-4'].section)).toBe('leonardo-paper-4-materials');
});
test('notebook preview opens the exact saved detail and all ancestors',async({page})=>{
 await page.addInitScript(state=>{localStorage.setItem('dai-art-personal-v1',JSON.stringify({...state,observations:{'leonardo-paper-4':{before:'My first observation of the allegory.',after:'',details:[{id:'saved-point',x:42,y:57,text:'The marks near the hand are worth returning to.'}]}}}));},personal);
 await page.goto('/study/art/notebook');await expect(page.locator('.art-notebook-preview')).toContainText('My first observation');await page.getByText('Read this artwork’s notes',{exact:true}).click();await page.getByRole('link',{name:'Reopen this detail note →'}).click();
 await expect(page.locator('#leonardo-paper-4-detail-note-saved-point')).toBeVisible();await expect(page.locator('#leonardo-paper-4-observation-journal')).toHaveAttribute('open','');
});
test('comparison failed image keeps its space and retries without losing the pair',async({page})=>{
 await page.route('**/images/art/**',route=>route.abort());await page.goto('/study/art/compare?left=leonardo-01&right=vermeer-01');
 const first=page.locator('[data-work=first]');await first.locator('.art-reproduction').scrollIntoViewIfNeeded();await expect(first.getByRole('status')).toContainText('could not load');const height=(await first.locator('.art-reproduction').boundingBox())!.height;expect(height).toBeGreaterThan(300);
 await page.unroute('**/images/art/**');await first.getByRole('button',{name:'Retry reproduction'}).click();await expect.poll(()=>first.locator('.art-reproduction img').evaluate((i:HTMLImageElement)=>i.complete&&i.naturalWidth>0)).toBe(true);await expect(page.getByLabel('First painting',{exact:true})).toHaveValue('leonardo-01');
});
for(const width of [390,1440])test('largest text keeps the reading column accessible '+width,async({page})=>{
 await page.setViewportSize({width,height:960});await page.addInitScript(state=>localStorage.setItem('dai-art-personal-v1',JSON.stringify({...state,textSize:1.3})),personal);await page.goto('/study/art/painting/leonardo-01#essay-section-2');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 expect((await new AxeBuilder({page}).include('main.art-room').withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);
 await page.screenshot({path:`artifacts/art-room/reading-largest-${width}.png`});
});

test('a newly opened sheet remembers its actual discussion after reading',async({page})=>{
 await page.goto('/study/art/on-paper#leonardo-paper-4-materials');const discussion=page.locator('#leonardo-paper-4-materials');await expect(discussion).toHaveAttribute('open','');await discussion.scrollIntoViewIfNeeded();
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('dai-art-personal-v1')!)?.reading?.['leonardo-paper-4']?.section)).toBe('leonardo-paper-4-materials');
 await page.goto('/study/art/on-paper');await page.getByRole('link',{name:'Continue studying your saved sheet ↓'}).click();await expect(page).toHaveURL(/#leonardo-paper-4-materials$/);
});

test('whole comparison reproductions fit their reserved box without clipping',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/study/art/compare?left=leonardo-01&right=vermeer-01');await page.getByRole('button',{name:'Second work',exact:true}).click();
 const image=page.locator('[data-work=second] .art-reproduction img');await image.scrollIntoViewIfNeeded();
 const box=await image.evaluate(i=>{const r=i.getBoundingClientRect(),p=i.parentElement!.getBoundingClientRect(),css=getComputedStyle(i);return {height:r.height,width:r.width,parentHeight:p.height,parentWidth:p.width,fit:css.objectFit};});
 expect(box.height).toBeLessThanOrEqual(box.parentHeight+1);expect(box.width).toBeLessThanOrEqual(box.parentWidth+1);expect(box.fit).toBe('contain');await page.screenshot({path:'artifacts/art-room/reading-refinements/whole-comparison-390.png'});
});

test('image description exits look-first and reveals research even after Introduction depth',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/study/art/painting/leonardo-01');
 for(let attempt=0;attempt<2;attempt++){
  await page.getByRole('button',{name:/^Introduction ·/}).click();await page.getByRole('button',{name:'Look first, read second',exact:true}).click();
  await page.getByRole('link',{name:'Read the image description ↓',exact:true}).click();
  await expect(page.locator('#work-description')).toBeVisible();await expect(page.locator('main.art-room')).toHaveAttribute('data-reading-depth','research');await expect(page.locator('#work-description')).toBeInViewport();
 }
 await page.screenshot({path:'artifacts/art-room/hourly/2026-11-21-1248-description-after.png'});
});
