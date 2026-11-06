import {test,expect} from '@playwright/test';
test('one session decision preserves duration, progress and backup without calling AI',async({page})=>{
 let modelCalls=0;
 await page.route('**/api/**',route=>{if(route.request().method()==='POST')modelCalls++;return route.fulfill({status:503,body:'{}'});});
 await page.goto('/study');
 const home=page.locator('#my-learning'),session=page.locator('#daily-study-session');
 await expect(session.getByRole('heading',{name:'Your next session.',exact:true})).toBeVisible();
 await expect(home.locator('.learning-next')).toHaveCount(1);
 await expect(home.getByText('RECOMMENDED NEXT STEP',{exact:true})).toHaveCount(0);
 await session.getByRole('button',{name:'10 minutes',exact:true}).click();
 await session.getByRole('button',{name:'Start my focused session'}).click();
 await expect(session.getByText('YOUR SAVED SESSION · 10 MINUTE PLAN')).toBeVisible();
 await session.getByRole('button',{name:'Mark this step done'}).click();
 await page.reload();
 await expect(session.getByRole('button',{name:/2. Learn/})).toHaveAttribute('aria-current','step');
 await session.getByText('Saving & backups',{exact:true}).click();
 const download=page.waitForEvent('download');
 await session.getByRole('button',{name:'Export session backup'}).click();
 expect((await download).suggestedFilename()).toBe('dai-study-sessions.json');
 expect(modelCalls).toBe(0);
});
test('scenery spans the viewport and controls fit at narrow and wide sizes',async({page},info)=>{
 await page.goto('/study');
 for(const width of info.project.name==='mobile'?[390]:[1280,2560]){
 await page.setViewportSize({width,height:900});
 const box=await page.locator('#my-learning .studio-landmark-banner').boundingBox();
 expect(box?.x).toBeCloseTo(0,0);expect(box?.width).toBeCloseTo(width,0);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 await page.locator('#daily-study-session').scrollIntoViewIfNeeded();
 await page.screenshot({path:`artifacts/engineering-story/study-session-${info.project.name}.png`});
});
test('resources pair correctly and planner steps remain usable without generation',async({page},info)=>{
 let posts=0;
 await page.route('**/api/**',route=>{if(route.request().method()==='POST')posts++;return route.fulfill({status:503,body:'{}'});});
 await page.goto('/study');
 const resources=page.locator('#learning-resources');
 await expect(resources.getByRole('link',{name:'Open your library'})).toHaveAttribute('href','/study/materials');
 await expect(resources.getByRole('link',{name:'Enter the Reading Room'})).toHaveAttribute('href','/study/reading');
 const cards=resources.locator('article');
 const a=await cards.nth(0).boundingBox(),b=await cards.nth(1).boundingBox();
 if(info.project.name==='mobile')expect(b!.y).toBeGreaterThan(a!.y+a!.height);else expect(a!.y).toBeCloseTo(b!.y,0);
 const planner=page.locator('#learning-goal');
 await planner.locator('#learning-achievement').fill('Understand how database transactions prevent duplicate orders');
 await planner.getByRole('button',{name:'Continue →',exact:true}).click();
 await expect(planner.getByRole('heading',{name:'Bring context, if you have it.'})).toBeVisible();
 await planner.getByRole('button',{name:'Continue without materials'}).click();
 await expect(planner.getByLabel('Starting level',{exact:true})).toBeVisible();
 await planner.getByRole('button',{name:'← Back',exact:true}).click();
 await planner.getByRole('button',{name:'← Back',exact:true}).click();
 await expect(planner.locator('#learning-achievement')).toHaveValue('Understand how database transactions prevent duplicate orders');
 expect(posts).toBe(0);
 await resources.scrollIntoViewIfNeeded();
 await page.screenshot({path:`artifacts/engineering-story/resources-${info.project.name}.png`});
 await planner.scrollIntoViewIfNeeded();
 await page.screenshot({path:`artifacts/engineering-story/planner-${info.project.name}.png`});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
