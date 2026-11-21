import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const facts=read('data/art/facts/collection.json'),editorial=read('data/art/editorial-v2.json');
test('facts keep stable subject IDs and provide five distinct entries for 21 painters and 20 signature paintings',()=>{
 assert.equal(Object.keys(facts.painters).length,21);assert.equal(Object.keys(facts.paintings).length,20);
 const ids=new Set(),bodies=new Set();let count=0;
 for(const kind of ['painters','paintings'])for(const [id,entries]of Object.entries(facts[kind])){assert.ok(editorial[kind][id],id);assert.equal(entries.length,5,id);for(const f of entries){assert.ok(!ids.has(f.id),f.id);ids.add(f.id);assert.ok(!bodies.has(f.text),f.id);bodies.add(f.text);assert.ok(f.id.startsWith(id+'-fact-'));count++;}}
 assert.equal(count,205);
});
test('each entry separates evidence status, editorial significance and a retrievable source',()=>{
 for(const kind of ['painters','paintings'])for(const entries of Object.values(facts[kind]))for(const f of entries){assert.ok(['documented','observation','research-limit'].includes(f.kind));assert.ok(f.text.split(/\s+/).length>=25,f.id);assert.ok(f.why.length>55,f.id);assert.notEqual(f.text,f.why);assert.ok(f.source.title.length>8);const u=new URL(f.source.url);assert.equal(u.protocol,'https:');assert.ok(u.pathname!=='/',f.id);assert.equal(f.editorialReviewed,'2026-11-20');assert.match(f.reviewScope,/not a claim of new independent primary research/);assert.equal(f.checked,undefined);}
});
test('the facts preserve historical distinctions rather than promoting legends to evidence',()=>{
 const text=id=>facts.paintings[id].map(f=>f.text+' '+f.why).join(' ');
 assert.match(text('rembrandt-01'),/1715/);assert.match(text('leonardo-01'),/wood|panel/);assert.match(text('turner-01'),/1838/);assert.match(text('van-gogh-02'),/hands|labor|labour/);
 const statuses=Object.values(facts.paintings).flat().map(f=>f.kind);assert.ok(statuses.includes('research-limit'));assert.ok(statuses.includes('observation'));
});
test('related works exist, belong to their painter and keep Kahlo identities distinct',()=>{
 const works=read('data/art/paintings.json');const paintings=Array.isArray(works)?works:works.paintings;
 for(const [id,entries]of Object.entries(facts.painters))for(const f of entries)if(f.relatedWork){const work=paintings.find(p=>p.id===f.relatedWork);assert.ok(work,f.id);assert.equal(work.artist,id,f.id);}
 assert.equal(facts.painters.kahlo[0].relatedWork,'kahlo-01');assert.equal(facts.painters.kahlo[3].relatedWork,'kahlo-02');
});
test('every fact body with numerals has a bounded documentary review',()=>{
 const review=read('data/art/facts/numeric-review.json');const ids=new Set(review.records.map(r=>r.fact));const expected=[];
 for(const kind of ['painters','paintings'])for(const entries of Object.values(facts[kind]))for(const f of entries)if(/\d/.test(f.text))expected.push(f.id);
 assert.deepEqual([...ids].sort(),expected.sort());assert.equal(ids.size,review.records.length);
 for(const r of review.records){assert.ok(r.numbers.length);assert.match(r.reference,/^https:\/\//);assert.match(r.limit,/only the numerical claim/);}
 assert.match(facts.paintings['morisot-02'][0].text,/about 1879/i);
});
