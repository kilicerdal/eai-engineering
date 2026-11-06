import {readFile,writeFile} from 'node:fs/promises';
import {makeTextDocument,selectMaterialExcerpts,validateMaterialAnswer,validateMaterialSources} from '../src/lib/study-materials.ts';
if(!process.argv[2]||!process.argv[3])throw new Error('Usage: node scripts/evaluate-study-materials.mjs SITE_URL OUTPUT_JSON');
const origin=new URL(process.argv[2]).origin;
const pdfjs=await import('pdfjs-dist/legacy/build/pdf.mjs');
const loading=pdfjs.getDocument({data:new Uint8Array(await readFile(new URL('../tests/fixtures/course-material-test.pdf',import.meta.url))),useSystemFonts:true});
const pdf=await loading.promise;
const pages=[];
for(let number=1;number<=pdf.numPages;number++){
 const page=await pdf.getPage(number);const content=await page.getTextContent();pages.push({number,text:content.items.filter(item=>'str'in item).map(item=>item.str).join(' ')});
}
await loading.destroy();
const document={id:'synthetic-pdf',name:'EAI synthetic course.pdf',kind:'pdf',pages,pageCount:2,addedAt:Date.now()};
const french=makeTextDocument('Littérature fictive','Dans notre cours fictif, le poème Rivière Claire a été écrit par Léa Martin en 1986. Le thème principal est la mémoire collective.','synthetic-french',Date.now());
const conflicting=[makeTextDocument('Archive A','The fictional Luma library opened in 1982.','conflict-a',Date.now()),makeTextDocument('Archive B','The fictional Luma library opened in 1987.','conflict-b',Date.now())];
const cases=[
 {id:'conflicting-sources',task:'explain',message:'What year did the Luma library open? Compare the two archives.',documents:conflicting},
 {id:'history-page-1',task:'explain',message:'In what year did Luma open its first community library?',documents:[document]},
 {id:'business-page-2',task:'explain',message:'Who is the Northwind budget owner and how many credits are reserved for training?',documents:[document]},
 {id:'derived-budget-arithmetic',task:'explain',message:'According to the Northwind budget, how many credits remain after reserving training credits?',documents:[document]},
 {id:'unsupported-biography',task:'explain',message:'Which university did Mira Vale attend?',documents:[document]},
 {id:'study-guide',task:'guide',message:'Create a study guide from these selected materials.',documents:[document]},
 {id:'single-question-quiz',task:'quiz',message:'Ask one question about the Northwind budget and wait for my attempt.',documents:[document]},
 {id:'french-literature',task:'explain',message:'Qui a écrit le poème Rivière Claire et en quelle année ?',documents:[french]},
];
const selected=process.argv[4]?cases.filter(item=>item.id===process.argv[4]):cases;
if(!selected.length)throw new Error('Unknown evaluation case: '+process.argv[4]);
const results=[];
for(let i=0;i<selected.length;i+=2) await Promise.all(selected.slice(i,i+2).map(async item=>{
 const started=Date.now();
 try{
  const excerpts=selectMaterialExcerpts(item.documents,item.message,item.task);
  const response=await fetch(new URL('/api/study/materials',origin),{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify({message:item.message,task:item.task,excerpts}),signal:AbortSignal.timeout(60000)});
  const payload=await response.json();
  const failures=[];
  if(!response.ok)failures.push('HTTP '+response.status);
  else {try{validateMaterialAnswer(payload,validateMaterialSources(excerpts));}catch(error){failures.push(String(error));}}
  if(item.id==='unsupported-biography'&&payload.supported!==false)failures.push('Expected unsupported answer for absent biography');
  const result={id:item.id,status:response.status,elapsedMs:Date.now()-started,...payload,structuralChecksPassed:failures.length===0,failures,semanticReviewRequired:true};results.push(result);
  console.log(JSON.stringify({...result,citations:payload.citations?.map(({sourceId,page,kind,quote})=>({sourceId,page,kind,quote}))}));
 }catch(error){const result={id:item.id,error:String(error)};results.push(result);console.log(JSON.stringify(result));}
}));
await writeFile(process.argv[3],JSON.stringify({evaluatedAt:new Date().toISOString(),reviewInstructions:"Structural checks do not prove factual support. Review every claim against the supplied excerpts. Conflicting archives must be identified and both dates attributed without inventing a resolution. Check derivations independently; quizzes should withhold the answer.",results},null,2));

if(results.some(result=>result.error||result.structuralChecksPassed===false))process.exitCode=1;
