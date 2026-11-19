import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage leads with proof and keeps all heritage scenes and destinations',async({page})=>{
 await page.goto('/');
 const ids=await page.locator('main.threshold .heritage-row').evaluateAll(es=>es.map(e=>e.querySelector('img')?.getAttribute('src')));
 expect(ids[0]).toContain('colosseum-engineering');expect(ids[1]).toContain('measure-of-time');expect(ids.length).toBeGreaterThanOrEqual(8);
 await expect(page.locator('.home-start-choices')).toHaveCount(0);
 await expect(page.getByRole('link',{name:'Try eAI in two minutes →',exact:true})).toBeVisible();
 await page.locator('.quiet-chapter').first().locator(':scope > summary').click();await page.locator('.problem-other-starts > summary').click();await expect(page.getByRole('heading',{name:'What brings you here?'})).toBeVisible();
 await expect(page.locator('.main-project')).toHaveCount(3);
 for(const article of await page.locator('.main-project').all()){await article.getByText('Decision, evidence & limitation',{exact:true}).click();await expect(article.locator('dt')).toHaveText(['Decision','Evidence','Limitation']);}
});
test('two-minute introduction compares recorded outcomes without API calls',async({page})=>{
 const mutations:string[]=[];page.on('request',r=>{if(r.method()==='POST')mutations.push(r.url());});
 await page.goto('/start/two-minutes');await page.getByRole('radio',{name:'Return the original order',exact:true}).check();await page.getByRole('button',{name:'Inspect the recorded result →'}).click();
 await expect(page.getByRole('heading',{name:'The original order was returned.'})).toBeVisible();await page.getByRole('button',{name:'Injected defect',exact:true}).click();await expect(page.getByRole('heading',{name:'A second order was created.'})).toBeVisible();
 await page.getByRole('button',{name:'Keep the distinction →'}).click();await expect(page.getByRole('link',{name:'Follow the complete case →'})).toBeVisible();expect(mutations).toEqual([]);
});
test('curiosity essentials stay calm and every advanced control remains reachable',async({page})=>{
 await page.goto('/study/curiosity');await expect(page.getByRole('button',{name:'Reveal the fact',exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'Interests',exact:true})).toBeHidden();await page.getByRole('button',{name:'Explore',exact:true}).click();await expect(page.getByRole('button',{name:'Interests',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Interests',exact:true}).click();await expect(page.getByRole('region',{name:'Your curiosity interests'})).toBeVisible();await page.getByRole('button',{name:'Close interests',exact:true}).click();
 await page.getByRole('button',{name:'Explore',exact:true}).click();await page.getByRole('button',{name:'Reveal the fact',exact:true}).click();await page.getByText('More discovery actions',{exact:true}).click();await expect(page.getByRole('button',{name:'Add to collection',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'♡ Save discovery',exact:true}).click();await expect(page.getByRole('button',{name:'♥ Saved',exact:true})).toBeVisible();await page.reload();await expect(page.getByRole('button',{name:'♥ Saved',exact:true})).toBeVisible();
});
test('path cards and books precede optional orientation',async({page})=>{
 await page.goto('/study/certifications');await expect(page.getByRole('link',{name:'AWS Cloud Practitioner →',exact:true})).toBeVisible();
 expect(await page.locator('.cert-hub-body').evaluate(e=>{const cards=e.querySelector('a[href="/study/certifications/cloud-practitioner"]'),help=e.querySelector('.cert-provenance');return !!cards&&!!help&&!!(cards.compareDocumentPosition(help)&Node.DOCUMENT_POSITION_FOLLOWING);})).toBe(true);
 await page.goto('/study/reading');await expect(page.getByRole('navigation',{name:'Reading Room destinations'})).toBeVisible();expect(await page.locator('.rr-home-body').evaluate(e=>e.firstElementChild?.id)).toBe('books');
});
test('review package fits phone laptop and wide screens with accessible introduction',async({page})=>{
 for(const width of [390,1440,1920])for(const [id,path] of [['home','/'],['curiosity','/study/curiosity'],['reading','/study/reading'],['certification','/study/certifications'],['intro','/start/two-minutes']]){
 await page.setViewportSize({width,height:1000});await page.goto(path);await page.waitForTimeout(300);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),id+' '+width).toBe(true);await page.screenshot({path:`artifacts/signature/${id}-${width}.png`,fullPage:true});}
 await page.goto('/start/two-minutes');expect((await new AxeBuilder({page}).include('.signature-case').withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);
});
