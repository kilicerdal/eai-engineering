import assert from 'node:assert/strict';
import test from 'node:test';
import {loadStudyModule} from './load-study-module.mjs';

const {fresh, problems, algebraDiscussion} = loadStudyModule('algebra-sample');
test('sample handoff preserves independence, incorrect answers and incomplete attempts', () => {
  const [first, second] = fresh();
  first.answer = problems[0].choices[problems[0].answerIndex];
  first.checked = true;
  second.answer = problems[1].choices[(problems[1].answerIndex + 1) % problems[1].choices.length];
  second.hint = true;
  const draft = () => algebraDiscussion(JSON.stringify([first, second]));
  assert.match(draft(), /correct\)\. Hint used: no/);
  assert.match(draft(), /not checked\)\. Hint used: yes/);
  second.checked = true;
  assert.match(draft(), /needs another look/);
});
test('fresh and corrupt sessions never invent work', () => {
  assert.doesNotMatch(algebraDiscussion(null), /My choice/);
  assert.throws(() => algebraDiscussion('[]'));
  const steps = fresh();
  steps[1].hint = true;
  assert.throws(() => algebraDiscussion(JSON.stringify(steps)));
});
