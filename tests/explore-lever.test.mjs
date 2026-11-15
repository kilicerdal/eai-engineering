import test from 'node:test';
import assert from 'node:assert/strict';
import {loadStudyModule} from './load-study-module.mjs';
const lever=loadStudyModule('explore-lever');
const {defaultLever,calculateLever,parseLeverSettings,parseLeverProposal,parseExploreAnswer,describeLever,challengeLever,checkLeverChallenge,LEVER_MODEL_VERSION}=lever;
const {emptyExplore,parseExploreData,createExploreStore,EXPLORE_STORAGE_KEY}=loadStudyModule('explore-storage');
const close=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-8,`${actual} != ${expected}`);
function response(proposal=null){return {explanation:'The longer effort arm reduces the force required for balance.',experiment:'Keep the load fixed and move the effort point farther from the pivot.',proposal,sources:['ideal-lever-model']}}
function storage(raw=null){let value=raw;const keys=[];return {getItem:k=>{keys.push(k);return value},setItem:(k,v)=>{keys.push(k);value=v},value:()=>value,keys}}
test('default example independently balances torque and trades force for travel',()=>{
 const m=calculateLever(defaultLever);close(m.loadArm,1);close(m.effortArm,2);close(m.weight,98.1);close(m.effortForce,49.05);close(m.mechanicalAdvantage,2);close(m.effortTravel,.2);close(m.outputWork,9.81);close(m.inputWork,9.81);
});
test('equal and shorter effort arms demonstrate force ratios on both sides of one',()=>{
 const equal=calculateLever({mass:10,pivot:2,loadPosition:.5,effortPosition:3.5});close(equal.effortForce,98.1);close(equal.mechanicalAdvantage,1);
 const short=calculateLever({mass:10,pivot:3,loadPosition:.5,effortPosition:3.5});close(short.effortForce,490.5);close(short.mechanicalAdvantage,.2);
});
test('supported extreme setups preserve energy and a geometrically possible lift',()=>{
 for(const mass of [1,50])for(const pivot of [1,2,3])for(const loadPosition of [.2,.5,.8])for(const effortPosition of [3.2,3.5,4]){const m=calculateLever({mass,pivot,loadPosition,effortPosition});assert.ok(m.loadArm>0&&m.effortArm>0);assert.ok(m.loadLift<m.loadArm);close(m.inputWork,m.outputWork);close(m.effortForce*m.effortArm,m.weight*m.loadArm);const angle=Math.asin(m.loadLift/m.loadArm);close(m.effortArm*Math.sin(angle),m.effortTravel);}
});
test('changing mass and changing leverage have distinguishable independent effects',()=>{
 const base=calculateLever(defaultLever),heavy=calculateLever({...defaultLever,mass:20});close(heavy.effortForce,base.effortForce*2);close(heavy.mechanicalAdvantage,base.mechanicalAdvantage);close(heavy.effortTravel,base.effortTravel);
 const before=calculateLever(challengeLever),after=calculateLever({...challengeLever,effortPosition:3.9});close(after.effortForce,before.effortForce/2);close(after.effortTravel,before.effortTravel*2);
});
test('invalid, nonfinite and unsupported increments never enter the physics model',()=>{
 for(const value of [{...defaultLever,mass:0},{...defaultLever,mass:51},{...defaultLever,mass:1.5},{...defaultLever,pivot:NaN},{...defaultLever,pivot:Infinity},{...defaultLever,loadPosition:'0.5'},{...defaultLever,effortPosition:3.25},null,{}])assert.throws(()=>parseLeverSettings(value));
 assert.deepEqual(parseLeverSettings({...defaultLever,pivot:1.50000000000001}),defaultLever);
});
test('proposals allow only legal control values, reject prototype keys and remove no-ops',()=>{
 assert.deepEqual(parseLeverProposal({mass:20},defaultLever),{mass:20});assert.equal(parseLeverProposal({mass:10},defaultLever),null);
 for(const p of [{mass:500},{effortPosition:3.25},{temperature:3},{toString:4},JSON.parse('{"__proto__":1}'),{},'move it'])assert.throws(()=>parseLeverProposal(p,defaultLever));
});
test('AI reply validation rejects unsupported citations and invalid control changes',()=>{
 assert.deepEqual(parseExploreAnswer(response({mass:20}),defaultLever),response({mass:20}));
 for(const r of [{...response(),sources:['made-up']},{...response(),sources:[]},{...response(),proposal:{pivot:100}},{...response(),explanation:''},{...response(),experiment:''},'not-json'])assert.throws(()=>parseExploreAnswer(r,defaultLever));
});
test('challenge verifies the actual force and fixed constraints rather than a button press',()=>{
 assert.equal(checkLeverChallenge(challengeLever).correct,false);assert.equal(checkLeverChallenge({...challengeLever,effortPosition:3.9}).correct,true);
 assert.equal(checkLeverChallenge({...challengeLever,mass:5}).correct,false);assert.equal(checkLeverChallenge({...challengeLever,pivot:2.6,effortPosition:3.9}).correct,false);
});
test('authored explanation keeps mass, force, work and model limits distinct',()=>{
 const simple=describeLever(defaultLever,'simple');assert.match(simple.explanation,/10 kg load needs 49.05 N/);assert.match(simple.tradeoff,/No energy is created/);assert.equal(simple.detail,'');
 const deeper=describeLever(defaultLever,'deeper');assert.match(deeper.detail,/Torque balance/);assert.match(deeper.detail,/not a time-dependent motion simulation/);
 const compared=describeLever({...defaultLever,mass:20},'simple',defaultLever);assert.match(compared.comparison,/100% higher/);assert.match(compared.comparison,/does not isolate a single cause/);
});
test('saved explorations roundtrip with notes, comparison, depth and verified challenge solution',()=>{
 const data=emptyExplore();data.current={...challengeLever,effortPosition:3.9};data.baseline=defaultLever;data.level='deeper';data.notes='The effort travels farther.';data.challenge={prediction:'half',solution:data.current};data.saved=[{id:'one',title:'A useful lever',createdAt:'2026-11-14T22:00:00Z',modelVersion:LEVER_MODEL_VERSION,settings:data.current,notes:data.notes}];assert.deepEqual(parseExploreData(JSON.stringify(data)),data);
});
test('unsupported versions, damaged notes and false challenge solutions preserve storage',()=>{
 for(const data of [{...emptyExplore(),version:2},{...emptyExplore(),notes:'x'.repeat(3001)},{...emptyExplore(),challenge:{prediction:'half',solution:defaultLever}},{...emptyExplore(),saved:[{id:'bad'}]}])assert.throws(()=>parseExploreData(JSON.stringify(data)));
 const s=storage('bad-json');const store=createExploreStore(()=>s,()=>()=>{});store.subscribe(()=>{});store.update(old=>({...old,notes:'Keep in memory'}));assert.equal(s.value(),'bad-json');assert.match(store.getSnapshot().error,/untouched/);assert.equal(store.getSnapshot().data.notes,'Keep in memory');
});
test('resume and writes use only the new exploration key and protect concurrent changes',()=>{
 const data=emptyExplore();data.current={...defaultLever,mass:20};const s=storage(JSON.stringify(data));let changed;const store=createExploreStore(()=>s,cb=>{changed=cb;return()=>{}});store.subscribe(()=>{});assert.equal(store.getSnapshot().data.current.mass,20);store.update(old=>({...old,notes:'Saved'}));assert.equal(parseExploreData(s.value()).notes,'Saved');const before=s.value();changed(EXPLORE_STORAGE_KEY,'other tab');store.update(old=>({...old,notes:'Unsaved here'}));assert.equal(s.value(),before);assert.equal(store.getSnapshot().data.notes,'Unsaved here');assert.match(store.getSnapshot().error,/Another tab/);assert.ok(s.keys.every(k=>k===EXPLORE_STORAGE_KEY));
});
test('storage quota failure keeps the changed setup available for export',()=>{
 const store=createExploreStore(()=>({getItem:()=>null,setItem:()=>{throw new Error('quota')}}),()=>()=>{});store.subscribe(()=>{});store.update(old=>({...old,current:{...defaultLever,mass:15}}));assert.equal(store.getSnapshot().data.current.mass,15);assert.equal(store.getSnapshot().saved,false);assert.match(store.getSnapshot().error,/could not save/);
});
