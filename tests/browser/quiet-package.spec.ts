import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('shorter home keeps original artwork and reveals older section links',async({page})=>{
 await page.goto('/');await expect(page.locator('.quiet-chapter')).toHaveCount(2);
 expect(await page.locator('main.threshold .heritage-row').count()).toBeGreaterThanOrEqual(8);
 await expect(page.locator('#artwork')).toBeHidden();
 await page.goto('/#artwork');await expect(page.locator('#artwork')).toBeVisible();
 expect(await page.locator('#artwork').evaluate(e=>e.closest('details')?.open)).toBe(true);
 const motion=await page.locator('#artwork img').evaluateAll(es=>es.map(e=>({position:getComputedStyle(e).position,animation:getComputedStyle(e).animationName})));
 expect(motion.every(e=>e.position!=='fixed'&&e.position!=='sticky'&&e.animation==='none')).toBe(true);
});
test('hub has seven clear room entrances and embedded tutor remains reachable',async({page})=>{
 await page.goto('/study');await expect(page.getByRole('navigation',{name:'Choose a learning room'}).getByRole('link')).toHaveCount(7);
 await expect(page.locator('#ai-assistant')).toBeHidden();await page.goto('/study#ai-assistant');await expect(page.locator('#ai-assistant')).toBeVisible();
 await expect(page.getByRole('button',{name:'Send',exact:true})).toBeVisible();
});
test('catalog is compact and reports core and scenario questions consistently',async({page})=>{
 await page.goto('/study/certifications');await expect(page.locator('.cert-compact-path')).toHaveCount(12);
 await expect(page.locator('.cert-compact-path').first()).toContainText('100 core + 5 scenario questions');
 expect((await page.locator('#cert-paths').boundingBox())!.y).toBeLessThan(Math.min(700,page.viewportSize()!.height));
});
test('practice gives brief feedback and source before deeper tools; reload retains answers',async({page})=>{
 await page.goto('/study/certifications/cloud-practitioner');await page.getByRole('button',{name:'Already familiar? Try 5 practice questions →',exact:true}).click();
 const practice=page.getByRole('region',{name:'Active certification practice'});await practice.getByRole('radio').first().check();await practice.getByRole('button',{name:'Check my answer',exact:true}).click();
 const source=practice.locator('.quiet-answer-source');await expect(source).toBeVisible();expect(await source.evaluate(e=>e.closest('details')===null)).toBe(true);
 await expect(practice.getByRole('button',{name:'Next question →',exact:true})).toHaveClass(/quiet-next/);
 await expect(page.getByRole('button',{name:/Continue question/})).toHaveCount(0);
 await page.reload();await expect(page.getByRole('region',{name:'Active certification practice'}).locator('.quiet-answer-source')).toBeVisible();
});
test('project previews enlarge without losing original proportion and close by keyboard',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Enlarge screenshot',exact:false}).first().click();
 const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();await expect(dialog.locator('img')).toBeVisible();
 expect(await dialog.locator('img').evaluate((e:HTMLImageElement)=>getComputedStyle(e).objectFit)).toBe('contain');await page.keyboard.press('Escape');await expect(dialog).toBeHidden();await expect(page.getByRole('button',{name:'Enlarge screenshot',exact:false}).first()).toBeFocused();
 await expect(page.getByRole('link',{name:'Inspect tested result →'})).toHaveCount(3);
});
test('walkthrough records real input and exports only reported responses without writes',async({page})=>{
 const posts:string[]=[];page.on('request',r=>{if(r.method()==='POST')posts.push(r.url());});await page.goto('/guide/experience-review');
 await page.getByRole('button',{name:'Start task 1',exact:true}).click();await page.getByRole('combobox').selectOption('Needed help');await page.getByRole('button',{name:'Finish and record'}).click();
 await expect(page.getByRole('list')).toContainText('Needed help');const download=page.waitForEvent('download');await page.getByRole('button',{name:'Download responses'}).click();expect((await download).suggestedFilename()).toBe('eai-visitor-walkthrough.json');expect(posts).toEqual([]);
 expect((await new AxeBuilder({page}).include('.quiet-walkthrough').withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);
});
test('hub and certification navigation fit phone laptop and wide screens',async({page})=>{
 for(const width of [390,1280,1920])for(const path of ['/','/study','/study/certifications']){await page.setViewportSize({width,height:900});await page.goto(path);await expect(page.locator('h1').first()).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${path} at ${width}`).toBe(true);await page.screenshot({path:`artifacts/quiet/${path.replaceAll('/','-')||'home'}-${width}.png`,fullPage:true});}
});

test('saved reading returns through the hub without rewriting the bookshelf',async({page})=>{
 const raw=JSON.stringify({version:1,positions:{11:{section:2,paragraph:'p14',updatedAt:100}},notes:[],bookmarks:[]});await page.addInitScript(value=>localStorage.setItem('dai-reading-library-v1',value),raw);await page.goto('/study');await expect(page.getByRole('link',{name:'Continue learning',exact:false})).toBeVisible();expect(await page.evaluate(()=>localStorage.getItem('dai-reading-library-v1'))).toBe(raw);
});
test('saving warning remains visible while normal recovery guidance is compact',async({page})=>{
 await page.goto('/guide/experience-review');const status=page.getByRole('complementary',{name:'Browser save status'});await expect.poll(async()=>{await page.evaluate(()=>window.dispatchEvent(new CustomEvent('dai-browser-save',{detail:{key:'walkthrough-test',ok:false}})));return status.innerText();}).toContain('Saving needs attention');await expect(status.getByText('Saving needs attention',{exact:true})).toBeVisible();await expect(status.locator(':scope > p').last()).toBeVisible();await status.locator(':scope > details > summary').click();await expect(status.getByRole('link',{name:'Download a backup · room options →'})).toBeVisible();
});

test('contextual glossary avoids unrelated defaults but full search remains available',async({page})=>{
 await page.goto('/study/certifications/cloud-practitioner');await page.getByRole('button',{name:'Already familiar? Try 5 practice questions →',exact:true}).click();const practice=page.getByRole('region',{name:'Active certification practice'});await practice.locator(':scope > details > summary').filter({hasText:'Help me understand'}).click();await practice.locator('.cert-thinking-tools > summary').click();const guide=practice.locator('.cert-thinking-tools details').filter({has:page.locator('summary',{hasText:'Terms and plain-language guide'})}).last();await guide.locator(':scope > summary').click();await expect(guide.getByRole('heading',{name:'Idempotency',exact:true})).toHaveCount(0);await guide.getByLabel('Find a term',{exact:true}).fill('idempotency');await expect(guide.getByRole('heading',{name:'Idempotency',exact:true})).toBeVisible();
});
