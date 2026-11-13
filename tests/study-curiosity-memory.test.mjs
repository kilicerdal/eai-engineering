import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';

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
const { insights, relatedDiscoveries, discoveryQuestion } = load('insights');
const { soundsMadeUpFacts, soundsMadeUpSources } = load('sounds-made-up');
const { expandedFacts, expansionSources } = load('expanded-facts');
const { parseSaved, parseResume, discoveries, initialView, readMemory, SAVED_KEY, RESUME_KEY } = load('memory');

test('V1.4 appends 90 sourced discoveries without changing any of the original 60 records', () => {
  // Digest of the complete V1.3 catalog, including source URLs, wording, and stable IDs.
  assert.equal(createHash('sha256').update(JSON.stringify(facts.slice(0,60))).digest('hex'), '9fa2bdda155b70101186e6b55bc87ad250ddda7d95cb8d9bf59db84591f41c6b');
  assert.equal(expandedFacts.length, 90);
  assert.deepEqual(facts.slice(60,150), expandedFacts);
  for (const fact of expandedFacts) {
    assert.deepEqual([fact.source, fact.url], expansionSources[fact.sourceKey]);
    assert.ok(fact.question && fact.explore && fact.why && fact.related.length === 2, fact.id);
  }
});
test('old and new saved identities, resume positions, and computing preferences remain readable together', () => {
  const saved = [facts[0].id, 'apollo-rope', 'qanat-gravity'];
  assert.deepEqual(parseSaved(JSON.stringify({version:1,ids:saved})), saved);
  const view = {...initialView,savedOnly:true,factId:'apollo-rope',revealed:true};
  assert.deepEqual(parseResume(JSON.stringify({version:1,view}),saved),view);
  assert.deepEqual(parseInterests(JSON.stringify({version:1,topics:{Space:'more','Computing & AI':'more',Nature:'less'}})),{Space:'more','Computing & AI':'more',Nature:'less'});
});

test('every discovery has concise context and two distinct, existing editorial connections', () => {
  assert.deepEqual(Object.keys(insights).sort(), facts.map(fact => fact.id).sort());
  for (const fact of facts) {
    const context = insights[fact.id];
    assert.ok(context.why.length > 60 && context.why.length < 350, fact.id);
    const related = relatedDiscoveries(fact.id);
    assert.equal(related.length, 2, fact.id);
    assert.equal(new Set(related.map(item => item.id)).size, 2, fact.id);
    assert.ok(related.every(item => item.id !== fact.id && item.url.startsWith('https://')), fact.id);
  }
});
test('connection questions preserve the existing prompts and unknown links yield no suggestions', () => {
  assert.deepEqual(relatedDiscoveries('not-a-discovery'), []);
  assert.equal(discoveryQuestion(facts[0]), 'Can a memory test teach you something?');
  assert.equal(discoveryQuestion(facts.find(fact => fact.id === 'first-transistor')), 'What tiny invention helped change everything?');
  for (const fact of facts) {
    assert.ok(discoveryQuestion(fact).endsWith('?'), fact.id);
    if (fact.question) assert.equal(discoveryQuestion(fact), fact.question);
  }
});

