import test from "node:test";
import assert from "node:assert/strict";
import {readStudyStream} from "../src/lib/study-stream.ts";
const encoder = new TextEncoder();
function sse(text, chunkSize = 10000) {
  const bytes = encoder.encode(text);
  return new Response(new ReadableStream({ start(controller) {
    for (let i = 0; i < bytes.length; i += chunkSize) controller.enqueue(bytes.slice(i, i + chunkSize));
    controller.close();
  } }), { headers: { "content-type": "text/event-stream" } });
}

test('split control markers and analysis prefixes are never shown before rejection',async()=>{
 for(const tokens of [['<','|sta','rt|>'],['ana','lysis',':'],['Safe words ','<|cha','nnel|>']]){
 const updates=[];
 const stream=tokens.map(content=>'data: '+JSON.stringify({choices:[{delta:{content}}]})+'\n\n').join('')+'data: [DONE]\n\n';
 await assert.rejects(readStudyStream(sse(stream,1),text=>updates.push(text),true),/invalid response/);
 assert.ok(updates.every(text=>text==='Safe words '));
 }
});
test('incomplete replies fail even when the provider sends DONE',async()=>{
 const stream='data: '+JSON.stringify({choices:[{delta:{content:'Partial answer'}}]})+'\n\ndata: '+JSON.stringify({choices:[{delta:{},finish_reason:'length'}]})+'\n\ndata: [DONE]\n\n';
 await assert.rejects(readStudyStream(sse(stream),()=>{},true),/incomplete/);
 await assert.rejects(readStudyStream(sse('data: {"response":"Partial"}\n\n'),()=>{},true),/interrupted/);
 await assert.rejects(readStudyStream(sse('data: {"response":"<|star"}\n\ndata: [DONE]\n\n'),()=>{},true),/invalid response/);
});
test('ordinary comparisons and analysis words still render',async()=>{
 for(const answer of ['a < b','analysis of the poem','A final less-than symbol: <']){
 const updates=[];assert.equal(await readStudyStream(sse('data: '+JSON.stringify({response:answer})+'\n\ndata: [DONE]\n\n',1),text=>updates.push(text),true),answer);assert.equal(updates.at(-1),answer);
 }
});
