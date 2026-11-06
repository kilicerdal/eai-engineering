import test from 'node:test';
import assert from 'node:assert/strict';
import {loadStudyModule} from './load-study-module.mjs';
const {weeklyAttempts}=loadStudyModule('study-weekly');
const {practiceQuestions}=loadStudyModule('study-practice');
const {examBank}=loadStudyModule('study-exam-bank');
const now=new Date(2026,10,5,12).getTime();
const start=new Date(2026,9,30).getTime();
const q=practiceQuestions[0];
const answer=(time,correct=true,hints=0)=>({submittedAt:time,questionId:q.id,selectedIndex:correct?q.answerIndex:(q.answerIndex+1)%q.choices.length,hintsUsed:hints});
test('weekly window uses seven local dates, excludes future work and counts the latest checked answer once',()=>{
 const summary=weeklyAttempts([],null,[answer(start-1),answer(start),answer(now,false),answer(now+1)],now);
 assert.equal(summary.count,1);assert.equal(summary.independent,undefined);
 assert.equal(summary.review.time,now);assert.equal(summary.review.question.includes(q.prompt),true);
 assert.equal(weeklyAttempts([],null,[answer(start-1),answer(now+1)],now).count,0);
 assert.equal(weeklyAttempts([],null,[answer(start,true,1)],now).review.outcome,'helped');
});
test('exam profiles remain separate and skipped questions do not become findings',()=>{
 const q=examBank[0], base={exam:'sat',sessionId:'session',mode:'practice',questionId:q.id,selectedIndex:q.answerIndex,hintsUsed:0,reasoning:'My reason',submittedAt:now};
 const summary=weeklyAttempts([],{attempts:[{...base,id:'1'},{...base,id:'2',exam:'psat',hintsUsed:1},{...base,id:'3',selectedIndex:null}]},[],now);
 assert.equal(summary.count,2);assert.match(summary.independent.topic,/SAT/);assert.match(summary.review.topic,/PSAT/);
 assert.match(summary.independent.answer,/My reason/);
});
test('uncertain tutor feedback links to its real answer without classing it as incorrect',()=>{
 const c={context:{goal:'History',lesson:{id:'1',title:'Historical causes',objective:'Explain',activity:'Compare',checkpoint:'Reason'}},question:{question:'Which source supports the claim?'},answer:'The letter.',helpUsed:false,result:{decision:'uncertain',feedback:'Missing source',nextStep:'Find the letter.'},submittedAt:now};
 const summary=weeklyAttempts([c],null,[],now);
 assert.equal(summary.review.outcome,'uncertain');assert.equal(summary.review.answer,c.answer);assert.equal(summary.independent,undefined);
});

test('weekly tutor draft carries the chosen attempt and remains within the tutor input limit',()=>{
 const {weeklyReviewPrompt}=loadStudyModule('study-weekly');
 const attempt=weeklyAttempts([],null,[answer(now,false)],now).review;
 const prompt=weeklyReviewPrompt(attempt);
 assert.ok(prompt.message.includes(attempt.question));assert.ok(prompt.message.includes(attempt.answer));assert.ok(prompt.message.includes(attempt.feedback));
 assert.equal(prompt.subject,'general');assert.equal(prompt.checkpoint.originalQuestion,attempt.question);
 const long=weeklyReviewPrompt({...attempt,question:'q'.repeat(1800),answer:'a'.repeat(2500),feedback:'f'.repeat(1800)});
 assert.ok(long.message.length<=3000);assert.match(long.message,/excerpt shortened/);assert.match(long.message,/ask me for it/);
});

test('review identity is stable, preserves sources, and separates later attempts',()=>{
 const {weeklyReviewPrompt}=loadStudyModule('study-weekly');
 const {normalizeLessonContext,lessonIdentity}=loadStudyModule('study-checkpoints');
 const attempt=weeklyAttempts([],null,[answer(now,false)],now).review;
 const context=weeklyReviewPrompt(attempt).checkpoint;
 assert.ok(normalizeLessonContext(context));
 assert.equal(lessonIdentity(context),lessonIdentity(weeklyReviewPrompt(attempt).checkpoint));
 assert.notEqual(lessonIdentity(context),lessonIdentity(weeklyReviewPrompt({...attempt,time:now+1}).checkpoint));
 assert.equal(weeklyReviewPrompt({...attempt,sources:[{sourceId:'S1',text:'saved source'}]}).checkpoint.sources[0].text,'saved source');
 assert.equal(normalizeLessonContext({...context,originalQuestion:'x'.repeat(1801)}),null);
 assert.notEqual(lessonIdentity(context),lessonIdentity({...context,originalQuestion:'Different original question'}));
});

test('follow-up evidence retains original question and never labels uncertainty independent',()=>{
 const original='Solve 3x + 4 = 19.';
 const check={context:{goal:'Review',originalQuestion:original,lesson:{id:'review',title:'Equations',objective:'Explain',activity:'Practice',checkpoint:'Check'}},question:{question:'Solve 4x + 2 = 22.'},answer:'5',helpUsed:false,result:{decision:'uncertain',feedback:'Need reasoning',nextStep:'Explain the operations'},submittedAt:now};
 const result=weeklyAttempts([check],null,[],now);assert.equal(result.review.originalQuestion,original);assert.equal(result.independent,undefined);
});

 test('outcome totals include every latest result, separate uncertainty, and do not double-count retries',()=>{
  const base={context:{goal:'Study',lesson:{id:'a',title:'Study',objective:'Explain',activity:'Try',checkpoint:'Check'}},question:{question:'Explain A'},answer:'A',helpUsed:false,result:{decision:'meets',feedback:'Reasoned answer',nextStep:'Try another'},submittedAt:now};
  const checks=[base,{...base,submittedAt:now-1,result:{...base.result,decision:'partial'}},
   {...base,question:{question:'Explain B'},helpUsed:true},
   {...base,question:{question:'Explain C'},result:{...base.result,decision:'uncertain'}},
   {...base,question:{question:'Explain D'},result:{...base.result,decision:'needs_work'}}];
  const summary=weeklyAttempts(checks,null,[],now);
  assert.equal(summary.attempts.length,4);
  assert.deepEqual(summary.counts,{independent:1,helped:1,uncertain:1,practice:1});
  assert.equal(summary.attempts.find(a=>a.question==='Explain A').outcome,'independent');
  assert.deepEqual(weeklyAttempts([],null,[],now).counts,{independent:0,helped:0,uncertain:0,practice:0});
 });
