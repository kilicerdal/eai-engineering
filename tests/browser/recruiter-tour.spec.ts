import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('five-minute tour is reachable, shareable and keyboard navigable',async({page},info)=>{
 await page.goto('/#engineering');
 await page.getByRole('link',{name:'Recruiters: take the five-minute project tour →',exact:true}).click();
 await expect(page).toHaveURL(/\/engineering\/tour$/);
 await expect(page.getByRole('heading',{name:'Three projects. Decisions you can inspect.',exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'← Previous',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'Next stop →',exact:true}).click();
 const checkout=page.getByRole('heading',{name:'One checkout. Even when the request repeats.',exact:true});
 await expect(checkout).toBeFocused();await expect(page).toHaveURL(/#checkout$/);
 await expect(page.getByRole('link',{name:'Open the dated checkout record ↗',exact:true})).toHaveAttribute('href','/evidence/order-once.json');
 await page.getByRole('button',{name:'Next stop →',exact:true}).click();
 await expect(page).toHaveURL(/#claims$/);
 await page.goBack();await expect(checkout).toBeVisible();
 await page.reload();await expect(checkout).toBeVisible();
 await page.getByRole('button',{name:'Settlement controls →',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Check the terms before value moves.',exact:true})).toBeFocused();
 await page.getByRole('button',{name:'Next stop →',exact:true}).click();
 await expect(page.getByRole('link',{name:'Discuss an engineering role or project →',exact:true})).toHaveAttribute('href','/#contact');
 await expect(page.locator('.main-tour')).toContainText('AI assistance for implementation, test development and documentation');
 expect((await new AxeBuilder({page}).include('.main-tour').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`artifacts/engineering-story/recruiter-tour-${info.project.name}.png`,fullPage:true});
 await page.getByRole('button',{name:'Start again ↻',exact:true}).click();await expect(page).toHaveURL(/#overview$/);
 await expect(page.getByRole('button',{name:'← Previous',exact:true})).toBeDisabled();
});

test('project ownership links real work and keeps the lab illustration separate',async({page})=>{
 for(const [path,title,repository] of [
  ['/engineering/order-once','Playwright AI Automation','playwright-ai-automation'],
  ['/engineering/claim-twice','AI Healthcare Quality Platform','ai-healthcare-quality-platform'],
  ['/engineering/settlementlab','SettlementLab','settlementlab'],
 ]){
  await page.goto(path);
  const ownership=page.getByRole('region',{name:'Project ownership for '+title,exact:true});
  await expect(ownership).toContainText('developed with AI assistance');
  await ownership.getByText('Project ownership & AI assistance',{exact:true}).click();
  await expect(ownership.getByRole('link',{name:'Inspect the public repository ↗',exact:true})).toHaveAttribute('href','https://github.com/kilicerdal/'+repository);
  await expect(ownership).toContainText('synthetic data');
 }
 await page.goto('/engineering/projects');
 const lab=page.getByRole('article').filter({has:page.getByRole('heading',{name:'Healthcare Quality Lab',exact:true})});
 await expect(lab.getByRole('link',{name:'Public repository ↗',exact:true})).toHaveAttribute('href','https://github.com/kilicerdal/healthcare-quality-lab');
 await lab.getByRole('link',{name:'View design illustration →',exact:true}).click();
 await expect(page).toHaveURL(/\/engineering\/private-lab$/);
 await expect(page.getByRole('main')).toContainText('Healthcare Quality Lab is public.');
 await expect(page.getByRole('main')).toContainText('separate authored illustration');
 await expect(page.getByRole('link',{name:'Inspect the public Healthcare Quality Lab repository ↗',exact:true})).toHaveAttribute('href','https://github.com/kilicerdal/healthcare-quality-lab');
});

test('SettlementLab V4.1 presents dated economic evidence and a playable recovery record',async({page,request},info)=>{
 await page.goto('/engineering/settlementlab');
 await expect(page).toHaveTitle(/SettlementLab V4.1/);
 await expect(page.locator('h1')).toHaveText('Every trade.Accounted for.');
 await expect(page.locator('.v41-stats')).toContainText('145');
 await expect(page.locator('.v41-stats')).toContainText('89.04%');
 await expect(page.locator('.v41-stats')).toContainText('240');
 await expect(page.locator('.v41-stats')).toContainText('60');
 await expect(page.getByRole('link',{name:'View V4.1 release ↗',exact:true})).toHaveAttribute('href','https://github.com/kilicerdal/settlementlab/releases/tag/v4.1.0');
 await page.getByText('Source provenance and measured worker workloads',{exact:true}).click();
 await expect(page.getByRole('table',{name:'Observed local throughput, including worker startup and shutdown'})).toBeVisible();
 const measurements=page.getByRole('region',{name:'Worker measurements, scroll horizontally'});
 if(await measurements.evaluate(node=>node.scrollWidth>node.clientWidth)){
  await measurements.focus();await page.keyboard.press('ArrowRight');
  await expect.poll(()=>measurements.evaluate(node=>node.scrollLeft)).toBeGreaterThan(0);
 }
 await expect(page.locator('#ai')).toContainText('Fresh sampling: not run');
 await expect(page.locator('#ai')).toContainText('Offline label agreement is not model accuracy');
 await expect(page.locator('.v41-history')).not.toHaveAttribute('open','');
 for(const url of ['/evidence/settlementlab-v41/scorecard/index.html','/evidence/settlementlab-v41/scorecard/economic-oracle.json','/evidence/settlementlab-v41/scorecard/reuse/injected-defect/index.html','/evidence/settlementlab-v41/recovery.vtt']){
  const response=await request.get(url);expect(response.status()).toBe(200);
 }
 const video=page.locator('#recovery video');
 await video.scrollIntoViewIfNeeded();
 await video.evaluate(async(node:HTMLVideoElement)=>{node.muted=true;await node.play();});
 await expect.poll(()=>video.evaluate((node:HTMLVideoElement)=>node.currentTime)).toBeGreaterThan(.2);
 await video.evaluate((node:HTMLVideoElement)=>node.pause());
 expect((await new AxeBuilder({page}).include('main.settlement-v41').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`artifacts/engineering-story/settlementlab-v41-${info.project.name}.png`,fullPage:true});
 await page.getByRole('link',{name:'Inspect the V4.1 scorecard ↗',exact:true}).click();
 await expect(page).toHaveURL(/\/evidence\/settlementlab-v41\/scorecard\/index.html$/);
 await expect(page.getByRole('heading',{name:'Measured worker workloads'})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.goto('/engineering/settlementlab#reuse-v26');
 await expect(page.locator('#reuse-v26')).toBeVisible();
});
