import {test,expect} from '@playwright/test';
const root='/study/art';
test('a briefly crossed section never replaces the reading place after leaving it',async({page})=>{
 await page.goto(root+'/painting/leonardo-01');await page.locator('#essay-section-2').evaluate(e=>e.scrollIntoView({block:'start'}));
 const position=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('dai-art-personal-v1')??'{}').reading?.['leonardo-01']?.section);
 await expect.poll(position).toBe('essay-section-2');await page.locator('#essay-section-3').evaluate(e=>e.scrollIntoView({block:'start'}));await page.waitForTimeout(200);await page.locator('#work-image').evaluate(e=>e.scrollIntoView({block:'start'}));await page.waitForTimeout(1700);expect(await position()).toBe('essay-section-2');
});
test('research topics open individually and direct source links still reveal their topic',async({page})=>{
 await page.goto(root+'/painting/vermeer-01#research');await page.locator('#study-making>summary').click();await expect(page.locator('#study-making')).toHaveAttribute('open','');await page.locator('#study-history>summary').click();await expect(page.locator('#study-making')).not.toHaveAttribute('open','');await expect(page.locator('#study-history')).toHaveAttribute('open','');await page.goto(root+'/painting/leonardo-01#research-materials');await expect(page.locator('#research-materials')).toBeVisible();
});
test('look again returns to the section actually reached without an existing hash',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(root+'/painting/vermeer-01');await page.locator('#essay-section-3').evaluate(e=>e.scrollIntoView({block:'start'}));await page.waitForTimeout(200);await page.getByRole('button',{name:'Look again at the whole painting',exact:true}).click();await expect(page.getByRole('link',{name:'Return to your essay passage →'})).toHaveAttribute('href','#essay-section-3');await page.getByRole('link',{name:'Return to your essay passage →'}).click();await expect(page).toHaveURL(/#essay-section-3$/);
});
test('an empty observation journal does not create an empty writing dashboard',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('dai-art-personal-v1',JSON.stringify({version:1,notes:{},collections:[],recent:[],next:null,textSize:1,focus:false,notices:true,observations:{'vermeer-01':{before:'',after:'',details:[]}}})));
 await page.goto(root+'/my-art');await expect(page.getByRole('heading',{name:'Begin with one painting.'})).toBeVisible();await expect(page.getByText('Writing, collections & visit records',{exact:true})).toHaveCount(0);
});
