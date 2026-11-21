import test from 'node:test';
import assert from 'node:assert/strict';
import {referenceContent} from '../scripts/art/reference-content.mjs';
test('HTTP-success access screens are not mistaken for readable museum accounts',()=>{
 for(const body of ['Please enable JavaScript to continue.','JavaScript seems to be disabled','Verify that you are human','Access denied'])assert.equal(referenceContent(`<html><head><title>Museum</title></head><body>${body}</body></html>`).readable,false);
});
test('application code and navigation do not supply missing article evidence',()=>{
 const html='<nav>'+ 'Museum visitor information '.repeat(100)+'</nav><main><p>Loading…</p><script>'+ 'work context '.repeat(1000)+'</script></main>';
 assert.equal(referenceContent(html).readable,false);
});
test('substantial institutional article text survives while code is excluded',()=>{
 const prose='The collection record identifies the object and distinguishes its physical support from later conservation history. '.repeat(6);
 const result=referenceContent(`<main><h1>Object record</h1><p>${prose}</p><script>tracking</script><style>body{}</style></main>`);
 assert.equal(result.readable,true);assert.ok(result.text.includes('physical support'));assert.ok(!result.text.includes('tracking'));
});
test('a generic noscript notice does not hide a substantial readable account',()=>{
 assert.equal(referenceContent('<article><noscript>Please enable JavaScript.</noscript>'+ 'An extended scholarly account remains readable in this HTML response. '.repeat(40)+'</article>').readable,true);
});
test('rechecking the same text cannot clear an outstanding editorial change',async()=>{
 const {referenceChange}=await import('../scripts/art/reference-change.mjs');
 assert.deepEqual(referenceChange({contentHash:'new',comparisonBaselineHash:'old',changed:true},'new'),{comparisonBaselineHash:'old',changed:true});
 assert.equal(referenceChange({contentHash:'same'},'same').changed,false);
 assert.equal(referenceChange({contentHash:'old'},'new').changed,true);
 assert.equal(referenceChange(null,'first').changed,false);
});
