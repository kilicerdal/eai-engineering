import {test,expect} from '@playwright/test';
test('one session decision preserves duration, progress and backup without calling AI',async({page})=>{
 let modelCalls=0;
 await page.route('**/api/**',route=>{if(route.request().method()==='POST')modelCalls++;return route.fulfill({status:503,body:'{}'});});
 await page.goto('/study');
 const home=page.locator('#my-learning'),session=page.locator('#daily-study-session');
 await expect(session.getByRole('heading',{name:'Your next session.',exact:true})).toBeVisible();
 await expect(home.locator('.learning-next')).toHaveCount(1);
 await expect(home.getByText('RECOMMENDED NEXT STEP',{exact:true})).toHaveCount(0);
 await session.getByRole('button',{name:'30 minutes',exact:true}).click();
 await session.getByRole('button',{name:'Start my focused session'}).click();
 await expect(session.getByText('YOUR SAVED SESSION · 30 MINUTE PLAN')).toBeVisible();
 await session.getByRole('button',{name:'Mark this step done'}).click();
 await session.getByRole('button',{name:'I only have 10 minutes today'}).click();
 await page.reload();
 await expect(session.getByText('YOUR SAVED SESSION · 10 MINUTE PLAN')).toBeVisible();
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
test('mobile menu supports keyboard dismissal and readable tutor controls',async({page},info)=>{
 await page.goto('/study');
 if(info.project.name==='mobile'){
 const menu=page.locator('#study-menu-toggle');
 await menu.click();
 await expect(page.locator('#study-navigation-links')).toBeVisible();
 await menu.press('Escape');
 await expect(page.locator('#study-navigation-links')).toBeHidden();
 await expect(page.locator('#study-menu-toggle')).toBeFocused();
 await menu.click();
 await page.locator('#study-navigation-links').getByRole('link',{name:'My learning',exact:true}).click();
 await expect(page.locator('#study-navigation-links')).toBeHidden();
 }
 const shell=await page.locator('.tutor-focus-shell').boundingBox();
 const tools=await page.locator('.tutor-focus-tools').boundingBox();
 expect(tools!.x+tools!.width).toBeLessThanOrEqual(shell!.x+shell!.width);
 const lastTool=await page.locator('.tutor-focus-tools button').last().boundingBox();
 expect(lastTool!.x+lastTool!.width).toBeLessThanOrEqual(shell!.x+shell!.width);
 await expect(page.locator('#tutor-message-input')).toHaveCSS('font-size','16px');
 await expect(page.locator('.tutor-starter-prompts button').first()).toHaveCSS('font-size','14px');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('compact tutor keeps examples as unsent drafts and finished sessions collapsed',async({page},info)=>{
 let posts=0;
 await page.route('**/api/**',route=>{if(route.request().method()==='POST')posts++;return route.fulfill({status:503,body:'{}'});});
 await page.addInitScript(()=>{
 const time=Date.now()-60000;
 localStorage.setItem('eai-daily-sessions-v1',JSON.stringify({version:1,activeId:'finished-sample',sessions:[{id:'finished-sample',minutes:20,target:{kind:'plan',title:'Choose a focus'},startedAt:time,updatedAt:time+1000,finishedAt:time+1000,stage:3,completed:[0,1,2,3],reflection:'A saved reflection survives the visual update.'}]}));
 });
 await page.goto('/study');
 const tutor=page.locator('#ai-assistant');
 const input=await page.locator('#tutor-message-input').boundingBox(),section=await tutor.boundingBox();
 expect(input!.y-section!.y).toBeLessThan(info.project.name==='mobile'?850:650);
 await page.locator('.tutor-example-drawer>summary').click();
 await page.locator('.tutor-starter-prompts button').first().click();
 await expect(page.locator('#tutor-message-input')).not.toHaveValue('');
 expect(posts).toBe(0);
 await expect(page.locator('#discover')).toHaveCount(0);
 const session=page.locator('#daily-study-session');
 await expect(session.getByLabel('Session reflection')).toHaveCount(0);
 await session.getByRole('button',{name:'Review your last session reflection'}).click();
 await expect(session.getByLabel('Session reflection')).toHaveValue('A saved reflection survives the visual update.');
 await page.locator('#ai-assistant').scrollIntoViewIfNeeded();
 await page.screenshot({path:`artifacts/engineering-story/refinement-tutor-${info.project.name}.png`});
});
test('V3 exam actions have one primary route and secondary resources remain reachable',async({page},info)=>{
 let posts=0;
 await page.route('**/api/**',route=>{if(route.request().method()==='POST')posts++;return route.fulfill({status:503,body:'{}'});});
 await page.goto('/study');
 const exams=page.locator('.exam-prep-controls');
 await expect(exams.getByRole('link',{name:'Start SAT practice'})).toHaveAttribute('href','/study/exams?exam=sat');
 await expect(exams.locator('.goal-primary')).toHaveCount(1);
 await exams.locator('.exam-secondary-actions>summary').click();
 await expect(exams.getByRole('button',{name:'Build my preparation plan'})).toBeVisible();
 await expect(exams.getByRole('link',{name:'Official exam resources'})).toHaveAttribute('target','_blank');
 await exams.getByLabel('Exam profile',{exact:true}).selectOption('mcat');
 await expect(exams.locator('.goal-primary')).toHaveCount(1);
 await expect(exams.getByRole('link',{name:'Start SAT practice'})).toHaveCount(0);
 expect(posts).toBe(0);
 await page.goto('/study');
 await page.screenshot({path:`artifacts/engineering-story/refinement-hero-${info.project.name}.png`});
 await page.locator('#ai-assistant').scrollIntoViewIfNeeded();
 await page.screenshot({path:`artifacts/engineering-story/refinement-final-tutor-${info.project.name}.png`});
});
test('accepted plan is compact, preserves legacy lessons and keeps editing available',async({page},info)=>{
 let posts=0;
 await page.route('**/api/**',route=>{if(route.request().method()==='POST')posts++;return route.fulfill({status:503,body:'{}'});});
 const saved={settings:{goal:'Understand the economic causes of the French Revolution',level:'college',minutes:20,sessions:3,deadline:''},plan:{title:'Economic causes',overview:'A saved overview that remains available without dominating the page.',lessons:[1,2,3].map(n=>({id:`lesson-${n}`,title:`Economic cause ${n}`,objective:'Compare causes and consequences.',activity:'Discuss the economic causes in pairs.',checkpoint:'Explain one cause in your own words.',sourceIds:[]}))},sources:[],completed:['lesson-1'],accepted:true,dirty:false};
 await page.addInitScript(value=>localStorage.setItem('eai-goal-journey-v1',JSON.stringify(value)),saved);
 await page.goto('/study');
 const planner=page.locator('#learning-goal');
 await expect(planner).toHaveAttribute('data-plan-view','accepted');
 await expect(planner.getByRole('list',{name:'Plan creation steps'})).toBeHidden();
 const lessons=planner.locator('.accepted-lesson');
 await expect(lessons.nth(0)).not.toHaveAttribute('open','');
 await expect(lessons.nth(1)).toHaveAttribute('open','');
 await expect(lessons.nth(2)).not.toHaveAttribute('open','');
 await expect(lessons.nth(1)).toContainText('Discuss the economic causes in pairs.');
 await planner.locator('.accepted-plan-overview>summary').click();
 await expect(planner.getByText(saved.plan.overview,{exact:true})).toBeVisible();
 await lessons.nth(0).locator('summary').first().click();
 await expect(lessons.nth(0).getByLabel('Mark complete')).toBeChecked();
 await planner.scrollIntoViewIfNeeded();
 await page.screenshot({path:`artifacts/engineering-story/priority-plan-${info.project.name}.png`});
 await planner.getByRole('button',{name:'Edit plan',exact:true}).click();
 await expect(planner.getByLabel('Lesson 1 activity',{exact:true})).toHaveValue('Discuss the economic causes in pairs.');
 expect(posts).toBe(0);
 await page.goto('/study');
 const session=page.locator('#daily-study-session');
 await expect(session.locator('.session-focus-evidence')).not.toHaveAttribute('open','');
 await expect(session.locator('.session-plan-context')).not.toHaveAttribute('open','');
 const area=await session.boundingBox(),start=await session.getByRole('button',{name:'Start my focused session'}).boundingBox();
 expect(start!.y-area!.y).toBeLessThan(info.project.name==='mobile'?850:650);
 await session.scrollIntoViewIfNeeded();
 await page.screenshot({path:`artifacts/engineering-story/priority-session-${info.project.name}.png`});
});
test('mobile approach selector exposes every mode and changes only an unsent preference',async({page},info)=>{
 if(info.project.name!=='mobile')return;
 let posts=0;
 await page.route('**/api/**',route=>{if(route.request().method()==='POST')posts++;return route.fulfill({status:503,body:'{}'});});
 await page.goto('/study');
 const selector=page.getByRole('combobox',{name:'Learning approach',exact:true});
 await expect(selector).toBeVisible();
 await expect(selector.locator('option')).toHaveCount(5);
 await selector.selectOption({label:'Study plan'});
 await expect(selector.locator('option:checked')).toHaveText('Study plan');
 await selector.selectOption({label:'Check my work'});
 await expect(selector.locator('option:checked')).toHaveText('Check my work');
 await page.reload();
 await expect(selector.locator('option:checked')).toHaveText('Check my work');
 expect(posts).toBe(0);
});

test('returning-user shortcut resumes valid saved work without sending or starting a session',async({page})=>{
 let posts=0;
 await page.route('**/api/**',route=>{if(route.request().method()==='POST')posts++;return route.fulfill({status:503,body:'{}'});});
 await page.goto('/study');
 await expect(page.locator('#tutor-message-input')).toBeEnabled();
 await expect(page.getByRole('link',{name:'Resume learning',exact:false})).toHaveCount(0);
 const time=Date.now()-1000;
 await page.evaluate(time=>{
 localStorage.setItem('eai-daily-sessions-v1',JSON.stringify({version:1,activeId:'resume-sample',sessions:[{id:'resume-sample',minutes:20,target:{kind:'plan',title:'A saved focus'},startedAt:time,updatedAt:time,finishedAt:null,stage:1,completed:[0],reflection:''}]}));
 window.dispatchEvent(new Event('eai-study-progress-change'));
 },time);
 const resume=page.getByRole('link',{name:'Resume learning',exact:false});
 await expect(resume).toHaveAttribute('href','#my-learning');
 await resume.click();
 await expect(page).toHaveURL(/#my-learning$/);
 const record=await page.evaluate(()=>JSON.parse(localStorage.getItem('eai-daily-sessions-v1')!));
 expect(record.sessions).toHaveLength(1);expect(record.sessions[0].stage).toBe(1);
 expect(posts).toBe(0);
});

test('saved check statuses distinguish uncertainty from incorrect work and keep explanations available',async({page},info)=>{
 const goal='Compare economic causes with specific evidence';
 const lessons=[1,2,3,4].map(n=>({id:`lesson-${n}`,title:`A long economic lesson title ${n}: distinguish the original evidence from an illustrative explanation`,objective:'Compare causes using reasoning.',activity:'Explain one cause to your tutor.',checkpoint:'Justify your explanation.',sourceIds:[]}));
 const journey={settings:{goal,level:'college',minutes:20,sessions:3,deadline:''},plan:{title:'A saved evidence plan',overview:'A concise saved plan overview.',lessons},sources:[],completed:[],accepted:true,dirty:false};
 const checks=lessons.map((lesson,i)=>({id:`status-${i}`,context:{goal,lesson},question:{question:'What evidence supports this cause?',criterion:'Explain the evidence.'},answer:'My saved reasoning.',helpUsed:i===2,result:{decision:['uncertain','needs_work','meets','meets'][i],feedback:'Compare this review with the original source.',reasoningGap:'A recorded reasoning observation.',nextStep:'Check a fresh example.',method:'ai'},submittedAt:Date.now()-1000}));
 await page.addInitScript(({journey,checks})=>{localStorage.setItem('eai-goal-journey-v1',JSON.stringify(journey));localStorage.setItem('eai-lesson-checks-v1',JSON.stringify(checks));},{journey,checks});
 await page.goto('/study');
 const saved=page.getByLabel('Saved lesson checks',{exact:true});
 await saved.locator('summary').first().click();
 for(const outcome of ['uncertain','practice','helped','independent'])await expect(saved.locator(`[data-outcome=${outcome}]`)).toHaveCount(1);
 const uncertain=saved.locator('.study-feedback-status').filter({has:page.locator('[data-outcome=uncertain]')});
 await uncertain.getByText('About this result',{exact:true}).click();
 await expect(uncertain).toContainText('does not establish that your answer is wrong');
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('eai-lesson-checks-v1')!).length)).toBe(4);
 await expect(page.locator('.weekly-summary-detail')).not.toHaveAttribute('open','');
 await page.locator('.weekly-summary-detail>summary').click();
 await expect(page.locator('#weekly-summary')).toContainText('Last 7 days');
 await page.locator('#my-learning').scrollIntoViewIfNeeded();
 await page.screenshot({path:`artifacts/engineering-story/medium-learning-${info.project.name}.png`});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('notebook summaries retain labeled capture fields and open for review handoffs',async({page})=>{
 const time=Date.now()-86400000;
 const entry={id:'review-sample',exam:'SAT',question:'Solve 3x + 4 = 19.',answer:'I need to check my operation.',expected:'',reflection:'Saved notes remain intact.',createdAt:time,reviewAt:time,reviews:0};
 await page.addInitScript(entry=>localStorage.setItem('eai-exam-mistakes-v1',JSON.stringify([entry])),entry);
 await page.goto('/study');
 const notebook=page.locator('#mistake-notebook');
 await expect(notebook.locator('.notebook-capture-disclosure')).not.toHaveAttribute('open','');
 await expect(notebook.locator('.notebook-saved-work')).not.toHaveAttribute('open','');
 await notebook.getByText('Add an attempt to review',{exact:true}).click();
 await expect(notebook.getByRole('textbox',{name:'Your answer and reasoning',exact:true})).toBeVisible();
 await page.evaluate(()=>window.dispatchEvent(new CustomEvent('eai-study-notebook-practice',{detail:{id:'review-sample'}})));
 await expect(notebook.locator('.notebook-saved-work')).toHaveAttribute('open','');
 await expect(notebook).toContainText('Saved notes remain intact.');
 await page.route('**/api/study/chat', route => route.fulfill({
   contentType: 'text/event-stream', body: 'data: {"response":"Incomplete reasoning"}\n\n',
 }));
 await notebook.getByRole('button', { name: 'Review my reasoning again' }).click();
 await expect(page.getByRole('alert').filter({hasText:'interrupted'})).toContainText('interrupted');
 await expect(notebook).toContainText('Saved notes remain intact.');
 await notebook.getByText('Prepare a question for my teacher',{exact:true}).click();
 const teacherDraft=notebook.getByRole('textbox',{name:'Edit your question before copying'});
 await expect(teacherDraft).toHaveValue(/Solve 3x[\s\S]*I need to check my operation/);
 await teacherDraft.fill('Which inverse operation should I use first?');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('Clipboard unavailable');}}}));
 await notebook.getByRole('button',{name:'Copy question'}).click();
 await expect(notebook.getByText(/copy it manually/)).toBeVisible();
 await expect(teacherDraft).toHaveValue('Which inverse operation should I use first?');
 const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('eai-exam-mistakes-v1')!));
 expect(stored).toEqual([entry]);
});

