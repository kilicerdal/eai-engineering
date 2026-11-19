import test from 'node:test';
import assert from 'node:assert/strict';
import {loadStudyModule} from './load-study-module.mjs';
const {restoreShortProgress,boundaryResult}=loadStudyModule('short-experiences');
test('resume rejects damaged, incompatible and unbounded records',()=>{
 const valid={version:1,caseId:'testing',step:1,prediction:'100',fault:false,probe:100,updatedAt:100};
 assert.deepEqual(restoreShortProgress(JSON.stringify(valid)),valid);
 for(const change of [{version:2},{caseId:'other'},{step:99},{prediction:'x'.repeat(9999)},{probe:0},{updatedAt:null},{fault:'false'}])assert.equal(restoreShortProgress(JSON.stringify({...valid,...change})),null);
 for(const raw of [null,'bad','[]','null'])assert.equal(restoreShortProgress(raw),null);
});
test('the comparison exposes the defect at 100 and agrees on each side',()=>{
 assert.equal(boundaryResult(99,false),false);assert.equal(boundaryResult(99,true),false);
 assert.equal(boundaryResult(100,false),true);assert.equal(boundaryResult(100,true),false);
 assert.equal(boundaryResult(101,false),true);assert.equal(boundaryResult(101,true),true);
});
