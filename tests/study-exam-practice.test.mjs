import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),ts=require('typescript'),cache=new Map();
function load(name){if(cache.has(name))return cache.get(name);const code=ts.transpileModule(readFileSync(new URL(`../src/lib/${name}.ts`,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const m={exports:{}};new Function('require','module','exports',code)(d=>load(d.slice(2)),m,m.exports);cache.set(name,m.exports);return m.exports;}
const bank=load('study-exam-bank'),p=load('study-exam-practice'),snapshots=load('study-cloud-snapshot'),now=1700000000000;
const start=(r=p.emptyExamRecord(),exam='sat',mode='diagnostic',domain='algebra',id='session-1')=>p.startExamSession(r,exam,mode,domain,now,id);
function choose(r,exam='sat',correct=true,hints=0){const s=r.sessions[exam],q=bank.examBank.find(q=>q.id===s.questionIds[s.index]);return {...r,sessions:{...r.sessions,[exam]:{...s,selectedIndex:correct?q.answerIndex:(q.answerIndex+1)%4,hintsUsed:hints,reasoning:'My reasoning'}}};}
function submit(r,exam='sat',correct=true,hints=0,n=0){return p.submitExamAnswer(choose(r,exam,correct,hints),exam,false,now+n+1,'answer-'+n);}
test('all original questions have complete self-contained content and unambiguous choices',()=>{
 assert.equal(bank.examBank.length,40);assert.equal(new Set(bank.examBank.map(q=>q.id)).size,40);
 assert.equal(Object.keys(bank.examDomains).length,8);assert.equal(Object.keys(bank.examSkillLessons).length,16);
 for(const q of bank.examBank){assert.equal(q.choices.length,4);assert.equal(new Set(q.choices.map(c=>c.trim())).size,4,q.id);assert.ok(q.answerIndex>=0&&q.answerIndex<4);assert.equal(q.choiceNotes.length,4);assert.ok(q.choiceNotes.every(n=>n.length>15));assert.equal(q.hints.length,2);assert.ok(q.explanation.length>40);assert.ok([q.passage,q.prompt].filter(Boolean).join('\n\n').length<=1200);assert.ok(bank.examSkillLessons[q.skill]);if(!q.proof)assert.ok(q.passage?.length>50);}
 for(const d of Object.keys(bank.examDomains))assert.ok(bank.examBank.filter(q=>q.domain===d).length>=4);
 for(const skill of Object.keys(bank.examSkillLessons))assert.ok(bank.examBank.filter(q=>q.skill===skill).length>=2);
 assert.deepEqual([...new Set(bank.examBank.filter(q=>q.proof).map(q=>q.answerIndex))].sort(),[0,1,2,3]);
});
test('every math key satisfies an independent arithmetic check',()=>{
 for(const q of bank.examBank.filter(q=>q.proof)){const v=q.proof.values,answer=q.choices[q.answerIndex];let expected;
  switch(q.proof.kind){case 'linear':expected=v[2];assert.equal(v[0]*Number(answer)+v[1],v[0]*v[2]+v[1]);break;case 'systems':expected=v[0];assert.equal((v[0]+v[1])+(v[0]-v[1]),2*Number(answer));break;case 'quadratics':assert.equal(answer,`${v[0]} and −${v[1]}`);for(const root of [v[0],-v[1]])assert.ok((root-v[0])*(root+v[1])===0);continue;case 'exponents':assert.equal(answer,`t^${v[0]+v[1]}`);for(const t of [-2,0,2,3])assert.equal(t**v[0]*t**v[1],t**(v[0]+v[1]));continue;case 'percent':expected=v[0]+v[0]*v[1]/100;break;case 'mean':expected=3*v[0]-v[1]-v[2];break;case 'triangle':expected=v[0]*v[1]/2;break;case 'circle':expected=v[0]**2;break;default:assert.fail(q.id);}
  assert.equal(parseFloat(answer),expected,q.id);
 }
});
test('reading and writing keys match the editorial review map',()=>{
 const keys={mainIdea:[1,0],inference:[1,2],words:[2,1],purpose:[0,3],transitions:[1,2],synthesis:[0,3],boundaries:[1,1],agreement:[2,1]};
 for(const q of bank.examBank.filter(q=>!q.proof)){const index=Number(q.id.split('-').at(-1));assert.equal(q.answerIndex,keys[q.skill][index],q.id);}
});
test('diagnostics cover each domain once with separate SAT and PSAT starting items',()=>{
 const sat=start(),psat=start(p.emptyExamRecord(),'psat');for(const [r,exam] of [[sat,'sat'],[psat,'psat']]){const ids=r.sessions[exam].questionIds;assert.equal(ids.length,8);assert.equal(new Set(ids.map(id=>bank.examBank.find(q=>q.id===id).domain)).size,8);}
 assert.notDeepEqual(sat.sessions.sat.questionIds,psat.sessions.psat.questionIds);
});
test('submission and navigation do not silently skip an unanswered item or record double clicks',()=>{
 let r=start();assert.equal(p.advanceExamSession(r,'sat',now),r);assert.equal(p.submitExamAnswer(r,'sat',false,now+1,'a'),r);
 r=submit(r);const again=p.submitExamAnswer(r,'sat',false,now+2,'duplicate');assert.equal(again,r);assert.equal(r.attempts.length,1);
 const next=p.advanceExamSession(r,'sat',now+2);assert.equal(next.sessions.sat.index,1);assert.equal(next.sessions.sat.selectedIndex,null);assert.equal(next.sessions.sat.hintsUsed,0);
});
test('skipped and helped responses remain distinct from independent correct answers',()=>{
 let r=start();r=p.submitExamAnswer(r,'sat',true,now+1,'skip');const first=r.attempts[0];assert.equal(first.selectedIndex,null);assert.throws(()=>p.examAttemptToMistake(first,now+2));
 let other=start(p.emptyExamRecord(),'sat','practice','algebra','s2');other=submit(other,'sat',true,1);const evidence=p.examSkillEvidence('sat',other.attempts,now+2);assert.equal(evidence.reduce((n,s)=>n+s.helped,0),1);assert.equal(evidence.reduce((n,s)=>n+s.independent,0),0);
});
test('profiles and latest-question results stay separate, with future or corrupt data excluded',()=>{
 const r=submit(start());const a=r.attempts[0],q=bank.examBank.find(q=>q.id===a.questionId),later={...a,id:'later',selectedIndex:(q.answerIndex+1)%4,submittedAt:now+2};
 assert.equal(p.latestExamEvidence('psat',[a],now+3).size,0);assert.equal(p.latestExamEvidence('sat',[a,later,later],now+3).size,1);assert.equal(p.latestExamEvidence('sat',[a,later],now+1).get(a.questionId).id,a.id);
 assert.equal(p.normalizeExamAttempts([a,{...a,id:'bad',hintsUsed:99},null,{...a,id:'bad2',selectedIndex:4}]).length,1);
});
test('targeted practice stays in its domain and uses unseen items before repeat reinforcement',()=>{
 const r=start(p.emptyExamRecord(),'sat','practice','geometry');assert.ok(r.sessions.sat.questionIds.every(id=>bank.examBank.find(q=>q.id===id).domain==='geometry'));
 const answered=submit(r);const next=p.startExamSession(answered,'sat','practice','geometry',now+10,'second');assert.notEqual(next.sessions.sat.questionIds[0],answered.attempts[0].questionId);
});
test('a complete session is resumable, keeps skipped items, and never invents a score',()=>{
 let r=start();for(let i=0;i<8;i++){r=i===1?p.submitExamAnswer(r,'sat',true,now+i+1,'skip-'+i):submit(r,'sat',true,i===2?1:0,i);r=p.advanceExamSession(r,'sat',now+i+2);}
 assert.equal(r.sessions.sat.finished,true);assert.equal(p.sessionAnswers(r,'sat',now+20).length,8);assert.deepEqual(p.readExamRecord(JSON.parse(JSON.stringify(r))),r);assert.equal('score' in r,false);
});
test('corrupt or unsupported saves fail without replacing the original data',()=>{
 for(const value of [null,{}, {...p.emptyExamRecord(),version:2},{...p.emptyExamRecord(),attempts:[{}]},{...start(),sessions:{sat:{...start().sessions.sat,questionIds:['missing']},psat:null}}])assert.throws(()=>p.readExamRecord(value));
 assert.throws(()=>p.startExamSession(p.emptyExamRecord(),'sat','invented','algebra',now,'id'));
});
test('notebook conversion preserves source passage, selected reasoning, checked key and help use',()=>{
 const r=submit(start());const a=r.attempts[0],q=bank.examBank.find(q=>q.id===a.questionId),m=p.examAttemptToMistake(a,now+2);
 assert.ok(m.question.includes(q.prompt));if(q.passage)assert.ok(m.question.includes(q.passage));assert.ok(m.answer.includes('My reasoning'));assert.ok(m.expected.includes(q.choices[q.answerIndex]));assert.match(m.reflection,/checked against its authored answer key/);assert.equal(m.reviewAt,now+2+86400000);assert.equal(m.id,`exam-${a.id}`);
 assert.throws(()=>p.examAttemptToMistake({...a,submittedAt:now+3},now+2));
});
test('optional account snapshots preserve exam histories and session drafts',()=>{
 const r=submit(start());const snapshot=snapshots.validateStudySnapshot({version:1,values:{[p.EXAM_PREP_KEY]:JSON.stringify(r)},library:{documents:[],entries:[]}});assert.deepEqual(p.readExamRecord(JSON.parse(snapshot.values[p.EXAM_PREP_KEY])),r);
});

const linearQuestions=bank.examBank.filter(q=>q.skill==='linear');
function reviewAttempt(question=linearQuestions[0],patch={}){return {id:'review-a',exam:'sat',sessionId:'review-session',mode:'practice',questionId:question.id,selectedIndex:(question.answerIndex+1)%4,hintsUsed:0,reasoning:'An attempted method',submittedAt:now,...patch};}
test('missed and helped answers schedule one next-day review per skill; skips do not',()=>{
 const a=reviewAttempt(),helped=reviewAttempt(linearQuestions[1],{id:'helped',selectedIndex:linearQuestions[1].answerIndex,hintsUsed:1,submittedAt:now+10});
 const reviews=p.examReviewProgress('sat',[a,helped],now+20);assert.equal(reviews.length,1);assert.equal(reviews[0].anchor.id,'helped');assert.equal(reviews[0].dueAt,now+10+86400000);assert.equal(reviews[0].resolvedBy,null);
 assert.equal(p.examReviewProgress('sat',[{...a,selectedIndex:null}],now+20).length,0);assert.equal(p.examReviewProgress('psat',[a],now+20).length,0);assert.equal(p.examReviewProgress('sat',[a],now-1).length,0);
});
test('a review requires a later different question answered without hints',()=>{
 const a=reviewAttempt(),same=reviewAttempt(linearQuestions[0],{id:'same',selectedIndex:linearQuestions[0].answerIndex,submittedAt:now+10}),different=reviewAttempt(linearQuestions[1],{id:'different',selectedIndex:linearQuestions[1].answerIndex,submittedAt:now+20});
 assert.equal(p.examReviewProgress('sat',[a,same],now+30)[0].resolvedBy,null);
 assert.equal(p.examReviewProgress('sat',[a,{...different,hintsUsed:1}],now+30)[0].resolvedBy,null);
 assert.equal(p.examReviewProgress('sat',[a,{...different,submittedAt:now}],now+30)[0].resolvedBy,null);
 assert.equal(p.examReviewProgress('sat',[{...different,submittedAt:now-1},a],now+30)[0].resolvedBy,null);
 assert.equal(p.examReviewProgress('sat',[a,same,different,different],now+30)[0].resolvedBy.id,'different');
 const regressed=reviewAttempt(linearQuestions[2],{id:'regression',submittedAt:now+40});assert.equal(p.examReviewProgress('sat',[a,different,regressed],now+50)[0].resolvedBy,null);
});
test('skill review uses a different original item, prioritizes unseen variants and preserves other profiles',()=>{
 const a=reviewAttempt();let record={...start(p.emptyExamRecord(),'psat'),attempts:[a]};const before=structuredClone(record);
 const reviewed=p.startExamReview(record,'sat','linear',now+1,'focused-review');
 assert.deepEqual(record,before);assert.deepEqual(reviewed.sessions.psat,record.sessions.psat);assert.equal(reviewed.sessions.sat.mode,'practice');assert.ok(reviewed.sessions.sat.questionIds.length>0);
 for(const id of reviewed.sessions.sat.questionIds){assert.notEqual(id,a.questionId);assert.equal(bank.examBank.find(q=>q.id===id).skill,'linear');}
 assert.deepEqual(p.readExamRecord(JSON.parse(JSON.stringify(reviewed))),reviewed);
 const seen=reviewAttempt(linearQuestions[1],{id:'already-seen',selectedIndex:linearQuestions[1].answerIndex,submittedAt:now-1});
 assert.equal(p.startExamReview({...record,attempts:[seen,a]},'sat','linear',now+1,'review2').sessions.sat.questionIds[0],linearQuestions[2].id);
 assert.throws(()=>p.startExamReview(record,'sat','missing',now+1,'bad'));
 assert.throws(()=>p.startExamReview(record,'psat','linear',now+1,'wrong-profile'));
 assert.throws(()=>p.startExamReview(record,'sat','linear',now-1,'future'));
});
test('a follow-up clears after a fresh independent answer without deleting the original attempt',()=>{
 const anchor=reviewAttempt();let r=p.startExamReview({...p.emptyExamRecord(),attempts:[anchor]},'sat','linear',now+86400000,'review-now');
 r=p.submitExamAnswer(choose(r),'sat',false,now+86400001,'fresh-result');const review=p.examReviewProgress('sat',r.attempts,now+86400002)[0];
 assert.equal(review.resolvedBy.id,'fresh-result');assert.equal(r.attempts.length,2);assert.equal(r.attempts[0].id,anchor.id);
 assert.throws(()=>p.startExamReview(r,'sat','linear',now+86400003,'completed'));
});
