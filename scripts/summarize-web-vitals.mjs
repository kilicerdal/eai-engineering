import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {normalizeHomeVital} from '../src/lib/home-vitals.mjs';
export function summarizeVitals(lines) {
 const groups=new Map();
 for(const line of lines.split('\n')) {
  let item;try {item=JSON.parse(line);if(typeof item.message==='string')item=JSON.parse(item.message);}catch{continue;}
  if(item.event!=='homepage_web_vital'||item.scope!=='homepage-entry-document')continue;
  const metric=normalizeHomeVital({metric:item.metric,value:item.value,device:item.device});if(!metric)continue;
  const revision=/^[a-f0-9]{7,40}$/.test(item.revision)?item.revision:'unknown';
  const key=`${revision}/${metric.device}/${metric.metric}`;const values=groups.get(key)||[];values.push(metric.value);groups.set(key,values);
 }
 return [...groups].map(([group,values])=>{values.sort((a,b)=>a-b);return {group,samples:values.length,p75:values[Math.ceil(values.length*.75)-1],min:values[0],max:values.at(-1),interpretation:values.length<20?'Small sample; do not treat as a stable field percentile.':'Observed log sample; not a population guarantee.'};});
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){if(!process.argv[2])throw Error('Provide an exported NDJSON runtime log file.');console.log(JSON.stringify({scope:'Homepage-entry documents, including later app navigation. Available retained logs only; no visitor counts or field compliance claim.',metrics:summarizeVitals(await readFile(process.argv[2],'utf8'))},null,2));}
