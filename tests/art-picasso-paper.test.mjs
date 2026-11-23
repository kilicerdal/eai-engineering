import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const data=JSON.parse(readFileSync('data/art/research/picasso-on-paper.json','utf8'));
test('ten Picasso study topics have resolved internal references and scoped sources',()=>{
 assert.equal(data.studies.length,10);const slugs=new Set(data.studies.map(s=>s.slug));assert.equal(slugs.size,10);
 for(const s of data.studies){assert.match(s.slug,/^[a-z-]+$/);assert.equal(s.sections.length,3);assert.equal(new Set([...s.sections.map(section=>section.id),'close-looking','evidence','references']).size,6);assert.equal(s.looking.length,3);assert.equal(s.imageStatus,'institutional-link');assert.equal(new URL(s.viewer.url).protocol,'https:');assert.ok(s.sourceIds.length);for(const id of s.sourceIds)assert.ok(data.sources[id],s.slug+' missing source '+id);for(const section of s.sections){assert.ok(section.sourceIds.every(id=>s.sourceIds.includes(id)));assert.ok(section.paragraphs.every(p=>p.length>100));}for(const id of s.related)assert.ok(slugs.has(id));for(const field of ['documented','interpretation','uncertain'])assert.ok(s.evidence[field].length>60);}
 const visits=data.routes.flatMap(r=>r.ids);assert.equal(visits.length,10);assert.equal(new Set(visits).size,10);assert.ok(visits.every(id=>slugs.has(id)));
});
test('state records, design dates and unresolved original identities stay distinct',()=>{
 assert.equal(data.bullStates.length,11);for(const [i,state]of data.bullStates.entries()){assert.equal(state.state,i+1);assert.equal(state.accession,'1982.12.'+(i+1));assert.equal(state.url,`https://www.nga.gov/artworks/${61111+i}-bull-le-taureau`);}
 const study=slug=>data.studies.find(s=>s.slug===slug);assert.match(study('lump').evidence.uncertain,/unverified/);assert.match(study('camel').inventory,/not established/);assert.match(study('francoise').evidence.documented,/separate painting/);assert.match(study('don-quixote').evidence.uncertain,/10 and 11 August/);assert.match(study('minotaur').subjectNote,/violence/);assert.match(study('stravinsky').inventory,/MP911/);assert.match(study('guernica').inventory,/DE00053/);
 assert.equal(JSON.parse(readFileSync('data/art/paintings.json','utf8')).length,124);assert.equal(JSON.parse(readFileSync('data/art/research/on-paper-acquisition.json','utf8')).records.length,24);
});

test('uncleared Picasso reproductions stay out of hosted assets and study markup',()=>{
 const clearance=JSON.parse(readFileSync('data/art/research/picasso-image-clearance.json','utf8'));assert.equal(clearance.status,'not-cleared');assert.equal(clearance.displayPicassoReproductions,false);assert.deepEqual(clearance.permissionEvidence,[]);
 for(const s of data.studies){assert.equal(s.imageStatus,'institutional-link');assert.ok(!s.image&&!s.thumbnail);assert.doesNotMatch(s.viewer.url,/api\.nga\.gov\/iiif|\.(jpg|jpeg|webp|png)(?:[?#]|$)/i);}
 for(const file of ['src/app/study/art/on-paper/picasso/page.tsx','src/app/study/art/on-paper/picasso/[slug]/page.tsx','src/components/art/ArtPicassoBullStates.tsx']){const source=readFileSync(file,'utf8');assert.doesNotMatch(source,/<(?:img|Image|iframe)\b|backgroundImage|api\.nga\.gov\/iiif/);}
 const paintings=JSON.parse(readFileSync('data/art/paintings.json','utf8'));for(const p of paintings.filter(p=>p.artist==='picasso')){assert.equal(p.image,'');assert.equal(p.thumbnail,'');}
});
