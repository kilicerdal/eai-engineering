import test from 'node:test';
import assert from 'node:assert/strict';
import {readSavedArray,writeStudyCopy} from '../src/lib/study-safe-storage.ts';
import {readMaterialLibrary,makeTextDocument} from '../src/lib/study-materials.ts';
const normalize=value=>Array.isArray(value)?value.filter(x=>typeof x==='number'):[];
function store(raw=null){return {raw,writes:0,getItem(){return this.raw;},setItem(key,value){this.writes++;this.raw=value;}};}
test('missing copies can be initialized, existing valid copies are read without writes',()=>{
 const s=store();assert.deepEqual(readSavedArray(s,'k',normalize),{items:[],raw:null});assert.equal(s.writes,0);
 const raw=writeStudyCopy(s,'k',null,[1,2]);assert.deepEqual(readSavedArray(s,'k',normalize).items,[1,2]);assert.equal(raw,'[1,2]');
});
test('corrupt JSON, non-arrays and partially invalid histories preserve exact original bytes',()=>{
 for(const raw of ['{broken','null','{}','[1,"lost"]']){const s=store(raw);assert.throws(()=>readSavedArray(s,'k',normalize));assert.equal(s.raw,raw);assert.equal(s.writes,0);}
});
test('a stale tab cannot overwrite a newer save, cloud replacement or deletion',()=>{
 for(const newer of ['[2]',null]){const s=store('[1]'),old=readSavedArray(s,'k',normalize);s.raw=newer;assert.throws(()=>writeStudyCopy(s,'k',old.raw,[3]),/Another tab/);assert.equal(s.raw,newer);assert.equal(s.writes,0);}
});
test('quota errors leave the old record unchanged and never report a successful save',()=>{
 const s=store('[1]');s.setItem=()=>{throw new Error('QuotaExceededError');};assert.throws(()=>writeStudyCopy(s,'k','[1]',[2]),/Quota/);assert.equal(s.raw,'[1]');
});
test('library reads reject damaged and duplicate material records instead of dropping evidence',()=>{
 const doc=makeTextDocument('Synthetic notes','A triangle has three sides.','synthetic-doc',1700000000000),valid={documents:[doc],entries:[]};
 assert.equal(readMaterialLibrary(valid).documents.length,1);assert.deepEqual(readMaterialLibrary(undefined),{documents:[],entries:[]});
 for(const value of [null,{},[],{...valid,documents:[doc,doc]},{documents:[{id:'bad'}],entries:[]},{...valid,entries:[{id:'orphaned'}]}]){const before=structuredClone(value);assert.throws(()=>readMaterialLibrary(value));assert.deepEqual(value,before);}
});

test('save notifications distinguish successful writes from failures',()=>{
 const original=globalThis.window,events=[];
 globalThis.window={dispatchEvent:event=>events.push(event.detail)};
 try{const s=store('[1]');writeStudyCopy(s,'k','[1]',[2]);assert.deepEqual(events.pop(),{key:'k',ok:true});
 assert.throws(()=>writeStudyCopy(s,'k','[1]',[3]));assert.deepEqual(events.pop(),{key:'k',ok:false});assert.equal(s.raw,'[2]');
 }finally{if(original===undefined)delete globalThis.window;else globalThis.window=original;}
});
