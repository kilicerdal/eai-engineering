import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import * as materials from '../src/lib/study-materials.ts';
const { MATERIAL_LIMITS, makeTextDocument, validateCourseDocument, selectMaterialExcerpts, validateMaterialSources, validateMaterialAnswer, normalizeMaterialLibrary, removeMaterialDocument, materialLocation, materialTutorSystem } = materials;
const pdf={id:'sample-pdf',name:'Synthetic course.pdf',kind:'pdf',pageCount:2,addedAt:100,pages:[
 {number:1,text:'The imaginary city of Luma opened its first community library in 1973. The reading room is named Cedar Hall.'},
 {number:2,text:'The fictional Northwind team budget is 480 credits. Exactly 120 credits are reserved for training. The budget owner is Mira Vale.'},
]};
const source=validateMaterialSources([{documentId:pdf.id,name:pdf.name,kind:'pdf',page:2,text:pdf.pages[1].text}])[0];
const valid={supported:true,answer:'The budget owner is Mira Vale. [S1]',citations:[{sourceId:'S1',quote:'The budget owner is Mira Vale.'}]};

test('documents preserve physical page numbers, reject invalid or duplicate pages',()=>{
 assert.deepEqual(validateCourseDocument(pdf),pdf);
 assert.equal(validateCourseDocument({...pdf,pages:[{number:3,text:'outside'}]}),null);
 assert.equal(validateCourseDocument({...pdf,pages:[pdf.pages[0],pdf.pages[0]]}),null);
 assert.equal(validateCourseDocument({...pdf,pageCount:101}),null);
 assert.equal(validateCourseDocument({...pdf,pages:[{number:1,text:'x'.repeat(250001)}]}),null);
});
test('notes have honest section labels and bounded text',()=>{
 const notes=makeTextDocument('Lecture notes','x'.repeat(5001),'notes',100);
 assert.equal(notes.pages.length,2); assert.equal(materialLocation({kind:'text',page:2}),'Section 2');
 assert.equal(materialLocation({kind:'pdf',page:2}),'Page 2');
 assert.throws(()=>makeTextDocument('Empty','  ','notes',100));
 assert.throws(()=>makeTextDocument('Huge','x'.repeat(250001),'notes',100));
});
test('retrieval selects the relevant subject and keeps page metadata',()=>{
 const result=selectMaterialExcerpts([pdf],'Who is the Northwind budget owner?','explain');
 assert.equal(result[0].page,2); assert.equal(result[0].documentId,pdf.id);
 assert.ok(result.every(item=>item.text.length<=MATERIAL_LIMITS.excerptCharacters));
 assert.equal(selectMaterialExcerpts([pdf],'What is the diameter of Venus?','explain').length,0);
});
test('multilingual retrieval works without an English-only tokenizer',()=>{
 const french=makeTextDocument('Économie','Le budget de formation est de quarante crédits.','fr',100);
 const chinese=makeTextDocument('历史','图书馆在一九七三年开放。阅览室名为雪松厅。','zh',100);
 assert.equal(selectMaterialExcerpts([french],'Quel est le budget de formation?','explain')[0].documentId,'fr');
 assert.equal(selectMaterialExcerpts([chinese],'图书馆什么时候开放？','explain')[0].documentId,'zh');
});
test('guides use representative excerpts and vague follow-ups retain topic context',()=>{
 const guide=selectMaterialExcerpts([pdf],'','guide'); assert.equal(guide.length,2);
 const next=selectMaterialExcerpts([pdf],'My answer is 120.','quiz','What is the Northwind training budget?');
 assert.equal(next[0].page,2);
});
test('source IDs are assigned by the application and oversized sources are rejected',()=>{
 const assigned=validateMaterialSources([{...source,sourceId:'S99'}]); assert.equal(assigned[0].sourceId,'S1');
 assert.throws(()=>validateMaterialSources([]));
 assert.throws(()=>validateMaterialSources([{...source,page:0}]));
 assert.throws(()=>validateMaterialSources([{...source,text:'x'.repeat(1801)}]));
 assert.throws(()=>validateMaterialSources(Array(7).fill(source)));
});
test('verified citations return the actual source title, page, and exact quote',()=>{
 const result=validateMaterialAnswer(valid,[source]);
 assert.equal(result.citations[0].page,2); assert.equal(result.citations[0].name,pdf.name);
 assert.equal(result.citations[0].quote,'The budget owner is Mira Vale.');
});
test('invented IDs, altered quotes, and missing markers fail closed',()=>{
 for(const input of [
  {...valid,answer:'Claim. [S99]'},
  {...valid,citations:[{sourceId:'S99',quote:'The budget owner is Mira Vale.'}]},
  {...valid,citations:[{sourceId:'S1',quote:'The budget owner is someone else.'}]},
  {...valid,answer:'No citation marker'},
  {...valid,answer:'analysis: malformed output [S1]'},
 ]) assert.throws(()=>validateMaterialAnswer(input,[source]));
});
test('insufficient evidence returns a fixed honest answer, not model speculation',()=>{
 const result=validateMaterialAnswer({supported:false,answer:'An invented date',citations:[]},[source]);
 assert.equal(result.supported,false); assert.deepEqual(result.citations,[]); assert.doesNotMatch(result.answer,/invented date/);
});
test('stored answers are rechecked against their page text and corrupt evidence is discarded',()=>{
 const answer=validateMaterialAnswer(valid,[source]);
 const entry={...answer,id:'answer-1',question:'Who owns the budget?',task:'explain',documentIds:[pdf.id],createdAt:100};
 const library=normalizeMaterialLibrary({documents:[pdf],entries:[entry]}); assert.equal(library.entries.length,1);
 const bad={...entry,id:'bad',citations:[{...answer.citations[0],page:1}]};
 assert.equal(normalizeMaterialLibrary({documents:[pdf],entries:[bad]}).entries.length,0);
 assert.equal(removeMaterialDocument(library,pdf.id).entries.length,0);
 assert.equal(removeMaterialDocument(library,pdf.id).documents.length,0);
});
test('material instructions distinguish content from authority and promise no browsing',()=>{
 const prompt=materialTutorSystem('quiz');
 assert.match(prompt,/untrusted study content/); assert.match(prompt,/No browsing/); assert.match(prompt,/wait for an attempt/);
 assert.match(materialTutorSystem('guide'),/selected excerpts, not the entire course/);
});

