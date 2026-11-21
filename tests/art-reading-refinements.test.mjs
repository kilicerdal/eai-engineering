import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const read=p=>JSON.parse(readFileSync(p,'utf8')),notes=read('data/art/research/reading-refinements.json'),works=read('data/art/paintings.json'),editorial=read('data/art/editorial-v2.json');
test('subject orientations belong to the twenty signature studies and remain specific',()=>{
 const context=read('data/art/research/editorial-context.json');assert.deepEqual(Object.keys(notes.works).sort(),Object.keys(context).sort());
 for(const key of ['heading','subject','encounter'])assert.equal(new Set(Object.values(notes.works).map(n=>n[key])).size,20);
 for(const [id,n]of Object.entries(notes.works)){assert.ok(works.some(w=>w.id===id));assert.ok(n.subject.length>130,id);assert.ok(n.encounter.length>120,id);}
});
test('the four quotations and catalogue discrepancy have bounded review records',()=>{
 const voices=read('data/art/research/primary-voices.json'),review=read('data/art/research/manual-reviews.json');assert.equal(review.records.length,5);
 for(const v of voices){const record=review.records.find(r=>r.work===v.work);assert.equal(record.source,v.source);assert.ok(record.method.length>40);assert.ok(record.limit.length>80);assert.ok(v.quote.split(/\s+/).length<=25);}
 assert.match(review.records.find(r=>r.work==='magritte-01').result,/1929.*1928/);
});
test('essays contain no exact duplicated paragraphs or empty source scopes',()=>{
 const paragraphs=new Set();for(const group of Object.values(editorial))for(const e of Object.values(group)){for(const s of e.sources)assert.ok(s.scope.trim(),s.url);for(const section of e.sections)for(const p of section.paragraphs){assert.ok(!paragraphs.has(p),p.slice(0,70));paragraphs.add(p);}}
});
