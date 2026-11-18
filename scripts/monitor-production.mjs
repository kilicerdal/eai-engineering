import {mkdir,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';

export const PRODUCTION='https://www.eai.engineering';
export const ROUTES=['/','/engineering','/engineering/tour','/engineering/order-once','/engineering/claim-twice','/engineering/settlementlab','/engineering/problem','/chat','/study','/study/reading','/study/reading/2701','/study/materials','/study/writing','/start','/guide','/study/privacy'];
export function frontendAssets(html){
 return [...new Set([...html.matchAll(/(?:src|href)="([^"<>]+)"/g)].map(m=>m[1]))]
  .filter(path=>path.startsWith('/_next/static/')&&!path.startsWith('//')&&/\.(js|css)(?:\?|$)/.test(path)).slice(0,40);
}
export async function monitorProduction({fetchImpl=fetch,timeoutMs=15000,deadlineMs=180000}={}){
 const checks=[];let home='';const deadline=AbortSignal.timeout(deadlineMs);
 async function probe(path,{status=200,html=false,redirect=false}={}){
  const url=new URL(path,PRODUCTION).href,start=performance.now();
  try{
   const response=await fetchImpl(url,{method:'GET',redirect:'manual',signal:AbortSignal.any([deadline,AbortSignal.timeout(timeoutMs)]),headers:{'User-Agent':'eAI-production-monitor/1.0'}});
   const body=await response.text();const reasons=[];
   if(redirect){if(![301,302,307,308].includes(response.status)||new URL(response.headers.get('location')||'',url).href!==PRODUCTION+'/')reasons.push('Expected redirect to the canonical www homepage');}
   else if(response.status!==status)reasons.push(`Expected HTTP ${status}, received ${response.status}`);
   if(html&&(!response.headers.get('content-type')?.includes('text/html')||!/<html[\s>]/i.test(body)||!/<main[\s>]/i.test(body)))reasons.push('Expected an HTML application page with main content');
   checks.push({url,status:response.status,ok:reasons.length===0,milliseconds:Math.round(performance.now()-start),...(reasons.length?{error:reasons.join('; ')}:{})});
   return body;
  }catch(error){checks.push({url,ok:false,milliseconds:Math.round(performance.now()-start),error:String(error.message||error).slice(0,400)});return '';}
 }
 // Bounded sequential public requests keep the scheduled check gentle on production.
 for(const route of ROUTES){const body=await probe(route,{html:true});if(route==='/')home=body;}
 const assets=frontendAssets(home);
 if(!assets.some(p=>/\.js(?:\?|$)/.test(p))||!assets.some(p=>/\.css(?:\?|$)/.test(p)))checks.push({url:PRODUCTION,ok:false,error:'Homepage has no discoverable application JavaScript or CSS assets'});
 for(const asset of assets)await probe(asset);
 await probe('/monitoring-missing-page-20261117',{status:404});
 await probe('https://eai.engineering/',{redirect:true});
 return {recorded_at:new Date().toISOString(),target:PRODUCTION,passed:checks.every(c=>c.ok),pages:ROUTES.length,assets:assets.length,checks,scope:'Public HTTP GET only. No account, model, email, or database operations.'};
}
export async function writeMonitorReport(report,directory='artifacts/production'){
 await mkdir(directory,{recursive:true});
 await writeFile(directory+'/http.json',JSON.stringify(report,null,2)+'\n');
 const lines=['# Production HTTP monitor','',`${report.passed?'PASS':'FAIL'} — ${report.pages} pages and ${report.assets} frontend assets`,'',...report.checks.filter(c=>!c.ok).map(c=>`- ${c.url}: ${c.error}`),'','Browser interaction results are a separate artifact.'];
 await writeFile(directory+'/http-summary.md',lines.join('\n')+'\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 try{const report=await monitorProduction();await writeMonitorReport(report);console.log(`${report.passed?'PASS':'FAIL'}: ${report.pages} production pages, ${report.assets} assets, redirect and 404 checks`);for(const c of report.checks.filter(c=>!c.ok))console.error(`${c.url}: ${c.error}`);if(!report.passed)process.exitCode=1;}
 catch(error){console.error('Production monitor failed:',error.message);process.exitCode=1;}
}
