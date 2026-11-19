import {test,expect,type Page} from '@playwright/test';
async function finalizeMetric(page:Page){
 await page.waitForFunction(()=>performance.getEntriesByName('first-contentful-paint').length>0);
 await page.waitForFunction(()=>document.querySelector<HTMLImageElement>('.atlas-landscape')?.complete);
 await page.waitForTimeout(150);
 // Flush actual browser measurements by simulating document hiding; metric values are never mocked.
 await page.evaluate(()=>{Object.defineProperty(document,'visibilityState',{configurable:true,get:()=> 'hidden'});window.dispatchEvent(new Event('visibilitychange'));});
 await page.waitForTimeout(150);
}
import AxeBuilder from '@axe-core/playwright';

test('public crawler files include case studies and exclude personal routes',async({request})=>{
 const robots=await request.get('/robots.txt');expect(robots.status()).toBe(200);expect(robots.headers()['content-type']).toContain('text/plain');const text=await robots.text();expect(text).toContain('Sitemap: https://www.eai.engineering/sitemap.xml');expect(text).toContain('Disallow: /recruiters/');
 const sitemap=await request.get('/sitemap.xml');expect(sitemap.status()).toBe(200);const xml=await sitemap.text();
 for(const route of ['/engineering/order-once','/engineering/claim-twice','/engineering/settlementlab','/privacy'])expect(xml).toContain('https://www.eai.engineering'+route);
 for(const route of ['/api/','/recruiters','/your-space','/study/account'])expect(xml).not.toContain('<loc>https://www.eai.engineering'+route);
});

test('homepage canonical, profile data and route-specific sharing previews are served to crawlers',async({request})=>{
 for(const path of ['/','/engineering','/engineering/tour','/engineering/projects','/engineering/order-once','/engineering/claim-twice','/engineering/settlementlab','/study/reading','/study']) {
  const response=await request.get(path,{headers:{'User-Agent':'LinkedInBot'}});expect(response.status()).toBe(200);const html=await response.text();
  const canonical=html.match(/rel="canonical" href="([^"]+)"/);expect(canonical).not.toBeNull();expect(new URL(canonical![1]).href).toBe(new URL(path,'https://www.eai.engineering').href);
  expect(html).toContain('property="og:title"');expect(html).toContain('name="twitter:card" content="summary_large_image"');
  const match=html.match(/property="og:image" content="([^"]+)"/);expect(match).not.toBeNull();
  const shareImage=new URL(match![1]);expect(shareImage.origin).toBe('https://www.eai.engineering');
  const image=await request.get(shareImage.pathname+shareImage.search);expect(image.status()).toBe(200);expect(image.headers()['content-type']).toMatch(/^image\//);const imageBody=await image.body();expect(imageBody.byteLength).toBeGreaterThan(1000);expect(imageBody.byteLength).toBeLessThan(5*1024*1024);
  expect(image.headers()['content-type']).toContain('image/png');
  expect(imageBody.readUInt32BE(16)).toBeGreaterThanOrEqual(1200);expect(imageBody.readUInt32BE(20)).toBeGreaterThanOrEqual(627);
  if(path==='/'){expect(html).toContain('"@type":"ProfilePage"');expect(html).toContain('"name":"Erdal Kilic"');}
  if(path.includes('order-once'))expect(html).toContain('order-once-share.png');
  if(path.includes('claim-twice'))expect(html).toContain('claim-twice-share.png');
  if(path.includes('settlementlab'))expect(html).toContain('/social/settlement-card');
 }
});

