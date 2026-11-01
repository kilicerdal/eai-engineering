import test from 'node:test';
import assert from 'node:assert/strict';
import { buildExamGoal, examProfiles, mistakeReviewPrompt, differentQuestionPrompt, normalizeMistakes, nextMistakeReview } from '../src/lib/study-exams.ts';
const input={examId:'sat',examName:'',focus:'Compare arguments and identify supporting evidence',date:'2027-03-01'};
const mistake={id:'synthetic-1',exam:'SAT',question:'Solve 3x + 4 = 19.',answer:'I subtracted 4 and got 3x = 23.',expected:'Subtracting 4 gives 3x = 15.',reflection:'Check subtraction on both sides.',createdAt:1000,reviewAt:86401000,reviews:0};
test('exam profiles preserve distinct study contexts and official links',()=>{
 assert.equal(new Set(examProfiles.map(p=>p.id)).size,11);
 for(const id of ['psat','sat','act','ap','mcat','gre','gmat','lsat','toefl','ielts']){const p=examProfiles.find(p=>p.id===id);assert.ok(p);assert.match(p.url,/^https:\/\//);assert.ok(p.focus.length>=3);}
 assert.notDeepEqual(examProfiles.find(p=>p.id==='sat').focus,examProfiles.find(p=>p.id==='mcat').focus);
});
test('exam handoff preserves learner focus, level, date and honest scope',()=>{
 const result=buildExamGoal(input);assert.match(result.goal,/SAT/);assert.match(result.goal,/Compare arguments/);assert.match(result.goal,/Do not claim complete official/);assert.equal(result.level,'highSchool');assert.equal(result.deadline,input.date);
 assert.match(buildExamGoal({...input,examId:'other',examName:'My chemistry final'}).goal,/My chemistry final/);
 for(const patch of [{examId:'constructor'},{focus:''},{focus:'x'.repeat(801)},{date:'2027-02-30'},{examId:'other',examName:''}])assert.throws(()=>buildExamGoal({...input,...patch}));
});
test('notebook restore discards malformed, oversized, duplicate or corrupt entries',()=>{
 assert.deepEqual(normalizeMistakes([mistake,null,{...mistake,id:'big',question:'x'.repeat(1201)},{...mistake,id:'time',reviewAt:NaN},mistake]),[mistake]);
 assert.equal(normalizeMistakes(Array.from({length:60},(_,i)=>({...mistake,id:`m${i}`}))).length,50);
 assert.deepEqual(normalizeMistakes({}),[]);
});
test('mistake feedback checks assumptions and remains within shared message bounds',()=>{
 const prompt=mistakeReviewPrompt(mistake);assert.match(prompt,/do not assume it is wrong/i);assert.match(prompt,/may be wrong/);assert.match(prompt,/missing idea/);
 const max=mistakeReviewPrompt({...mistake,question:'q'.repeat(1200),answer:'a'.repeat(700),expected:'e'.repeat(700)});assert.ok(max.length<=3000);
 const retry=differentQuestionPrompt({...mistake,reflection:'r'.repeat(14000)});assert.ok(retry.length<=3000);assert.match(retry,/ONE different original/);assert.match(retry,/Wait for my attempt/);assert.match(retry,/not an official exam item\.$/);
});
test('self-reported reviews schedule bounded intervals without asserting mastery',()=>{
 const now=100000;let m=nextMistakeReview(mistake,now);assert.equal(m.reviewAt,now+86400000);assert.equal(m.reviews,1);
 m=nextMistakeReview(m,now);assert.equal(m.reviewAt,now+3*86400000);
 m=nextMistakeReview(m,now);assert.equal(m.reviewAt,now+7*86400000);
 m=nextMistakeReview(m,now);assert.equal(m.reviewAt,now+14*86400000);
 assert.equal(nextMistakeReview({...m,reviews:100},now).reviews,100);
});
