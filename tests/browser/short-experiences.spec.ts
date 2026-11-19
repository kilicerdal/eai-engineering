import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('cloud choice explains consequences and resumes without requests or changing other saves',async({page})=>{
 let posts=0;page.on('request',r=>{if(r.method()==='POST'&&r.url().includes('/api/'))posts++;});
 await page.goto('/start/two-minutes');await page.evaluate(()=>localStorage.setItem('untouched-saved-work','original'));
 await page.getByRole('button',{name:'Help me choose Illustrative model',exact:true}).click();
 await page.getByRole('radio',{name:'Use the fresh edge copy'}).check();await page.getByRole('button',{name:'Try the model →'}).click();
 await expect(page.getByRole('status').filter({hasText:'Origin fetches'})).toContainText(': 0');
 await page.getByRole('button',{name:'Origin fetch',exact:true}).click();await expect(page.getByRole('status').filter({hasText:'Origin fetches'})).toContainText(': 1');
 await page.getByRole('button',{name:'Keep the takeaway →'}).click();await page.getByRole('button',{name:'← Try another comparison'}).click();
 await page.goto('/');await page.getByRole('link',{name:'Continue your case →',exact:true}).click();await page.getByRole('button',{name:'Continue your case →',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Where should the next image come from?'})).toBeVisible();await expect(page.getByRole('status').filter({hasText:'Origin fetches'})).toContainText(': 1');
 expect(await page.evaluate(()=>localStorage.getItem('untouched-saved-work'))).toBe('original');expect(posts).toBe(0);
});
test('boundary model exposes only the exact boundary and keeps official source accessible',async({page})=>{
 await page.goto('/start/two-minutes');await page.getByRole('button',{name:'Teach me something Interactive model',exact:true}).click();await page.getByRole('radio',{name:'100',exact:true}).check();await page.getByRole('button',{name:'Try the model →'}).click();
 await page.setViewportSize({width:390,height:1000});await page.screenshot({path:'artifacts/signature/boundary-comparison-390.png',fullPage:true});expect((await new AxeBuilder({page}).include('.signature-case').withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);
 await expect(page.getByRole('list',{name:'Request or decision flow'})).toContainText('Mismatch exposed');
 for(const n of [99,101]){await page.getByRole('button',{name:`Try ${n}`,exact:true}).click();await expect(page.getByRole('list',{name:'Request or decision flow'})).toContainText('Both agree');}
 await page.getByText('Evidence & source',{exact:true}).click();await expect(page.getByRole('link',{name:'ISTQB Foundation Level syllabus and materials'})).toHaveAttribute('href',/istqb.org/);
 await page.getByRole('button',{name:'Keep the takeaway →'}).click();await expect(page.getByRole('link',{name:'Explore the testing learning path →'})).toHaveAttribute('href','/study/certifications/istqb-foundation');
});
test('corrupt and blocked storage do not stop exploration',async({page})=>{
 await page.addInitScript(()=>{localStorage.setItem('eai-short-cases-v1','broken');Storage.prototype.setItem=()=>{throw new Error('blocked');};});await page.goto('/start/two-minutes');await expect(page.getByRole('button',{name:'Continue your case →'})).toHaveCount(0);
 await page.getByRole('radio',{name:'Return the original order',exact:true}).check();await page.getByRole('button',{name:'Inspect the recorded result →'}).click();await expect(page.getByText('Progress could not be saved. You can keep exploring here.')).toBeVisible();await expect(page.getByRole('heading',{name:'The original order was returned.'})).toBeVisible();
});
test('all three experiences fit phone and desktop and pass accessibility checks',async({page})=>{
 for(const width of [390,1440]){await page.setViewportSize({width,height:1000});await page.goto('/start/two-minutes');for(const name of ['Something broke Recorded case','Help me choose Illustrative model','Teach me something Interactive model']){await page.getByRole('button',{name,exact:true}).click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);expect((await new AxeBuilder({page}).include('.signature-case').withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);await page.screenshot({path:`artifacts/signature/short-${name.split(' ')[0]}-${width}.png`,fullPage:true});}}
});

test('short backup previews, protects newer progress and restores only its own key',async({page})=>{
 await page.goto('/start/two-minutes');
 await page.getByText('Back up or restore this short experience',{exact:true}).click();
 const progress={version:1,caseId:'cloud',step:1,prediction:'edge',fault:false,probe:100,updatedAt:100};

 const upload=()=>page.getByLabel('Preview a backup',{exact:true}).setInputFiles({name:'short.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({format:'eai-short-experience',version:1,progress}))});
 await upload();await expect(page.getByRole('button',{name:'Restore this place',exact:true})).toBeVisible();
 await page.evaluate(()=>{localStorage.setItem('eai-short-cases-v1','newer');localStorage.setItem('untouched-saved-work','original');});
 await page.getByRole('button',{name:'Restore this place',exact:true}).click();await expect(page.getByText('Your place changed. Preview the file again before restoring.',{exact:true})).toBeVisible();
 await upload();await page.getByRole('button',{name:'Restore this place',exact:true}).click();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('eai-short-cases-v1')||'null'))).toEqual(progress);
 expect(await page.evaluate(()=>localStorage.getItem('untouched-saved-work'))).toBe('original');
});
