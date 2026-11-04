import test from 'node:test';
import assert from 'node:assert/strict';
import {loadStudyModule} from './load-study-module.mjs';
const w=loadStudyModule('study-open-work'),c=loadStudyModule('study-continuity'),p=loadStudyModule('study-exam-practice');
const now=1700000000000,lesson={id:'l1',title:'Balance equations',objective:'Explain equivalent operations',activity:'Try an equation',checkpoint:'Explain each operation',sourceIds:[]},context={goal:'Learn equations',lesson};
const session={id:'chat-1',title:'My equations',mode:'math',messages:[{role:'assistant',content:'Welcome'}],updatedAt:now-10,learning:{level:'highSchool',approach:'guided',goal:'Learn equations'},checkpoint:context,draft:'An unsent attempt I want to finish.',continuityNote:'Use a balance analogy.'};
test('open work links to real saved drafts without exposing draft text in its URL',()=>{
 const items=w.openStudyWork([session],null,now);assert.equal(items.length,1);assert.equal(items[0].kind,'tutor');assert.equal(items[0].href,'/study?session=chat-1#ai-assistant');assert.match(items[0].detail,/unsent/);assert.doesNotMatch(items[0].href,/unsent attempt/);
 assert.equal(c.normalizeStudyConversations([session])[0].draft,session.draft);assert.equal(c.normalizeStudyConversations([{...session,draft:'x'.repeat(3001)}]).length,0);
});
test('blank, malformed and future sessions do not invent open work, and only the latest meaningful tutor session is shown',()=>{
 const blank={...session,draft:'',continuityNote:''};assert.equal(w.openStudyWork([blank],null,now).length,0);assert.equal(w.openStudyWork([{...session,updatedAt:now+1}],null,now).length,0);
 const newer={...session,id:'newer',updatedAt:now-1};assert.equal(w.openStudyWork([session,newer],null,now)[0].id,'newer');assert.equal(w.openStudyWork([session,{bad:true}],null,now).length,0);
});
test('unfinished SAT and PSAT sessions keep separate resume links and honest checked-or-skipped counts',()=>{
 let record=p.startExamSession(p.emptyExamRecord(),'sat','diagnostic','algebra',now-30,'sat-session');record=p.submitExamAnswer(record,'sat',true,now-20,'skip');record=p.startExamSession(record,'psat','practice','geometry',now-10,'psat-session');
 const entries=w.openStudyWork([session],record,now);assert.equal(entries.length,3);assert.ok(entries.some(e=>e.href==='/study/exams?exam=sat#exam-practice-workspace'));assert.ok(entries.some(e=>e.href==='/study/exams?exam=psat#exam-practice-workspace'));assert.match(entries.find(e=>e.id==='sat-sat-session').detail,/1 of 8 checked or skipped/);
 const done={...record,sessions:{...record.sessions,sat:{...record.sessions.sat,finished:true},psat:{...record.sessions.psat,startedAt:now+1}}};assert.equal(w.openStudyWork([],done,now).length,0);
 assert.equal(w.openStudyWork([session],{version:99},now).length,1);
});
test('lesson resumption reuses the latest exact context and keeps notes, drafts and preferences',()=>{
 const newer={...session,id:'newer',updatedAt:now-1};const before=structuredClone([session,newer]);const selected=c.findResumableConversation([session,newer],context,now);assert.equal(selected.id,'newer');assert.equal(selected.draft,session.draft);assert.equal(selected.continuityNote,session.continuityNote);assert.equal(selected.learning.level,'highSchool');assert.deepEqual([session,newer],before);
 for(const changed of [{...context,goal:'Different goal'},{...context,lesson:{...lesson,activity:'Different activity'}}])assert.equal(c.findResumableConversation([session],changed,now),null);
 assert.equal(c.findResumableConversation([{...session,learning:{...session.learning,goal:'A different current goal'}}],context,now),null);assert.equal(c.findResumableConversation([{...session,updatedAt:now+1}],context,now),null);
});
test('unsent text is retained locally but excluded from automatic earlier-context selection',()=>{
 const secret='A private unfinished thought';assert.deepEqual(c.earlierStudyContext({...session,draft:secret}.messages),[]);assert.equal(c.continuityPrompt({draft:secret},context,now).text,'');
});
