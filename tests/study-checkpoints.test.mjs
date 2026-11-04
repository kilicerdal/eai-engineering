import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {loadStudyModule} from './load-study-module.mjs';
const c=loadStudyModule('study-checkpoints');
import {mistakePracticeContext,mistakePracticeEvidence} from '../src/lib/study-mistake-practice.ts';
const require=createRequire(import.meta.url),ts=require('typescript');
const f=loadStudyModule('study-feedback'),quality=loadStudyModule('study-question-quality');
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
function route(provider,guard=null){const m={exports:{}};new Function('require','module','exports','process','fetch',compiled)(name=>{if(name==='next/server')return {NextResponse:Response};if(name==='@/lib/ai-security')return {protectAIRequest:async()=>guard,logAIRequest:()=>{}};if(name==='@/lib/study-recovery')return loadStudyModule('study-recovery');if(name==='@/lib/study-checkpoints')return c;if(name==='@/lib/study-feedback')return f;if(name==='@/lib/study-question-quality')return quality;throw new Error(name);},m,m.exports,{env:{CLOUDFLARE_ACCOUNT_ID:'test-account',CLOUDFLARE_API_TOKEN:'not-a-real-token'}},provider);return m.exports.POST;}
const req=(body)=>new Request('https://unit.test/api/study/checkpoint',{method:'POST',body:JSON.stringify(body)});
const upstream=(content)=>Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(content)}}]});
test('endpoint uses guarded validated JSON and does not invent a successful assessment on malformed output',async()=>{let calls=0;const handler=route(async()=>{calls++;return upstream({decision:'meets'});});assert.equal((await handler(req({action:'review',context,question:record.question,answer:record.answer}))).status,502);assert.equal(calls,1);assert.equal((await handler(req({action:'review',context,question:record.question,answer:''}))).status,400);assert.equal(calls,1);});
test('rate-limited and oversized requests never call the provider',async()=>{const handler=route(async()=>assert.fail('unexpected provider call'),Response.json({error:'limit'},{status:429}));assert.equal((await handler(req({action:'question',context}))).status,429);assert.equal((await handler(req({large:'x'.repeat(256001)}))).status,413);});
test('question, hint and review each return validated distinct payloads',async()=>{assert.deepEqual(await (await route(async()=>upstream(record.question))(req({action:'question',context}))).json(),{question:record.question});assert.deepEqual(await (await route(async()=>upstream({hint:'Undo the added constant on both sides.'}))(req({action:'hint',context,question:record.question}))).json(),{hint:'Undo the added constant on both sides.'});assert.deepEqual(await (await route(async()=>upstream({...record.result,canVerify:true,answerExcerpt:'Subtract 4 gives 3x=15',guidingQuestion:'Why does subtracting 4 from both sides preserve equality?'}))(req({action:'review',context,question:record.question,answer:record.answer}))).json(),{result:{...record.result,method:"ai",answerExcerpt:"Subtract 4 gives 3x=15",guidingQuestion:"Why does subtracting 4 from both sides preserve equality?"}});});

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

test('drafts restore only for the same lesson version and preserve help flags',()=>{
 const draft={id:'draft-1',identity:c.lessonIdentity(context),question:record.question,answer:'My partial reasoning',hint:'Try isolating the variable.',help:true,hintRequested:true};
 assert.equal(c.readLessonDraft(draft,context).answer,draft.answer);assert.equal(c.readLessonDraft(draft,context).hintRequested,true);
 for(const value of [null,false,0,{...draft,identity:undefined},{...draft,answer:'x'.repeat(2501)},{...draft,help:'false'},{...draft,question:{question:'incomplete'}}])assert.throws(()=>c.readLessonDraft(value,context));
 assert.throws(()=>c.readLessonDraft(draft,{...context,lesson:{...lesson,activity:'A changed activity.'}}),/preserved/);
});

test('short linear answers use substitution only after request guards and never call inference',async()=>{
 const handler=route(async()=>assert.fail('substitution must not call provider'));
 const question={question:'Solve 3x + 4 = 19. Show each step.',criterion:'Show equivalent operations'};
 const wrong=await (await handler(req({action:'review',context,question,answer:'x=8'}))).json();assert.equal(wrong.result.decision,'needs_work');assert.equal(wrong.result.method,'substitution');
 const correct=await (await handler(req({action:'review',context,question,answer:'x=5'}))).json();assert.equal(correct.result.decision,'partial');assert.match(correct.result.reasoningGap,/not shown/);
 const blocked=route(async()=>assert.fail('blocked'),Response.json({error:'limit'},{status:429}));assert.equal((await blocked(req({action:'review',context,question,answer:'x=5'}))).status,429);
});
test('uncertainty replaces all potentially contradictory directions, and quotes cannot invent learner reasoning',async()=>{
 for(const patch of [{canVerify:false},{canVerify:true,answerExcerpt:'I divided first',guidingQuestion:'Why did you divide?'}]){
  const response=await route(async()=>upstream({...record.result,...patch,decision:'needs_work',nextStep:'Fix your incorrect answer.'}))(req({action:'review',context,question:record.question,answer:record.answer}));
  const data=await response.json();assert.equal(data.result.decision,'uncertain');assert.doesNotMatch(data.result.nextStep,/incorrect/);assert.equal(data.result.answerExcerpt,undefined);
 }
});

