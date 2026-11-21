import {test,expect} from '@playwright/test';
test('Studio offers three choices and names the work to continue',async({page})=>{
 await page.addInitScript(()=>{localStorage.setItem('dai-reading-library-v1',JSON.stringify({version:1,positions:{11:{section:2,updatedAt:Date.now()-1000}}}));localStorage.setItem('preserved-work','unchanged');});
 await page.goto('/study');await expect(page.getByRole('navigation',{name:'Choose your next step'}).getByRole('link')).toHaveCount(3);
 await expect(page.locator('.studio-resume-context strong')).not.toBeEmpty();await expect(page.getByRole('link',{name:'Continue learning',exact:true})).toHaveAttribute('href','/study/reading/11');
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.screenshot({path:'artifacts/dai-priorities/studio-phone.png',fullPage:true});expect(await page.evaluate(()=>localStorage.getItem('preserved-work'))).toBe('unchanged');
});
test('subject works show images by default and hiding remains an explicit persistent choice',async({page})=>{
 await page.addInitScript(()=>{if(!localStorage.getItem('dai-art-personal-v1'))localStorage.setItem('dai-art-personal-v1',JSON.stringify({version:1,notes:{'monet-01':'Original note'},collections:[],recent:[],next:null,textSize:1,focus:false,notices:true}));});
 await page.goto('/study/art/painting/goya-03');await expect(page.locator('.art-view-trigger img')).toBeVisible();await expect(page.getByText('About this painting’s subject',{exact:true})).toBeVisible();
 await page.getByText('Viewing comfort',{exact:true}).click();await page.getByLabel('Hide sensitive images until I choose to view them').check();await expect(page.locator('.art-main-painting .art-subject-gate')).toBeVisible();
 // Do not reseed storage on reload: let the original preference survive.
 await page.goto('/study/art?artist=goya');await expect(page.locator('#tile-goya-03 .art-tile-image img')).toHaveCount(0);await expect(page.getByText('Image hidden by your setting').first()).toBeVisible();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('dai-art-personal-v1')!).notes['monet-01'])).toBe('Original note');
});
test('available subject thumbnails are actual pictures for a new visitor',async({page})=>{
 await page.goto('/study/art?artist=goya');await expect(page.locator('.art-tile-image img').first()).toBeVisible();await expect(page.locator('.art-subject-label').first()).toBeVisible();
 await page.screenshot({path:'artifacts/dai-priorities/subject-thumbnails.png',fullPage:true});
});
test('checked practice keeps the deciding explanation and official section together',async({page})=>{
 await page.goto('/study/certifications/cloud-practitioner');await page.getByRole('button',{name:'Already familiar? Try 5 practice questions →',exact:true}).click();
 const practice=page.getByRole('region',{name:'Active certification practice'});await practice.getByRole('radio').first().check();await practice.getByRole('button',{name:'Check my answer',exact:true}).click();
 const explanation=practice.locator('.connected-turning-point');await expect(explanation).toHaveCount(1);
 if((await explanation.locator('summary').innerText()).includes('falls short'))await expect(explanation).toHaveAttribute('open','');else await explanation.locator('summary').click();
 await expect(explanation.getByText('What decides this question:',{exact:true})).toBeVisible();await expect(explanation.getByRole('link',{name:/Read the official section/})).toHaveAttribute('href',/^https:\/\//);
 await page.screenshot({path:'artifacts/dai-priorities/practice-explanation.png'});
});
