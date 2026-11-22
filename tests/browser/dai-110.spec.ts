import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {mkdirSync} from 'node:fs';
test.beforeAll(()=>mkdirSync('artifacts/dai-110',{recursive:true}));
test('scholarship study returns to the same query and exact result',async({page,browserName})=>{
 await page.goto('/study/art/scholarship?q=Nightwatch+sketch&kind=paintings');const result=page.locator('.art-search-results>li').first();await expect(result).toBeVisible();const anchor=await result.getAttribute('id');await result.getByRole('link',{name:'Read this passage in context →',exact:true}).click();await page.getByRole('link',{name:'← Back to your scholarship results',exact:true}).click();await expect(page).toHaveURL(new RegExp('scholarship\\?q=Nightwatch\\+sketch&kind=paintings#'+anchor+'$'));await expect(page.locator('#'+anchor)).toBeVisible();await page.screenshot({path:`artifacts/dai-110/search-return-${browserName}.png`});
});
test('a painter work returns to its biography section',async({page})=>{
 await page.goto('/study/art/painter/picasso');const link=page.locator('#biography a[href*="/painting/"]').first();await expect(link).toBeVisible();await link.click();await page.getByRole('link',{name:'← Back to the painter profile',exact:true}).click();await expect(page).toHaveURL(/\/painter\/picasso#/);await expect(page.getByRole('heading',{name:'Pablo Picasso',exact:true})).toBeVisible();
});
test('collection filters and browser back retain the selected work',async({page})=>{
 await page.goto('/study/art?view=paintings&artist=monet#collection');await expect(page.locator('.art-count')).toContainText('Showing 1–');await page.locator('.art-tile').first().getByRole('link',{name:'Read the study →',exact:true}).click();await expect(page).toHaveURL(/\/painting\/monet-/);await page.goBack();await expect(page.getByRole('group',{name:'Active filters'})).toContainText('Claude Monet');await expect(page.locator('.art-tile')).toHaveCount(7);
});
test('broken thumbnails keep a readable study destination on a phone',async({page,browserName})=>{
 await page.setViewportSize({width:390,height:844});await page.route('**/images/art/**',route=>route.abort());await page.goto('/study/art?view=paintings&artist=monet#collection');const tile=page.locator('.art-tile').first();await expect(tile).toContainText('Preview could not load.');await expect(tile.getByRole('link',{name:'Read the study →',exact:true})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await page.screenshot({path:`artifacts/dai-110/image-fallback-${browserName}.png`});
});
test('an empty filtered collection explains removing filters rather than saving a painting',async({page})=>{
 await page.goto('/study/art?view=paintings&artist=monet&era=renaissance#collection');await expect(page.locator('.art-empty')).toContainText('No works match this combination.');await page.getByRole('button',{name:'Clear choices',exact:true}).click();await expect(page.locator('.art-tile')).toHaveCount(12);
});
test('reading notebook refuses to overwrite a concurrently changed saved note',async({page})=>{
 await page.goto('/study/reading/11');await page.locator('[data-notes-launch=true]').click();const notes=page.getByRole('complementary',{name:'Notes & passages',exact:true});await notes.getByRole('button',{name:'Add a private note',exact:true}).click();await notes.getByLabel('Your note',{exact:true}).fill('Original private note.');await notes.getByRole('button',{name:'Save note',exact:true}).click();await notes.getByRole('button',{name:'Close notes beside the book'}).click();
 // The room notebook is opened through the reader’s existing navigation.
 await page.goto('/study/reading?notebook=1');
 await page.getByRole('button',{name:'My Notebook',exact:true}).click();
 const edit=page.getByRole('button',{name:'Edit note',exact:true}).first();await expect(edit).toBeVisible();await edit.click();await page.getByRole('textbox',{name:'Your note',exact:true}).fill('My unsaved edit.');
 await page.evaluate(()=>{for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i)!;try{const data=JSON.parse(localStorage.getItem(key)!);if(data?.notes?.some((n:{text:string})=>n.text==='Original private note.')){data.notes=data.notes.map((n:{text:string})=>n.text==='Original private note.'?{...n,text:'Newer change from another tab.'}:n);localStorage.setItem(key,JSON.stringify(data));}}catch{}}});
 await page.getByRole('button',{name:'Save note',exact:true}).click();await expect(page.getByText(/Your edit is still here. Copy it before canceling/)).toBeVisible();await expect(page.getByRole('textbox',{name:'Your note',exact:true})).toHaveValue('My unsaved edit.');
});
test('fullscreen artwork closes back to its trigger with the keyboard',async({page})=>{
 await page.goto('/study/art/painting/monet-03');const trigger=page.getByRole('button',{name:/View fullscreen.*The Magpie/});await trigger.click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();await expect(trigger).toBeFocused();
});
test('mobile collection remains readable at enlarged text and passes scoped accessibility checks',async({page,browserName})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/study/art?view=paintings&query=Starry+Night#collection');await expect(page.locator('.art-tile').first()).toContainText('Starry Night');await page.getByText('Viewing comfort',{exact:true}).click();await page.getByRole('combobox',{name:'Text size',exact:true}).selectOption('1.3');await page.getByText('Viewing comfort',{exact:true}).click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);expect((await new AxeBuilder({page}).include('#collection').withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);await page.screenshot({path:`artifacts/dai-110/collection-phone-${browserName}.png`});
});

test('dedicated Tutor has a top-level heading without making a model request',async({page})=>{
 await page.goto('/study/tutor');await expect(page.getByRole('heading',{level:1,name:'Your AI Tutor',exact:true})).toBeVisible();
});
test('current institutional dates agree between the collection and the studies',async({page})=>{
 await page.goto('/study/art?view=paintings&query=Bacchus#collection');await expect(page.locator('#tile-caravaggio-03')).toContainText('c. 1598');await page.locator('#tile-caravaggio-03').getByRole('link',{name:'Read the study →',exact:true}).click();await expect(page.locator('main.art-detail')).toContainText('The Uffizi’s current record places the painting around 1598.');
 await page.goto('/study/art/painting/vermeer-02');await expect(page.locator('main.art-detail')).toContainText('c. 1660');await expect(page.locator('#essay-section-4')).toContainText('purchase in 1908');
});
test('appearance changes keep the visible source paragraph in view',async({page})=>{
 await page.goto('/study/reading/11');const paragraphs=page.locator('.rr-reader-paper [data-paragraph]');await expect(paragraphs.nth(8)).toBeVisible();const paragraph=paragraphs.nth(8),id=await paragraph.getAttribute('id');await paragraph.evaluate(el=>el.scrollIntoView({block:'start'}));await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('dai-reading-library-v1')??'{}').positions?.['11']?.paragraph)).toBe(await paragraph.getAttribute('data-paragraph'));
 // Dispatch the same change event without scrolling the offscreen control first.
 await page.getByRole('combobox',{name:'Text size',exact:true}).evaluate((el:HTMLSelectElement)=>{el.value='26';el.dispatchEvent(new Event('change',{bubbles:true}));});
 await expect.poll(()=>page.locator('#'+id).evaluate(el=>Math.abs(el.getBoundingClientRect().top))).toBeLessThan(80);
});
