import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {loadStudyModule} from './load-study-module.mjs';
const C=loadStudyModule('certification-content'),S=loadStudyModule('certification-study'),P=loadStudyModule('certification-practice'),U=loadStudyModule('certification-purpose'),Q=loadStudyModule('certification-quality'),V=loadStudyModule('certification-practice-v8'),T=loadStudyModule('certification-tutor');
const attempt=(q,at,correct=false)=>({id:'prior:'+q.id+':'+at,question:q.id,selected:correct?q.answer:(q.answer+1)%4,reason:'Retained learner reasoning',at,mode:'practice',contentRevision:'quality-v7'});
test('all 1000 original records and previous quality editions remain byte-identical',()=>{
 assert.equal(createHash('sha256').update(JSON.stringify(C.certQuestions)).digest('hex'),'e8f9161cc4bf4ad41736233625e92d18d2b0c530dcbcce8fb5a43af042b7e4e9');
 const baseline=JSON.parse(readFileSync(new URL('./fixtures/certification-quality-v7-preserved.json',import.meta.url)));assert.equal(Object.keys(baseline).length,1000);
 for(const [id,hash]of Object.entries(baseline))assert.equal(createHash('sha256').update(JSON.stringify(Q.practiceQuestion(id,'quality-v7'))).digest('hex'),hash,id);
});
test('recommendation uses latest retained mistakes, ignores future evidence and never replaces an active session',()=>{
 const d=S.emptyCert('cloud-practitioner'),q=C.certQuestions.find(q=>q.track===d.track),other=C.certQuestions.find(x=>x.track===d.track&&x.domain!==q.domain);
 assert.equal(U.recommendedPractice(d,1000),null);d.attempts=[attempt(q,100),attempt(other,9000)];const before=JSON.stringify(d),next=U.recommendedPractice(d,1000);assert.equal(next.domain,q.domain);assert.equal(next.ids.length,5);assert.ok(next.ids.every(id=>C.getQuestion(id).domain===q.domain));assert.equal(JSON.stringify(d),before);
 d.attempts.push(attempt(q,200,true));assert.equal(U.recommendedPractice(d,1000),null);d.session={finishedAt:null};assert.equal(U.recommendedPractice(d,10000),null);
});
test('fresh practice exhausts unseen questions before repeating within the selected scope',()=>{
 for(const t of C.certTracks){const d=S.emptyCert(t.id),pool=C.certQuestions.filter(q=>q.track===t.id),unseen=new Set(pool.slice(-4).map(q=>q.id));d.attempts=pool.filter(q=>!unseen.has(q.id)).map(q=>attempt(q,100));const ids=P.practiceQuestions(d,10);assert.ok(ids.slice(0,4).every(id=>unseen.has(id)),t.id);assert.equal(new Set(ids).size,10);const domain=pool[0].domain,dp=pool.filter(q=>q.domain===domain),last=dp.at(-1);d.attempts=dp.slice(0,-1).map(q=>attempt(q,100));assert.equal(P.practiceQuestions(d,5,domain)[0],last.id);}
});
test('question labels distinguish deliberate review from normal fresh practice without treating current checks as prior exposure',()=>{
 const d=S.emptyCert('cloud-practitioner'),q=C.certQuestions.find(q=>q.track===d.track),s={id:'current',startedAt:1000,mode:'practice'};assert.match(U.encounterLabel(d,s,q.id),/^Fresh/);d.attempts=[{...attempt(q,1100),id:'current:'+q.id}];assert.match(U.encounterLabel(d,s,q.id),/^Fresh/);d.attempts.push(attempt(q,500));assert.match(U.encounterLabel(d,s,q.id),/^Previously checked/);assert.match(U.encounterLabel(d,{...s,mode:'review'},q.id),/^Deliberate review/);
});
test('concept retry excludes the source session and selects an independently identified related concept when available',()=>{
 const d=S.emptyCert('cloud-practitioner'),q=C.certQuestions.find(q=>q.id==='cloud-practitioner-growth-009');d.session={questions:[q.id]};const before=JSON.stringify(d),next=U.conceptAlternative(d,q,1000);assert.ok(next);assert.notEqual(next.id,q.id);assert.equal(C.getQuestion(next.id).domain,q.domain);assert.equal(C.getQuestion(next.id).choices[C.getQuestion(next.id).answer],q.choices[q.answer]);assert.equal(next.kind,'related-concept');assert.equal(JSON.stringify(d),before);
 d.session.questions=C.certQuestions.filter(x=>x.track===d.track&&x.domain===q.domain).map(x=>x.id);assert.equal(U.conceptAlternative(d,q,1000),null);
});
test('calm results use only the completed session to select a focus and do not claim mastery',()=>{
 let d=P.startPracticeTest(S.emptyCert('github-actions'),5,'test','all',1000,'round');assert.equal(U.calmResult(d),null);const q=C.getQuestion(d.session.questions[0]);for(const id of d.session.questions)d=S.answerCert(d,id,C.getQuestion(id).answer,'Required behavior',2000);d=S.finishCert(d,3000);assert.equal(U.calmResult(d).domain,null);assert.match(U.calmResult(d).detail,/does not establish mastery/);d.session.answers[q.id].selected=null;assert.equal(U.calmResult(d).domain,q.domain);
});
test('coverage inventory accounts for all questions, gives official sections and discloses thin domain allocation',()=>{
 for(const t of C.certTracks){const rows=U.coverageInventory(t.id);assert.equal(rows.reduce((n,d)=>n+d.total,0),100);assert.equal(rows.length,t.domains.length);assert.ok(rows.every(d=>d.reference.href.startsWith('https://')&&d.total>0));}
 assert.equal(U.coverageInventory('istqb-foundation').find(x=>x.id==='management').priority,'Needs editorial attention');assert.equal(U.coverageInventory('github-copilot').find(x=>x.id==='d2').priority,'Needs editorial attention');
});
test('retained v9 edition keeps 27 rationale fixes and 26 workshop revisions while preserving old saved editions',()=>{
 let changed=0;for(const q of C.certQuestions){const old=Q.practiceQuestion(q.id,'quality-v7'),next=Q.practiceQuestion(q.id,'quality-v9');assert.equal(next.answer,old.answer);assert.equal(next.choices[next.answer],old.choices[old.answer]);if(JSON.stringify(next.explanations)!==JSON.stringify(old.explanations)){changed++;assert.equal(new Set(next.explanations).size,4);}}
 assert.equal(changed,53);let d=S.startCert(S.emptyCert('cloud-practitioner'),'practice',5,'all',1000,'legacy');d.session.contentRevision='quality-v7';const q=C.getQuestion(d.session.questions[0]);d=S.answerCert(d,q.id,(q.answer+1)%4,'Keep this draft',2000,true);d=S.finishCert(d,3000);d.notebook[q.id].reflection='Keep this reflection';assert.deepEqual(S.parseCert(d.track,JSON.stringify(d)),d);const summary=V.practiceSummary(d);assert.equal(summary.revision,'quality-v7');assert.ok(V.validSummary(d.track,summary.id,summary));assert.doesNotThrow(()=>T.certificationTutorInput({question:q.id,selected:q.answer,reason:'This is enough reasoning for review.',revision:'quality-v7'}));assert.equal(U.mistakeDistinction(Q.practiceQuestion('cloud-practitioner-14',Q.QUALITY_REVISION),0).includes('block storage'),true);
});

test('remembered notes and coaching summaries accept both retained and current editions',()=>{const K=loadStudyModule('certification-coaching'),q=C.certQuestions.find(q=>q.track==='github-actions');for(const revision of ['quality-v7','quality-v8']){const data=K.emptyCoaching(q.track);data.remember={[q.id]:{text:'Keep the workflow evidence',source:q.source,revision,at:1000}};assert.deepEqual(K.parseCoaching(q.track,JSON.stringify(data)),data);}assert.equal(Q.validQualityRevision('quality-v99'),false);});

test('main-idea review opens with the displayed result focus without dropping other review questions',()=>{let d=P.startPracticeTest(S.emptyCert('cloud-practitioner'),10,'test','all',1000,'result');d=S.finishCert(d,2000);const ids=d.session.questions.slice().reverse(),original=[...ids],focus=U.calmResult(d).domain,order=U.resultReviewOrder(d,ids);assert.equal(C.getQuestion(order[0]).domain,focus);assert.deepEqual(new Set(order),new Set(ids));assert.deepEqual(ids,original);});
