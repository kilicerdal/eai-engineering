import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {PRODUCTION,ROUTES,frontendAssets,monitorProduction,writeMonitorReport} from '../scripts/monitor-production.mjs';
const html='<html><main>Engineering</main><script src="/_next/static/app.js"></script><link href="/_next/static/app.css" rel="stylesheet"></html>';
const healthy=async url=>url==='https://eai.engineering/'?new Response('',{status:308,headers:{location:PRODUCTION+'/'}}):url.includes('monitoring-missing-page')?new Response('Not found',{status:404}):new Response(html,{status:200,headers:{'content-type':'text/html'}});

test('healthy monitor checks every page, discovered asset, 404 and canonical redirect',async()=>{
 const seen=[];const report=await monitorProduction({fetchImpl:async(url,options)=>{seen.push(url);assert.equal(options.method,'GET');assert.equal(options.redirect,'manual');return healthy(url);}});
 assert.equal(report.passed,true);assert.equal(report.pages,ROUTES.length);assert.equal(report.assets,2);assert.equal(seen.length,ROUTES.length+4);assert.equal(seen.some(url=>url.includes('/api/')),false);
});
for(const [name,overrides] of [
 ['server outage',url=>url===PRODUCTION+'/study'?new Response('Unavailable',{status:503}):null],
 ['HTML maintenance response',url=>url===PRODUCTION+'/'?new Response('Temporarily offline',{status:200,headers:{'content-type':'text/html'}}):null],
 ['missing JavaScript',url=>url.endsWith('app.js')?new Response('Not found',{status:404}):null],
 ['unexpected page redirect',url=>url===PRODUCTION+'/engineering'?new Response('',{status:307,headers:{location:'/login'}}):null],
 ['soft 404',url=>url.includes('monitoring-missing-page')?new Response(html,{status:200}):null],
 ['wrong canonical host',url=>url==='https://eai.engineering/'?new Response('',{status:308,headers:{location:'https://other.example/'}}):null],
])test('monitor fails visibly on '+name,async()=>{const report=await monitorProduction({fetchImpl:async url=>overrides(url)||healthy(url)});assert.equal(report.passed,false);assert.ok(report.checks.some(c=>!c.ok&&c.error));});

test('network timeout is a failed check and remaining checks still run',async()=>{
 const report=await monitorProduction({fetchImpl:async url=>{if(url===PRODUCTION+'/chat')throw new DOMException('Timed out','TimeoutError');return healthy(url);}});
 assert.equal(report.passed,false);assert.match(report.checks.find(c=>c.url.endsWith('/chat')).error,/Timed out/);assert.ok(report.checks.some(c=>c.url==='https://eai.engineering/'));
});
test('asset discovery ignores external and protocol-relative hosts and deduplicates',()=>{
 assert.deepEqual(frontendAssets('<script src="//other.example/a.js"></script><script src="https://other.example/a.js"></script><script src="/_next/static/a.js"></script><script src="/_next/static/a.js"></script>'),['/_next/static/a.js']);
});
test('failed check writes structured evidence and a readable failure summary',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'eai-monitor-test-'));
 try{const report=await monitorProduction({fetchImpl:async()=>new Response('Down',{status:503})});await writeMonitorReport(report,dir);assert.equal(JSON.parse(await readFile(dir+'/http.json','utf8')).passed,false);assert.match(await readFile(dir+'/http-summary.md','utf8'),/FAIL.*|Expected HTTP 200/);}
 finally{await rm(dir,{recursive:true,force:true});}
});
