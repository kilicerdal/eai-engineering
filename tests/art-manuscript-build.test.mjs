import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {parseEditorialManuscript as parse} from '../scripts/art/editorial-manuscript.mjs';
test('published custom anchors, review dates and distinct source scopes survive manuscript compilation',()=>{
 const doc=parse('# A work\n@reviewed 2026-11-22\n@source Record|https://museum.example/work|Identification\n@source Research|https://museum.example/work|Conservation\n> A lead.\n\n## Return to the work | analysis | 1,2 | return-to-the-work\n\nA paragraph.\nContinued.\n');
 assert.equal(doc.sections[0].id,'return-to-the-work');assert.deepEqual(doc.sections[0].sources,[0]);assert.equal(doc.sources.length,1);assert.match(doc.sources[0].scope,/Identification Conservation/);assert.equal(doc.reviewed,'2026-11-22');assert.deepEqual(doc.sections[0].paragraphs,['A paragraph. Continued.']);
 assert.throws(()=>parse('# Work\n## Heading | history | 2\nText.'),/Unknown source/);
 assert.throws(()=>parse('# Work\n## One | analysis | | repeated\n\n## Two | history | | repeated'),/duplicate section/);
});
test('every canonical manuscript reproduces its deployed essay and stable passage IDs',()=>{
 const data=JSON.parse(fs.readFileSync('data/art/editorial-v2.json','utf8'));for(const [kind,entries]of Object.entries(data))for(const [id,essay]of Object.entries(entries))assert.deepEqual(parse(fs.readFileSync(`data/art/editorial-v2/${kind}/${id}.md`,'utf8')),essay,`${kind}/${id}`);
});