const require=createRequire(import.meta.url);
const ts=require('typescript');
function loadRoute(protect=async()=>null) {
 const source=readFileSync(new URL('../src/app/api/study/materials/route.ts',import.meta.url),'utf8');
 const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const harnessModule={exports:{}};
 const dependencies={'next/server':{NextResponse:{json:Response.json}},'@/lib/ai-security':{protectAIRequest:protect,logAIRequest(){}},'@/lib/study-materials':materials};
 new Function('require','module','exports',compiled)(name=>{assert.ok(name in dependencies);return dependencies[name];},harnessModule,harnessModule.exports);
 return harnessModule.exports.POST;
}
function request(body) {return new Request('https://example.test/api/study/materials',{method:'POST',body:typeof body==='string'?body:JSON.stringify(body)});}
const payload={message:'Who owns the budget?',task:'explain',excerpts:[source]};
async function mockProvider(mock,run) {
 const previousFetch=globalThis.fetch;
 const previousId=process.env.CLOUDFLARE_ACCOUNT_ID;
 const previousToken=process.env.CLOUDFLARE_API_TOKEN;
 process.env.CLOUDFLARE_ACCOUNT_ID='synthetic-account';process.env.CLOUDFLARE_API_TOKEN='synthetic-token';globalThis.fetch=mock;
 try{await run();}finally{globalThis.fetch=previousFetch;if(previousId===undefined)delete process.env.CLOUDFLARE_ACCOUNT_ID;else process.env.CLOUDFLARE_ACCOUNT_ID=previousId;if(previousToken===undefined)delete process.env.CLOUDFLARE_API_TOKEN;else process.env.CLOUDFLARE_API_TOKEN=previousToken;}
}
function providerResponse(answer,finish='stop'){return Response.json({choices:[{finish_reason:finish,message:{content:JSON.stringify(answer)}}]});}
test('real material route returns only validated source citations',async()=>{
 await mockProvider(async(url,options)=>{
  assert.match(url,/\/ai\/v1\/chat\/completions$/);
  const body=JSON.parse(options.body);assert.equal(body.model,'@cf/openai/gpt-oss-120b');assert.equal(body.stream,false);
  const supplied=JSON.parse(body.messages[1].content);assert.equal(supplied.excerpts[0].sourceId,'S1');
  return providerResponse(valid);
 },async()=>{
  const response=await loadRoute()(request(payload));assert.equal(response.status,200);
  const result=await response.json();assert.equal(result.citations[0].page,2);assert.equal(response.headers.get('Cache-Control'),'no-store');
 });
});
test('real route preserves shared fail-closed AI protection',async()=>{
 await mockProvider(async()=>{throw new Error('Provider must not run');},async()=>{
  const post=loadRoute(async()=>Response.json({error:'Not configured'},{status:503}));
  assert.equal((await post(request(payload))).status,503);
 });
});
test('real route rejects malformed, oversized, and invalid-source requests before inference',async()=>{
 await mockProvider(async()=>{throw new Error('Provider must not run');},async()=>{
  const post=loadRoute();assert.equal((await post(request('not json'))).status,400);
  assert.equal((await post(request('x'.repeat(MATERIAL_LIMITS.requestBytes+1)))).status,413);
  assert.equal((await post(request({...payload,excerpts:[{...source,page:-1}]}))).status,400);
 });
});
test('real route rejects hallucinated citations and truncated model outputs',async()=>{
 await mockProvider(async()=>providerResponse({...valid,answer:'Unsupported [S9]'}),async()=>assert.equal((await loadRoute()(request(payload))).status,502));
 await mockProvider(async()=>providerResponse(valid,'length'),async()=>assert.equal((await loadRoute()(request(payload))).status,502));
});
test('real route handles upstream limits and service failures without exposing provider data',async()=>{
 await mockProvider(async()=>new Response('synthetic-private-details',{status:429,headers:{'Retry-After':'30'}}),async()=>{
  const response=await loadRoute()(request(payload));assert.equal(response.status,429);assert.equal(response.headers.get('Retry-After'),'30');assert.doesNotMatch(await response.text(),/synthetic-private/);
 });
 await mockProvider(async()=>new Response('synthetic-private-details',{status:500}),async()=>assert.equal((await loadRoute()(request(payload))).status,502));
});