test('question quality repair is bounded, shares its timeout and does not change review or hint retries',async()=>{
 let calls=0,signal;const previousQuestion='Solve 3x + 4 = 19. Show each step.';
 const handler=route(async(_url,options)=>{calls++;if(signal)assert.equal(options.signal,signal);signal=options.signal;const sent=JSON.parse(options.body);if(calls===2)assert.match(sent.messages.at(-1).content,/different problem/);return upstream(calls===1?{question:previousQuestion,criterion:'Explain your steps.'}:{question:'Solve 4x + 5 = 29. Show each step.',criterion:'Explain equivalent operations.'});});
 const response=await handler(req({action:'question',context,previousQuestion}));assert.equal(response.status,200);assert.equal(calls,2);
 calls=0;const bad=route(async()=>{calls++;return upstream({question:'According to the graph, what is the trend?',criterion:'Read the data.'});});assert.equal((await bad(req({action:'question',context}))).status,502);assert.equal(calls,2);
});

test('source practice sends only the supplied passage and requires valid source markers and review evidence',async()=>{
 const sources=[{sourceId:'S1',documentId:'notes',name:'Circuit notes',kind:'text',page:1,text:'A switch opens or closes a circuit path. Current stops if the path is broken.'}],sourceContext={...context,sources};let calls=0;
 const handler=route(async(_url,options)=>{calls++;const sent=JSON.parse(options.body);assert.match(sent.messages[0].content,/SOURCE-BOUNDED/);assert.equal(JSON.parse(sent.messages[1].content).context.sources[0].text,sources[0].text);return upstream({question:calls===1?'Explain the source. [S9]':'What happens when the switch opens? [S1]',criterion:'Use the supplied source.'});});
 const response=await handler(req({action:'question',context:sourceContext}));assert.equal(response.status,200);assert.equal(calls,2);
 const review=route(async()=>upstream({...record.result,canVerify:true,answerExcerpt:'The path is broken',guidingQuestion:'What does the source say happens then?',sourceEvidence:[{sourceId:'S1',quote:'Current stops if the path is broken.'}]}));
 const reviewed=await (await review(req({action:'review',context:sourceContext,question:{question:'What happens to current? [S1]',criterion:'Use the source'},answer:'The path is broken but current continues.'}))).json();assert.equal(reviewed.result.sourceEvidence[0].sourceId,'S1');
});

test('source review repairs invalid quotation format once without upgrading unverifiable evidence',async()=>{
 const sources=[{sourceId:'S1',documentId:'notes',name:'Circuit notes',kind:'text',page:1,text:'A switch opens or closes a circuit path. Current stops if the path is broken.'}],sourceContext={...context,sources};let calls=0;
 const handler=route(async()=>{calls++;return upstream({...record.result,canVerify:true,answerExcerpt:'The path is broken',guidingQuestion:'What does the source say happens next?',sourceEvidence:calls===1?undefined:[{sourceId:'S1',quote:'Current stops if the path is broken.'}]});});
 const data=await (await handler(req({action:'review',context:sourceContext,question:{question:'What happens to current? [S1]',criterion:'Use source evidence'},answer:'The path is broken but current continues.'}))).json();assert.equal(calls,2);assert.equal(data.result.sourceEvidence[0].sourceId,'S1');
});

test('adaptive explanation requires matching evidence and validates provider output without awarding success',async()=>{
 const recovery=loadStudyModule('study-recovery');let calls=0,sent;const evidence=recovery.packPracticeEvidence(context,[record],Date.now());
 const handler=route(async(_url,options)=>{calls++;sent=JSON.parse(options.body);return upstream({explanation:'Imagine balancing two trays. Removing the same weight from both preserves balance. What operation would undo the added weight?'});});
 const response=await handler(req({action:'explain',approach:'analogy',context,practiceEvidence:evidence}));assert.equal(response.status,200);const data=await response.json();assert.ok(data.explanation);assert.equal(data.result,undefined);assert.match(sent.messages[0].content,/concrete analogy/);assert.match(sent.messages[0].content,/same change to BOTH pans/);assert.match(sent.messages[0].content,/Do not solve the saved or current question/);assert.match(sent.messages[0].content,/Helped success is not independent/);
 assert.equal((await handler(req({action:'explain',approach:'unknown',context,practiceEvidence:evidence}))).status,400);
 assert.equal((await handler(req({action:'explain',approach:'visual',context:{...context,goal:'Changed'},practiceEvidence:evidence}))).status,400);assert.equal(calls,1);
 assert.equal((await route(async()=>upstream({decision:'meets'}))(req({action:'explain',approach:'steps',context,practiceEvidence:evidence}))).status,502);
});
