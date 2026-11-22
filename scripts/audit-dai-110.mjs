/** Mechanical coverage, never an automatic historical or pedagogical sign-off. */
import {readFile,writeFile,mkdir} from 'node:fs/promises';
const read=async p=>JSON.parse(await readFile(p,'utf8'));
const catalog=await read('data/art/paintings.json'),editorial=await read('data/art/editorial-v2.json'),paper=await read('data/art/research/on-paper.json');
const issues=[],attention=[],counts={paintings:catalog.length,painters:Object.keys(editorial.painters).length,drawings:Object.keys(paper.studies).length,essays:0,sections:0,sourceScopes:0};
const urlOK=url=>{try{return new URL(url).protocol==='https:';}catch{return false;}};
for(const [kind,entries]of Object.entries(editorial)){if(!['paintings','painters','eras','essays'].includes(kind))continue;for(const [id,essay]of Object.entries(entries)){
 counts.essays++;const seen=new Set();if(!essay.lead?.trim())issues.push(`${id}: missing opening`);
 for(const section of essay.sections){counts.sections++;if(seen.has(section.id))issues.push(`${id}: duplicate section ${section.id}`);seen.add(section.id);if(!section.paragraphs?.length)issues.push(`${id}: empty section`);if(section.sources.some(n=>!essay.sources[n]))issues.push(`${id}: unresolved citation`);if(section.kind==='history'&&!section.sources.length)issues.push(`${id}: historical section without mapped source`);}
 for(const source of essay.sources){counts.sourceScopes++;if(!urlOK(source.url)||!source.scope?.trim())issues.push(`${id}: incomplete source scope`);}
 if(essay.sections.length<4)attention.push(`${id}: short essay structure; editorial judgment required`);
}}
for(const p of catalog){for(const field of ['date','medium','location','credit','rights','imageSource','licenseUrl'])if(!p[field])issues.push(`${p.id}: missing ${field}`);if(!p.image&&p.imageStatus!=='reference-only')issues.push(`${p.id}: unexplained unavailable image`);if(p.image&&(!p.width||!p.height||!p.thumbnail))issues.push(`${p.id}: incomplete reproduction geometry`);if(!p.alt?.trim()&&p.image)issues.push(`${p.id}: missing image description`);}
for(const [id,p]of Object.entries(paper.studies)){for(const field of ['observation','documented','limit','process','material','paper','inscription','provenance'])if(!p[field]?.trim())issues.push(`${id}: missing process context ${field}`);if(p.prompts.length!==3)issues.push(`${id}: expected three placed observations`);if(!p.sources.length||p.sources.some(s=>!urlOK(s.url)))issues.push(`${id}: incomplete institutional references`);}
const report={checkedAt:new Date().toISOString(),scope:'Collection-wide content structure, references, image metadata and drawing-process evidence. No historical claim or rights status is approved by these mechanical checks.',counts,issues,editorialAttention:attention};await mkdir('artifacts/dai-110',{recursive:true});await writeFile('artifacts/dai-110/content-audit.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));if(issues.length)process.exitCode=1;