test('recruiter overview offers three direct demos, source repositories and evidence anchors',async({page,request})=>{
 await page.goto('/engineering/tour');const cards=page.locator('.tour-review-grid article');await expect(cards).toHaveCount(3);
 for(let i=0;i<3;i++){
  const card=cards.nth(i);await expect(card.getByRole('link',{name:'Source ↗',exact:true})).toHaveAttribute('href',/^https:\/\/github.com\/kilicerdal\//);
  const evidence=await card.getByRole('link',{name:'Evidence →',exact:true}).getAttribute('href');expect(evidence).toMatch(/#evidence$/);
  const response=await request.get(evidence!.split('#')[0]);expect(response.status()).toBe(200);expect(await response.text()).toContain('id="evidence"');
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('skip link stays on homepage and mobile menu returns focus on Escape',async({page},info)=>{
 await page.goto('/');const skip=page.getByRole('link',{name:'Skip to main content',exact:true});await skip.focus();await skip.press('Enter');await expect(page.locator('#hero-title')).toBeFocused();await expect(page).toHaveURL(/\/#hero-title$/);
 if(info.project.name==='mobile'){
  const menu=page.getByRole('button',{name:/^Menu/});await menu.focus();await menu.press('ArrowDown');await expect(menu).toHaveAttribute('aria-expanded','true');await expect(page.locator('#atlas-nav a').first()).toBeFocused();await page.keyboard.press('Escape');await expect(menu).toBeFocused();await expect(menu).toHaveAttribute('aria-expanded','false');
  await menu.click();await page.locator('.home-jump-nav').click({position:{x:5,y:20}});await expect(menu).toHaveAttribute('aria-expanded','false');
 }
});

test('homepage passes accessibility checks with reduced motion and visible keyboard focus',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();expect(results.violations).toEqual([]);
 const link=page.locator('.home-jump-nav a').first();await link.focus();expect(await link.evaluate(el=>getComputedStyle(el).outlineStyle)).toBe('solid');
 expect(await page.locator('.threshold').evaluate(el=>getComputedStyle(el).scrollBehavior)).toBe('auto');
});

test('atlas drawing is deferred until near the viewport while its accessible content is present',async({page})=>{
 await page.goto('/');const map=page.locator('.ai-philosophy .map');await expect(map).not.toHaveAttribute('data-connections','ready');await expect(page.locator('#ai-atlas-title')).toHaveText('Intelligence, connected.');
 await map.scrollIntoViewIfNeeded();await expect(map).toHaveAttribute('data-connections','ready');await expect(map.locator('path').first()).toHaveAttribute('d',/^M/);
 await page.getByRole('button',{name:'Retrieval path',exact:true}).click();await expect(page.locator('[data-node="runtime"]')).toHaveClass(/dim/);
});

test('performance intake rejects cross-site, extra private fields, invalid values and oversized data',async({request,baseURL})=>{
 expect((await request.get('/api/performance')).status()).toBe(405);
 expect((await request.post('/api/performance',{headers:{origin:baseURL!},data:{metric:'LCP',value:1234,device:'mobile'}})).status()).toBe(204);
 expect((await request.post('/api/performance',{headers:{origin:'https://other.example'},data:{metric:'LCP',value:1000,device:'mobile'}})).status()).toBe(403);
 for(const data of [{metric:'LCP',value:1000,device:'mobile',message:'must not be logged'},{metric:'CLS',value:-1,device:'mobile'},{metric:'INP',value:'100',device:'desktop'}])expect((await request.post('/api/performance',{headers:{origin:baseURL!},data})).status()).toBe(400);
 expect((await request.post('/api/performance',{headers:{origin:baseURL!},data:'x'.repeat(513)})).status()).toBe(413);
});

test('real performance callback sends only allowlisted data and honors opt-out',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(navigator,'webdriver',{get:()=>false});Object.defineProperty(navigator,'doNotTrack',{get:()=>null});Object.defineProperty(navigator,'globalPrivacyControl',{get:()=>false});});
 const events:unknown[]=[];
 await page.route('**/api/performance',async route=>{events.push(route.request().postDataJSON());expect(route.request().headers()['cookie']).toBeUndefined();expect(route.request().headers()['referer']||'').toBe('');await route.fulfill({status:204});});
 await page.goto('/');await finalizeMetric(page);await page.goto('/privacy');
 await expect.poll(()=>events.length).toBeGreaterThan(0);
 await expect(page.locator('.studio-account-card')).toHaveCSS('background-color','rgb(16, 26, 40)');
 for(const event of events)expect(Object.keys(event as object).sort()).toEqual(['device','metric','value']);
 await page.getByRole('button',{name:'Disable performance measurement',exact:true}).click();await expect(page.getByRole('region',{name:'Your choice'}).getByRole('status')).toContainText('disabled');
 events.length=0;await page.goto('/');await finalizeMetric(page);await page.goto('/privacy');await page.waitForTimeout(500);expect(events).toEqual([]);
 await expect(page.getByRole('button',{name:'Allow performance measurement',exact:true})).toHaveAttribute('aria-pressed','true');
});

for(const signal of ['dnt','gpc'])test(`performance callback honors ${signal} privacy signal`,async({page})=>{
 await page.addInitScript(kind=>{Object.defineProperty(navigator,'webdriver',{get:()=>false});Object.defineProperty(navigator,'doNotTrack',{get:()=>kind==='dnt'?'1':null});Object.defineProperty(navigator,'globalPrivacyControl',{get:()=>kind==='gpc'});},signal);
 const events:string[]=[];await page.route('**/api/performance',async route=>{events.push(route.request().url());await route.fulfill({status:204});});
 await page.goto('/');await finalizeMetric(page);await page.goto('/privacy');await page.waitForTimeout(500);expect(events).toEqual([]);
});

test('browser performance events reach the actual same-origin intake without cookies or referrer',async({page,context,baseURL})=>{
 await context.addCookies([{name:'synthetic_privacy_fixture',value:'not-a-real-session',url:baseURL!}]);
 await page.addInitScript(()=>{Object.defineProperty(navigator,'webdriver',{get:()=>false});Object.defineProperty(navigator,'doNotTrack',{get:()=>null});Object.defineProperty(navigator,'globalPrivacyControl',{get:()=>false});});
 const statuses:number[]=[];
 page.on('request',request=>{if(request.url().endsWith('/api/performance')){expect(request.headers()['cookie']).toBeUndefined();expect(request.headers()['referer']||'').toBe('');}});
 page.on('response',response=>{if(response.url().endsWith('/api/performance'))statuses.push(response.status());});
 await page.goto('/');await finalizeMetric(page);await expect.poll(()=>statuses.length).toBeGreaterThan(0);expect(statuses.every(status=>status===204)).toBe(true);
});
