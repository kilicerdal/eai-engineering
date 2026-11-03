import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import * as c from '../src/lib/study-checkpoints.ts';
import {mistakePracticeContext,mistakePracticeEvidence} from '../src/lib/study-mistake-practice.ts';
const require=createRequire(import.meta.url),ts=require('typescript');
const lesson={id:'lesson-1',title:'Balance equations',objective:'Isolate the variable.',activity:'Work through a new equation.',checkpoint:'Explain the same operation on both sides.',sourceIds:[]};
const context={goal:'Understand linear algebra foundations',lesson},now=1700000000000;
const record={id:'check-1',context,question:{question:'Solve 3x + 4 = 19. Show each step.',criterion:'Equivalent operations and arithmetic'},answer:'Subtract 4 gives 3x=15; divide by 3 gives x=5.',helpUsed:false,result:{decision:'meets',feedback:'Both operations preserve equality.',reasoningGap:'None identified in this attempt.',nextStep:'Try a fresh equation.'},submittedAt:now};
test('lesson identity changes when goal or substantive lesson content changes',()=>{assert.notEqual(c.lessonIdentity(context),c.lessonIdentity({...context,goal:'Another goal'}));assert.notEqual(c.lessonIdentity(context),c.lessonIdentity({...context,lesson:{...lesson,objective:'A different objective'}}));assert.equal(c.normalizeLessonContext(null),null);assert.equal(c.normalizeLessonContext({...context,lesson:{...lesson,title:''}}),null);});
test('AI-reviewed labels keep help and uncertainty separate from independent success',()=>{assert.equal(c.checkLabel(record),'Answered independently');assert.equal(c.checkLabel({...record,helpUsed:true}),'Completed with help');assert.equal(c.checkLabel({...record,result:{...record.result,decision:'partial'}}),'Needs practice');assert.equal(c.checkLabel({...record,result:{...record.result,decision:'uncertain'}}),'Needs verification');});
test('partial or corrupt AI feedback never normalizes into a success record',()=>{assert.throws(()=>c.validateCheckFeedback({decision:'meets'}));assert.throws(()=>c.validateCheckQuestion({question:'test'}));assert.deepEqual(c.normalizeLessonChecks([{...record,result:{decision:'perfect'}},{...record,answer:''}]),[]);assert.equal(c.normalizeLessonChecks([record,record]).length,1);});
test('latest result supersedes earlier success, ignoring future and different lesson evidence',()=>{const recent={...record,id:'new',result:{...record.result,decision:'needs_work'},submittedAt:now+1};const future={...record,id:'future',submittedAt:now+100};assert.equal(c.latestLessonCheck(context,[record,recent,future],now+2).id,'new');assert.equal(c.latestLessonCheck({...context,lesson:{...lesson,activity:'Changed activity'}},[record],now),null);});
test('revisit recommendation uses evidence even for self-marked completed lessons',()=>{const second={...lesson,id:'lesson-2',title:'Another lesson'};const wrong={...record,result:{...record.result,decision:'needs_work'}};assert.equal(c.recommendLesson(context.goal,[lesson,second],['lesson-1'],[wrong],now).id,'lesson-1');assert.equal(c.recommendLesson(context.goal,[lesson,second],['lesson-1'],[record],now).id,'lesson-2');assert.match(c.checkMemory(wrong),/not proof of mastery/);assert.match(c.checkMemory(wrong),/My answer:/);});
const source=readFileSync(new URL('../src/app/api/study/checkpoint/route.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
function route(provider,guard=null){const m={exports:{}};new Function('require','module','exports','process','fetch',compiled)(name=>{if(name==='next/server')return {NextResponse:Response};if(name==='@/lib/ai-security')return {protectAIRequest:async()=>guard,logAIRequest:()=>{}};if(name==='@/lib/study-checkpoints')return c;throw new Error(name);},m,m.exports,{env:{CLOUDFLARE_ACCOUNT_ID:'test-account',CLOUDFLARE_API_TOKEN:'not-a-real-token'}},provider);return m.exports.POST;}
const req=(body)=>new Request('https://unit.test/api/study/checkpoint',{method:'POST',body:JSON.stringify(body)});
const upstream=(content)=>Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(content)}}]});
test('endpoint uses guarded validated JSON and does not invent a successful assessment on malformed output',async()=>{let calls=0;const handler=route(async()=>{calls++;return upstream({decision:'meets'});});assert.equal((await handler(req({action:'review',context,question:record.question,answer:record.answer}))).status,502);assert.equal(calls,1);assert.equal((await handler(req({action:'review',context,question:record.question,answer:''}))).status,400);assert.equal(calls,1);});
test('rate-limited and oversized requests never call the provider',async()=>{const handler=route(async()=>assert.fail('unexpected provider call'),Response.json({error:'limit'},{status:429}));assert.equal((await handler(req({action:'question',context}))).status,429);assert.equal((await handler(req({large:'x'.repeat(25000)}))).status,413);});
test('question, hint and review each return validated distinct payloads',async()=>{assert.deepEqual(await (await route(async()=>upstream(record.question))(req({action:'question',context}))).json(),{question:record.question});assert.deepEqual(await (await route(async()=>upstream({hint:'Undo the added constant on both sides.'}))(req({action:'hint',context,question:record.question}))).json(),{hint:'Undo the added constant on both sides.'});assert.deepEqual(await (await route(async()=>upstream({...record.result,canVerify:true}))(req({action:'review',context,question:record.question,answer:record.answer}))).json(),{result:record.result});});

