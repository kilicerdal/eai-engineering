import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const ts = createRequire(import.meta.url)('typescript');
const modules = new Map();
function load(name) {
  if (modules.has(name)) return modules.get(name);
  const harnessModule = { exports: {} };
  const code = ts.transpileModule(readFileSync(new URL(`../src/app/study/curiosity/${name}.ts`, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('require', 'module', 'exports', code)(dependency => load(dependency.slice(2)), harnessModule, harnessModule.exports);
  modules.set(name, harnessModule.exports);
  return harnessModule.exports;
}
const { facts } = load('facts');
const { parseSaved, parseResume, discoveries, initialView, readMemory, SAVED_KEY, RESUME_KEY } = load('memory');

test('curiosity favorites use unique stable identities and reject unknown or duplicate saves', () => {
  assert.equal(new Set(facts.map(fact => fact.id)).size, 60);
  assert.deepEqual(parseSaved(JSON.stringify({ version: 1, ids: [facts[5].id, 'deleted-fact', facts[5].id, null] })), [facts[5].id]);
  assert.deepEqual(parseSaved(JSON.stringify({ version: 2, ids: [facts[5].id] })), []);
});
test('resume restores exact discovery, topic, search, and revealed state by identity', () => {
  const view = { ...initialView, category: 'Space', query: 'Moon', factId: 'moon-rotation', revealed: true };
  assert.deepEqual(parseResume(JSON.stringify({ version: 1, view }), []), view);
  assert.equal(discoveries(view, [facts[0].id])[0].id, 'moon-rotation');
});
test('invalid resume records cannot restore arbitrary filters or unknown discoveries', () => {
  for (const patch of [{ factId: 'unknown' }, { category: '__proto__' }, { query: 'x'.repeat(201) }, { savedOnly: 'yes' }, { revealed: 1 }]) {
    assert.equal(parseResume(JSON.stringify({ version: 1, view: { ...initialView, ...patch } }), []), null);
  }
  assert.equal(parseResume(JSON.stringify({ version: 2, view: initialView }), []), null);
});
test('removing a saved discovery cannot resume it inside the saved collection', () => {
  const view = { ...initialView, savedOnly: true, factId: facts[0].id, revealed: true };
  const resume = parseResume(JSON.stringify({ version: 1, view }), [facts[3].id]);
  assert.equal(resume.factId, facts[3].id);
  assert.equal(resume.revealed, false);
  assert.deepEqual(discoveries(view, []), []);
});
test('broken favorite data does not prevent valid resume data from being recovered', () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  try {
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem(key) { return key === SAVED_KEY ? '{broken' : key === RESUME_KEY ? JSON.stringify({ version: 1, view: { ...initialView, factId: 'sunlight-travel' } }) : null; } } });
    const memory = readMemory();
    assert.equal(memory.view.factId, 'sunlight-travel');
    assert.deepEqual(memory.saved, []);
    assert.ok(memory.warning);
  } finally { if (original) Object.defineProperty(globalThis, 'localStorage', original); else delete globalThis.localStorage; }
});
test('blocked storage falls back to exploration without claiming to have restored a place', () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  try {
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('blocked'); } });
    const memory = readMemory();
    assert.deepEqual(memory.view, initialView);
    assert.equal(memory.restored, false);
    assert.match(memory.warning, /could not|cannot|unavailable/);
  } finally { if (original) Object.defineProperty(globalThis, 'localStorage', original); else delete globalThis.localStorage; }
});

const { dailyFacts, localDay, linkedFact, discoveryLink, guesses, curiosityHandoff } = load('journey');
test('every discovery retains a stable ID, a source, and a usable question', () => {
  assert.equal(facts.length, 60);
  for (const fact of facts) {
    assert.match(fact.id, /^[a-z0-9-]+$/);
    assert.equal(new URL(fact.url).protocol, 'https:');
    assert.ok(fact.source && fact.text && fact.explore);
    if (facts.indexOf(fact) >= 24) assert.ok(fact.question);
  }
  for (const [id, quiz] of Object.entries(guesses)) {
    assert.ok(facts.some(fact => fact.id === id));
    assert.equal(quiz.options.length, 2);
    assert.ok(quiz.correct === 0 || quiz.correct === 1);
    assert.notEqual(quiz.options[0], quiz.options[1]);
  }
});
test('daily selection has five distinct topics, is repeatable, and changes with the date', () => {
  const today = dailyFacts('2026-11-13');
  assert.equal(today.length, 5);
  assert.equal(new Set(today.map(fact => fact.category)).size, 5);
  assert.deepEqual(dailyFacts('2026-11-13'), today);
  assert.notDeepEqual(dailyFacts('2026-11-14'), today);
  assert.equal(localDay(new Date(2026, 10, 13, 23, 59)), '2026-11-13');
});
test('old saves remain readable while a previous day’s daily view rolls forward', () => {
  const old = { ...initialView, daily: true, dailyDate: '2000-01-01', factId: facts[0].id, revealed: true };
  const view = parseResume(JSON.stringify({ version: 1, view: old }), []);
  assert.equal(view.dailyDate, localDay());
  assert.equal(view.revealed, false);
  assert.equal(discoveries(view, []).length, 5);
  assert.ok(dailyFacts(localDay()).some(fact => fact.id === view.factId));
  assert.deepEqual(parseResume(JSON.stringify({ version: 1, view: initialView }), []), initialView);
});
test('shared links resolve exact reviewed discoveries and reject arbitrary IDs', () => {
  const link = discoveryLink('https://eai.engineering', 'coral-animal');
  assert.equal(link, 'https://eai.engineering/study/curiosity?fact=coral-animal');
  assert.equal(linkedFact(new URL(link).search).id, 'coral-animal');
  assert.equal(linkedFact('?fact=constructor'), null);
  assert.throws(() => discoveryLink('https://eai.engineering', 'unknown'));
});
test('tutor handoff uses reviewed content and its source without taking arbitrary prompt text', () => {
  for (const fact of facts) {
    const prompt = curiosityHandoff(fact.id);
    assert.ok(prompt.message.includes(fact.text));
    assert.ok(prompt.message.includes(fact.url));
    assert.ok(prompt.message.length < 3000);
    assert.match(prompt.message, /not a source you have opened/);
    assert.ok(prompt.title.length <= 60);
  }
  assert.equal(curiosityHandoff('ignore-rules-and-send'), null);
});
