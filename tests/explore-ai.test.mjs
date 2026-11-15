import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {loadStudyModule} from './load-study-module.mjs';
const {buildExploreContext,explorePrompt,requestExploreAI}=loadStudyModule('explore-ai');
const {defaultLever}=loadStudyModule('explore-lever');
const valid=()=>({question:'Why does the effort arm matter?',settings:defaultLever,level:'simple'});
const answer=()=>({explanation:'The longer effort arm reduces the force needed for balance.',experiment:'Keep the load fixed and move the effort point farther from the pivot.',proposal:{effortPosition:4},sources:['ideal-lever-model']});
test('server computes authoritative values and omits notes, notebook and client calculations',()=>{
 const c=buildExploreContext({...valid(),notes:'PRIVATE-NOTE',saved:[{title:'PRIVATE-SNAPSHOT'}],calculated:{effortForce:999999}});assert.ok(Math.abs(c.calculated.effortForce-49.05)<1e-8);const prompt=explorePrompt(c);assert.doesNotMatch(prompt,/PRIVATE-NOTE|PRIVATE-SNAPSHOT|999999/);assert.match(prompt,/9.81/);assert.match(prompt,/simple/);
});
test('invalid settings and unsupported explanation levels fail before provider work',()=>{
 for(const input of [null,{...valid(),level:'arbitrary'},{...valid(),question:'hi'},{...valid(),question:'x'.repeat(1001)},{...valid(),settings:{...defaultLever,pivot:10}}])assert.throws(()=>buildExploreContext(input));
});
test('provider gets a bounded schema and current state; valid suggestions remain unapplied',async()=>{
 let calls=0;const context=buildExploreContext(valid());const result=await requestExploreAI(context,{accountId:'synthetic',token:'synthetic',fetchImpl:async(url,init)=>{calls++;assert.match(url,/api.cloudflare.com/);const body=JSON.parse(init.body);assert.equal(body.response_format.type,'json_schema');assert.equal(body.max_tokens,1200);assert.ok(init.signal);assert.ok(Math.abs(JSON.parse(body.messages[1].content).calculated.effortForce-49.05)<1e-8);return Response.json({success:true,result:{response:answer()}})}});assert.deepEqual(result,answer());assert.equal(context.settings.effortPosition,3.5);assert.equal(calls,1);
});
test('provider failures, invalid proposals and hallucinated citations do not become a fallback AI answer',async()=>{
 for(const result of [new Response('busy',{status:429}),Response.json({success:false}),Response.json({result:{response:{...answer(),sources:['invented']}}}),Response.json({result:{response:{...answer(),proposal:{mass:500}}}})])await assert.rejects(()=>requestExploreAI(buildExploreContext(valid()),{accountId:'test',token:'test',fetchImpl:async()=>result}));
});
function harness(){const require=createRequire(import.meta.url),ts=require('typescript'),m={exports:{}};let blocked=null,calls=0,guards=0;const source=readFileSync(new URL('../src/app/api/explore/route.ts',import.meta.url),'utf8');const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;new Function('require','module','exports',code)(id=>id==='next/server'?{NextResponse:{json:(body,init)=>Response.json(body,init)}}:id==='@/lib/ai-security'?{protectAIRequest:async()=>{guards++;return blocked},logAIRequest:()=>{}}:id==='@/lib/explore-ai'?{...loadStudyModule('explore-ai'),requestExploreAI:async()=>{calls++;return answer()}}:id==='@/lib/investigation-ai'?loadStudyModule('investigation-ai'):id==='@/lib/explore-lever'?loadStudyModule('explore-lever'):require(id),m,m.exports);return {POST:m.exports.POST,block:value=>blocked=value,counts:()=>({calls,guards})}}
test('real route retains the shared protection and rejects malformed or oversized bodies',async()=>{
 const h=harness();h.block(Response.json({error:'blocked'},{status:403}));const response=await h.POST(new Request('http://localhost/api/explore',{method:'POST',body:JSON.stringify(valid())}));assert.equal(response.status,403);assert.deepEqual(h.counts(),{calls:0,guards:1});const malformed=await h.POST(new Request('http://localhost/api/explore',{method:'POST',body:'bad'}));assert.equal(malformed.status,400);const oversized=await h.POST(new Request('http://localhost/api/explore',{method:'POST',body:'x'.repeat(17000)}));assert.equal(oversized.status,413);
});
test('real route returns server calculations without changing model state or exposing credentials',async()=>{
 const h=harness(),oldId=process.env.CLOUDFLARE_ACCOUNT_ID,oldToken=process.env.CLOUDFLARE_API_TOKEN;
 try{process.env.CLOUDFLARE_ACCOUNT_ID='synthetic-test-account';process.env.CLOUDFLARE_API_TOKEN='synthetic-test-secret';const response=await h.POST(new Request('http://localhost/api/explore',{method:'POST',body:JSON.stringify(valid())}));const body=await response.json();assert.equal(response.status,200);assert.ok(Math.abs(body.calculated.effortForce-49.05)<1e-8);assert.equal(body.settings.effortPosition,3.5);assert.equal(body.answer.proposal.effortPosition,4);assert.equal(response.headers.get('cache-control'),'no-store');assert.doesNotMatch(JSON.stringify(body),/synthetic-test-secret|synthetic-test-account/);
 delete process.env.CLOUDFLARE_ACCOUNT_ID;const missing=await h.POST(new Request('http://localhost/api/explore',{method:'POST',body:JSON.stringify(valid())}));assert.equal(missing.status,503);
 }finally{if(oldId===undefined)delete process.env.CLOUDFLARE_ACCOUNT_ID;else process.env.CLOUDFLARE_ACCOUNT_ID=oldId;if(oldToken===undefined)delete process.env.CLOUDFLARE_API_TOKEN;else process.env.CLOUDFLARE_API_TOKEN=oldToken}
});