test('curiosity favorites use unique stable identities and reject unknown or duplicate saves', () => {
  assert.equal(new Set(facts.map(fact => fact.id)).size, 250);
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
test('same-day daily resume retains the V1.3 five after a catalog expansion', () => {
  const day = localDay(), originalFive = dailyFacts(day,facts.slice(0,60));
  const view = {...initialView,daily:true,dailyDate:day,factId:originalFive[3].id,revealed:true};
  const resumed = parseResume(JSON.stringify({version:1,view}),[]);
  assert.equal(resumed.factId,view.factId);
  assert.equal(resumed.revealed,true);
  assert.deepEqual(resumed.dailyIds,originalFive.map(fact=>fact.id));
  assert.deepEqual(discoveries(resumed,[]),originalFive);
});
test('daily snapshots retain their order, reject invalid sets, and roll to the expanded catalog tomorrow', () => {
  const day = localDay(), five = dailyFacts(day), dailyIds = five.map(fact=>fact.id);
  const view = {...initialView,daily:true,dailyDate:day,dailyIds,factId:five[2].id,revealed:true};
  assert.deepEqual(parseResume(JSON.stringify({version:1,view}),[]),view);
  assert.deepEqual(discoveries(view,[]),five);
  for(const invalid of [[...dailyIds.slice(0,4),'unknown'],Array(5).fill(five[0].id),dailyIds.slice(0,4),facts.filter(f=>f.category==='Space').slice(0,5).map(f=>f.id)]) {
    assert.equal(parseResume(JSON.stringify({version:1,view:{...view,dailyIds:invalid}}),[]),null);
  }
  const rolled = parseResume(JSON.stringify({version:1,view:{...view,dailyDate:'2000-01-01'}}),[]);
  assert.deepEqual(discoveries(rolled,[]),dailyFacts(day));
  assert.deepEqual(rolled.dailyIds,dailyFacts(day).map(fact=>fact.id));
  assert.deepEqual(parseResume(JSON.stringify({version:1,view:rolled}),[]),rolled);
  assert.equal(rolled.revealed,false);
});
test('every discovery retains a stable ID, a source, and a usable question', () => {
  assert.equal(facts.length, 250);
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

const { parseSeen, parsePreferences, markRead, readingOrder, surprisePool, defaultPreferences, readReading } = load('reading');
test('reading preferences accept only supported sizes and keep safe defaults for old or invalid data', () => {
  assert.deepEqual(parsePreferences(null), defaultPreferences);
  assert.deepEqual(parsePreferences(JSON.stringify({version:1,preferences:{focus:true,textSize:'largest',unreadFirst:false}})), {focus:true,textSize:'largest',unreadFirst:false});
  assert.deepEqual(parsePreferences(JSON.stringify({version:1,preferences:{focus:'yes',textSize:'tiny',unreadFirst:0}})), defaultPreferences);
});
test('read history is bounded to known discoveries and a repeat reveal updates recency without duplication', () => {
  const seen = parseSeen(JSON.stringify({version:1,ids:['moon-rotation','unknown','moon-rotation','coral-animal']}));
  assert.deepEqual(seen,['moon-rotation','coral-animal']);
  assert.deepEqual(markRead(seen,'moon-rotation'),['coral-animal','moon-rotation']);
  assert.deepEqual(markRead(seen,'unknown'),seen);
});
test('unread ordering retains an explicit resume anchor and keeps the remaining new discoveries ahead of old ones', () => {
  const list = facts.slice(0,5), seen = [list[0].id,list[2].id];
  const ordered = readingOrder(list,seen,true,list[0].id);
  assert.deepEqual(ordered.map(fact=>fact.id),[list[0].id,list[1].id,list[3].id,list[4].id,list[2].id]);
  assert.deepEqual(readingOrder(list,seen,false),list);
  assert.deepEqual(list,facts.slice(0,5));
});
test('Surprise me excludes the current discovery, prefers unread, and uses oldest reads when all have been revealed', () => {
  const list = facts.slice(0,10);
  assert.deepEqual(surprisePool(list,[list[0].id,list[1].id],list[2].id).map(fact=>fact.id),list.slice(3).map(fact=>fact.id));
  assert.deepEqual(surprisePool(list,list.map(fact=>fact.id),list[0].id).map(fact=>fact.id),list.slice(1,6).map(fact=>fact.id));
  assert.deepEqual(surprisePool([list[0]],[],list[0].id),[]);
});
test('blocked reading storage preserves exploration and does not touch favorites or resume', () => {
  const original = Object.getOwnPropertyDescriptor(globalThis,'localStorage');
  const requests=[];
  try {
    Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem(key){requests.push(key);throw new Error('blocked');}}});
    const reading = readReading();
    assert.deepEqual(reading.seen,[]);
    assert.deepEqual(reading.preferences,defaultPreferences);
    assert.ok(reading.warning);
    assert.ok(!requests.includes(SAVED_KEY) && !requests.includes(RESUME_KEY));
  } finally {if(original)Object.defineProperty(globalThis,'localStorage',original);else delete globalThis.localStorage;}
});

const { parseInterests, mixTopics, personalOrder, readInterests, INTERESTS_KEY } = load('interests');
test('topic preferences accept only known categories and bounded More/Less signals', () => {
  assert.deepEqual(parseInterests(JSON.stringify({version:1,topics:{Space:'more',Nature:'less',Unknown:'more',Learning:9}})),{Space:'more',Nature:'less'});
  assert.deepEqual(parseInterests(JSON.stringify({version:2,topics:{Space:'more'}})),{});
  assert.deepEqual(parseInterests(JSON.stringify({version:1,topics:['Space']})),{});
});
test('a preferred topic moves earlier without dropping other discoveries or changing order within a topic', () => {
  const mixed = mixTopics(facts,{Space:'more'});
  assert.equal(mixed[0].category,'Space');
  assert.ok(mixed.slice(0,10).some(fact=>fact.category!=='Space'));
  assert.equal(new Set(mixed.map(fact=>fact.id)).size,250);
  assert.deepEqual(new Set(mixed.map(fact=>fact.id)),new Set(facts.map(fact=>fact.id)));
  for(const topic of new Set(facts.map(fact=>fact.category))) assert.deepEqual(mixed.filter(fact=>fact.category===topic),facts.filter(fact=>fact.category===topic));
  assert.deepEqual(mixTopics(facts,{Space:'more'}),mixed);
});
test('Less delays a topic rather than deleting it from the feed', () => {
  const less = mixTopics(facts,{Space:'less'}), more = mixTopics(facts,{Space:'more'});
  assert.notEqual(less[0].category,'Space');
  assert.ok(less.slice(0,20).filter(fact=>fact.category==='Space').length<more.slice(0,20).filter(fact=>fact.category==='Space').length);
  assert.equal(less.filter(fact=>fact.category==='Space').length,facts.filter(fact=>fact.category==='Space').length);
});
test('personalization keeps resume anchored and unread facts ahead of previously revealed favorites', () => {
  const seen = facts.filter(fact=>fact.category==='Space').map(fact=>fact.id);
  const anchor = seen[0], ordered = personalOrder(facts,{Space:'more'},seen,true,anchor);
  assert.equal(ordered[0].id,anchor);
  const remaining = ordered.slice(1), firstRead = remaining.findIndex(fact=>seen.includes(fact.id));
  assert.equal(firstRead,facts.filter(fact=>!seen.includes(fact.id)).length);
});
test('reset topic choices returns V1.1 ordering without resetting read history or explicit order settings', () => {
  const seen = [facts[0].id,facts[2].id];
  assert.deepEqual(personalOrder(facts,{},seen,true,facts[2].id),readingOrder(facts,seen,true,facts[2].id));
  assert.deepEqual(personalOrder(facts,{},seen,false,facts[2].id),facts);
});
test('topic preference storage failures do not read or write existing save or reading keys', () => {
  const original=Object.getOwnPropertyDescriptor(globalThis,'localStorage'),requests=[];
  try {
    Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem(key){requests.push(key);throw new Error('blocked');}}});
    const result=readInterests();
    assert.deepEqual(result.topics,{});assert.ok(result.warning);assert.deepEqual(requests,[INTERESTS_KEY]);
  } finally {if(original)Object.defineProperty(globalThis,'localStorage',original);else delete globalThis.localStorage;}
});


