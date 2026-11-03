import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
const ts=createRequire(import.meta.url)('typescript'),cache=new Map();
function load(name){if(cache.has(name))return cache.get(name);const m={exports:{}};new Function('require','module','exports',ts.transpileModule(readFileSync(new URL(`../src/lib/${name}.ts`,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(dep=>load(dep.slice(2)),m,m.exports);cache.set(name,m.exports);return m.exports;}
const {validateFreshCheckQuestion:validate}=load('study-question-quality'),criterion='Explain and justify the inference.';
test('obvious repeated questions and relabeled linear equations require a new proposal',()=>{
 const text='Which conclusion is supported by the observation?';assert.throws(()=>validate({question:text,criterion},text));
 assert.throws(()=>validate({question:'Solve \\(3z + 4 = 19\\). Explain your reasoning.',criterion},'Solve 3x + 4 = 19. Show each step.'));
 assert.throws(()=>validate({question:text,criterion},'',`Worked example: ${text} Answer and explanation followed.`));
 assert.equal(validate({question:'Solve 4x + 5 = 29. Show each step.',criterion},'Solve 3x + 4 = 19. Show each step.').question.includes('29'),true);
});
test('new question proposals cannot reveal a final answer in the prompt or criterion',()=>{
 for(const value of [{question:'Find the missing measurement.\nAnswer: 12',criterion},{question:'Solve 3x + 4 = 19.',criterion:'Subtract 4, then obtain x=5.'},{question:'What is the new price?',criterion:'The correct answer is 240 dollars.'}])assert.throws(()=>validate(value));
 assert.ok(validate({question:'Solve 3x + 4 = 19.',criterion:'Use the same operations on both sides and check by substitution.'}));
});
test('referenced materials must appear inside the generated question, without rejecting generic conceptual questions',()=>{
 for(const question of ['According to the graph, what happens to the temperature?','In the poem, why does the speaker pause?','Read the provided passage and identify the main idea.'])assert.throws(()=>validate({question,criterion}));
 const question='Read the following passage: A fictional library began lending tools while keeping books as its main service. Visitors used the tools for occasional projects. What is the main idea?';assert.ok(validate({question,criterion}));
 assert.ok(validate({question:'In a poem, how can repeated sounds contribute to an effect?',criterion}));
 assert.ok(validate({question:'Explain why a graph can show a trend without establishing its cause.',criterion}));
});

test('fictional data cannot be used as evidence for actual historical causes',()=>{
 assert.throws(()=>validate({question:'In a fictional French province in 1788, households paid invented tax amounts. Explain how this disparity contributed to the French Revolution.',criterion}),/invented data/);
 assert.ok(validate({question:'In a fictional model, group A pays 20 units and group B pays 40 units. What does this model illustrate about unequal burdens, and why is it not evidence about an actual historical event?',criterion}));
 assert.ok(validate({question:'Explain the distinction between a long-term structural cause and a short-term trigger in historical analysis.',criterion}));
});
