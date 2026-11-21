import {test,expect} from '@playwright/test';
const root='/study/art',key='dai-art-personal-v1';
const seed={version:1,notes:{},collections:[],recent:[],next:null,textSize:1,focus:false,notices:true};
test('alternate titles find the canonical painting and typo suggestions remain useful',async({page})=>{
 await page.goto(root+'?query=La%20Gioconda#collection');await expect(page.locator('.art-tile h3')).toHaveText(['Mona Lisa']);
 await page.getByRole('searchbox').fill('Monna Liza');await expect(page.locator('.art-search-suggestions')).toContainText('Mona Lisa');
 await page.getByRole('searchbox').fill('qzxv qzxv');await expect(page.locator('.art-search-suggestions')).toHaveCount(0);
});
test('comparison candidates survive reload, filters and a study visit until explicitly cleared',async({page})=>{
 await page.goto(root+'?query=Mona%20Lisa#collection');await page.getByRole('button',{name:'Select two to compare',exact:true}).click();await page.getByRole('checkbox',{name:'Compare Mona Lisa',exact:true}).check();
 await page.getByRole('searchbox').fill('Girl with a Pearl Earring');await page.getByRole('checkbox',{name:'Compare Girl with a Pearl Earring',exact:true}).check();await page.reload();
 await expect(page.getByRole('complementary',{name:'Selected comparison'})).toContainText('2 of 2');await page.goto(root+'/painting/vermeer-01');await page.goto(root+'?query=Mona%20Lisa#collection');
 await expect(page.getByRole('link',{name:'Open this comparison →'})).toHaveAttribute('href',/left=leonardo-01&right=vermeer-01/);await page.getByRole('button',{name:'Clear comparison',exact:true}).click();await page.reload();await page.getByRole('button',{name:'Select two to compare',exact:true}).click();await expect(page.getByRole('complementary',{name:'Selected comparison'})).toContainText('0 of 2');
});
test('each painting remembers its own depth and an essay deep link overrides a hidden essay',async({page})=>{
 await page.goto(root+'/painting/leonardo-01');await page.getByRole('button',{name:/^Introduction ·/}).click();await page.reload();await expect(page.locator('#essay')).toBeHidden();
 await page.goto(root+'/painting/vermeer-01');await expect(page.getByRole('button',{name:/^Full study ·/})).toHaveAttribute('aria-pressed','true');
 await page.goto(root+'/painting/leonardo-01#essay-section-3');await expect(page.locator('#essay-section-3')).toBeVisible();await expect(page.getByRole('button',{name:/^Full study ·/})).toHaveAttribute('aria-pressed','true');
});
test('looking at the essay opening protects the old position until deliberate reading',async({page})=>{
 await page.addInitScript(({key,seed})=>localStorage.setItem(key,JSON.stringify({...seed,reading:{'leonardo-01':{section:'essay-section-7',completed:false}}})),{key,seed});
 await page.goto(root+'/painting/leonardo-01');await page.locator('#essay-section-1').evaluate(e=>e.scrollIntoView());await page.waitForTimeout(1800);
 expect(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)!).reading['leonardo-01'].section,key)).toBe('essay-section-7');
 await page.getByRole('button',{name:'Start reading here instead',exact:true}).click();await page.locator('#essay-section-2').evaluate(e=>e.scrollIntoView());
 await expect.poll(()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)!).reading['leonardo-01'].section,key)).toBe('essay-section-2');
});
test('one essay outline supplies section navigation and glossary and citations return to their origins',async({page})=>{
 await page.goto(root+'/painting/vermeer-01#essay');await expect(page.locator('#essay .art-essay-outline')).toHaveCount(1);
 await page.locator('.art-essay-outline summary').click();await expect(page.locator('.art-essay-toc li>a')).toHaveCount(10);
 const term=page.locator('#essay .art-term-link').filter({hasText:'tronie'}).first();const origin=await term.locator('..').getAttribute('id');await term.click();const target=await term.getAttribute('href');
 await page.locator(target!+' .art-evidence-return').click();await expect(page).toHaveURL(new RegExp('#'+origin+'$'));await expect.poll(()=>page.evaluate(()=>document.activeElement?.id)).toBe(origin);
 const citation=page.locator('.art-section-references a').first(),ref=await citation.getAttribute('href'),from=await citation.locator('..').locator('..').getAttribute('id');await citation.click();await page.locator(ref!+' .art-evidence-return').click();await expect(page).toHaveURL(new RegExp('#'+from+'$'));
});
test('first-time My Art hides empty management panels but backup remains reachable',async({page})=>{
 await page.goto(root+'/my-art');await expect(page.getByRole('heading',{name:'Begin with one painting.',exact:true})).toBeVisible();await expect(page.getByText('Writing, collections & visit records',{exact:true})).toHaveCount(0);await expect(page.getByRole('heading',{name:'Saved paintings · 0'})).toHaveCount(0);
 await page.goto(root+'/my-art#backup');await expect(page.getByText('Backup, restore & viewing history',{exact:true})).toBeVisible();
});
test('existing notes and recent viewing are presented without claiming essay progress',async({page})=>{
 await page.addInitScript(({key,seed})=>localStorage.setItem(key,JSON.stringify({...seed,notes:{'vermeer-01':'My saved observation'},recent:['vermeer-01']})),{key,seed});
 await page.goto(root+'/my-art');await expect(page.locator('.art-continue-primary')).toContainText('Recently looked at');await page.getByText('Writing, collections & visit records',{exact:true}).click();await expect(page.locator('.art-my-art-summary')).toContainText('1 note');await expect(page.locator('.art-my-art-summary')).not.toContainText('0 collections');
 expect(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)!).notes['vermeer-01'],key)).toBe('My saved observation');
});
for(const width of [390,768,1024,1440])test('outline and research remain comfortable at '+width,async({page})=>{
 await page.setViewportSize({width,height:950});await page.goto(root+'/painting/vermeer-01#essay');await page.getByText('Viewing comfort',{exact:true}).click();await page.getByLabel('Text size',{exact:true}).selectOption('1.3');await page.locator('.art-essay-outline summary').click();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await expect(page.locator('.art-topic-coverage')).toHaveCount(6);await page.locator('#essay').evaluate(e=>e.scrollIntoView());await page.screenshot({path:`artifacts/art15/essay-${width}.png`});
});