test('a sample attempt becomes an editable tutor draft and survives a refresh', async ({page}) => {
  let requests = 0;
  await page.route('**/api/study/chat', route => {
    requests++;
    return route.fulfill({status:503, body:'{}'});
  });
  await page.goto('/study/sample');
  await page.getByRole('button', {name:'Show a hint'}).click();
  await page.getByRole('radio').first().check();
  await page.getByRole('button', {name:'Check my choice'}).click();
  await page.getByRole('link', {name:'Discuss this sample with your AI Tutor'}).click();
  const draft = page.locator('#ai-assistant').getByRole('textbox', {name:'Your message',exact:true});
  await expect(draft).toHaveValue(/My choice: .+Hint used: yes/);
  await draft.fill('Why do we divide both sides here?');
  await page.reload();
  await expect(draft).toHaveValue('Why do we divide both sides here?');
  expect(requests).toBe(0);
});

test('a damaged lesson handoff is reported once and the materials library reopens normally', async ({page}) => {
  await page.goto('/study');
  await page.evaluate(() => sessionStorage.setItem('eai-lesson-material-handoff-v1','{'));
  await page.goto('/study/materials');
  const notice = page.getByText(/The prepared lesson could not be read/);
  await expect(notice).toBeVisible();
  expect(await page.evaluate(()=>sessionStorage.getItem('eai-lesson-material-handoff-v1'))).toBeNull();
  await page.reload();
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await expect(notice).toHaveCount(0);
});

