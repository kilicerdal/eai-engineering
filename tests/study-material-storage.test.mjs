import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import * as materials from '../src/lib/study-materials.ts';
const ts=createRequire(import.meta.url)('typescript');
function loadStorage(){
 const code=ts.transpileModule(readFileSync(new URL('../src/lib/study-material-files.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const m={exports:{}};new Function('require','module','exports',code)(name=>{assert.equal(name,'./study-materials');return materials;},m,m.exports);return m.exports;
}
function database(initial){
 const state={value:initial,writes:0,fail:false};
 const db={close(){},transaction(){
  const tx={error:null,abort(){queueMicrotask(()=>tx.onabort?.());},objectStore(){return {
   get(){const request={};queueMicrotask(()=>{request.result=structuredClone(state.value);request.onsuccess?.();});return request;},
   put(value){queueMicrotask(()=>{if(state.fail){tx.error=new Error('QuotaExceededError');tx.onabort?.();return;}state.value=structuredClone(value);state.writes++;tx.oncomplete?.();});}
  };}};return tx;
 }};
 return {state,api:{open(){const request={result:db};queueMicrotask(()=>request.onsuccess?.());return request;}}};
}
test('material writes compare against the saved library inside the write transaction',async()=>{
 const doc=materials.makeTextDocument('Test notes','A triangle has three sides.','synthetic-doc',1700000000000),empty={documents:[],entries:[]},one={documents:[doc],entries:[]};
 const fake=database(undefined),prior=globalThis.indexedDB,windowPrior=globalThis.window;globalThis.indexedDB=fake.api;globalThis.window={dispatchEvent(){}};
 try{
  const api=loadStorage();assert.deepEqual(await api.loadMaterialLibrary(),empty);assert.equal(fake.state.writes,0);
  await api.saveMaterialLibrary(one,empty);assert.equal(fake.state.writes,1);
  await assert.rejects(api.saveMaterialLibrary(empty,empty),/Another tab/);assert.deepEqual(fake.state.value,one);assert.equal(fake.state.writes,1);
  fake.state.fail=true;await assert.rejects(api.saveMaterialLibrary(empty,one),/Quota/);assert.deepEqual(fake.state.value,one);
  fake.state.fail=false;fake.state.value={documents:[{id:'damaged'}],entries:[]};const damaged=structuredClone(fake.state.value);
  await assert.rejects(api.loadMaterialLibrary(),/preserved/);await assert.rejects(api.saveMaterialLibrary(empty,empty),/Another tab/);assert.deepEqual(fake.state.value,damaged);
 }finally{if(prior===undefined)delete globalThis.indexedDB;else globalThis.indexedDB=prior;if(windowPrior===undefined)delete globalThis.window;else globalThis.window=windowPrior;}
});
