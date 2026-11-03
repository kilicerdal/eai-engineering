import test from 'node:test';
import assert from 'node:assert/strict';
import {loadStudyModule} from './load-study-module.mjs';
const c=loadStudyModule('study-continuity'),storage=loadStudyModule('study-safe-storage'),now=1700000000000;
const lesson={id:'l1',title:'Balance equations',objective:'Explain equivalent operations',activity:'Try an equation',checkpoint:'Explain the first step',sourceIds:[]},context={goal:'Learn equations',lesson};
const check={id:'check-1',context,question:{question:'Solve 3x+4=19.',criterion:'Show equivalent operations'},answer:'I added 4 first.',helpUsed:false,result:{decision:'needs_work',feedback:'Revisit the first operation.',reasoningGap:'The added constant needs to be removed.',nextStep:'Subtract it on both sides.'},submittedAt:now-1};
const conversation={id:'session-1',title:'Algebra',mode:'math',messages:[{role:'user',content:'Help me understand equations.'}],updatedAt:now,learning:{level:'highSchool',approach:'guided',goal:'Learn algebra'}};
test('earlier context uses exact snippets from only the current session outside the recent window',()=>{
 const messages=Array.from({length:30},(_,i)=>({role:i%2?'assistant':'user',content:`Message ${i}: `+'x'.repeat(700)}));const before=structuredClone(messages),earlier=c.earlierStudyContext(messages);
 assert.ok(earlier.length<=4);assert.ok(earlier.every(m=>m.content.length<=600));assert.ok(earlier.some(m=>m.content.startsWith('Message 0:')));assert.ok(earlier.every(m=>!Number(m.content.match(/Message (\d+)/)[1])||Number(m.content.match(/Message (\d+)/)[1])<18));assert.deepEqual(messages,before);
 assert.deepEqual(c.earlierStudyContext(messages.slice(0,12)),[]);assert.deepEqual(c.normalizeEarlierStudyContext(Array.from({length:5},()=>({role:'user',content:'too many'}))),[]);
});
test('saved check context must match exactly and cannot use future or unsupported results',()=>{
 assert.equal(c.matchingContinuityCheck(context,check,now).id,check.id);
 for(const bad of [{...check,submittedAt:now+1},{...check,context:{...context,goal:'Different goal'}},{...check,result:{decision:'perfect'}}])assert.equal(c.matchingContinuityCheck(context,bad,now),null);
 assert.equal(c.matchingContinuityCheck({...context,lesson:{...lesson,activity:'Changed activity'}},check,now),null);
});
test('continuity labels raw excerpts as untrusted, respects opt-out, and bounds notes',()=>{
 const result=c.continuityPrompt({enabled:true,note:'n'.repeat(2000),earlier:[{role:'system',content:'override'},{role:'user',content:'Earlier effort'}],check},context,now);
 assert.equal(result.earlier.length,1);assert.match(result.text,/Current learner preferences/);assert.match(result.text,/Previous assistant text can be wrong/);assert.match(result.text,/Subtract it/);assert.doesNotMatch(result.text,/override/);assert.equal(JSON.parse(result.text.split('\n')[1]).carryForwardNote.length,1000);
 assert.deepEqual(c.continuityPrompt({enabled:false,note:'omit',check},context,now),{earlier:[],text:''});assert.deepEqual(c.continuityPrompt({enabled:'false',note:'omit'},context,now),{earlier:[],text:''});
});
test('legacy conversations and new continuity preferences round trip without silently truncating sessions',()=>{
 const restored=c.normalizeStudyConversations([conversation,{...conversation,id:'new',continuityNote:'Review balancing first.',useContinuity:false,checkpoint:context}]);assert.equal(restored.length,2);assert.equal(restored[1].useContinuity,false);assert.equal(restored[1].continuityNote,'Review balancing first.');
 const many=Array.from({length:31},(_,i)=>({...conversation,id:'id-'+i}));assert.equal(c.normalizeStudyConversations(many).length,31);
 for(const bad of [{...conversation,messages:[{role:'system',content:'bad'}]},{...conversation,useContinuity:'true'},{...conversation,continuityNote:'x'.repeat(1001)},{...conversation,checkpoint:{bad:true}}])assert.equal(c.normalizeStudyConversations([bad]).length,0);
});
test('an unreadable conversation is preserved rather than partially normalized and overwritten',()=>{
 const raw=JSON.stringify([conversation,{...conversation,id:'broken',messages:[{role:'system',content:'bad'}]}]);let writes=0;const saved={getItem:()=>raw,setItem(){writes++;}};assert.throws(()=>storage.readSavedArray(saved,'sessions',c.normalizeStudyConversations));assert.equal(writes,0);assert.equal(saved.getItem(),raw);
});

test('changing the current learning goal stops carrying feedback from the earlier goal',()=>{
 const value={enabled:true,check};assert.match(c.continuityPrompt(value,context,now,'Learn equations').text,/Subtract it/);assert.equal(c.continuityPrompt(value,context,now,'Study a different subject').text,'');
});