test('reading search combines author and title and announces the current filtered results', async ({page}) => {
  await page.goto('/study/reading');
  const search = page.getByRole('searchbox', {name:'Find a book'});
  await page.getByLabel('Shelf for Moby Dick').selectOption('Reading');
  await search.fill('Melville Moby-Dick');
  await expect(page.getByRole('status').filter({hasText:'1 book to explore'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Moby Dick', exact:true})).toBeVisible();
  await search.fill("Alice's Wonderland");
  await expect(page.getByRole('heading',{name:'Alice’s Adventures in Wonderland'})).toBeVisible();
  await search.fill('unlisted title');
  await page.getByRole('button',{name:'Show all books'}).click();
  await expect(page.getByLabel('Shelf for Moby Dick')).toHaveValue('Reading');
});

test('removing the selected material keeps a pending question from using unrelated notes', async ({page}) => {
  let requests=0;
  await page.route('**/api/study/materials',route=>{requests++;return route.abort();});
  await page.goto('/study/materials');
  await page.getByRole('button',{name:'Add your first material'}).click();
  await page.getByLabel('Add course files').setInputFiles(['first','second'].map(name=>({
    name:name+'.txt',mimeType:'text/plain',buffer:Buffer.from(name+' set of synthetic notes about the movement of water through soil.'),
  })));
  const focus=page.getByLabel('Material focus');
  await expect(focus.locator('option:checked')).toHaveText('second.txt');
  await page.getByRole('button',{name:'Remove second.txt'}).click();
  await expect(focus).toHaveValue('choose');
  const close=page.getByRole('button',{name:/Close/}).first();
  if(await close.isVisible()) await close.click();
  await page.getByRole('textbox',{name:'Question about your materials'}).fill('Explain the second reading.');
  const ask=page.getByRole('button',{name:'Ask about materials'});
  await expect(ask).toBeDisabled();
  await focus.selectOption({label:'first.txt'});
  await expect(ask).toBeEnabled();
  expect(requests).toBe(0);
});

test('planner asks for a new source selection when another tab removes a selected file', async ({page,context}) => {
  let requests=0;
  await page.route('**/api/study/plan',route=>{requests++;return route.abort();});
  await page.goto('/study');
  const planner=page.locator('#learning-goal');
  await planner.locator('#learning-achievement').fill('Understand how groundwater moves through sand.');
  await planner.getByRole('button',{name:'Continue →',exact:true}).click();
  await planner.getByLabel('Add planning material').setInputFiles({name:'Groundwater.txt',mimeType:'text/plain',buffer:Buffer.from('Groundwater moves slowly between grains of sand in a porous aquifer.')});
  await planner.getByRole('button',{name:/Continue with selected materials/}).click();
  const library=await context.newPage();
  await library.goto('/study/materials');
  await library.locator('#library-materials-trigger').click();
  await library.getByRole('button',{name:'Remove Groundwater.txt'}).click();
  await expect(library.locator('#library-materials-trigger')).toContainText('Materials · 0');
  await planner.getByRole('button',{name:/Create my learning plan/}).click();
  await expect(planner.getByText(/A selected material is no longer in your library/)).toBeVisible();
  await expect(planner.getByRole('button',{name:/Continue without materials/})).toBeEnabled();
  expect(requests).toBe(0);
});

test('a question cannot send excerpts removed from another open library tab', async ({page,context}) => {
  let calls=0;
  await context.route('**/api/study/materials',route=>{calls++;return route.abort();});
  await page.goto('/study/materials');
  await page.getByRole('button',{name:'Add your first material'}).click();
  await page.getByLabel('Add course files').setInputFiles({
    name:'Rainfall.txt',mimeType:'text/plain',buffer:Buffer.from('Rainfall supplies water to the soil and replenishes shallow aquifers.'),
  });
  const other=await context.newPage();
  await expect(page.getByRole('button',{name:'Remove Rainfall.txt'})).toBeVisible();
  await other.goto('/study/materials');
  await other.locator('#library-materials-trigger').click();
  await other.getByRole('button',{name:'Remove Rainfall.txt'}).click();
  await expect(other.locator('#library-materials-trigger')).toContainText('Materials · 0');
  const close=page.getByRole('button',{name:/Close/}).first();
  if(await close.isVisible()) await close.click();
  const question=page.getByLabel('Question about your materials');
  await question.fill('How does rainfall replenish aquifers?');
  await page.getByRole('button',{name:'Ask about materials'}).click();
  await expect(page.getByText(/Your selected source changed in another tab/)).toBeVisible();
  await expect(page.getByLabel('Material focus')).toHaveValue('choose');
  await expect(question).toHaveValue('How does rainfall replenish aquifers?');
  expect(calls).toBe(0);
});

test('closing a source returns keyboard focus and selecting a passage moves focus to it', async ({page})=>{
  await page.goto('/study/materials');
  await page.getByRole('button',{name:'Add your first material'}).click();
  await page.getByLabel('Add course files').setInputFiles({name:'Focus.txt',mimeType:'text/plain',buffer:Buffer.from('A practice passage on how rainfall replenishes shallow aquifers.')});
  const read=page.getByRole('button',{name:'Read Focus.txt'});
  const question=page.getByLabel('Question about your materials');
  await question.fill('How does this connect to groundwater?');
  await read.focus();
  await read.press('Enter');
  const dialog=page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(read).toBeFocused();
  await read.press('Enter');
  await dialog.getByRole('button',{name:'Close source'}).click();
  await expect(read).toBeFocused();
  await read.press('Enter');
  await dialog.getByText('Choose a passage to study',{exact:true}).click();
  await dialog.getByRole('button',{name:'Use this section'}).click();
  await expect(page.getByRole('region',{name:'Selected study passage'})).toBeFocused();
  await expect(question).toHaveValue('How does this connect to groundwater?');
});

test('writing studio preserves a newer essay from a second tab and the unsaved local edit',async({page,context})=>{
  await page.goto('/study/writing');
  const essay=page.getByLabel('Essay content');
  await essay.fill('First introduction.');
  const other=await context.newPage();
  await other.goto('/study/writing');
  const revised=other.getByLabel('Essay content');
  await expect(revised).toHaveValue('First introduction.');
  await revised.fill('The newer revision.');
  await essay.fill('My separate revision.');
  await expect(page.getByText(/Browser saving paused/)).toBeVisible();
  await expect(essay).toHaveValue('My separate revision.');
  await other.reload();
  await expect(revised).toHaveValue('The newer revision.');
});

test('unreadable essay and feedback remain recoverable after opening the writing studio',async({page})=>{
  await page.goto('/study');
  await page.evaluate(()=>{
    localStorage.setItem('eai-writing-studio-v1','{"content":42}');
    localStorage.setItem('eai-writing-chat-v1','{');
  });
  await page.goto('/study/writing');
  await expect(page.getByText(/Your saved essay could not be opened/)).toBeVisible();
  await expect(page.getByText(/Saved feedback could not be opened/)).toBeVisible();
  await page.getByLabel('Essay content').fill('A temporary local draft.');
  await expect(page.getByRole('button',{name:/Download Essay/})).toBeEnabled();
  const data=await page.evaluate(()=>[localStorage.getItem('eai-writing-studio-v1'),localStorage.getItem('eai-writing-chat-v1')]);
  expect(data).toEqual(['{"content":42}','{']);
});

test('writing feedback survives interrupted responses and accepts a complete retry', async ({ page }) => {
  let responseBody = 'data: {"response":"Keep the concrete example."}\n\ndata: [DONE]\n\n';
  await page.route('**/api/study/chat', route => route.fulfill({ contentType: 'text/event-stream', body: responseBody }));
  await page.goto('/study/writing');
  await page.getByLabel('Essay content').fill('My essay includes a specific example.');
  const review = page.getByRole('button', { name: 'Improve clarity and grammar' });
  await review.click();
  await expect(page.getByText('Keep the concrete example.', { exact: true })).toBeVisible();
  responseBody = 'data: {"response":"Incomplete review"}\n\n';
  await review.click();
  await expect(page.getByText(/The response was interrupted/)).toBeVisible();
  await page.reload();
  await expect(page.getByText('Keep the concrete example.', { exact: true })).toBeVisible();
  await expect(page.getByText('Incomplete review', { exact: true })).toHaveCount(0);
  responseBody = 'data: {"response":"Clarify the final sentence."}\r\n\r\ndata: [DONE]';
  await review.click();
  await expect(page.getByText('Clarify the final sentence.', { exact: true })).toBeVisible();
});

test('essay evaluation fits the API limit and failed follow-ups keep the question', async ({ page }) => {
  const requests: string[] = [];
  await page.route('**/api/study/chat', route => {
    requests.push(route.request().postDataJSON().message);
    return route.fulfill({status: 503, body: '{}'});
  });
  await page.goto('/study/writing');
  const essay = 'a'.repeat(2591) + 'LAST LINE';
  await page.getByLabel('Essay content').fill(essay);
  await page.getByRole('button', { name: /Evaluate My Essay/ }).click();
  await expect(page.getByText(/HTTP 503/)).toBeVisible();
  expect(requests[0]).toContain(essay);
  expect(requests[0].length).toBeLessThanOrEqual(3000);
  const question = page.getByLabel('Follow-up question');
  await question.fill('Does my ending support the thesis?');
  await page.getByRole('button', {name: 'Send Question'}).click();
  await expect.poll(() => requests.length).toBe(2);
  await expect(question).toHaveValue('Does my ending support the thesis?');
});

test('full essay analysis stops on an incomplete section and includes every section on retry', async ({ page }) => {
  let interrupted = true;
  const messages: string[] = [];
  await page.route('**/api/study/chat', route => {
    const message = route.request().postDataJSON().message as string;
    messages.push(message);
    const answer = message.startsWith('Create a unified') ? 'Connect the evidence to the conclusion.' :
      message.includes('section 1 of') ? 'Opening evidence' : 'Closing evidence';
    return route.fulfill({contentType:'text/event-stream',
      body:'data: '+JSON.stringify({response:answer})+'\n\n'+(interrupted ? '' : 'data: [DONE]\n\n')});
  });
  await page.goto('/study/writing');
  await page.getByLabel('Essay content').fill('An essay sentence. '.repeat(155));
  const analyze = page.getByRole('button', {name:'Analyze Full Essay'});
  await analyze.click();
  await expect(page.getByText(/The response was interrupted/)).toBeVisible();
  expect(messages).toHaveLength(1);
  interrupted = false;
  await analyze.click();
  await expect(page.getByText('Connect the evidence to the conclusion.', {exact:true})).toBeVisible();
  expect(messages).toHaveLength(4);
  expect(messages[3]).toContain('Opening evidence');
  expect(messages[3]).toContain('Closing evidence');
});

test('tutor keeps completed replies on failed regeneration and retries without duplicating the question', async ({page}) => {
  let body = 'data: {"response":"Original complete explanation."}\n\ndata: [DONE]\n\n';
  const questions: string[] = [];
  await page.route('**/api/study/chat', route => {
    questions.push(route.request().postDataJSON().message);
    return route.fulfill({contentType:'text/event-stream', body});
  });
  await page.goto('/study#ai-assistant');
  const tutor = page.locator('#ai-assistant');
  const question = 'Why does the sequence converge?';
  await tutor.getByLabel('Your message').fill(question);
  await tutor.getByRole('button',{name:'Send',exact:true}).click();
  await expect(tutor.getByText('Original complete explanation.',{exact:true})).toBeVisible();
  body = 'data: {"response":"Unfinished replacement"}\n\n';
  await tutor.getByRole('button',{name:/Regenerate Response/}).click();
  await expect(tutor.getByRole('alert')).toContainText('interrupted');
  await expect(tutor.getByRole('log')).toContainText('Original complete explanation.');
  await page.reload();
  await expect(tutor.getByRole('log')).not.toContainText('Unfinished replacement');
  await expect(tutor.getByRole('log')).toContainText('Original complete explanation.');
  body = 'data: {"response":"Complete revised explanation."}\n\ndata: [DONE]\n\n';
  await tutor.getByRole('button',{name:/Regenerate Response/}).click();
  await expect(tutor.getByRole('log')).toContainText('Complete revised explanation.');
  await expect(tutor.getByRole('log').getByText(question,{exact:true})).toHaveCount(1);
  expect(questions).toEqual([question,question,question]);
});

test('reopened tutor offers retry for an unanswered question and keeps the next draft', async ({page}) => {
  let body = 'data: {"response":"Half a reply"}\n\n';
  await page.route('**/api/study/chat', route => route.fulfill({contentType:'text/event-stream', body}));
  await page.goto('/study#ai-assistant');
  const tutor = page.locator('#ai-assistant');
  const draft = tutor.getByLabel('Your message');
  await draft.fill('Explain geometric series.');
  await tutor.getByRole('button',{name:'Send',exact:true}).click();
  await expect(tutor.getByRole('alert')).toContainText('interrupted');
  await draft.fill('My next question is different.');
  await page.reload();
  await expect(tutor.getByRole('log')).not.toContainText('Half a reply');
  body = 'data: {"response":"Completed series explanation."}\n\ndata: [DONE]\n\n';
  await tutor.getByRole('button',{name:'Retry last question'}).click();
  await expect(tutor.getByRole('log')).toContainText('Completed series explanation.');
  await expect(draft).toHaveValue('My next question is different.');
});

test('tutor keeps the reading position when another part of a long reply arrives', async ({page}) => {
  await page.addInitScript(() => {
    const original = window.fetch;
    window.fetch = (input, init) => {
      if(input !== '/api/study/chat') return original(input, init);
      const stream = new ReadableStream({
        start(controller) {
          const encoder = new TextEncoder();
          const append = (text:string) => controller.enqueue(encoder.encode('data: '+JSON.stringify({response:text})+'\n\n'));
          append(Array.from({length:65},(_,i)=>'Paragraph '+i+' explains the method.').join('\n\n'));
          window.addEventListener('test-finish-explanation',()=>{
            append('\n\nFinal observation.');
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          },{once:true});
        }
      });
      return Promise.resolve(new Response(stream,{headers:{'Content-Type':'text/event-stream'}}));
    };
  });
  await page.goto('/study#ai-assistant');
  const tutor = page.locator('#ai-assistant');
  await tutor.getByLabel('Your message').fill('Walk through a long example.');
  await tutor.getByRole('button',{name:'Send',exact:true}).click();
  const log = tutor.getByRole('log');
  await expect.poll(()=>log.evaluate(el=>el.scrollTop)).toBeGreaterThan(100);
  await log.focus();
  await log.press('Control+Home');
  await log.evaluate(el=>{el.scrollTop=0;el.dispatchEvent(new Event('scroll'));});
  await page.evaluate(()=>window.dispatchEvent(new Event('test-finish-explanation')));
  await expect(tutor.getByRole('button',{name:/Regenerate Response/})).toBeVisible();
  expect(await log.evaluate(el=>el.scrollTop)).toBeLessThan(40);
});

test('study shortcuts close the expanded menu and identify the current section', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/study');
  const menu = page.locator('#study-menu-toggle');
  const shortcuts = page.locator('.studio-mobile-shortcuts');
  const learning = shortcuts.getByRole('link',{name:'My learning'});
  await menu.click();
  await learning.click();
  await expect(page).toHaveURL(/#my-learning$/);
  await expect(menu).toHaveAttribute('aria-expanded','false');
  await expect(learning).toHaveAttribute('aria-current','location');
  await learning.focus();
  await learning.press('Escape');
  await expect(learning).toBeFocused();
});

test('unreadable legacy tutor history keeps the old copy and avoids creating a misleading empty replacement', async ({page}) => {
  await page.addInitScript(()=>localStorage.setItem('eai-study-chat-legacy','{"messages":"unreadable"}'));
  await page.goto('/study#ai-assistant');
  const tutor=page.locator('#ai-assistant');
  await expect(tutor.getByText(/Saved sessions could not be fully read/)).toBeVisible();
  await tutor.getByLabel('Your message').fill('Recoverable temporary draft.');
  await expect(tutor.getByRole('button',{name:'Download session backup'}).first()).toBeVisible();
  const records=await page.evaluate(()=>[localStorage.getItem('eai-study-chat-legacy'),localStorage.getItem('eai-study-conversations-v1')]);
  expect(records).toEqual(['{"messages":"unreadable"}',null]);
});

test('formatted course notes with a blank section survive reopening the library', async ({page}) => {
  await page.goto('/study/materials');
  await page.getByRole('button',{name:'Add your first material'}).click();
  await page.getByLabel('Add course files').setInputFiles({
    name:'Formatted notes.txt',mimeType:'text/plain',
    buffer:Buffer.from('First observation.'.padEnd(10000)+'Closing observation.')
  });
  const read=page.getByRole('button',{name:'Read Formatted notes.txt'});
  await expect(read).toBeVisible();
  await read.click();
  await page.getByLabel('Source location').selectOption('3');
  await expect(page.getByRole('dialog')).toContainText('Closing observation.');
  await page.reload();
  await page.getByRole('button',{name:/Materials · 1/}).click();
  await read.click();
  await page.getByLabel('Source location').selectOption('3');
  await expect(page.getByRole('dialog')).toContainText('Closing observation.');
});

test('materials panel returns focus to the specific control that opened it', async ({page})=>{
  await page.goto('/study/materials');
  const panel=page.getByRole('complementary',{name:'Manage your materials'});
  for(const name of [/Add your first material/,/\+ Add materials/,/Materials · 0/]){
    const trigger=page.getByRole('button',{name});
    await trigger.click();
    await expect(panel).toBeVisible();
    const close=panel.getByRole('button',{name:'Close',exact:true});
    if(name.source.includes('first')) await close.click();
    else {await close.focus();await close.press('Escape');}
    await expect(panel).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
});

test('a plan lesson opens materials with the right task and supports browser back', async ({page})=>{
 const saved={settings:{goal:'Understand economic changes in cities',level:'college',minutes:20,sessions:3,deadline:''},plan:{title:'Cities and trade',overview:'A study of economic changes in cities.',lessons:[1,2,3].map(n=>({id:'lesson-'+n,title:'City lesson '+n,objective:'Compare changes in local trade.',activity:'Describe two changes in your own words.',checkpoint:'Explain the difference between the examples.',sourceIds:[]}))},sources:[],completed:[],accepted:true,dirty:false};
 await page.addInitScript(value=>{if(!localStorage.getItem('eai-goal-journey-v1'))localStorage.setItem('eai-goal-journey-v1',JSON.stringify(value));},saved);
 await page.goto('/study#learning-goal');
 const planner=page.locator('#learning-goal');
 const lesson=planner.locator('.accepted-lesson').first();
 await lesson.getByText('Study with your materials',{exact:true}).click();
 await page.evaluate(()=>{document.documentElement.dataset.navigationProbe='same-document';});
 await lesson.getByRole('button',{name:/Practice from my materials/}).click();
 await expect(page).toHaveURL(/\/study\/materials$/);
 await expect(page.getByLabel('Question about your materials')).toHaveValue(/Compare changes in local trade/);
 await expect(page.getByRole('button',{name:'Start or continue quiz'})).toBeDisabled();
 await expect(page.locator('html')).toHaveAttribute('data-navigation-probe','same-document');
 const draft=page.getByLabel('Question about your materials');
 await draft.fill('How did local trade change in the example?');
 await page.getByRole('button',{name:'Clear lesson context'}).click();
 await expect(draft).toHaveValue('How did local trade change in the example?');
 await expect(page.getByLabel('Material focus')).toHaveValue('choose');
 await page.goBack();
 await expect(planner).toHaveAttribute('data-plan-view','accepted');
 await expect(planner.getByRole('heading',{name:'Cities and trade'})).toBeVisible();
});

test('the writing report stays attributed to the evaluated essay after renaming and reloading',async({page})=>{
 const review=['Thesis Strength','Grammar and Clarity','Organization and Structure','Evidence and Reasoning'].map(name=>'## '+name+'\nScore: 8/10').join('\n\n');
 await page.route('**/api/study/chat', route=>route.fulfill({contentType:'text/event-stream',body:'data: '+JSON.stringify({response:review})+'\n\ndata: [DONE]\n\n'}));
 await page.goto('/study/writing');
 const title=page.getByLabel('Essay title');
 await title.fill('First Draft');
 await page.getByLabel('Essay content').fill('A synthetic argument about studying in short sessions.');
 await page.getByRole('button',{name:/Evaluate My Essay/}).click();
 await expect(page.getByText('Evaluated draft · First Draft')).toBeVisible();
 await title.fill('Different Essay');
 await page.reload();
 await expect(title).toHaveValue('Different Essay');
 await expect(page.getByText('Evaluated draft · First Draft')).toBeVisible();
 const event=page.waitForEvent('download');
 await page.getByRole('button',{name:'Download Evaluation Report'}).click();
 const download=await event;
 expect(download.suggestedFilename()).toBe('First-Draft-evaluation.txt');
 const stream=await download.createReadStream();
 let report='';
 for await(const chunk of stream!) report+=chunk.toString();
 expect(report).toContain('Essay Title: First Draft');
 expect(report).not.toContain('Different Essay');
});

test('a legacy evaluation opens the printable report without attributing it to the current essay',async({page})=>{
 const review=['Thesis Strength','Grammar and Clarity','Organization and Structure','Evidence and Reasoning'].map(name=>'## '+name+'\nScore: 7/10').join('\n\n');
 await page.addInitScript(feedback=>{
   localStorage.setItem('eai-writing-chat-v1',JSON.stringify([{role:'assistant',content:feedback}]));
   const original=window.open.bind(window);
   window.open=(...args)=>{
     const child=original(...args);
     if(child) child.print=()=>{child.document.documentElement.dataset.printed='yes';};
     return child;
   };
 },review);
 await page.goto('/study/writing');
 await page.getByLabel('Essay title').fill('Unrelated current essay');
 await expect(page.getByText('Evaluated draft · Essay title not recorded')).toBeVisible();
 const wait=page.waitForEvent('popup');
 await page.getByRole('button',{name:/PDF Report/i}).click();
 const popup=await wait;
 await expect(popup.locator('body')).toContainText('Essay title not recorded');
 await expect(popup.locator('body')).not.toContainText('Unrelated current essay');
 await expect(popup.locator('html')).toHaveAttribute('data-printed','yes');
});
