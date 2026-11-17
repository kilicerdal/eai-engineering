/** Local structural inventory. Does not fetch sources or certify their claims. */
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import path from 'node:path';import {createRequire} from 'node:module';
const ts=createRequire(import.meta.url)('typescript'),cache=new Map();
function load(file){file=path.resolve(file);if(cache.has(file))return cache.get(file).exports;const record={exports:{}};cache.set(file,record);const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;new Function('require','module','exports',code)(name=>{if(!name.startsWith('.'))throw Error('Only local content modules may be inspected');return load(path.resolve(path.dirname(file),name+'.ts'));},record,record.exports);return record.exports;}
const {facts}=load('src/app/study/curiosity/facts.ts'),{readingBooks}=load('src/lib/study-reading.ts'),{certTracks,certQuestions}=load('src/lib/certification-content.ts'),{newPaths,newPathQuestions}=load('src/lib/certification-new-paths.ts');
const {extraQuestions}=load('src/lib/certification-extra-questions.ts');
const questions=[...certQuestions,...extraQuestions,...newPathQuestions];
const issues=[];for(const f of facts){try{if(new URL(f.url).protocol!=='https:'||!f.source.trim())issues.push('Discovery source needs review: '+f.id);}catch{issues.push('Invalid source URL: '+f.id);}}
for(const b of readingBooks)if(!existsSync('data/reading/'+b.id+'.json.gz'))issues.push('Packed book needs inspection: '+b.id);
const report={checkedAt:new Date().toISOString(),scope:'Local inventory and source metadata only. URLs were not fetched; scientific, historical and exam claims were not reverified by this check.',counts:{discoveries:facts.length,books:readingBooks.length,certificationPaths:certTracks.length+newPaths.length,questions:questions.length},sourceHosts:[...new Set(facts.map(f=>new URL(f.url).hostname))].sort(),issues,nextReview:'Use the existing official certification source audit and learning-link audit for HTTP health. Editorial review is still required when source content changes.'};
writeFileSync('/private/tmp/eai-learning-inventory.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({counts:report.counts,issues:report.issues,report:"/private/tmp/eai-learning-inventory.json"},null,2));if(issues.length)process.exitCode=1;
