import test from 'node:test';
import assert from 'node:assert/strict';
import {loadStudyModule} from './load-study-module.mjs';
const m=loadStudyModule('study-materials'),p=loadStudyModule('study-material-practice'),c=loadStudyModule('study-checkpoints'),f=loadStudyModule('study-feedback'),q=loadStudyModule('study-question-quality'),r=loadStudyModule('study-recommendations');
const now=1700000000000,text='In a closed electric circuit, current flows through a complete path. If the path is broken, current stops flowing. A switch can open or close that path.';
const doc=m.makeTextDocument('Circuit notes',text,'source-document',now-100),source=p.selectStudyPassage(doc,1,text),context=p.materialPracticeContext(source);
const result={canVerify:true,decision:'partial',feedback:'A closed path is identified, but the effect of opening the switch needs explanation.',reasoningGap:'Connect the broken path to the current.',nextStep:'Explain what the switch changes.',answerExcerpt:'The path is complete',guidingQuestion:'What happens to the path when the switch opens?',sourceEvidence:[{sourceId:'S1',quote:'If the path is broken, current stops flowing.'}]};
const record={id:'material-check',context,question:{question:'Why does opening the switch stop the current? [S1]',criterion:'Use the source to justify the explanation.'},answer:'The path is complete, so I think the current stays the same.',helpUsed:false,result:f.validateReviewedFeedback(result,'The path is complete, so I think the current stays the same.',[source]),submittedAt:now-86400001};
test('selected passages must belong to the exact available section and fit the source bound',()=>{
 assert.equal(source.text,text);assert.throws(()=>p.selectStudyPassage(doc,2,text));assert.throws(()=>p.selectStudyPassage(doc,1,'An invented sentence that is not in the source notes.'));assert.throws(()=>p.selectStudyPassage(doc,1,'short'));
 const long=m.makeTextDocument('Long','a'.repeat(1900),'long',now);assert.throws(()=>p.selectStudyPassage(long,1,'a'.repeat(1801)));
 assert.equal(p.sourceStillAvailable(source,[doc]),true);assert.equal(p.sourceStillAvailable(source,[]),false);assert.equal(p.sourceStillAvailable({...source,page:2},[doc]),false);
});
test('source identity preserves old checks while separating different passages',()=>{
 const normalized=c.normalizeLessonContext(context);assert.ok(normalized.sources);assert.equal(c.lessonIdentity(normalized),c.lessonIdentity(context));assert.equal(p.materialPracticeContext(source).lesson.id,context.lesson.id);
 const shorter=p.selectStudyPassage(doc,1,'If the path is broken, current stops flowing.');assert.notEqual(p.materialPracticeContext(shorter).lesson.id,context.lesson.id);assert.notEqual(c.lessonIdentity(p.materialPracticeContext(shorter)),c.lessonIdentity(context));
 assert.equal(c.normalizeLessonContext({...context,sources:[{...source,text:''}]}),null);
});
test('source feedback needs both real learner text and a verifiable source quote',()=>{
 assert.equal(record.result.decision,'partial');assert.equal(record.result.sourceEvidence[0].sourceId,'S1');
 for(const evidence of [undefined,[{sourceId:'S2',quote:result.sourceEvidence[0].quote}],[{sourceId:'S1',quote:'The circuit operates even when its path is broken.'}]])assert.equal(f.validateReviewedFeedback({...result,sourceEvidence:evidence},record.answer,[source]).decision,'uncertain');
 assert.equal(c.normalizeLessonChecks([record]).length,1);assert.equal(c.normalizeLessonChecks([{...record,result:{...record.result,sourceEvidence:[{sourceId:'S1',quote:'An invented passage with no supporting source.'}]}}]).length,0);
});
test('passage follow-ups use the latest check and exclude removed, changed or future sources',()=>{
 assert.equal(p.materialReviewSteps([record],[doc],now).length,1);assert.equal(p.materialReviewSteps([record],[],now).length,0);assert.equal(p.materialReviewSteps([record],[{...doc,pages:[{number:1,text:'This section has different source text now.'}]}],now).length,0);
 assert.equal(p.materialReviewSteps([{...record,submittedAt:now+1}],[doc],now).length,0);
 const later={...record,id:'later',submittedAt:now-1,result:{...record.result,decision:'meets'},helpUsed:false};assert.equal(p.materialReviewSteps([record,later],[doc],now).length,0);assert.equal(p.materialReviewSteps([record,{...later,helpUsed:true}],[doc],now).length,1);
});
test('learning home recommends the available passage without sending its text in the navigation link',()=>{
 const suggestion=r.recommendLearningStep(null,[],[record],now,null,[doc]);assert.equal(suggestion.kind,'material');assert.equal(suggestion.contextId,context.lesson.id);assert.equal(suggestion.action,'Review this passage');assert.equal(r.recommendLearningStep(null,[],[record],now,null,[]).kind,'plan');
});
test('source-provided questions may refer to the visible passage but cannot cite invented sources in saved feedback',()=>{
 const value={question:'According to the passage, what does opening the switch change? [S1]',criterion:'Use source evidence.'};assert.ok(q.validateFreshCheckQuestion(value,'','','',true));assert.throws(()=>q.validateFreshCheckQuestion(value));
 assert.match(m.materialTutorSystem('explain','analogy'),/explicitly labeled as an illustration/);assert.match(m.materialTutorSystem('explain','steps'),/numbered steps/);assert.match(m.materialTutorSystem('explain','clear'),/preserve important qualifications/);
});

test('harmless citation brackets and quote capitalization resolve back to the original source text',()=>{
 const result=f.validateReviewedFeedback({...record.result,canVerify:true,sourceEvidence:[{sourceId:'[S1]',quote:'if the path is broken, current stops flowing.'}]},record.answer,[source]);assert.equal(result.decision,'partial');assert.equal(result.sourceEvidence[0].quote,'If the path is broken, current stops flowing.');assert.equal(result.sourceEvidence[0].sourceId,'S1');
});
