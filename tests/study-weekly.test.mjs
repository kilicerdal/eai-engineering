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
 assert.equal(prompt.subject,'general');assert.equal(prompt.checkpoint,undefined);
 const long=weeklyReviewPrompt({...attempt,question:'q'.repeat(1800),answer:'a'.repeat(2500),feedback:'f'.repeat(1800)});
 assert.ok(long.message.length<=3000);assert.match(long.message,/excerpt shortened/);assert.match(long.message,/ask me for it/);
});
