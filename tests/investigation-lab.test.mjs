import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadStudyModule} from './load-study-module.mjs';
const lab=loadStudyModule('investigation-lab');
const {labCases,allowedEvidence,guidedAnswer,weeklyChallenge,emptyNotebook,emptyDraft,parseNotebook,writeNotebook,LAB_STORAGE_KEY,critiqueRequirements,exploreTradeoff,parseLabAnswer,reportMarkdown,notebookStats}=lab;
const json=name=>JSON.parse(readFileSync(new URL(`../public/evidence/${name}.json`,import.meta.url),'utf8'));
const checkout=json('order-once'),claims=json('claim-redelivery'),collateral=json('reuse-v26');
function storage(raw=null){let value=raw;return {getItem:key=>key===LAB_STORAGE_KEY?value:null,setItem:(key,next)=>{assert.equal(key,LAB_STORAGE_KEY);value=next},raw:()=>value}}
function answer(ids=['checkout-control']){return {interpretation:'The selected records support this limited interpretation.',missing:['Additional evidence is needed.'],nextChecks:['Compare the persisted identity.'],challenge:'Contradictory identity observations would change the interpretation.',references:ids}}
function report(){return {id:'report-one',title:'Checkout investigation',createdAt:'2026-11-14T20:00:00.000Z',caseId:'order-once',question:'What does the record establish?',mode:'guided',observed:[{id:'checkout-control',summary:'Recorded control passed.',source:'/evidence/order-once.json'}],answer:answer(),note:'Check the original identity.'}}
test('four cases have unique evidence, valid review choices and explicit public scopes',()=>{
 assert.equal(labCases.length,4);assert.equal(new Set(labCases.flatMap(c=>c.evidence.map(e=>e.id))).size,12);
 for(const c of labCases){assert.ok(c.predictions[c.predictionAnswer]);assert.ok(c.corrections[c.correctionAnswer]);for(const e of c.evidence)assert.ok(e.source.startsWith('/evidence/')||e.source==='/engineering/private-lab');}
 const authored=labCases.find(c=>c.id==='generated-test');assert.ok(authored.evidence.every(e=>e.kind==='authored'));assert.doesNotMatch(JSON.stringify(labCases),/github\.com\/kilicerdal\/(healthcare-quality-lab|eai-recruiter-ai)/);
});
test('checkout and claim case observations preserve their captured revisions and dates',()=>{
 const c=labCases.find(c=>c.id==='order-once');assert.ok(c.evidence.every(e=>e.revision===checkout.source.commit&&e.date===checkout.generatedAt));
 assert.match(c.evidence[0].summary,/201 then 200/);assert.match(c.evidence[1].summary,/201 then 201/);
 const control=checkout.control.steps.filter(s=>s.action==='checkout'),fault=checkout.fault.steps.filter(s=>s.action==='checkout');assert.equal(control[1].actual.sameOrder,true);assert.equal(fault[1].actual.sameOrder,false);
 const claim=labCases.find(c=>c.id==='claim-twice');assert.ok(claim.evidence.every(e=>e.revision===claims.source.commit));assert.match(claim.evidence[1].summary,new RegExp(`held ${claims.stages[1].persistedClaims} claim`));assert.match(claim.evidence[2].summary,new RegExp(String(claims.stages[2].apiStatus)));
});
test('collateral exercise names the exact seeded divergence and working-tree provenance',()=>{
 const c=labCases.find(c=>c.id==='settlementlab'),failure=collateral.reports.injected_fault.cases[1].steps[2].failure;
 assert.equal(collateral.checks.healthy_target_passed,true);assert.equal(collateral.checks.injected_defect_detected,true);assert.equal(failure.expected,200);assert.equal(failure.actual,201);
 assert.match(c.evidence[1].summary,/C01 still passed.*expected HTTP 200, observed 201/);assert.match(c.evidence[2].summary,/working-tree source hashes rather than a clean source commit/);
});
test('partial guides do not present the full diagnosis as established',()=>{
 const c=labCases[0];assert.equal(guidedAnswer(c,[]).references.length,0);
 const partial=guidedAnswer(c,[c.evidence[0].id]);assert.match(partial.interpretation,/partial investigation/);assert.ok(!partial.interpretation.includes(c.interpretation));
 assert.deepEqual(partial.references,['checkout-control']);assert.equal(guidedAnswer(c,c.evidence.map(e=>e.id)).interpretation,c.interpretation);
});
test('cross-case, duplicate and malformed evidence IDs are rejected',()=>{
 for(const ids of [['claim-ack'],['checkout-control','checkout-control'],'checkout-control',[null]])assert.throws(()=>allowedEvidence(labCases[0],ids));
});
test('weekly challenge stays stable within a UTC Monday-to-Sunday week',()=>{
 const mon=weeklyChallenge(new Date('2026-11-09T00:00:00Z')),sun=weeklyChallenge(new Date('2026-11-15T23:59:59Z')),next=weeklyChallenge(new Date('2026-11-16T00:00:00Z'));
 assert.deepEqual(mon,sun);assert.equal(mon.week,'2026-11-09');assert.notEqual(next.caseId,mon.caseId);
 assert.ok(labCases.some(c=>c.id===weeklyChallenge(new Date('2025-01-01')).caseId));assert.throws(()=>weeklyChallenge(new Date('invalid')));
});
test('notebook roundtrip keeps notes, reviewed correction, completion and report evidence',()=>{
 const n=emptyNotebook();n.drafts['order-once']={...emptyDraft(),prediction:1,correction:1,reviewed:true,completedAt:'2026-11-14T20:00:00Z',revealed:labCases[0].evidence.map(e=>e.id),note:'Keep this observation.'};n.reports=[report()];
 assert.deepEqual(parseNotebook(JSON.stringify(n)),n);assert.deepEqual(notebookStats(n),{started:1,completed:1,saved:1});
});
test('unsupported or damaged saved data is rejected before it can be overwritten',()=>{
 for(const raw of ['broken','{"version":2,"drafts":{},"reports":[]}',JSON.stringify({...emptyNotebook(),drafts:{unknown:emptyDraft()}})]){const s=storage(raw);assert.throws(()=>parseNotebook(s.getItem(LAB_STORAGE_KEY)));assert.equal(s.raw(),raw)}
 const bad=emptyNotebook();bad.drafts['order-once']={...emptyDraft(),completedAt:'2026-11-14T20:00:00Z'};assert.throws(()=>parseNotebook(JSON.stringify(bad)));
});
test('concurrent changes and storage failures preserve the original bytes',()=>{
 const s=storage('other-tab');assert.throws(()=>writeNotebook(s,null,emptyNotebook()),/Another tab/);assert.equal(s.raw(),'other-tab');
 const quota={getItem:()=>null,setItem:()=>{throw new Error('quota')}};assert.throws(()=>writeNotebook(quota,null,emptyNotebook()),/quota/);
 const clean=storage();const bytes=writeNotebook(clean,null,emptyNotebook());assert.equal(clean.raw(),bytes);
});
test('saved reports reject external source injection and unknown references',()=>{
 for(const change of [r=>r.observed[0].source='javascript:alert(1)',r=>r.observed[0].source='https://private.example',r=>r.answer.references=['invented'],r=>r.note='x'.repeat(4001)]){const r=report();change(r);assert.throws(()=>parseNotebook(JSON.stringify({...emptyNotebook(),reports:[r]})))}
});
test('malformed AI answers and invented citations never pass response validation',()=>{
 assert.deepEqual(parseLabAnswer(answer(),['checkout-control']),answer());
 for(const value of [{...answer(),references:['claim-ack']},{...answer(),missing:[]},{...answer(),interpretation:''},{...answer(),references:[]},'not json'])assert.throws(()=>parseLabAnswer(value,['checkout-control']));
});
test('requirement critique separates vague language from unproven defects',()=>{
 const result=critiqueRequirements('The application should be fast, secure and reliable for every user.');assert.match(result.answer.missing.join(' '),/fast, secure.*reliable/);assert.match(result.answer.interpretation,/not proven defects/);assert.deepEqual(result.answer.references,['requirements']);
 assert.throws(()=>critiqueRequirements('short'));assert.throws(()=>critiqueRequirements('x'.repeat(2201)));
 const bounded=critiqueRequirements('Accept integer quantities from 1 to 100 inclusive.');assert.match(bounded.answer.interpretation,/does not establish completeness/);
});
test('tradeoff review refuses identical options and never invents a measured winner',()=>{
 assert.throws(()=>exploreTradeoff('A clear correctness constraint for our system','Queue','queue'),/different options/);
 const result=exploreTradeoff('Preserve a single order identity after a request retry.','Database transaction','Queue with deduplication');assert.equal(result.observed.length,3);assert.match(result.answer.interpretation,/do not establish a winner/);assert.match(result.answer.challenge,/No benchmark was run/);
});
test('export includes observation provenance, limits and personal notes',()=>{
 const text=reportMarkdown(report());assert.match(text,/https:\/\/www.eai.engineering\/evidence\/order-once.json/);assert.match(text,/Authored evidence guide/);assert.match(text,/No tests or repository services were executed/);assert.match(text,/Check the original identity/);
});
const {createLabNotebookStore}=loadStudyModule('investigation-store');
test('external notebook store resumes saved drafts and blocks writes after cross-tab changes',()=>{
 const n=emptyNotebook();n.drafts['order-once']={...emptyDraft(),prediction:1,note:'Original note'};const s=storage(JSON.stringify(n));let changed;
 const store=createLabNotebookStore(()=>s,callback=>{changed=callback;return()=>{}});const unsubscribe=store.subscribe(()=>{});
 assert.equal(store.getSnapshot().notebook.drafts['order-once'].note,'Original note');
 store.update(old=>({...old,reports:[report()]}));assert.equal(store.getSnapshot().saved,true);assert.equal(parseNotebook(s.raw()).reports.length,1);
 const before=s.raw();changed(LAB_STORAGE_KEY,'other-tab-version');store.update(old=>({...old,reports:[]}));assert.equal(s.raw(),before);assert.match(store.getSnapshot().error,/Another tab/);assert.equal(store.getSnapshot().notebook.reports.length,0);unsubscribe();
});
test('corrupt storage remains unchanged while new work stays available in memory',()=>{
 const s=storage('damaged-json');const store=createLabNotebookStore(()=>s,()=>()=>{});store.subscribe(()=>{});assert.equal(store.getSnapshot().ready,true);assert.match(store.getSnapshot().error,/untouched/);
 store.update(n=>({...n,reports:[report()]}));assert.equal(s.raw(),'damaged-json');assert.equal(store.getSnapshot().notebook.reports.length,1);assert.equal(store.getSnapshot().saved,false);
});
