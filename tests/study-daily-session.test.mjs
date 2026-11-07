import test from 'node:test';
import assert from 'node:assert/strict';
import {loadStudyModule} from './load-study-module.mjs';
const d=loadStudyModule('study-daily-session'),safe=loadStudyModule('study-safe-storage'),bank=loadStudyModule('study-exam-bank');
const now=1700000000000,context={goal:'Learn equations',lesson:{id:'l1',title:'Balance equations',objective:'Use inverse operations',activity:'Solve an equation',checkpoint:'Explain each equivalent operation',sourceIds:[]}},target={kind:'lesson',title:'Balance equations',context};
const start=()=>d.startDailySession(d.emptyDailyRecord(),target,20,now,'daily-1');
const check={id:'c1',context,question:{question:'Solve 3x+4=19',criterion:'Equivalent operations'},answer:'x=5',helpUsed:false,result:{decision:'meets',feedback:'Both operations preserve equality.',reasoningGap:'None identified.',nextStep:'Try a different example.'},submittedAt:now+5};
test('daily session has honest planned allocations, starts without evidence and strictly restores steps and notes',()=>{
 for(const minutes of [10,20,30])assert.equal(d.dailyMinutes(minutes).reduce((a,b)=>a+b,0),minutes);
 const record=start(),saved={...record,sessions:[{...record.sessions[0],stage:2,completed:[0,1],reflection:'Check inverse operations.'}]};assert.deepEqual(d.readDailyRecord(JSON.parse(JSON.stringify(saved))),saved);
 assert.deepEqual(d.dailyEvidence(record.sessions[0],[],null,now+10),{independent:0,helped:0,practice:0,uncertain:0,skipped:0,total:0});
 assert.throws(()=>d.startDailySession(record,target,10,now+10,'another'),/open session/);
});
test('malformed and unsupported saves are refused rather than partially discarded',()=>{
 const record=start(),s=record.sessions[0];for(const bad of [null,{...record,version:2},{...record,activeId:'missing'},{...record,sessions:[s,s]},{...record,sessions:[{...s,stage:4}]},{...record,sessions:[{...s,completed:[1,1]}]},{...record,sessions:[{...s,reflection:'x'.repeat(1001)}]},{...record,sessions:[{...s,finishedAt:now-1}]}])assert.throws(()=>d.readDailyRecord(bad));
 for(const bad of [{kind:'exam',title:'SAT',exam:'other',domain:'algebra'},{kind:'exam',title:'SAT',exam:'sat',domain:'unknown'}, {...target,context:{bad:true}}])assert.throws(()=>d.normalizeDailyTarget(bad));
});
test('summaries exclude earlier/future/changed-goal work, deduplicate answers and separate help and uncertainty',()=>{
 const s=start().sessions[0],rows=[check,{...check,id:'revision',helpUsed:true,submittedAt:now+6},{...check,id:'other',question:{...check.question,question:'Solve 7y-1=20'},result:{...check.result,decision:'uncertain'}},{...check,id:'old',submittedAt:now-1},{...check,id:'future',submittedAt:now+100},{...check,id:'wrong-context',context:{...context,goal:'Another goal'}}];
 assert.deepEqual(d.dailyEvidence(s,rows,null,now+10),{independent:0,helped:1,practice:0,uncertain:1,skipped:0,total:2});
 const done={...s,finishedAt:now+5,updatedAt:now+5};assert.equal(d.dailyEvidence(done,rows,null,now+100).helped,0);assert.equal(d.dailyEvidence(done,rows,null,now+100).independent,1);
});
test('exam summaries match the saved profile and focus without counting other profiles or skipped items as success',()=>{
 const q=bank.examBank.find(q=>q.domain==='algebra'),s={...start().sessions[0],target:{kind:'exam',title:'SAT algebra',exam:'sat',domain:'algebra'}};
 const a={id:'a',exam:'sat',sessionId:'exam-session',mode:'practice',questionId:q.id,selectedIndex:q.answerIndex,hintsUsed:0,reasoning:'Worked it out.',submittedAt:now+1};
 let rows=[a,{...a,id:'new',selectedIndex:null,submittedAt:now+2},{...a,id:'psat',exam:'psat'}];assert.equal(d.dailyEvidence(s,[],{attempts:rows},now+10).skipped,1);assert.equal(d.dailyEvidence(s,[],{attempts:rows},now+10).independent,0);
 rows=[a];assert.equal(d.dailyEvidence(s,[],{attempts:rows},now+10).independent,1);assert.equal(d.dailyTargetHref(s.target),'/study/exams?exam=sat&domain=algebra#exam-review');
});
test('history capacity and conflicting browser writes preserve prior sessions',()=>{
 const s=start().sessions[0],record={version:1,activeId:'daily-0',sessions:Array.from({length:20},(_,i)=>({...s,id:'daily-'+i,finishedAt:now+1,updatedAt:now+1}))};assert.throws(()=>d.startDailySession(record,target,10,now+5,'new'),/20 saved sessions/);
 const original=JSON.stringify(start()),storage={getItem:()=>original,setItem:()=>assert.fail('must not overwrite')};assert.throws(()=>safe.writeStudyCopy(storage,d.DAILY_SESSION_KEY,'different',d.emptyDailyRecord()),/Another tab/);
});

