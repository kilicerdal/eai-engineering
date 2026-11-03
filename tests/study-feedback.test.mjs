import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
const ts=createRequire(import.meta.url)('typescript'),cache=new Map();
function load(name){if(cache.has(name))return cache.get(name);const m={exports:{}};const source=ts.transpileModule(readFileSync(new URL(`../src/lib/${name}.ts`,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;new Function('require','module','exports',source)(dep=>load(dep.slice(2)),m,m.exports);cache.set(name,m.exports);return m.exports;}
const f=load('study-feedback'),c=load('study-checkpoints'),snapshots=load('study-cloud-snapshot');
const question={question:'Solve \\(5y − 7 = 28\\). Show each step.',criterion:'Isolate y and check by substitution.'};
const ai={canVerify:true,decision:'partial',feedback:'The contrast is identified, but the supporting sentence needs to be named.',reasoningGap:'The inference needs textual support.',nextStep:'Connect the contrast to one sentence in the passage.',answerExcerpt:'The author contrasts the two approaches',guidingQuestion:'Which sentence gives the strongest evidence for that contrast?'};
test('review quotes must come from the actual learner answer across subjects',()=>{
 const answer='The author contrasts the two approaches. I need to explain why.';
 assert.equal(f.validateReviewedFeedback(ai,answer).answerExcerpt,ai.answerExcerpt);
 assert.equal(f.validateReviewedFeedback({...ai,answerExcerpt:'The author  contrasts\n the two approaches'},answer).decision,'partial');
 assert.equal(f.validateReviewedFeedback({...ai,answerExcerpt:'The student names the evidence'},answer).decision,'uncertain');
 assert.equal(f.validateReviewedFeedback({...ai,answerExcerpt:undefined},answer).decision,'uncertain');
 assert.equal(f.validateReviewedFeedback({...ai,canVerify:false,decision:'meets'},answer).decision,'uncertain');
 assert.throws(()=>f.validateReviewedFeedback({...ai,guidingQuestion:''},answer));
 assert.equal(f.validateReviewedFeedback({...ai,method:'substitution'},answer).method,'ai');
});
test('short linear answers check the original equation without declaring mastery or missing work correct',()=>{
 for(const answer of ['y = 7','7','\\(y=7\\)','$y=7$','y=14/2','y=\\frac{14}{2}']){const result=f.checkShortLinearAnswer(question,answer);assert.equal(result.decision,'partial',answer);assert.equal(result.method,'substitution');assert.match(result.feedback,/satisfies/);assert.match(result.reasoningGap,/not shown/);}
 for(const answer of ['y=4.2','y=5','y=-7']){const result=f.checkShortLinearAnswer(question,answer);assert.equal(result.decision,'needs_work',answer);assert.doesNotMatch(result.feedback,/y\s*=\s*7/);}
 assert.equal(f.checkShortLinearAnswer({question:'Solve -3x + 5 = 20.',criterion:'Solve'},'x=-5').decision,'partial');
});
test('the substitution check declines ambiguous prose, unsupported notation and other problem types',()=>{
 for(const answer of ['I first got y=5, then changed to y=7.','Is y=7?','not y=7','y≈7','y=1/0','y=7 or y=8','y=7 because I divided both sides.','z=7','0'.repeat(121)])assert.equal(f.checkShortLinearAnswer(question,answer),null,answer);
 for(const text of ['Solve y² − 7 = 28.','Solve 5y − 7 = 28 for a different right side.','According to the graph, y=7.','Solve 0y + 1 = 1.'])assert.equal(f.checkShortLinearAnswer({question:text,criterion:'Solve'},'y=7'),null,text);
});
test('feedback method and quote fields remain compatible with saved checks and optional account snapshots',()=>{
 const lesson={id:'lesson-1',title:'A comparison',objective:'Support an inference',activity:'Read an original passage',checkpoint:'Cite a detail',sourceIds:[]},context={goal:'Learn textual reasoning',lesson};
 const result=f.validateReviewedFeedback(ai,'The author contrasts the two approaches.'),record={id:'check-new',context,question:{question:'What does the contrast establish?',criterion:'Support an inference'},answer:'The author contrasts the two approaches.',helpUsed:true,result,submittedAt:1700000000000};
 const restored=c.normalizeLessonChecks([record])[0];assert.equal(restored.result.answerExcerpt,result.answerExcerpt);assert.equal(c.checkReviewMethod(restored),'AI-reviewed');
 const checked={...record,result:f.checkShortLinearAnswer(question,'y=7')};assert.equal(c.checkReviewMethod(checked),'Substitution-checked');assert.match(c.checkMemory(checked),/Substitution-checked/);
 const snapshot=snapshots.validateStudySnapshot({version:1,values:{[c.CHECK_KEY]:JSON.stringify([record])},library:{documents:[],entries:[]}});assert.equal(c.normalizeLessonChecks(JSON.parse(snapshot.values[c.CHECK_KEY]))[0].result.guidingQuestion,result.guidingQuestion);
 const legacy={...record,result:{decision:'meets',feedback:'A supported answer.',reasoningGap:'None identified.',nextStep:'Try another example.'}};assert.equal(c.normalizeLessonChecks([legacy]).length,1);
 const draft={id:'draft-new',identity:c.lessonIdentity(context),question:record.question,answer:record.answer,help:true,hintRequested:true,hint:'',revising:true};assert.equal(c.readLessonDraft(draft,context).revising,true);assert.equal(c.readLessonDraft({...draft,revising:undefined},context).revising,false);
});
