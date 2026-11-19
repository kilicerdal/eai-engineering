import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {ideas} from '../../src/lib/try-one-idea';
const key='eai-try-one-idea-v1';
test('all thirty-eight activities support an attempt, explanation and stopping point without AI',async({page})=>{test.setTimeout(90000);let calls=0;page.on('request',r=>{if(r.method()==='POST'&&r.url().includes('/api/'))calls++;});await page.goto('/study/journeys/try');await page.locator('.idea-picker > summary').click();for(const a of ideas){await page.getByLabel('What would you like to try?').selectOption(a.id);const active=page.getByRole('region',{name:'Current learning activity'});await expect(active.getByRole('heading',{name:a.title,exact:true})).toBeVisible();await active.getByLabel('My prediction, attempt or explanation').fill('My small attempt and its assumptions.');if(a.choices)await active.getByRole('radio').nth(a.answer!).check();if(a.mode==='boundary')await active.getByLabel('My test ages').fill('17,18,65,66');await active.getByRole('button',{name:'Inspect the idea →',exact:true}).click();await expect(active.getByRole('region',{name:'Activity explanation'})).toContainText(a.explanation);await active.getByRole('button',{name:'Keep one useful thought →',exact:true}).click();await active.getByLabel('What became clearer, or what remains open?').fill('One useful distinction to revisit.');await expect(active).toContainText('You can stop here.');}expect(calls).toBe(0);await page.getByRole('button',{name:'Save practice draft',exact:true}).click();await page.reload();await expect(page.getByLabel('What became clearer, or what remains open?')).toHaveValue('One useful distinction to revisit.');const saved=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)||'{}'),key);expect(Object.keys(saved.drafts)).toHaveLength(38);});
test('lever and ISTQB exercises expose actual bounded model results',async({page})=>{await page.goto('/study/journeys/try?activity=change-one');await page.getByLabel('My prediction, attempt or explanation').fill('Doubling the arm should halve the force.');await page.getByRole('button',{name:'Inspect the idea →'}).click();await page.getByLabel('Input arm in the ideal model').selectOption('2');await expect(page.locator('output')).toContainText('50.0 N');await page.getByRole('button',{name:'Save practice draft'}).click();await page.goto('/study/journeys/try?activity=istqb-design');await page.getByLabel('Test technique').selectOption('partition');await page.getByLabel('My test ages').fill('10,40,90');await page.getByRole('button',{name:'Inspect the idea →'}).click();await expect(page.getByRole('region',{name:'Activity explanation'})).toContainText('fits this bounded check');await page.getByRole('button',{name:'Reconsider my attempt'}).click();await page.getByLabel('Test technique').selectOption('table');await page.getByLabel('Member / coupon',{exact:true}).check();await page.getByRole('button',{name:'Inspect the idea →'}).click();await expect(page.getByRole('region',{name:'Activity explanation'})).toContainText('fits this bounded check');});
test('saved examples join the existing notebook without changing tutor or reading saves',async({page})=>{const session=JSON.stringify([{id:'keep-original',title:'My tutor',mode:'math',updatedAt:1000,messages:[],draft:'Original unsent tutor text',learning:{level:'highSchool',approach:'guided',goal:''}}]);await page.addInitScript(s=>{if(!localStorage.getItem('eai-study-conversations-v1'))localStorage.setItem('eai-study-conversations-v1',s);},session);await page.goto('/study/journeys/try?activity=example-bank');await page.getByLabel('My prediction, attempt or explanation').fill('Two equal parts make halves; unequal parts do not.');await page.getByRole('button',{name:'Inspect the idea →'}).click();await page.getByRole('button',{name:'Keep one useful thought →'}).click();await page.getByLabel('What became clearer, or what remains open?').fill('Equal parts matter.');await page.getByRole('button',{name:'Keep this example',exact:true}).click();await expect(page.getByRole('status').filter({hasText:'A new note was saved'})).toBeVisible();expect(await page.evaluate(()=>localStorage.getItem('eai-study-conversations-v1'))).toBe(session);const notebook=await page.evaluate(()=>JSON.parse(localStorage.getItem('eai-understanding-v1')||'{}'));expect(notebook.entries[0].kind).toBe('artifact');expect(notebook.entries[0].href).toBe('/study/journeys/try#example-bank');});
test('corrupt practice copies are retained and current writing can be downloaded',async({page})=>{const corrupt='{"version":99,"drafts":{"personal":"keep me"}}';await page.addInitScript(({key,corrupt})=>localStorage.setItem(key,corrupt),{key,corrupt});await page.goto('/study/journeys/try');await expect(page.getByRole('alert').filter({hasText:'Earlier practice writing is protected'})).toBeVisible();await page.getByLabel('My prediction, attempt or explanation').fill('My new writing');await page.getByRole('button',{name:'Save practice draft'}).click();expect(await page.evaluate(k=>localStorage.getItem(k),key)).toBe(corrupt);const download=page.waitForEvent('download');await page.getByRole('button',{name:'Download this writing'}).click();expect((await download).suggestedFilename()).toMatch(/eai-idea-predict/);});
test('activities fit phone and desktop and keep accessible labels',async({page})=>{await page.goto('/study/journeys/try?activity=istqb-design');await page.getByLabel('Test technique').selectOption('table');expect((await new AxeBuilder({page}).include('.try-idea-page').withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);for(const width of [390,768,1440]){await page.setViewportSize({width,height:1000});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await page.screenshot({path:`artifacts/site-refinement/try-idea-${width}.png`,fullPage:true});}});

test('new labs preserve an earlier draft and check authored cases and reachable branches',async({page})=>{
 const old={attempt:'My earlier work',reflection:'An earlier insight',next:'Keep it',material:'',confidence:'tentative',choice:null,stage:2,arm:1,technique:'boundary',values:'',table:[false,false,false,false],note:''};
 await page.addInitScript(({key,old})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify({version:1,drafts:{predict:old}}));},{key,old});
 await page.goto('/study/journeys/try?activity=test-case-builder');
 await page.getByLabel('My test cases',{exact:true}).fill('17 | reject\n18 | reject\n40 | accept\n65 | accept\n66 | reject');
 await page.getByRole('button',{name:'Inspect the idea →',exact:true}).click();
 await expect(page.getByRole('region',{name:'Test case results'})).toContainText('4/4 boundary values');
 await expect(page.getByRole('cell',{name:'Revisit: accept',exact:true})).toHaveCount(1);
 await page.getByRole('button',{name:'Save practice draft',exact:true}).click();
 expect(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)!).drafts.predict,key)).toEqual(old);
 await page.goto('/study/journeys/try?activity=coverage-explorer');
 await page.getByLabel('Coverage test rows').fill('17 | yes\n17 | no');
 await page.getByRole('button',{name:'Inspect the idea →',exact:true}).click();
 await expect(page.getByRole('region',{name:'Branch coverage results'})).toContainText('1/4 branch outcomes');
 await page.getByRole('button',{name:'Reconsider my attempt',exact:true}).click();
 await page.getByLabel('Coverage test rows').fill('17 | no\n18 | yes\n40 | no');
 await page.getByRole('button',{name:'Inspect the idea →',exact:true}).click();
 await expect(page.getByRole('region',{name:'Branch coverage results'})).toContainText('4/4 branch outcomes');
});
test('timeline order and selected architecture changes yield contextual feedback',async({page})=>{
 await page.goto('/study/journeys/try?activity=failure-timeline');
 await page.getByRole('button',{name:'Move Client sends operation K-7 earlier',exact:true}).click();
 await page.getByRole('button',{name:'Move Server commits order O-42 earlier',exact:true}).click();
 await page.getByRole('button',{name:'Move Server commits order O-42 earlier',exact:true}).click();
 await page.getByRole('button',{name:'Inspect the idea →',exact:true}).click();
 await expect(page.locator('.lab-result')).toContainText('matches this captured model');
 await page.getByRole('button',{name:'Save practice draft',exact:true}).click();
 await page.goto('/study/journeys/try?activity=architecture-puzzle');
 await page.getByLabel('Proposed change').selectOption('identity');
 await page.getByRole('button',{name:'Inspect the idea →',exact:true}).click();
 await expect(page.getByRole('figure',{name:'Revised payment architecture'})).toContainText('Consistent identity + effect record');
 await expect(page.locator('.lab-result')).toContainText('consistent effect record');
 await page.getByRole('button',{name:'Save practice draft',exact:true}).click();
 await page.reload();await expect(page.getByLabel('Proposed change')).toHaveValue('identity');
});
test('debugging clues open separately and permissions distinguish statement scope from actual access',async({page})=>{
 await page.goto('/study/journeys/try?activity=debugging-detective');
 await expect(page.locator('.practice-lab blockquote')).toHaveCount(0);
 await page.getByRole('button',{name:'Inspect request trace',exact:true}).click();
 await expect(page.locator('.practice-lab blockquote')).toHaveCount(1);
 await expect(page.locator('.practice-lab blockquote')).toContainText('K-8');
 await page.getByRole('button',{name:'Inspect ledger records',exact:true}).click();
 await expect(page.locator('.practice-lab blockquote')).toHaveCount(2);
 await page.getByRole('button',{name:'Save practice draft',exact:true}).click();
 await page.goto('/study/journeys/try?activity=aws-permissions');
 await page.getByLabel('Required action').selectOption('get');await page.getByLabel('Resource scope').selectOption('object');
 await page.getByRole('button',{name:'Inspect the idea →',exact:true}).click();
 await expect(page.locator('.lab-result')).toContainText('fit the narrow object-read task');
 await expect(page.locator('.practice-lab pre')).toContainText('reports/summary.txt');
 await expect(page.getByRole('region',{name:'Activity explanation'})).toContainText('not a complete access decision');
});
test('takeaways export supplied writing and before/after keeps the original explanation',async({page})=>{
 await page.goto('/study/journeys/try?activity=engineering-takeaway');
 await page.getByLabel('Problem',{exact:true}).fill('A reply was lost.');
 await page.getByLabel('Evidence or observations',{exact:true}).fill('One recorded order, O-42.');
 await page.getByLabel('Decision and assumptions',{exact:true}).fill('Retain the operation identity.');
 await page.getByLabel('Next check',{exact:true}).fill('Replay in a safe fixture.');
 await page.getByText('Preview my takeaway',{exact:true}).click();
 await expect(page.locator('.practice-lab pre')).toContainText('One recorded order, O-42.');
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Download my takeaway',exact:true}).click();expect((await download).suggestedFilename()).toBe('eai-engineering-takeaway.txt');
 await page.getByRole('button',{name:'Inspect the idea →',exact:true}).click();await page.getByRole('button',{name:'Keep one useful thought →',exact:true}).click();
 await page.getByLabel('What became clearer, or what remains open?').fill('Check the effect as well as the reply.');await page.getByRole('button',{name:'Keep a new learning note',exact:true}).click();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('eai-understanding-v1')!).entries[0].text)).toContain('One recorded order, O-42.');
 await page.getByRole('button',{name:'Save practice draft',exact:true}).click();await page.goto('/study/journeys/try?activity=before-after');
 await page.getByLabel('My prediction, attempt or explanation').fill('A 200 response proves every invariant.');await page.getByRole('button',{name:'Inspect the idea →',exact:true}).click();await page.getByRole('button',{name:'Keep one useful thought →',exact:true}).click();await page.getByLabel('What became clearer, or what remains open?').fill('I need to inspect durable effects too.');
 await expect(page.getByRole('region',{name:'My before and after'})).toContainText('A 200 response proves every invariant.');await expect(page.getByRole('region',{name:'My before and after'})).toContainText('I need to inspect durable effects too.');
});
test('lab tables and architecture are accessible and fit narrow screens',async({page})=>{
 for(const id of ['architecture-puzzle','test-case-builder','failure-timeline','coverage-explorer','aws-permissions']){
  await page.goto('/study/journeys/try?activity='+id);
  await expect(page.getByLabel('My prediction, attempt or explanation')).toBeEnabled();
  expect((await new AxeBuilder({page}).include('.try-idea-page').withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);
 }
 for(const width of [390,1440]){await page.setViewportSize({width,height:1000});await page.goto('/study/journeys/try?activity=architecture-puzzle');await expect(page.getByLabel('My prediction, attempt or explanation')).toBeEnabled();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await page.screenshot({path:`artifacts/site-refinement/practice-labs-${width}.png`,fullPage:true});}
});
