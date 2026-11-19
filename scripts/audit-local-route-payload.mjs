// Read-only local build measurement. No external requests and no browser-store access.
import {writeFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
const base=new URL(process.argv[2]??'http://127.0.0.1:3038');
if(!['127.0.0.1','localhost'].includes(base.hostname))throw Error('Use the local preview only');
const routes=['/','/study','/study/tutor','/study/reading','/study/curiosity','/study/certifications/cloud-practitioner','/engineering/problem','/explore'];
const cache=new Map();const rows=[];
for(const route of routes){const r=await fetch(new URL(route,base));if(!r.ok)throw Error(`${route}: ${r.status}`);const html=await r.text();const scripts=[...new Set([...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(m=>m[1]))];let raw=0,gzip=0;for(const path of scripts){const url=new URL(path,base);if(url.origin!==base.origin)throw Error('Unexpected external script');if(!cache.has(url.href)){const response=await fetch(url);if(!response.ok)throw Error('Script missing');const bytes=Buffer.from(await response.arrayBuffer());cache.set(url.href,{raw:bytes.length,gzip:gzipSync(bytes).length});}const size=cache.get(url.href);raw+=size.raw;gzip+=size.gzip;}rows.push({route,scriptTags:scripts.length,scriptRawBytes:raw,estimatedScriptGzipBytes:gzip,htmlBytes:Buffer.byteLength(html)});}
const report={scope:'Script tags in initial local HTML only. Gzip is estimated locally, not a network measurement. Excludes later dynamic imports, preloads, images and interaction cost; not Vercel storage or billing.',rows};await writeFile(process.argv[3]??'tmp/local-route-payload.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
