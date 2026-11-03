import test from 'node:test';
import assert from 'node:assert/strict';
import {mistakePracticeContext,mistakePracticeEvidence} from '../src/lib/study-mistake-practice.ts';
import {loadStudyModule} from './load-study-module.mjs';
const {freshNotebookLinearQuestion,normalizeLessonContext,lessonIdentity,latestLessonCheck,normalizeLessonChecks,checkLabel}=loadStudyModule('study-checkpoints');
import {validateStudySnapshot,STUDY_KEYS} from '../src/lib/study-cloud-snapshot.ts';
const mistake={id:'sample-1',exam:'SAT',question:'Solve 3x + 4 = 19.',answer:'I subtracted 4 and got 3x = 23.',expected:'Subtracting 4 gives 3x = 15.',reflection:'Check equivalent operations.',createdAt:1000,reviewAt:2000,reviews:0};
const context=mistakePracticeContext(mistake);
const record={id:'review-1',context,question:{question:'Solve 4x + 6 = 22. Explain your steps.',criterion:'Equivalent operations and arithmetic'},answer:'Subtract 6 then divide by 4: x=4.',helpUsed:false,result:{decision:'meets',feedback:'Both operations preserve equality.',reasoningGap:'None identified.',nextStep:'Try another example.'},submittedAt:1500};
test('saved attempt yields valid bounded context without asserting the attempt was wrong',()=>{
 assert.deepEqual(normalizeLessonContext(context),context);
 assert.match(context.lesson.activity,/different, self-contained/);
 assert.match(context.lesson.activity,/Do not reveal its answer/);
 assert.match(context.lesson.activity,/not.*assume.*wrong/);
 const long=mistakePracticeContext({...mistake,id:'i'.repeat(100),exam:'e'.repeat(100),question:'q'.repeat(1200)});
 assert.ok(normalizeLessonContext(long));
});
test('notes, supplied answer keys, and review scheduling never rewrite practice identity',()=>{
 const before=structuredClone(mistake);
 assert.equal(lessonIdentity(context),lessonIdentity(mistakePracticeContext({...mistake,reflection:'Changed notes',answer:'Changed answer',expected:'Wrong answer key',reviews:5,reviewAt:9999})));
 assert.notEqual(lessonIdentity(context),lessonIdentity(mistakePracticeContext({...mistake,id:'another-entry'})));
 assert.notEqual(lessonIdentity(context),lessonIdentity(mistakePracticeContext({...mistake,question:'A different problem'})));
 mistakePracticeEvidence(mistake);assert.deepEqual(mistake,before);
});
test('generation context includes original reasoning with answer keys explicitly untrusted and bounded',()=>{
 const text=mistakePracticeEvidence({...mistake,reflection:'r'.repeat(14000)});
 assert.ok(text.length<=4000);assert.match(text,/3x \+ 4/);assert.match(text,/Previous answer:/);assert.match(text,/may be wrong/);assert.match(text,/not this saved one/);
});
test('feedback remains linked to its mistake, independent of other entries and plan lessons',()=>{
 const saved=normalizeLessonChecks([record]);assert.equal(saved.length,1);
 assert.equal(latestLessonCheck(context,saved,1600)?.id,record.id);
 assert.equal(latestLessonCheck(mistakePracticeContext({...mistake,id:'other'}),saved,1600),null);
 assert.equal(latestLessonCheck(context,saved,1400),null);
 assert.equal(checkLabel({...record,helpUsed:true}),'Completed with help');
 assert.equal(checkLabel({...record,result:{...record.result,decision:'uncertain'}}),'Needs verification');
 assert.equal(mistake.reviewAt,2000);assert.equal(mistake.reviews,0);
});
test('notebook follow-up checks use the existing optional cloud snapshot key',()=>{
 assert.ok(STUDY_KEYS.includes('eai-lesson-checks-v1'));
 const snapshot=validateStudySnapshot({version:1,values:{'eai-lesson-checks-v1':JSON.stringify([record])},library:{documents:[],entries:[]}});
 assert.equal(normalizeLessonChecks(JSON.parse(snapshot.values['eai-lesson-checks-v1']))[0].context.lesson.id,mistake.id);
});

test('reviewed two-step questions have coherent arithmetic, change the example, and avoid the latest question',()=>{
 for(const source of ['Solve 3x + 4 = 19.','Solve 5y - 7 = 28.']){
  const context=mistakePracticeContext({...mistake,question:source});let previous='';const seen=new Set();
  for(let i=0;i<12;i++){
   const next=freshNotebookLinearQuestion(context,previous);assert.ok(next);assert.notEqual(next.question,previous);seen.add(next.question);
   const m=/\\\((\d+)([a-z]) ([+-]) (\d+) = (-?\d+)\\\)/.exec(next.question);assert.ok(m);
   const a=Number(m[1]),b=Number(m[4])*(m[3]==='+'?1:-1),rhs=Number(m[5]);const x=(rhs-b)/a;assert.ok(Number.isInteger(x));assert.equal(a*x+b,rhs);
   previous=next.question;
  }
  assert.ok(seen.size>=10);
 }
 for(const question of ['Solve 0x + 4 = 19.','Solve 3x + 0 = 19.','A word problem with missing data','Solve x*x + 2 = 4.'])assert.equal(freshNotebookLinearQuestion(mistakePracticeContext({...mistake,question})),null);
 assert.equal(freshNotebookLinearQuestion({...context,goal:'An ordinary lesson'}),null);
});
