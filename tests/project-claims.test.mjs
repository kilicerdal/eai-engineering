import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {loadStudyModule} from './load-study-module.mjs';
const ledger=JSON.parse(readFileSync('src/data/project-claim-ledger.json','utf8'));
const {showcaseProjects,tourSteps}=loadStudyModule('main-showcase');
test('dated project ledger keeps case records tied to their bundled source and capture dates',()=>{
 assert.deepEqual(ledger.projects.map(p=>p.id),showcaseProjects.map(p=>p.id));
 for(const project of ledger.projects){if(!project.evidence)continue;assert.ok(existsSync('public'+project.evidence));const record=JSON.parse(readFileSync('public'+project.evidence,'utf8'));assert.equal(project.sourceCommit,record.source.commit);assert.equal(project.capturedAt,record.generated_at??record.generatedAt??record.capturedAt);assert.match(project.sourceCommit,/^[a-f0-9]{40}$/);}
});
test('SettlementLab overview and tour use V4.1 while identifying historical previews separately',()=>{
 const project=ledger.projects.find(p=>p.id==='settlement'),capture=JSON.parse(readFileSync('public/evidence/settlementlab-v41/summary.json','utf8'));
 assert.equal(project.caseVersion,'v'+capture.version);assert.match(showcaseProjects.find(p=>p.id==='settlement').version,/v4\.1/);assert.match(project.previewVersion,/Historical V3/);assert.equal(tourSteps.find(p=>p.id==='settlement').evidenceHref,project.evidence);assert.equal(capture.controls.cases,145);assert.equal(capture.day.planned_trades,240);
});
test('authored illustrations and exploratory tools never acquire fabricated capture evidence',()=>{for(const id of ['quality-lab','ai-lab']){const p=ledger.projects.find(p=>p.id===id);assert.equal(p.evidence,null);assert.equal(p.sourceCommit,null);}assert.equal(ledger.projects.find(p=>p.id==='quality-lab').caseKind,'authored-design-illustration');});