test('V1.5 appends exactly 100 original sourced cards while preserving all 150 V1.4 records', () => {
  assert.equal(createHash('sha256').update(JSON.stringify(facts.slice(0,150))).digest('hex'), 'a5a1eeb3a5b36b6a19e2c02f0ce0d87f33256e62d93ca815256183af6269e8d0');
  assert.equal(soundsMadeUpFacts.length,100);
  assert.deepEqual(facts.slice(150),soundsMadeUpFacts);
  assert.equal(new Set(facts.map(fact=>fact.title.toLowerCase())).size,250);
  assert.equal(new Set(facts.map(discoveryQuestion)).size,250);
  for(const fact of soundsMadeUpFacts) {
    const source = soundsMadeUpSources[fact.sourceKey];
    assert.deepEqual([fact.source,fact.url],[source.label,source.url]);
    assert.match(source.reviewedOn,/^2026-11-13$/);
    assert.equal(fact.collection,'sounds-made-up');
    assert.ok(fact.title.length < 150 && fact.text.length < 450,fact.id);
    assert.equal(fact.related.length,2);
  }
});
test('Sounds Made Up filters and resumes by stable ID without losing existing saved cards', () => {
  const saved=['retrieval-practice','apollo-rope','flamingo-pink'];
  assert.deepEqual(parseSaved(JSON.stringify({version:1,ids:saved})),saved);
  const view={...initialView,collection:'sounds-made-up',factId:'flamingo-pink',revealed:true};
  const resumed=parseResume(JSON.stringify({version:1,view}),saved);
  assert.deepEqual(resumed,view);
  assert.equal(discoveries(resumed,saved).length,100);
  assert.ok(discoveries({...view,category:'Space'},saved).every(fact=>fact.collection==='sounds-made-up' && fact.category==='Space'));
  assert.equal(discoveries({...initialView,savedOnly:true},saved).length,3);
  assert.equal(parseResume(JSON.stringify({version:1,view:{...view,collection:'arbitrary'}}),saved),null);
  assert.equal(parseResume(JSON.stringify({version:1,view:{...view,daily:true}}),saved),null);
});
test('V1.4 daily snapshots survive expansion to 250 and new daily selections stay varied', () => {
  const day=localDay(), dailyIds=dailyFacts(day,facts.slice(0,150)).map(fact=>fact.id);
  const view={...initialView,daily:true,dailyDate:day,dailyIds,factId:dailyIds[2],revealed:true};
  assert.deepEqual(parseResume(JSON.stringify({version:1,view}),[]),view);
  assert.deepEqual(discoveries(view,[]).map(fact=>fact.id),dailyIds);
  assert.equal(new Set(dailyFacts(day).map(fact=>fact.category)).size,5);
});