test('repeated citations to a real source merge without accepting an invented quote',()=>{
 const repeated={...valid,citations:[...valid.citations,...valid.citations]};
 assert.equal(validateMaterialAnswer(repeated,[source]).citations.length,1);
 assert.throws(()=>validateMaterialAnswer({...valid,citations:[...valid.citations,{sourceId:'S1',quote:'This quotation is not in the source.'}]},[source]));
});

test('model drafts cannot author displayed quotations or page metadata',()=>{
 const answer=materials.materialAnswerFromDraft({supported:true,answer:'Mira Vale owns the budget. [S1]',citations:[{sourceId:'S1',quote:'Invented text',page:99}]},[source]);
 assert.equal(answer.citations[0].page,2);assert.ok(source.text.includes(answer.citations[0].quote));
 assert.doesNotMatch(answer.citations[0].quote,/Invented text/);
 assert.throws(()=>materials.materialAnswerFromDraft({supported:true,answer:'False source [S99]'},[source]));
});
test('long source quotations selected by the application remain exact and bounded',()=>{
 const text='Background material. '.repeat(40)+'The budget owner is Mira Vale. '+'Other course material. '.repeat(30);
 const source=validateMaterialSources([{documentId:'long',name:'Long notes',kind:'text',page:1,text}])[0];
 const answer=materials.materialAnswerFromDraft({supported:true,answer:'Mira Vale owns the budget. [S1]'},[source]);
 assert.ok(answer.citations[0].quote.length<=600);assert.ok(text.includes(answer.citations[0].quote));
});

test('one bounded format correction repairs a quiz object without weakening citation validation',async()=>{
 let calls=0;
 await mockProvider(async(url,options)=>{
  const body=JSON.parse(options.body);calls++;
  if(calls===1)return providerResponse({question:'Who owns the budget? [S1]'});
  assert.match(body.messages.at(-1).content,/supported field MUST be a JSON boolean/);
  return providerResponse({supported:true,answer:'Who owns the budget? [S1]'});
 },async()=>{const response=await loadRoute()(request({...payload,task:'quiz'}));assert.equal(response.status,200);assert.equal((await response.json()).citations[0].page,2);});
 assert.equal(calls,2);
});
test('invalid model output stops after two attempts',async()=>{
 let calls=0;
 await mockProvider(async()=>{calls++;return providerResponse({supported:true,answer:'Unknown source [S99]'});},async()=>assert.equal((await loadRoute()(request(payload))).status,502));
 assert.equal(calls,2);
});

test('explanation style is bounded and preserves source-only evidence rules',async()=>{
 await mockProvider(async(_url,options)=>{const sent=JSON.parse(options.body);assert.match(sent.messages[0].content,/numbered steps/);assert.match(sent.messages[0].content,/Use only facts supported/);return providerResponse({supported:true,answer:'The budget owner is Mira Vale. [S1]'});},async()=>assert.equal((await loadRoute()(request({...payload,style:'steps'}))).status,200));
 await mockProvider(async()=>assert.fail('unsupported style must not call provider'),async()=>assert.equal((await loadRoute()(request({...payload,style:'invented'}))).status,400));
});

test('formatted notes preserve section numbers and earlier saved libraries reopen across blank sections',()=>{
 const text='Opening'.padEnd(5000)+' '.repeat(5000)+'Closing observation.';
 const doc=makeTextDocument('Lab notes',text,'lab',1);
 assert.deepEqual(doc.pages.map(page=>page.number),[1,3]);
 assert.equal(doc.pageCount,3);
 const old={...doc,pages:[doc.pages[0],{number:2,text:' '.repeat(5000)},doc.pages[1]]};
 assert.deepEqual(materials.readMaterialLibrary({documents:[old],entries:[]}).documents,[doc]);
 assert.equal(selectMaterialExcerpts([doc],'Closing observation','explain')[0].page,3);
});
