import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),ts=require('typescript'),cache=new Map();
function load(name){if(cache.has(name))return cache.get(name);const code=ts.transpileModule(readFileSync(new URL(`../src/lib/${name}.ts`,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const m={exports:{}};new Function('require','module','exports',code)(d=>load(d.slice(2)),m,m.exports);cache.set(name,m.exports);return m.exports;}
const {recommendLearningStep:recommend}=load('study-recommendations'),{mistakePracticeContext}=load('study-mistake-practice');
const now=1700000000000;
const lesson={id:'l1',title:'Balance equations',objective:'Isolate the variable',activity:'Try an example',checkpoint:'Explain each step',sourceIds:[]};
const journey={settings:{goal:'Learn algebra'},plan:{title:'Algebra',lessons:[lesson,{...lesson,id:'l2',title:'Second lesson'}]},completed:[],accepted:true,dirty:false};
const mistake={id:'m1',exam:'SAT',question:'Solve 3x + 4 = 19.',answer:'23',expected:'',reflection:'',createdAt:now-100,reviewAt:now-10,reviews:0};
const check=(context,decision='meets',helpUsed=false,submittedAt=now-1,id='c1')=>({id,context,question:{question:'Solve 2x+1=7',criterion:'Explain operations'},answer:'x=3 with both operations shown',helpUsed,result:{decision,feedback:'Feedback',reasoningGap:'Gap',nextStep:'Next step'},submittedAt});
const planContext={goal:journey.settings.goal,lesson},bookContext=mistakePracticeContext(mistake);
test('new learners get a goal action without invented evidence',()=>{assert.equal(recommend(null,[],[],now).kind,'plan');assert.equal(recommend(null,[],[],now).check,undefined);assert.match(recommend(null,[],[],now).action,/Shape/);});
test('unaccepted or changed plans are never resumed',()=>{for(const patch of [{accepted:false},{dirty:true}])assert.equal(recommend({...journey,...patch},[mistake],[check(planContext,'needs_work')],now).kind,'plan');});
test('failed lesson evidence outranks continuing unchecked plan even if self marked complete',()=>{const result=recommend({...journey,completed:['l1']},[],[check(planContext,'partial')],now);assert.equal(result.kind,'lesson');assert.equal(result.lesson.id,'l1');assert.match(result.reason,/reasoning/);});
test('due notebook help evidence recommends a fresh independent attempt before new content',()=>{const result=recommend(journey,[mistake],[check(bookContext,'meets',true)],now);assert.equal(result.kind,'notebook');assert.equal(result.mistakeId,'m1');assert.match(result.title,/without hints/);assert.equal(result.check.helpUsed,true);});
test('uncertain feedback asks for verification without implying an incorrect answer',()=>{for(const [context,mistakes] of [[bookContext,[mistake]],[planContext,[]]]){const r=recommend(journey,mistakes,[check(context,'uncertain')],now);assert.match(r.action,/feedback/i);assert.match(r.reason,/not evidence|before treating it as right or wrong/);}});
test('latest evidence supersedes older failure and duplicate attempts never create extra work',()=>{const result=recommend(journey,[mistake],[check(bookContext,'needs_work',false,now-5,'old'),check(bookContext,'meets',false),check(bookContext,'meets',false)],now);assert.equal(result.kind,'lesson');assert.equal(result.lesson.id,'l1');const alone=recommend(null,[mistake],[check(bookContext)],now);assert.match(alone.title,/Finish your review/);});
test('future work, deleted entries, modified goals, and unrelated checks do not affect the recommendation',()=>{assert.equal(recommend(journey,[{...mistake,createdAt:now+1}],[],now).kind,'lesson');assert.equal(recommend(journey,[],[check(bookContext,'needs_work')],now).kind,'lesson');const changed={...journey,settings:{goal:'A different goal'}};assert.equal(recommend(changed,[],[check(planContext,'needs_work')],now).check,undefined);assert.equal(recommend(journey,[mistake],[check(bookContext,'needs_work',false,now+1)],now).check,undefined);});
test('a learner-scheduled future date is honored and no recommendation changes stored data',()=>{const future={...mistake,reviewAt:now+1000};const original=structuredClone({journey,future});const result=recommend(journey,[future],[check(bookContext,'needs_work')],now);assert.equal(result.kind,'lesson');assert.deepEqual({journey,future},original);});
test('notebook checks predating the saved attempt are not evidence for it',()=>{const result=recommend(null,[mistake],[check(bookContext,'meets',false,now-200)],now);assert.equal(result.check,undefined);assert.match(result.reason,/no saved follow-up/);});
test('completed plans suggest an unchecked lesson without claiming mastery',()=>{const result=recommend({...journey,completed:['l1','l2']},[],[],now);assert.equal(result.kind,'lesson');assert.match(result.reason,/no saved understanding check/);});

test('authored exam keys inform targeted recommendations without being labeled AI-reviewed',()=>{
 const p=load('study-exam-practice'),b=load('study-exam-bank');let record=p.startExamSession(p.emptyExamRecord(),'sat','practice','algebra',now-20,'exam-session');
 const session=record.sessions.sat,q=b.examBank.find(q=>q.id===session.questionIds[0]);record={...record,sessions:{...record.sessions,sat:{...session,selectedIndex:(q.answerIndex+1)%4}}};record=p.submitExamAnswer(record,'sat',false,now-10,'exam-missed');
 const result=recommend(journey,[],[],now,record);assert.equal(result.kind,'exam');assert.equal(result.domain,'algebra');assert.equal(result.exam,'sat');assert.equal(result.check,undefined);
 const future={...record,attempts:record.attempts.map(a=>({...a,submittedAt:now+1}))};assert.equal(recommend(journey,[],[],now,future).kind,'lesson');
 assert.equal(recommend(journey,[],[],now,{version:99}).kind,'lesson');
});

test('fresh independent follow-up stops the original exam mistake being recommended repeatedly',()=>{
 const p=load('study-exam-practice'),b=load('study-exam-bank'),questions=b.examBank.filter(q=>q.skill==='linear'),q=questions[0],other=questions[1];
 const anchor={id:'missed',exam:'sat',sessionId:'session',mode:'practice',questionId:q.id,selectedIndex:(q.answerIndex+1)%4,hintsUsed:0,reasoning:'A method',submittedAt:now-86400001};
 const record={...p.emptyExamRecord(),attempts:[anchor]};const result=recommend(journey,[],[],now,record);assert.equal(result.kind,'exam');assert.equal(result.skill,'linear');assert.match(result.reason,/due/);
 const fresh={...anchor,id:'fresh',questionId:other.id,selectedIndex:other.answerIndex,submittedAt:now-1};assert.equal(recommend(journey,[],[],now,{...record,attempts:[anchor,fresh]}).kind,'lesson');
 assert.equal(recommend(journey,[],[],now,{...record,attempts:[anchor,{...fresh,hintsUsed:1}]}).kind,'exam');
 const same={...fresh,questionId:q.id,selectedIndex:q.answerIndex};assert.equal(recommend(journey,[],[],now,{...record,attempts:[anchor,same]}).kind,'exam');
});
