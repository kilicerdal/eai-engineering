import test from 'node:test';
import assert from 'node:assert/strict';
import {loadStudyModule} from './load-study-module.mjs';
const a=loadStudyModule('study-plan-adjustment'),recommend=loadStudyModule('study-recommendations').recommendLearningStep,now=1700000000000;
const lessons=Array.from({length:3},(_,i)=>({id:'lesson-'+(i+1),title:['Equivalent operations','Two-step equations','Systems of equations'][i],objective:'Explain equivalent operations '+i,activity:'Work through a self-contained equation '+i,checkpoint:'Show and verify each step '+i,sourceIds:[]}));
const journey={settings:{goal:'Understand algebra with evidence',level:'highschool',minutes:20,sessions:3,deadline:''},plan:{title:'Algebra foundations',overview:'Three lessons linking operations to equations.',lessons},completed:['lesson-1'],accepted:true,dirty:false};
function check(decision='needs_work',helpUsed=false,patch={}){return {id:'check-1',context:{goal:journey.settings.goal,lesson:lessons[1]},question:{question:'Solve 3x + 4 = 19.',criterion:'Apply equivalent operations'},answer:'I added 4 first.',helpUsed,result:{decision,feedback:'Check the first operation.',reasoningGap:decision==='meets'?'None identified.':'The added constant must be undone.',nextStep:'Subtract the constant on both sides.'},submittedAt:now-20,...patch};}
const choose=(proposal,option='adapt')=>({version:1,key:proposal.key,option,decidedAt:now-1});
test('suggestions distinguish review, help, verification and moving to the next existing lesson without mutating a plan',()=>{
 const before=structuredClone(journey);
 for(const [decision,help,kind,id] of [['needs_work',false,'revisit','lesson-2'],['partial',false,'revisit','lesson-2'],['uncertain',false,'verify','lesson-2'],['meets',true,'independent','lesson-2'],['meets',false,'continue','lesson-3']]){
  const proposal=a.proposePlanAdjustment(journey,[check(decision,help)],now);assert.equal(proposal.kind,kind);assert.equal(proposal.lesson.id,id);assert.equal(proposal.source.id,'check-1');
 }
 assert.deepEqual(journey,before);assert.match(a.proposePlanAdjustment(journey,[check('uncertain')],now).reason,/before treating this as a mistake/);
});
test('unaccepted/edited plans and unrelated/future checks do not create an adjustment',()=>{
 for(const bad of [null,{...journey,accepted:false},{...journey,dirty:true}])assert.equal(a.proposePlanAdjustment(bad,[check()],now),null);
 for(const record of [check('meets',false,{submittedAt:now+1}),check('meets',false,{context:{goal:'Changed goal',lesson:lessons[1]}}),check('meets',false,{context:{goal:journey.settings.goal,lesson:{...lessons[1],activity:'Changed activity'}}})])assert.equal(a.proposePlanAdjustment(journey,[record],now),null);
});
test('latest matching evidence replaces an earlier suggestion and the final lesson does not invent a new lesson',()=>{
 const old=check('needs_work',false,{id:'old',submittedAt:now-50}),latest=check('meets',false,{id:'new'});assert.equal(a.proposePlanAdjustment(journey,[old,latest],now).kind,'continue');
 const last=check('meets',false,{context:{goal:journey.settings.goal,lesson:lessons[2]}}),p=a.proposePlanAdjustment(journey,[last],now);assert.equal(p.kind,'consolidate');assert.equal(p.lesson.id,'lesson-3');assert.match(p.reason,/no later unmarked lesson/);
});
test('only an explicit matching choice changes the next step; keeping the original path remains available',()=>{
 const rows=[check('meets')],proposal=a.proposePlanAdjustment(journey,rows,now);assert.equal(a.resolvePlanChoice(journey,rows,null,now),null);
 const selected=a.resolvePlanChoice(journey,rows,choose(proposal),now);assert.equal(selected.lesson.id,'lesson-3');
 const original=a.resolvePlanChoice(journey,rows,choose(proposal,'original'),now);assert.equal(original.lesson.id,'lesson-2');assert.match(original.reason,/keep the original/);
 assert.equal(recommend(journey,[],rows,now,null,[],choose(proposal)).lesson.id,'lesson-3');assert.equal(recommend(journey,[],rows,now,null,[],choose(proposal,'original')).lesson.id,'lesson-2');
});
test('new feedback, edited plan, changed pace and completion marks invalidate the old choice',()=>{
 const rows=[check('meets')],proposal=a.proposePlanAdjustment(journey,rows,now),choice=choose(proposal);
 for(const changed of [{...journey,settings:{...journey.settings,minutes:30}},{...journey,completed:['lesson-1','lesson-2']},{...journey,plan:{...journey.plan,lessons:[lessons[0],{...lessons[1],objective:'Different objective'},lessons[2]]}}])assert.equal(a.resolvePlanChoice(changed,rows,choice,now),null);
 assert.equal(a.resolvePlanChoice(journey,[check('partial',false,{id:'new',submittedAt:now})],choice,now),null);
 assert.equal(a.resolvePlanChoice(journey,[{...rows[0],answer:'A revised answer under the same identifier.'}],choice,now),null);
 assert.equal(a.resolvePlanChoice(journey,rows,{...choice,decidedAt:now+1},now),null);assert.equal(a.resolvePlanChoice(journey,rows,{...choice,decidedAt:now-100},now),null);
});
test('malformed preference records are rejected and never treated as an accepted adjustment',()=>{
 for(const value of [null,{}, {version:1,key:'',option:'adapt',decidedAt:now},{version:1,key:'test',option:'automatic',decidedAt:now},{version:1,key:'x'.repeat(100001),option:'adapt',decidedAt:now}]){assert.throws(()=>a.readPlanChoice(value));assert.equal(a.resolvePlanChoice(journey,[check()],value,now),null);}
});
