import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('five-minute tour is reachable, shareable and keyboard navigable',async({page},info)=>{
 await page.goto('/#engineering');
 await page.locator('.home-professional-intro').getByRole('link',{name:'Take the five-minute project tour →',exact:true}).click();
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

test('AI Agent Reliability Lab is discoverable with grounded results and public evidence', async ({page, request}) => {
 const route='/engineering/agent-reliability-lab';
 const viewer='https://kilicerdal.github.io/agent-reliability-lab/';
 await page.goto('/#engineering');
 await expect(page.getByRole('link',{name:'Explore AI Agent Reliability Lab →'})).toHaveAttribute('href',route);
 await page.goto('/engineering/projects');
 await page.getByRole('button',{name:'AI Systems',exact:true}).click();
 const lab=page.getByRole('article').filter({has:page.getByRole('heading',{name:'AI Agent Reliability Lab',exact:true})});
 await expect(lab.getByRole('link',{name:'Live evidence viewer ↗'})).toHaveAttribute('href',viewer);
 await lab.getByRole('link',{name:'Explore project →'}).click();
 await expect(page).toHaveURL(new RegExp(route+'$'));
 await expect(page.getByRole('heading',{name:'AI Agent Reliability Lab',exact:true})).toBeVisible();
 await expect(page.getByRole('link',{name:'Open the live evidence viewer',exact:true})).toHaveAttribute('href',viewer);
 await expect(page.getByRole('link',{name:'View GitHub repository',exact:true})).toHaveAttribute('href','https://github.com/kilicerdal/agent-reliability-lab');
 await expect(page.locator('#evidence')).toContainText('19/24 → 23/24');
 await expect(page.getByRole('link',{name:'Compare results by incident'})).toHaveAttribute('href',viewer+'#comparison');
 await expect(page.getByRole('link',{name:'Explore all 6 failed trials'})).toHaveAttribute('href',viewer+'#failure-select');
 const trialLinks=page.getByRole('region',{name:'Direct links to failed trials'}).getByRole('link');
 await expect(trialLinks).toHaveCount(6);
 expect(await trialLinks.evaluateAll(links=>links.map(link=>link.getAttribute('href')))).toEqual([
  'invoice-window/baseline/1','invoice-window/baseline/2','invoice-window/baseline/3',
  'invoice-window/recovery/3','orphan-alert/baseline/2','orphan-alert/baseline/3',
 ].map(trial=>viewer+'#failed-trial-'+trial));
 const demo=page.getByRole('navigation',{name:'Five-minute demo',exact:true});
 await expect(demo.getByRole('link',{name:'Inspect a failed diagnosis'})).toHaveAttribute('href',viewer+'#failed-trial-invoice-window/recovery/3');
 await expect(demo.getByRole('link',{name:'Compare the evidence handoff'})).toHaveAttribute('href',viewer+'#evidence-handoff');
 await expect(demo.getByRole('link',{name:'Replay an approved restart'})).toHaveAttribute('href',viewer+'#approval');
 await expect(page.getByRole('link',{name:'V4.2.0 release'})).toHaveAttribute('href','https://github.com/kilicerdal/agent-reliability-lab/releases/tag/v4.2.0');
 const blind=page.getByRole('region',{name:'Blind evaluation',exact:true});
 await expect(blind).toContainText('47/50 → 50/50');
 const modelComparison=page.getByRole('region',{name:'Sol vs. Luna model comparison',exact:true});
 await expect(modelComparison).toContainText('16/16 Sol runs and 7/16 Luna runs');
 await expect(modelComparison).toContainText('all 32 runs');
 await expect(modelComparison.getByRole('link',{name:'Open the live model comparison'})).toHaveAttribute('href',viewer+'#model-comparison');
 const handoff=page.getByRole('region',{name:'Evidence handoff experiment',exact:true});
 await expect(handoff).toContainText('Fresh tool reads fell from 16 to 13');
 await expect(handoff).toContainText('citation support fell from 11/12 to 10/12');
 await expect(handoff.getByRole('link',{name:'Open the live handoff comparison'})).toHaveAttribute('href',viewer+'#evidence-handoff');
 await expect(blind.getByRole('link',{name:'Open the live blind scorecard'})).toHaveAttribute('href',viewer+'#blind-evaluation');
 for(const [title,id] of [['Read Fence · Trial 2','read-fence-2'],['Dispatch Profile · Trial 1','dispatch-profile-1'],['Maintenance Flag · Trial 1','maintenance-flag-1']]){
  await expect(blind.getByRole('link',{name:title,exact:true})).toHaveAttribute('href',viewer+'#blind-correction-'+id);
 }

 await expect(page.locator('#evidence')).toContainText('One restart. One completed order.');
 await expect(page.locator('#evidence')).toContainText('entered operator confirmations by script');
 const response=await request.get('/evidence/agent-reliability-lab.json');
 expect(response.ok()).toBe(true);
 expect((await response.json()).approval.completed.completion_events).toBe(1);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect((await new AxeBuilder({page}).include('main.threshold').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
});
