import {test,expect} from '@playwright/test';
const root='/study/art';
for(const [id,anchor]of [['leonardo-01','research-materials'],['picasso-02','looking-story']])test('legacy research target reveals after remembered Introduction: '+anchor,async({page})=>{
 await page.goto(root+'/painting/'+id);await page.getByRole('button',{name:/^Introduction ·/}).click();await page.goto(root+'/painting/'+id+'#'+anchor);await expect(page.locator('#'+anchor)).toBeVisible();await expect(page.getByRole('button',{name:'Research · choose a topic',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:/^Full study ·/}).click();await expect(page.locator('#essay')).toBeVisible();
});
test('catalog rejects unmatched scripts and symbols while retaining translated-title search',async({page})=>{
 await page.goto(root+'?query=%E6%BC%A2%E5%AD%97#collection');await expect(page.locator('.art-count')).toHaveText('0 works');await page.getByRole('searchbox').fill('🎨');await expect(page.locator('.art-count')).toHaveText('0 works');await page.getByRole('searchbox').fill('La Gioconda');await expect(page.locator('.art-tile h3')).toHaveText(['Mona Lisa']);await page.getByRole('searchbox').fill('');await expect(page.locator('.art-count')).toHaveText('124 works · Showing 1–12');
});
