import test from 'node:test';
import assert from 'node:assert/strict';
import {loadStudyModule} from './load-study-module.mjs';
const {engineeringReference,sequentialSaveExample}=loadStudyModule('eai-engineering-reference');
const saveItems=new Function(`${sequentialSaveExample}; return saveItems;`)();
test('sequential reference waits for every operation before starting the next',async()=>{
 const events=[];await saveItems([1,2],async i=>{events.push(`start${i}`);await new Promise(r=>setTimeout(r,5));events.push(`end${i}`);});assert.deepEqual(events,['start1','end1','start2','end2']);
});
test('rejection stops the sequence and propagates the original error',async()=>{
 const seen=[],failure=new Error('save failed');await assert.rejects(()=>saveItems([1,2,3],async i=>{seen.push(i);if(i===2)throw failure;}),e=>e===failure);assert.deepEqual(seen,[1,2]);
});
test('reference is narrowly scoped and does not replace concurrent or unrelated answers',()=>{
 assert.equal(engineeringReference('Show concurrent async forEach alternatives'),null);
 assert.equal(engineeringReference('Write a sequential database migration'),null);
 assert.match(engineeringReference('Fix await items.forEach(async item => save(item)) sequentially'),/for…of/);
});

test('fetch reference separates request, HTTP, JSON and success outcomes',async()=>{
 const {fetchJSONExample}=loadStudyModule('eai-engineering-reference');
 const fetchJSON=new Function(`${fetchJSONExample}; return fetchJSON;`)();
 let parsed=false;
 assert.deepEqual(await fetchJSON('/',async()=>({ok:false,status:500,json(){parsed=true;}})),{ok:false,kind:'http',status:500});assert.equal(parsed,false);
 const error=new Error('offline');assert.deepEqual(await fetchJSON('/',async()=>{throw error;}),{ok:false,kind:'request',error});
 assert.deepEqual(await fetchJSON('/',async()=>({ok:true,json(){throw error;}})),{ok:false,kind:'json',error});
 assert.deepEqual(await fetchJSON('/',async()=>({ok:true,json:async()=>42})),{ok:true,data:42});
});
