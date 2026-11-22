import test from 'node:test';import assert from 'node:assert/strict';
import {loadStudyModule as load} from './load-study-module.mjs';
const {parseArtReturnContext:parse,artContextLabel:label}=load('art/return-context'),{artSearchScore:score,artSearchText:text}=load('art/search');
test('art studies return to exact local search/filter context, rejecting external or unrelated destinations',()=>{
 const target='/study/art/painting/rembrandt-01';const value={target,href:'/study/art/scholarship?q=Nightwatch+sketch&kind=paintings#result-nightwatch',label:'Back to your scholarship results'};
 assert.deepEqual(parse(JSON.stringify(value),target),value);
 for(const href of ['//evil.example/study/art','https://evil.example/study/art','/study/account','/study/art/../../account','javascript:alert(1)',target])assert.equal(parse(JSON.stringify({...value,href}),target),null);
 assert.equal(parse(JSON.stringify(value),'/study/art/painting/monet-01'),null);
 assert.equal(label('/study/art/painter/rembrandt'),'Back to the painter profile');
});
test('exact artwork titles outrank incidental text, with accents and punctuation normalized',()=>{
 assert.ok(score('The Starry Night',text('van-gogh-01','The Starry Night','Vincent van Gogh'),'The Starry Night')>score('The Starry Night','another painting discusses the starry night','Another work'));
 assert.equal(score('La Danse','la danse matisse','La Danse'),score('La Danse','la danse matisse','La Dánse'));
 assert.equal(score('','any','Any'),0);
});
