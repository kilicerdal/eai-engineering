import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import * as goals from '../src/lib/study-goal.ts';
import * as materials from '../src/lib/study-materials.ts';
const settings={goal:'Understand the causes of the French Revolution',level:'college',minutes:25,sessions:3,deadline:''};
const plan={title:'Understand the French Revolution',overview:'An initial path through causes and consequences.',lessons:Array.from({length:3},(_,i)=>({title:`Topic ${i+1}`,objective:'Understand a historical cause.',activity:'Compare two historical interpretations.',checkpoint:'Explain how the evidence supports your interpretation.',sourceIds:[]}))};
const source={documentId:'notes',name:'Course notes',kind:'text',page:1,text:'The course compares political and economic causes of the French Revolution.'};
test('goals support open subjects while rejecting invalid settings and inherited keys',()=>{
 assert.deepEqual(goals.validateGoalSettings(settings),settings);
 for(const patch of [{goal:'short'},{level:'constructor'},{level:'__proto__'},{minutes:0},{minutes:121},{sessions:8},{deadline:'2026-02-30'},{deadline:'soon'}])assert.throws(()=>goals.validateGoalSettings({...settings,...patch}));
 assert.equal(goals.validateGoalSettings({...settings,deadline:'2027-01-15'}).deadline,'2027-01-15');
});
test('plans require complete topic-specific lesson fields and only supplied material IDs',()=>{
 assert.equal(goals.validateGoalPlan(plan).lessons[0].id,'lesson-1');
 assert.throws(()=>goals.validateGoalPlan({...plan,lessons:plan.lessons.slice(0,2)}));
 assert.throws(()=>goals.validateGoalPlan({...plan,lessons:plan.lessons.map(l=>({...l,checkpoint:''}))}));
 const referenced={...plan,lessons:plan.lessons.map(l=>({...l,sourceIds:['S1']}))};
 assert.throws(()=>goals.validateGoalPlan(referenced));
 assert.equal(goals.validateGoalPlan(referenced,[{sourceId:'S1'}]).lessons[0].sourceIds[0],'S1');
});
test('harmless wrappers and omitted optional references normalize without inventing evidence',()=>{
 assert.equal(goals.validateGoalPlan({plan}).lessons.length,3);
 const noReferences={...plan,lessons:plan.lessons.map(({sourceIds,...lesson})=>lesson)};
 assert.deepEqual(goals.validateGoalPlan(noReferences).lessons[0].sourceIds,[]);
 assert.throws(()=>goals.validateGoalPlan({...plan,lessons:plan.lessons.map(l=>({...l,sourceIds:null}))}));
});
test('reordered lessons retain identity and progress discards unknown or duplicated entries',()=>{
 const parsed=goals.validateGoalPlan(plan);const reordered={...parsed,lessons:[parsed.lessons[2],parsed.lessons[0],parsed.lessons[1]]};
 assert.equal(goals.validateGoalPlan(reordered).lessons[0].id,'lesson-3');
 assert.deepEqual(goals.normalizeGoalProgress(['lesson-3','invalid','lesson-3'],parsed),['lesson-3']);
 assert.throws(()=>goals.validateGoalPlan({...parsed,lessons:[parsed.lessons[0],parsed.lessons[0],parsed.lessons[1]]}));
});
test('lesson handoff preserves goal, time, and checkpoint without claiming file access',()=>{
 const prompt=goals.goalLessonPrompt(settings,goals.validateGoalPlan(plan).lessons[0]);
 assert.match(prompt,/French Revolution/);assert.match(prompt,/25 minutes/);assert.match(prompt,/one short question/);assert.match(prompt,/Do not claim to have read/);assert.ok(prompt.length<=3000);
 assert.match(goals.goalPlannerSystem,/never guarantee/i);assert.match(goals.goalPlannerSystem,/untrusted/);assert.match(goals.goalPlannerSystem,/ONE individual/);assert.match(goals.goalPlannerSystem,/not been supplied/);
});
const require=createRequire(import.meta.url);const ts=require('typescript');
function loadRoute(protect=async()=>null){
 const code=ts.transpileModule(readFileSync(new URL('../src/app/api/study/plan/route.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const module={exports:{}};const deps={'next/server':{NextResponse:{json:Response.json}},'@/lib/ai-security':{protectAIRequest:protect,logAIRequest(){}},'@/lib/study-goal':goals,'@/lib/study-materials':materials};
 new Function('require','module','exports',code)(name=>{assert.ok(name in deps);return deps[name];},module,module.exports);return module.exports.POST;
}
const req=body=>new Request('https://example.test/api/study/plan',{method:'POST',body:typeof body==='string'?body:JSON.stringify(body)});
const answer=value=>Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(value)}}]});
async function withProvider(mock,run){const previous=globalThis.fetch,id=process.env.CLOUDFLARE_ACCOUNT_ID,token=process.env.CLOUDFLARE_API_TOKEN;process.env.CLOUDFLARE_ACCOUNT_ID='synthetic';process.env.CLOUDFLARE_API_TOKEN='synthetic';globalThis.fetch=mock;try{await run();}finally{globalThis.fetch=previous;if(id===undefined)delete process.env.CLOUDFLARE_ACCOUNT_ID;else process.env.CLOUDFLARE_ACCOUNT_ID=id;if(token===undefined)delete process.env.CLOUDFLARE_API_TOKEN;else process.env.CLOUDFLARE_API_TOKEN=token;}}
test('real route generates bounded JSON plans with app-assigned source references',async()=>{
 await withProvider(async(url,options)=>{const body=JSON.parse(options.body);assert.equal(body.model,'@cf/openai/gpt-oss-120b');assert.equal(body.response_format.type,'json_object');const input=JSON.parse(body.messages[1].content);assert.equal(input.settings.goal,settings.goal);assert.equal(input.excerpts[0].sourceId,'S1');return answer({...plan,lessons:plan.lessons.map(l=>({...l,sourceIds:['S1']}))});},async()=>{const response=await loadRoute()(req({...settings,excerpts:[source]}));assert.equal(response.status,200);assert.equal(response.headers.get('Cache-Control'),'no-store');const data=await response.json();assert.equal(data.sources[0].page,1);assert.equal(data.plan.lessons.length,3);});
});
test('real route blocks protected, malformed, oversized, and invalid-source requests before inference',async()=>{
 await withProvider(async()=>{throw new Error('Must not call provider');},async()=>{
  assert.equal((await loadRoute(async()=>Response.json({error:'blocked'},{status:503}))(req(settings))).status,503);
  assert.equal((await loadRoute()(req('bad json'))).status,400);
  assert.equal((await loadRoute()(req('x'.repeat(64001)))).status,413);
  assert.equal((await loadRoute()(req({...settings,minutes:-1}))).status,400);
  assert.equal((await loadRoute()(req({...settings,excerpts:[{...source,page:0}]}))).status,400);
 });
});
test('format repair is bounded and cannot admit invented source IDs',async()=>{
 let calls=0;await withProvider(async()=>{calls++;return answer(calls===1?{title:'incomplete'}:plan);},async()=>{assert.equal((await loadRoute()(req(settings))).status,200);assert.equal(calls,2);});
 calls=0;await withProvider(async()=>{calls++;return answer({...plan,lessons:plan.lessons.map(l=>({...l,sourceIds:['S99']}))});},async()=>{assert.equal((await loadRoute()(req(settings))).status,502);assert.equal(calls,2);});
});
test('provider rate limits and failures return safe errors without retry loops',async()=>{
 let calls=0;await withProvider(async()=>{calls++;return new Response('private-provider-message',{status:429,headers:{'Retry-After':'30'}});},async()=>{const response=await loadRoute()(req(settings));assert.equal(response.status,429);assert.equal(response.headers.get('Retry-After'),'30');assert.doesNotMatch(await response.text(),/private-provider/);assert.equal(calls,1);});
 await withProvider(async()=>Response.json({choices:[{finish_reason:'length',message:{content:'{}'}}]}),async()=>assert.equal((await loadRoute()(req(settings))).status,502));
});

