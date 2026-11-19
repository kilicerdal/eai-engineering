import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeHomeVital,readVitalBody,createVitalBudget} from '../src/lib/home-vitals.mjs';
test('performance events retain only three allowlisted measurements and coarse viewport',()=>{
 assert.deepEqual(normalizeHomeVital({metric:'LCP',value:2500,device:'mobile'}),{metric:'LCP',value:2500,device:'mobile',rating:'good'});
 assert.equal(normalizeHomeVital({metric:'INP',value:501,device:'desktop'}).rating,'poor');
 assert.equal(normalizeHomeVital({metric:'CLS',value:.2,device:'mobile'}).rating,'needs-improvement');
 for(const bad of [null,[],{metric:'LCP',value:1,device:'mobile',url:'?private=secret'},{metric:'FCP',value:1,device:'mobile'},{metric:'LCP',value:Infinity,device:'mobile'},{metric:'CLS',value:11,device:'mobile'},{metric:'INP',value:-1,device:'mobile'},{metric:'LCP',value:1,device:'user@example.com'}])assert.equal(normalizeHomeVital(bad),null);
});
test('performance intake bounds actual streamed bytes, not just an untrusted content length',async()=>{
 await assert.rejects(readVitalBody(new Request('https://example.com',{method:'POST',body:'x'.repeat(513)})),RangeError);
 await assert.rejects(readVitalBody(new Request('https://example.com',{method:'POST',body:'x',headers:{'content-length':'513'}})),RangeError);
 assert.deepEqual(await readVitalBody(new Request('https://example.com',{method:'POST',body:'{"metric":"CLS","value":0,"device":"mobile"}'})),{metric:'CLS',value:0,device:'mobile'});
});
test('bounded intake resets by time without collecting IPs or visitor identifiers',()=>{const take=createVitalBudget(2,60000);assert.equal(take(60000),true);assert.equal(take(60001),true);assert.equal(take(60002),false);assert.equal(take(120000),true);});
import {summarizeVitals} from '../scripts/summarize-web-vitals.mjs';
test('field summary groups revisions and devices without inventing samples or combining populations',()=>{
 const event=value=>JSON.stringify({event:'homepage_web_vital',scope:'homepage-entry-document',metric:'LCP',value,device:'mobile',revision:'abcdef123'});
 const rows=summarizeVitals([event(4000),event(1000),JSON.stringify({message:event(2000)}),event(3000),'bad input',JSON.stringify({event:'other'})].join('\n'));
 assert.equal(rows.length,1);assert.equal(rows[0].samples,4);assert.equal(rows[0].p75,3000);assert.match(rows[0].interpretation,/Small sample/);assert.deepEqual(summarizeVitals(''),[]);
});
test('coarse navigation context is optional, allowlisted and never accepts a URL',()=>{
 assert.equal(normalizeHomeVital({metric:'CLS',value:.15,device:'desktop',context:'home-so-far'}).context,'home-so-far');
 assert.equal(normalizeHomeVital({metric:'CLS',value:.15,device:'desktop',context:'/private?message=secret'}),null);
 const row=context=>JSON.stringify({event:'homepage_web_vital',scope:'homepage-entry-document',metric:'CLS',value:.15,device:'desktop',revision:'abcdef123',...(context?{context}:{})});
 const groups=summarizeVitals([row('home-so-far'),row('after-navigation'),row(),row('/private')].join('\n'));assert.equal(groups.length,3);assert.ok(groups.every(g=>g.samples===1));
});
