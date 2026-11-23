import {readFile,writeFile} from 'node:fs/promises';

const input=new URL('../data/knowledge/opening-stories.json',import.meta.url);
const output=new URL('../data/knowledge/source-link-audit.json',import.meta.url);
const data=JSON.parse(await readFile(input,'utf8'));
let previous={};
try{previous=JSON.parse(await readFile(output,'utf8')).sources??{};}catch{}
const entries=Object.entries(data.sources);
const queue=[...entries];
const results=[];
const concurrency=5;
async function check([id,source]){
 let method='HEAD';
 try{
  let response=await fetch(source.url,{method,redirect:'follow',signal:AbortSignal.timeout(12000),headers:{'user-agent':'eAI Knowledge Source Link Auditor/1.0'}});
  if([401,403,405,429,501].includes(response.status)){method='GET';response=await fetch(source.url,{method,redirect:'follow',signal:AbortSignal.timeout(12000),headers:{range:'bytes=0-0','user-agent':'eAI Knowledge Source Link Auditor/1.0'}});}
  const ok=response.ok;
  return {id,title:source.title,url:source.url,status:response.status,finalUrl:response.url,ok,needsManualReview:!ok&&[401,403,429].includes(response.status),method};
 }catch(error){return {id,title:source.title,url:source.url,ok:false,needsManualReview:true,method,error:error instanceof Error?error.message:String(error)};}
}
async function worker(){while(queue.length){const item=queue.shift();if(item)results.push(await check(item));}}
await Promise.all(Array.from({length:Math.min(concurrency,queue.length)},worker));
results.sort((a,b)=>a.id.localeCompare(b.id));
const checkedAt=new Date().toISOString();
const audited=results.map(({id,...result})=>{
 const prior=previous[id];
 if(prior?.manualVerified===true&&prior.url===result.url&&!result.ok&&result.status===403){
  return [id,{...result,ok:true,needsManualReview:false,manualVerified:true,manualVerifiedAt:prior.manualVerifiedAt,automatedStatus:result.status,automatedMethod:result.method,method:'manual-web'}];
 }
 return [id,result];
});
await writeFile(output,JSON.stringify({checkedAt,sources:Object.fromEntries(audited)},null,2)+'\n');
const failed=results.filter(r=>!r.ok),auditById=Object.fromEntries(audited),blocked=failed.filter(r=>r.needsManualReview),manual=blocked.filter(r=>!auditById[r.id].manualVerified),dead=failed.filter(r=>!r.needsManualReview),verified=audited.filter(([,r])=>r.manualVerified).length;
console.log(`Checked ${results.length} source links; ${results.length-failed.length} responded automatically; ${verified} previously verified manually; ${manual.length} remain for manual review; ${dead.length} appear unreachable.`);
for(const r of manual)console.log(`MANUAL REVIEW · ${r.id} · HTTP ${r.status??r.error} · ${r.url}`);
for(const r of dead)console.log(`UNREACHABLE · ${r.id} · ${r.status??r.error} · ${r.url}`);
if(dead.length)process.exitCode=1;