test('new lesson proposals must support an individual learner without losing legacy plans',()=>{
 for(const activity of ['Discuss the causes in pairs.','Complete the provided worksheet.','Analyze the simplified graph.']){
  const proposed={...plan,lessons:plan.lessons.map(l=>({...l,activity}))};
  const legacy=goals.validateGoalPlan(proposed);assert.equal(legacy.lessons.length,3);
  assert.throws(()=>goals.validateIndependentPlan(legacy));
 }
 for(const activity of ['Ask the tutor to create an illustrative table, then compare the entries.','Read a short passage: A small community voted to share its tools. Explain the decision.','Explain an idea to your tutor, then answer a new question.'])assert.equal(goals.validateIndependentPlan(goals.validateGoalPlan({...plan,lessons:plan.lessons.map(l=>({...l,activity}))})).lessons.length,3);
 const linked=goals.validateGoalPlan({...plan,lessons:plan.lessons.map(l=>({...l,activity:'Read the passage and identify its main idea.',sourceIds:['S1']}))},[{sourceId:'S1'}]);assert.equal(goals.validateIndependentPlan(linked).lessons.length,3);
});
test('real route repairs classroom activities once and fails closed if unsuitable content persists',async()=>{
 const bad={...plan,lessons:plan.lessons.map(l=>({...l,activity:'Discuss this topic in small groups.'}))};
 let calls=0;await withProvider(async(url,options)=>{calls++;if(calls===2)assert.match(JSON.parse(options.body).messages.at(-1).content,/ONE individual learner/);return answer(calls===1?bad:plan);},async()=>{assert.equal((await loadRoute()(req(settings))).status,200);assert.equal(calls,2);});
 calls=0;await withProvider(async()=>{calls++;return answer(bad);},async()=>{assert.equal((await loadRoute()(req(settings))).status,502);assert.equal(calls,2);});
});
