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
