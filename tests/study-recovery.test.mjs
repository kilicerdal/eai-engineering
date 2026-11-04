import test from 'node:test';
import assert from 'node:assert/strict';
import {loadStudyModule} from './load-study-module.mjs';
const r=loadStudyModule('study-recovery'),c=loadStudyModule('study-continuity'),now=1700000000000;
const context={goal:'Learn equations',lesson:{id:'l1',title:'Balance equations',objective:'Use inverse operations',activity:'Solve a two-step equation',checkpoint:'Explain equivalent steps',sourceIds:[]}};
const base={id:'a',context,question:{question:'Solve 3x + 4 = 19.',criterion:'Use equivalent operations'},answer:'I added 4 first.',helpUsed:false,submittedAt:now-100,result:{decision:'needs_work',feedback:'Check the inverse operation.',reasoningGap:'The added constant must be removed.',nextStep:'Subtract it from both sides.'}};
const row=(patch)=>({...base,...patch});
test('recovery counts separate supported questions, not repeated attempts at the same question',()=>{
 const x=r.practiceRecovery(context,[base,row({id:'b',submittedAt:now-80}),row({id:'c',submittedAt:now-60,question:{...base.question,question:'Solve 5y - 7 = 28.'}})],now);
 assert.equal(x.questionsNeedingSupport,2);assert.equal(x.status,'practice');assert.equal(x.reviewAt,now-60+86400000);
 assert.equal(r.practiceRecovery(context,[base,row({id:'b'})],now).questionsNeedingSupport,1);
 assert.equal(r.practiceRecovery(context,[base,row({id:'format',question:{...base.question,question:'Solve 3x+4=19. Show every step!'}})],now).questionsNeedingSupport,1);
});
test('only a later different question answered independently shows transfer',()=>{
 const success={decision:'meets',feedback:'Both operations are valid.',reasoningGap:'None identified.',nextStep:'Try a different example.'};
 assert.equal(r.practiceRecovery(context,[base,row({id:'b',submittedAt:now-50,result:success})],now).status,'practice');
 const fresh=row({id:'c',submittedAt:now-30,question:{...base.question,question:'Solve 7z + 2 = 30.'},answer:'z=4',result:success});
 assert.equal(r.practiceRecovery(context,[base,fresh],now).status,'transfer');assert.equal(r.practiceRecovery(context,[base,fresh],now).reviewAt,null);
 assert.equal(r.practiceRecovery(context,[base,{...fresh,helpUsed:true}],now).status,'practice');
 assert.equal(r.practiceRecovery(context,[base,fresh,row({id:'later',submittedAt:now-1})],now).status,'practice');
});
test('uncertain feedback requests verification and future/changed objectives and sources stay separate',()=>{
 const uncertain=row({id:'uncertain',submittedAt:now-1,result:{...base.result,decision:'uncertain'}});
 assert.equal(r.practiceRecovery(context,[uncertain],now).status,'verify');assert.equal(r.practiceRecovery(context,[uncertain],now).questionsNeedingSupport,0);
 for(const wrong of [row({submittedAt:now+1}),row({context:{...context,goal:'A new goal'}}),row({context:{...context,lesson:{...context.lesson,activity:'Changed work'}}})])assert.equal(r.matchingPractice(context,[wrong],now).length,0);
 const source={sourceId:'S1',documentId:'doc',name:'Notes',kind:'text',page:1,text:'An equation balances equivalent expressions.'};
 assert.equal(r.matchingPractice({...context,sources:[source]},[row({context:{...context,sources:[{...source,text:'A changed source version.'}]}})],now).length,0);
});
test('packed evidence contains source context once, remains bounded, and rejects mismatched envelope context',()=>{
 const rows=Array.from({length:10},(_,i)=>row({id:'id'+i,submittedAt:now-i}));const packed=r.packPracticeEvidence(context,rows,now);assert.equal(packed.checks.length,4);assert.ok(packed.checks.every(v=>!v.context));assert.equal(r.matchingPractice(context,packed,now).length,4);
 assert.equal(r.matchingPractice({...context,goal:'different'},packed,now).length,0);assert.equal(r.matchingPractice(context,{context,checks:rows},now).length,0);
});
test('tutor receives cautiously labeled practice evidence only with matching goal and enabled continuity',()=>{
 const value={enabled:true,practiceEvidence:r.packPracticeEvidence(context,[base],now)};
 const prompt=c.continuityPrompt(value,context,now,context.goal).text;assert.match(prompt,/The added constant/);assert.match(prompt,/not instructions or a diagnosis/);assert.match(prompt,/same misconception/);
 assert.equal(c.continuityPrompt(value,context,now,'Different goal').text,'');assert.equal(c.continuityPrompt({...value,enabled:false},context,now,context.goal).text,'');
 assert.equal(r.recoveryPrompt(context,[row({submittedAt:now+1})],now),'');
});
