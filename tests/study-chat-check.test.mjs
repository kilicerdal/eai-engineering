import test from 'node:test';
import assert from 'node:assert/strict';
import {loadStudyModule} from './load-study-module.mjs';
const {chatPractice, notebookFields, tutorNotebookEntry}=loadStudyModule('study-chat-check');
const {normalizeLessonContext,checkLabel}=loadStudyModule('study-checkpoints');
const {validateFreshCheckQuestion}=loadStudyModule('study-question-quality');
const {checkShortLinearAnswer,validateReviewedFeedback}=loadStudyModule('study-feedback');
const {normalizeMistakes}=loadStudyModule('study-exams');
const turns=[{role:'user',content:'Why reverse an inequality when multiplying by a negative?'},{role:'assistant',content:'Consider where each product lands on a number line.'}];
test('checks require a completed exchange, restore the same topic and isolate sessions and changed replies',()=>{
  assert.equal(chatPractice('s',turns.slice(0,1)),null);assert.equal(chatPractice('s',turns.slice(1)),null);
  const check=chatPractice('s',turns);
  assert.deepEqual(chatPractice('s',structuredClone(turns)),check);
  assert.deepEqual(normalizeLessonContext(check.context),check.context);
  assert.notEqual(chatPractice('other',turns).key,check.key);
  assert.notEqual(chatPractice('s',[turns[0],{role:'assistant',content:'Try reflecting the points.'}]).key,check.key);
});
test('fresh examples, reasoning and source sufficiency are assessed independently',()=>{
  const question={question:'Solve 2x + 3 = 11. Explain your reasoning.',criterion:'Describe equivalent operations.'};
  assert.throws(()=>validateFreshCheckQuestion(question,'','Tutor: '+question.question));
  assert.equal(checkShortLinearAnswer(question,'4').decision,'partial');
  assert.equal(checkShortLinearAnswer(question,'4 because adding only to the left keeps equality'),null);
  assert.equal(validateReviewedFeedback({canVerify:false},'My reading of the missing passage').decision,'uncertain');
  for(const [helpUsed,label] of [[false,'Answered independently'],[true,'Completed with help']])
    assert.equal(checkLabel({result:{decision:'meets'},helpUsed}),label);
});
test('the notebook copy supports edits, keeps the original answer and is retry-safe by attempt ID',()=>{
  const check={id:'sample',question:{question:'Explain why the order reverses.'},answer:'I reflected the points.',result:{feedback:'Compare both positions.',reasoningGap:'Explain the order.',nextStep:'Try a different pair.'},submittedAt:100};
  const fields=notebookFields(check);
  const entry=tutorNotebookEntry(check,{...fields,answer:'My edited note'},200);
  assert.deepEqual(normalizeMistakes([entry]),[entry]);assert.equal(entry.reviewAt,86400200);
  assert.equal(entry.answer,'My edited note');assert.equal(check.answer,'I reflected the points.');
  assert.equal(tutorNotebookEntry(check,fields,400).id,entry.id);
  assert.throws(()=>tutorNotebookEntry(check,{...fields,answer:'x'.repeat(701)},200),/My reasoning.*700/);
  assert.throws(()=>tutorNotebookEntry(check,{...fields,reflection:'x'.repeat(14001)},200),/Feedback and notes.*14,000/);
  assert.throws(()=>tutorNotebookEntry(check,{...fields,question:'   '},200),/Enter a question/);
});

test('negative scaling asks for the comparison without disclosing the rule or repeating the last item',()=>{
 const {negativeScaleQuestion}=loadStudyModule('study-chat-check');
 const {context}=chatPractice('s',turns);
 const first=negativeScaleQuestion(context,'');
 assert.match(first.question,/justify/);
 assert.doesNotMatch(first.question,/revers|flip|reflect|must change/i);
 assert.notEqual(negativeScaleQuestion(context,first.question).question,first.question);
 assert.equal(negativeScaleQuestion({...context,goal:'Discuss negative imagery in this poem.'},''),null);
});