test('return bar selects the unfinished session even when viewing older history, never future or finished work',()=>{
 const record=start(),open=record.sessions[0],done={...open,id:'old',startedAt:now-100,updatedAt:now-10,finishedAt:now-10};
 const value={version:1,activeId:'old',sessions:[done,open]},before=structuredClone(value);
 assert.equal(d.openDailySession(value,now+5).id,open.id);assert.deepEqual(value,before);
 assert.equal(d.openDailySession({...value,sessions:[done],activeId:'old'},now+5),null);
 assert.equal(d.openDailySession(record,now-1),null);assert.throws(()=>d.openDailySession({bad:true},now));
 assert.throws(()=>d.readDailyRecord({...record,sessions:[open,{...open,id:'another'}]}),/Multiple open/);
});
test('closing guidance uses real matching checks, favors verification and never invents a diagnosis from step marks',()=>{
 const s={...start().sessions[0],completed:[0,1,2,3]},uncertain={...check,id:'verify',question:{...check.question,question:'Explain a new equation'},result:{...check.result,decision:'uncertain',nextStep:'Check whether the original question is complete.'}};
 assert.match(d.dailyClosingStep(s,[],null,now+10).reason,/No matching checked answers/);
 assert.match(d.dailyClosingStep(s,[check,uncertain],null,now+10).heading,/Verify/);
 assert.match(d.dailyClosingStep(s,[uncertain],null,now+10).reason,/question is complete/);
 const miss={...check,result:{...check.result,decision:'partial',reasoningGap:'The inverse operation was not explained.',nextStep:'Explain equality on both sides.'}};
 assert.match(d.dailyClosingStep(s,[miss],null,now+10).reason,/inverse operation/);
 assert.match(d.dailyClosingStep(s,[{...check,helpUsed:true}],null,now+10).heading,/without help/);
 assert.equal(d.dailyClosingStep(s,[{...check,submittedAt:now-1}],null,now+10).reviewAt,null);
});
test('independent closing guidance suggests recall without claiming mastery and stays bounded by finish time',()=>{
 const s={...start().sessions[0],finishedAt:now+7,updatedAt:now+7};
 const next=d.dailyClosingStep(s,[check],null,now+20);assert.match(next.heading,/recall/);assert.equal(next.reviewAt,now+7+86400000);assert.match(next.reason,/not a mastery assessment/);
 const later={...check,id:'later',submittedAt:now+8,helpUsed:true};assert.match(d.dailyClosingStep(s,[check,later],null,now+20).heading,/recall/);
 const changed={...check,context:{...context,goal:'Other subject'}};assert.match(d.dailyClosingStep(s,[changed],null,now+20).reason,/No matching/);
});
test('skipped and incorrect exam outcomes get useful next actions without being labeled independent',()=>{
 const q=bank.examBank.find(q=>q.domain==='algebra'),s={...start().sessions[0],target:{kind:'exam',title:'SAT algebra',exam:'sat',domain:'algebra'}};
 const a={id:'a',exam:'sat',sessionId:'exam-session',mode:'practice',questionId:q.id,selectedIndex:null,hintsUsed:0,reasoning:'',submittedAt:now+1};
 assert.match(d.dailyClosingStep(s,[],{attempts:[a]},now+10).heading,/unanswered/);
 assert.match(d.dailyClosingStep(s,[],{attempts:[{...a,selectedIndex:(q.answerIndex+1)%4}]},now+10).heading,/missing step/);
});