test('insufficient source context cannot be saved as a failed or successful answer',async()=>{const response=await route(async()=>upstream({...record.result,canVerify:false,decision:'needs_work'}))(req({action:'review',context,question:record.question,answer:record.answer}));const data=await response.json();assert.equal(response.status,200);assert.equal(data.result.decision,'uncertain');assert.match(data.result.feedback,/not evidence that your answer is incorrect/);});

 test('notebook context uses the guarded checkpoint route with original reasoning and fresh-question instructions',async()=>{
 const mistake={id:'notebook-original',exam:'SAT',question:'Explain how to isolate a variable in an equation.',answer:'I got x=23.',expected:'',reflection:'Check inverse operations.'};
 const notebookContext=mistakePracticeContext(mistake);let sent;
 const handler=route(async(_url,options)=>{sent=JSON.parse(options.body);return upstream(record.question);});
 const response=await handler(req({action:'question',context:notebookContext,recentWork:mistakePracticeEvidence(mistake)}));
 assert.equal(response.status,200);
 const content=JSON.parse(sent.messages[1].content);assert.equal(content.context.lesson.id,mistake.id);assert.match(content.recentWork,/x=23/);assert.match(content.context.lesson.activity,/changed values or context/);assert.match(sent.messages[0].content,/Do not include the answer/);
});

test('checkpoint instructions separate currency from math and assess the actual problem',()=>{
 assert.match(c.checkpointSystem,/never use a dollar sign as a currency symbol/);
 assert.match(c.checkpointSystem,/question and its criterion agree/);
 assert.match(c.checkpointSystem,/actual problem, not a mistaken criterion/);
});

test('reviewed notebook linear practice bypasses generation, preserves guards, and does not reveal a solution',async()=>{
 const context=mistakePracticeContext({id:'linear',exam:'SAT',question:'Solve 3x + 4 = 19.'});
 const handler=route(async()=>assert.fail('reviewed question should not call model generation'));
 const response=await handler(req({action:'question',context}));assert.equal(response.status,200);const {question}=await response.json();
 assert.match(question.question,/Solve/);assert.doesNotMatch(question.question,/x\s*=\s*\d+\s*\)/);
 assert.notEqual(question.question,context.goal);
 const blocked=route(async()=>assert.fail('rate limited'),Response.json({error:'limit'},{status:429}));
 assert.equal((await blocked(req({action:'question',context}))).status,429);
});
