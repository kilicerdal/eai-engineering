import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {loadReviewRecords, matchingReview, questionFingerprint} from '../scripts/certification-review-records.mjs';
import {loadStudyModule as load} from './load-study-module.mjs';
const Q=load('certification-quality');
const question={id:'example',prompt:'Which?',choices:['A','B'],answer:0,explanations:['Yes','No'],source:'https://example.org'};
const record={id:question.id,fingerprint:questionFingerprint(question),checkedOn:'2026-11-22',reviewer:'Reviewer',scope:'Specific scenario',source:question.source,sourceInspection:'Section inspected',status:'reviewed-with-stated-scope',choiceChecks:['A satisfies the required condition.','B fails the required condition.']};
test('latest exact-content scoped review wins; stale or incomplete records cannot approve content',()=>{
 const old={...record,checkedOn:'2026-11-19'};
 assert.equal(matchingReview(question,[record,old]),record);
 for(const changed of [{answer:1},{source:'https://other.example'},{explanations:['Changed','No']},{choices:['B','A']}]) assert.equal(matchingReview({...question,...changed},[record]),undefined);
 for(const changed of [{status:'pending'},{choiceChecks:['Only one rationale supplied']},{choiceChecks:['','A long enough but irrelevant second check']},{source:''},{scope:''}]) assert.equal(matchingReview(question,[{...record,...changed}]),undefined);
});
test('all dated files contribute and malformed review files fail visibly',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'dai-review-'));
 try{
  await writeFile(join(directory,'2026-11-19-certification-reviewed.json'),JSON.stringify({records:[{...record,checkedOn:undefined,reviewed:'2026-11-19',status:'agent-reviewed-with-stated-scope'}]}));
  await writeFile(join(directory,'2026-11-22-certification-reviewed.json'),JSON.stringify({records:[record]}));
  await writeFile(join(directory,'unrelated.json'),'invalid');
  const loaded=await loadReviewRecords(directory);
  assert.equal(loaded.length,2);assert.equal(loaded[0].checkedOn,'2026-11-19');assert.equal(matchingReview(question,[loaded[0]]),loaded[0]);
  await writeFile(join(directory,'2026-11-23-certification-reviewed.json'),JSON.stringify({records:[record,record]}));
  await assert.rejects(loadReviewRecords(directory),/duplicate/);
  await writeFile(join(directory,'2026-11-23-certification-reviewed.json'),'invalid');
  await assert.rejects(loadReviewRecords(directory),SyntaxError);
 }finally{await rm(directory,{recursive:true,force:true});}
});
test('new scoped reviews match all ten current questions and every alternative',async()=>{
 const records=(await loadReviewRecords('docs/content-reviews')).filter(r=>r.checkedOn==='2026-11-22');
 assert.equal(records.length,10);
 for(const r of records){const q=Q.practiceQuestion(r.id,Q.QUALITY_REVISION);assert.equal(matchingReview(q,[r]),r);assert.equal(r.edition,q.contentRevision);}
});
