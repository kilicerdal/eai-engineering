import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {loadStudyModule} from './load-study-module.mjs';
const {showcaseProjects,projectGroups,filterShowcase,fieldNotes,tourSteps}=loadStudyModule('main-showcase');
const root=new URL('../',import.meta.url);
test('every category is useful, excludes other categories and All restores the directory',()=>{
 assert.equal(filterShowcase('All').length,showcaseProjects.length);
 for(const group of projectGroups.slice(1)) { const result=filterShowcase(group);assert.ok(result.length);assert.ok(result.every(p=>p.group===group)); }
});
test('public repositories expose source links while private recruiter material stays absent',()=>{
 const sources=showcaseProjects.filter(p=>p.repository);
 assert.deepEqual(sources.map(p=>p.id),['playwright','healthcare','settlement','agent-reliability','quality-lab']);
 for(const p of sources)assert.ok(p.repository.startsWith('https://github.com/kilicerdal/'));
 const lab=showcaseProjects.find(p=>p.id==='quality-lab');
 assert.equal(lab.repository,'https://github.com/kilicerdal/healthcare-quality-lab');assert.match(lab.visibility,/Public source/);assert.match(lab.detail,/separate authored design illustration/);
 assert.ok(!JSON.stringify(showcaseProjects).includes('eai-recruiter-ai'));
});
test('project entries resolve to local routes and existing artwork',()=>{
 for(const p of showcaseProjects){assert.ok(existsSync(new URL(`src/app${p.href.split('#')[0]}/page.tsx`,root)));assert.ok(existsSync(new URL(`public${p.image}`,root)));}
});
test('field notes and tour point to real routes, and deep links match their supporting evidence',()=>{
 for(const item of [...fieldNotes,...tourSteps]){const [path,hash]=item.href.split('#');const page=new URL(`src/app${path}/page.tsx`,root);assert.ok(existsSync(page));if(hash){const content=readFileSync(page,'utf8')+readFileSync(new URL('src/components/engineering/EngineeringStudio.tsx',root),'utf8')+readFileSync(new URL('src/components/engineering/MainShowcase.tsx',root),'utf8');assert.ok(content.includes(hash));}}
 assert.equal(tourSteps.length,5);assert.equal(tourSteps.reduce((sum,s)=>sum+s.seconds,0),300);assert.equal(new Set(tourSteps.map(s=>s.id)).size,5);
 for(const step of tourSteps.filter(s=>s.evidenceHref))assert.ok(existsSync(new URL(`public${step.evidenceHref}`,root)));
});
test('homepage featured discovery preserves the curated wording and source',()=>{
 const home=readFileSync(new URL('src/app/HomePage.tsx',root),'utf8');
 const facts=readFileSync(new URL('src/app/study/curiosity/facts.ts',root),'utf8');
 const factLine=facts.split('\n').find(line=>line.includes("fact('drawing-memory'"));
 const words=['A sketch can be a memory tool.','Experiments have found a memory advantage for drawing studied items compared with writing them. Artistic skill is not the goal: representing the idea is.','https://pubmed.ncbi.nlm.nih.gov/29873039/'];
 for(const text of words){assert.ok(home.includes(text));assert.ok(factLine.includes(text));}
 assert.ok(home.includes('/study/curiosity?fact=drawing-memory'));
});
