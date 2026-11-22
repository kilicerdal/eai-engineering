import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const editorial=read('data/art/editorial-v2.json'),context=read('data/art/research/editorial-context.json'),outlines=read('data/art/research/essay-outlines.json');
const flagships=['leonardo-01','leonardo-02','rembrandt-01','vermeer-01','van-gogh-01',...Object.keys(read('data/art/research/collection-studies.json'))];
test('all twenty signature studies have specific reproduction, naming, observation and evidence limits',()=>{
 assert.deepEqual(Object.keys(context).sort(),[...flagships].sort());
 for(const [id,c]of Object.entries(context))for(const key of ['question','reproduction','naming','description','researchNext'])assert.ok(c[key]?.length>65,`${id}/${key}`);
 for(const key of ['question','reproduction','naming','description','researchNext'])assert.equal(new Set(Object.values(context).map(c=>c[key])).size,20,`distinct ${key}`);
});
test('signature outlines cover every retained section without repeating the opening',()=>{
 let count=0;for(const id of flagships){const e=editorial.paintings[id];assert.deepEqual(Object.keys(outlines[id]),e.sections.map(s=>s.id));for(const s of e.sections){const text=outlines[id][s.id];assert.ok(text.length>35);assert.ok(text.length<180);assert.ok(!s.paragraphs[0].startsWith(text));count++;}}assert.equal(count,153);
});
test('authored source manuscripts retain all revised leads, paragraphs and reference records',()=>{
 for(const [kind,ids]of [['paintings',flagships],['painters',Object.keys(editorial.painters)]])for(const id of ids){const e=editorial[kind][id],raw=readFileSync(`data/art/editorial-v2/${kind}/${id}.md`,'utf8');assert.ok(raw.includes('> '+e.lead),id);for(const s of e.sections){assert.ok(raw.includes('## '+s.title),id);for(const p of s.paragraphs)assert.ok(raw.includes(p),id);}for(const s of e.sources)assert.ok(raw.includes(s.url),id);}
});
test('reading estimates agree with revised essays and the manuscript compiler',async()=>{
 for(const entries of Object.values(editorial))for(const e of Object.values(entries)){const words=[e.lead,...e.sections.flatMap(s=>s.paragraphs)].join(' ').split(/\s+/).length;assert.equal(e.words,words);assert.equal(e.minutes,Math.ceil(words/180));}
 const {parseEditorialManuscript}=await import('../scripts/art/editorial-manuscript.mjs');const essay=parseEditorialManuscript('# Work\n> '+Array(181).fill('word').join(' '));assert.equal(essay.words,181);assert.equal(essay.minutes,2);
});
test('all 124 studies and 25 biographies remain present; historical distinctions stay specific',()=>{
 assert.equal(Object.keys(editorial.paintings).length,124);assert.equal(Object.keys(editorial.painters).length,25);
 assert.match(context['turner-01'].naming,/1838.*1839/);assert.match(context['caravaggio-02'].naming,/London.*Milan/);assert.match(context['vermeer-01'].researchNext,/curtain.*identification/);
 assert.match(editorial.paintings['turner-01'].sections[0].paragraphs.at(-1),/Royal Academy in 1839.*later popularity/);
});
