import test from 'node:test';
import assert from 'node:assert/strict';
import {loadStudyModule} from './load-study-module.mjs';
const {createWritingRegistry}=loadStudyModule('writing-registry');
test('a writer reporting before guard initialization remains visible to a later reader',()=>{const registry=createWritingRegistry();registry.update('early-writer',true,false);assert.equal(registry.hasPending(),true);registry.update('early-writer',false,false);assert.equal(registry.hasPending(),false);});
test('clean or unmounted writers cannot mask another writer with pending work or storage failure',()=>{const registry=createWritingRegistry();registry.update('draft',true,false);registry.update('failed-save',false,true);registry.clear('draft');assert.equal(registry.hasPending(),true);registry.update('unrelated',false,false);assert.equal(registry.hasPending(),true);registry.clear('failed-save');assert.equal(registry.hasPending(),false);});
