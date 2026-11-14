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
const { yourWorldFacts, yourWorldSources } = load('your-world');
const { matchesDiscovery } = load('search');
const { sourceDetails } = load('provenance');
const { hiddenConnectionFacts, hiddenConnectionSources } = load('hidden-connections');
const { everydayWonderFacts, everydayWonderSources } = load('everyday-wonders');
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
  assert.equal(new Set(facts.map(fact => fact.id)).size, 950);
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
  assert.equal(facts.length, 950);
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

const { parseSeen, parsePreferences, markRead, readingOrder, surprisePool, unreadSurprisePool, defaultPreferences, readReading, SEEN_KEY, READING_KEY } = load('reading');
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
  assert.equal(new Set(mixed.map(fact=>fact.id)).size,950);
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
  assert.deepEqual(facts.slice(150,250),soundsMadeUpFacts);
  assert.equal(new Set(facts.map(fact=>fact.title.toLowerCase())).size,950);
  assert.equal(new Set(facts.map(discoveryQuestion)).size,950);
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


test('V1.6 appends 100 Everyday Wonders while preserving all 250 complete existing records', () => {
  assert.equal(createHash('sha256').update(JSON.stringify(facts.slice(0,250))).digest('hex'), 'ed4af805987ef6e4c7c844dfa34fc6f808c68a75455634290f300b0ca8cd51f1');
  assert.equal(facts.length,950);
  assert.deepEqual(facts.slice(250,350),everydayWonderFacts);
  assert.equal(everydayWonderFacts.length,100);
  assert.equal(new Set(facts.map(fact=>fact.id)).size,950);
  assert.equal(new Set(facts.map(fact=>fact.title.toLowerCase())).size,950);
  assert.equal(new Set(facts.map(discoveryQuestion)).size,950);
  for(const fact of everydayWonderFacts) {
    const source=everydayWonderSources[fact.sourceKey];
    assert.deepEqual([fact.source,fact.url],[source.label,source.url]);
    assert.equal(source.reviewedOn,'2026-11-13');
    assert.equal(fact.collection,'everyday-wonders');
    assert.ok(fact.question.endsWith('?') && fact.title.length<150 && fact.text.length<450,fact.id);
    assert.ok(fact.explore.length>30,fact.id);
  }
});
test('new topics, old preferences, and mixed saves survive Everyday Wonders resume', () => {
  const saved=['retrieval-practice','flamingo-pink','banana-herb','cloud-mass'];
  assert.deepEqual(parseSaved(JSON.stringify({version:1,ids:saved})),saved);
  const view={...initialView,collection:'everyday-wonders',category:'Food & Drink',factId:'banana-herb',revealed:true};
  assert.deepEqual(parseResume(JSON.stringify({version:1,view}),saved),view);
  assert.equal(discoveries({...view,category:'All discoveries'},saved).length,100);
  assert.equal(discoveries(view,saved).length,30);
  assert.equal(discoveries({...view,category:'Earth & Weather'},saved).length,30);
  assert.equal(discoveries({...initialView,savedOnly:true},saved).length,4);
  assert.deepEqual(parseInterests(JSON.stringify({version:1,topics:{Space:'more',Nature:'less','Food & Drink':'more','Earth & Weather':'less'}})),{Space:'more',Nature:'less','Food & Drink':'more','Earth & Weather':'less'});
  assert.equal(curiosityHandoff('banana-herb').subject,'science');
  assert.equal(curiosityHandoff('cloud-mass').subject,'science');
});
test('V1.5 daily snapshots keep the same five identities after expansion', () => {
  const day=localDay(),dailyIds=dailyFacts(day,facts.slice(0,250)).map(fact=>fact.id);
  const view={...initialView,daily:true,dailyDate:day,dailyIds,factId:dailyIds[2],revealed:true};
  assert.deepEqual(parseResume(JSON.stringify({version:1,view}),[]),view);
  assert.deepEqual(discoveries(view,[]).map(fact=>fact.id),dailyIds);
});


test('V1.7 appends 100 reviewed Hidden Connections without changing any complete V1.6 record', () => {
  assert.equal(createHash('sha256').update(JSON.stringify(facts.slice(0,350))).digest('hex'),'4ac5e7f812bfb43dfacb860f5452820ab4efc667c5d9272c9ef7a87fd692b0c0');
  const previousInsights=Object.fromEntries(facts.slice(0,350).map(fact=>[fact.id,insights[fact.id]]));
  assert.equal(createHash('sha256').update(JSON.stringify(previousInsights)).digest('hex'),'a62e10f679d4890739cb6482f8e4b5a03ae45ad184cc8ff8388a3527d0cb38ec');
  assert.equal(hiddenConnectionFacts.length,100);
  assert.deepEqual(facts.slice(350,450),hiddenConnectionFacts);
  assert.equal(facts.length,950);
  assert.equal(new Set(facts.map(fact=>fact.id)).size,950);
  assert.equal(new Set(facts.map(fact=>fact.title.toLowerCase())).size,950);
  assert.equal(new Set(facts.map(discoveryQuestion)).size,950);
  for(const fact of hiddenConnectionFacts) {
    const source=hiddenConnectionSources[fact.sourceKey];
    assert.deepEqual([fact.source,fact.url],[source.label,source.url]);
    assert.equal(source.reviewedOn,'2026-11-13');
    assert.equal(fact.collection,'hidden-connections');
    assert.ok(fact.title.length<150 && fact.text.length<450 && fact.explore.length>30,fact.id);
  }
});
test('Hidden Connections resumes alongside saved cards, previous collections and topic choices', () => {
  const saved=['retrieval-practice','flamingo-pink','banana-herb','kingfisher-train'];
  assert.deepEqual(parseSaved(JSON.stringify({version:1,ids:saved})),saved);
  const view={...initialView,collection:'hidden-connections',category:'Inventions',query:'kingfisher',factId:'kingfisher-train',revealed:true};
  assert.deepEqual(parseResume(JSON.stringify({version:1,view}),saved),view);
  assert.equal(discoveries({...initialView,collection:'hidden-connections'},saved).length,100);
  assert.equal(discoveries({...initialView,collection:'everyday-wonders'},saved).length,100);
  assert.equal(discoveries({...initialView,collection:'sounds-made-up'},saved).length,100);
  assert.deepEqual(parseInterests(JSON.stringify({version:1,topics:{Space:'more',Nature:'less','Food & Drink':'more'}})),{Space:'more',Nature:'less','Food & Drink':'more'});
  assert.equal(discoveries({...initialView,savedOnly:true},saved).length,4);
  assert.equal(parseResume(JSON.stringify({version:1,view:{...view,savedOnly:true}}),saved),null);
});
test('unread-only surprise excludes read and current cards and never falls back to repeats', () => {
  const list=hiddenConnectionFacts.slice(0,5),read=[list[0].id,list[2].id];
  const original=JSON.stringify({list,read});
  assert.deepEqual(unreadSurprisePool(list,read,list[1].id),[list[3],list[4]]);
  assert.deepEqual(unreadSurprisePool(list,list.map(f=>f.id),list[1].id),[]);
  assert.deepEqual(unreadSurprisePool([list[0]],[],list[0].id),[]);
  assert.deepEqual(unreadSurprisePool([],[],''),[]);
  assert.equal(JSON.stringify({list,read}),original);
  // Prefer unread may be off; this explicit action remains strict.
  const prefs=parsePreferences(JSON.stringify({version:1,preferences:{unreadFirst:false}}));
  assert.equal(prefs.unreadFirst,false);
  assert.ok(unreadSurprisePool(list,read,'').every(f=>!read.includes(f.id)));
});
test('strict surprise respects saved, daily, collection, search and topic selections', () => {
  const saved=['banana-herb','kingfisher-train','shushtar-mills','quartz-radio'];
  const views=[{...initialView,savedOnly:true},{...initialView,collection:'hidden-connections',category:'Inventions',query:'crystal'}, {...initialView,collection:'everyday-wonders',category:'Food & Drink'}];
  for(const view of views) {
    const filtered=discoveries(view,saved),read=filtered.slice(0,2).map(f=>f.id),current=filtered[2]?.id||'';
    const choices=unreadSurprisePool(filtered,read,current);
    assert.ok(choices.every(f=>filtered.includes(f)&&!read.includes(f.id)&&f.id!==current));
  }
  const day=localDay(),dailyIds=dailyFacts(day,facts.slice(0,350)).map(f=>f.id);
  const view={...initialView,daily:true,dailyDate:day,dailyIds,factId:dailyIds[1],revealed:true};
  assert.deepEqual(parseResume(JSON.stringify({version:1,view}),saved),view);
  assert.deepEqual(discoveries(view,saved).map(f=>f.id),dailyIds);
  assert.ok(unreadSurprisePool(discoveries(view,saved),[dailyIds[0]],dailyIds[1]).every(f=>dailyIds.includes(f.id)));
});

test('V1.8 appends 100 reviewed cards and preserves all 450 complete records and insights', () => {
  assert.equal(createHash('sha256').update(JSON.stringify(facts.slice(0,450))).digest('hex'),'2dde7f642d0393297c950f87104bf4c1323460c923c741a2445478795abd171f');
  const previous=Object.fromEntries(facts.slice(0,450).map(f=>[f.id,insights[f.id]]));
  assert.equal(createHash('sha256').update(JSON.stringify(previous)).digest('hex'),'7210ac86aa6ab13ea833bfc2ea60985e78b9d7901ee42b83c6a759848d8cc3a7');
  assert.equal(yourWorldFacts.length,100);
  assert.deepEqual(facts.slice(450,550),yourWorldFacts);
  for(const fact of yourWorldFacts) {
    const source=yourWorldSources[fact.sourceKey];
    assert.deepEqual([fact.source,fact.url],[source.label,source.url]);
    assert.equal(source.reviewedOn,'2026-11-13');
    assert.equal(fact.collection,'your-world');
    assert.ok(fact.question.endsWith('?') && fact.text.length<450 && fact.explore.length>30,fact.id);
  }
});
test('search finds questions, editorial significance, publishers and words in any order', () => {
  const soap=yourWorldFacts.find(f=>f.id==='soap-two-ends');
  assert.ok(matchesDiscovery(soap,'cooperate')); // question only
  assert.ok(matchesDiscovery(soap,'interface connector')); // significance only
  assert.ok(matchesDiscovery(soap,'American Cleaning Institute'));
  assert.ok(matchesDiscovery(soap,'OIL   water soap'));
  assert.ok(matchesDiscovery(facts.find(f=>f.id==='gobekli-builders'),'gobekli'));
  assert.ok(matchesDiscovery(facts.find(f=>f.id==='mobius-strip'),'MOBIUS'));
  assert.ok(matchesDiscovery(soap,'oil-attracting'));
  assert.equal(matchesDiscovery(soap,'oil volcano'),false);
  assert.ok(matchesDiscovery(soap,'   '));
});
test('expanded search intersects topic, saved and collection filters and restores an exact match', () => {
  const saved=['soap-two-ends','pigeon-crop-milk','retrieval-practice'];
  const view={...initialView,collection:'your-world',category:'Everyday science',query:'cooperate',factId:'soap-two-ends',revealed:true};
  assert.deepEqual(discoveries(view,saved).map(f=>f.id),['soap-two-ends']);
  assert.deepEqual(parseResume(JSON.stringify({version:1,view}),saved),view);
  assert.equal(discoveries({...view,category:'Space'},saved).length,0);
  assert.equal(discoveries({...initialView,savedOnly:true,query:'cooperate'},saved).length,1);
  assert.equal(discoveries({...initialView,collection:'your-world'},saved).length,100);
  assert.deepEqual(parseSaved(JSON.stringify({version:1,ids:saved})),saved);
});
test('source details preserve the citation and distinguish documented checks from missing dates', () => {
  for(const fact of facts) {
    const before=JSON.stringify(fact),detail=sourceDetails(fact);
    assert.equal(detail.url,fact.url);
    assert.equal(detail.label,fact.source);
    assert.equal(detail.publisher,fact.source.split(' · ')[0]);
    assert.ok(detail.host && !detail.host.includes('/'));
    assert.equal(detail.reviewedOn,facts.indexOf(fact)<60?undefined:facts.indexOf(fact)<750?'2026-11-13':'2026-11-14');
    assert.equal(JSON.stringify(fact),before);
  }
});
test('V1.8 preserves pre-expansion daily snapshots, strict unread choices and user settings', () => {
  const day=localDay(),dailyIds=dailyFacts(day,facts.slice(0,450)).map(f=>f.id);
  const view={...initialView,daily:true,dailyDate:day,dailyIds,factId:dailyIds[2],revealed:true};
  assert.deepEqual(parseResume(JSON.stringify({version:1,view}),[]),view);
  assert.deepEqual(discoveries(view,[]).map(f=>f.id),dailyIds);
  const list=discoveries({...initialView,collection:'your-world',query:'Purdue'},[]);
  const seen=list.slice(0,-1).map(f=>f.id);
  assert.deepEqual(unreadSurprisePool(list,seen,list[0].id).map(f=>f.id),[list.at(-1).id]);
  assert.deepEqual(unreadSurprisePool(list,list.map(f=>f.id),''),[]);
  assert.deepEqual(parsePreferences(JSON.stringify({version:1,preferences:{focus:true,textSize:'largest',unreadFirst:false}})),{focus:true,textSize:'largest',unreadFirst:false});
  assert.deepEqual(parseInterests(JSON.stringify({version:1,topics:{Space:'more',Nature:'less'}})),{Space:'more',Nature:'less'});
});

const {smallThingsFacts,smallThingsSources}=load('small-things');
const {readArrivals,arrivalIds,parseCatalog,parseVisit,CATALOG_KEY}=load('arrivals');
const {concernReport}=load('concerns');
function visitStore(entries={}) {const map=new Map(Object.entries(entries));return {getItem:key=>map.get(key)??null,setItem:(key,value)=>map.set(key,value),map};}
test('V1.9 appends exactly 100 unique sourced discoveries and preserves all 550 existing records',()=>{
  assert.equal(createHash('sha256').update(JSON.stringify(facts.slice(0,550))).digest('hex'),'59ddd81c4eda20a3e924e84e20147efe8b8862ed5a1ee78e031a071449a7482f');
  assert.equal(facts.length,950);assert.equal(smallThingsFacts.length,100);assert.deepEqual(facts.slice(550,650),smallThingsFacts);
  for(const fact of smallThingsFacts){const source=smallThingsSources[fact.sourceKey];assert.equal(fact.url,source.url);assert.equal(fact.source,source.label);assert.equal(source.reviewedOn,'2026-11-13');assert.equal(fact.collection,'small-things');assert.ok(fact.question.endsWith('?'));}
});
test('first tracked visit honestly shows the latest batch and refresh keeps that selection',()=>{
  const local=visitStore(),session=visitStore();
  assert.deepEqual(readArrivals(['a','b','c'],['c'],local,session),{ids:['c'],kind:'latest',warning:''});
  assert.deepEqual(readArrivals(['a','b','c'],['c'],local,session).ids,['c']);
  assert.deepEqual(readArrivals(['a','b','c'],['c'],local,visitStore()),{ids:[],kind:'since-visit',warning:''});
});
test('later visits show only added identities and retain a fixed baseline while exploring',()=>{
  const local=visitStore({[CATALOG_KEY]:JSON.stringify({version:1,ids:['a','b']})}),session=visitStore();
  assert.deepEqual(readArrivals(['a','b','c'],['c'],local,session).ids,['c']);
  assert.deepEqual(readArrivals(['a','b','c'],['c'],local,session).ids,['c']);
  assert.deepEqual(readArrivals(['a','b','c','d'],['d'],local,visitStore()).ids,['d']);
});
test('an older cached catalog cannot remove identities recorded by a newer tab',()=>{
  const local=visitStore({[CATALOG_KEY]:JSON.stringify({version:1,ids:['a','b','c']})});readArrivals(['a','b'],['b'],local,visitStore());
  assert.deepEqual(parseCatalog(local.getItem(CATALOG_KEY)),['a','b','c']);
});
test('unavailable visit storage degrades to latest additions without touching saves',()=>{
  const unavailable={getItem(){throw Error('disabled')},setItem(){throw Error('disabled')}};
  const result=readArrivals(['a','b'],['b'],unavailable,unavailable);assert.deepEqual(result.ids,['b']);assert.ok(result.warning);assert.equal(result.kind,'latest');
});
test('malformed visit metadata cannot introduce invalid or duplicated identities',()=>{
  for(const raw of ['{','null','{"version":2,"ids":["a"]}','{"version":1,"ids":["a","a"]}','{"version":1,"ids":["<script>"]}'])assert.equal(parseCatalog(raw),null);
  assert.equal(parseVisit('{"version":1,"baselineIds":4}'),null);assert.deepEqual(arrivalIds(['a','b'],['a'],['a']),['b']);
});
test('new-only filtering intersects topic/search and resume validates its snapshot',()=>{
  const ids=smallThingsFacts.map(fact=>fact.id);const view={...initialView,newOnly:true,newIds:ids,factId:ids[0]};
  assert.equal(discoveries(view,[]).length,100);assert.equal(discoveries({...initialView,collection:'small-things'},[]).length,100);
  assert.deepEqual(parseResume(JSON.stringify({version:1,view}),[]),view);
  assert.ok(discoveries({...view,category:'Nature'},[]).every(f=>f.category==='Nature'&&ids.includes(f.id)));
  assert.equal(parseResume(JSON.stringify({version:1,view:{...view,newIds:['unknown']}}),[]),null);
  assert.equal(parseResume(JSON.stringify({version:1,view:{...view,savedOnly:true}}),[]),null);
});
test('concern handoff includes the selected discovery and encodes notes without adding mail headers',()=>{
  const fact=smallThingsFacts[0],note='Check & clarify?\nBcc: nobody@example.test';const report=concernReport(fact,'Source link problem',note);
  const url=new URL(report.mailto);assert.equal(url.pathname,'support@eai.engineering');assert.equal(url.searchParams.get('body'),report.body);assert.equal(url.searchParams.get('bcc'),null);
  assert.ok(report.body.includes(`Discovery ID: ${fact.id}\n`));assert.ok(report.body.includes(fact.url));assert.ok(report.body.includes(note));assert.ok(!report.body.includes('\\n'));
  assert.ok(concernReport(fact,'invalid','x'.repeat(1200)).body.endsWith('Reader note: '+'x'.repeat(1000)));
  assert.ok(concernReport(fact,'invalid','').body.includes('Reason: Claim may be incorrect'));
});

const {worldWonderFacts,worldWonderSources}=load('world-wonders');
const {COLLECTIONS_KEY,parseCollections,collectionName,createCollection,renameCollection,putInCollection,deleteCollection}=load('collections');
const {wrapCardText,drawShareCard,CARD_WIDTH,CARD_HEIGHT}=load('share-card');
test('V2.0 adds 100 new sourced identities, preserving every earlier discovery byte for byte',()=>{
  assert.equal(createHash('sha256').update(JSON.stringify(facts.slice(0,650))).digest('hex'),'ebc0156aeb0d231a8758ff57840e4e4f31a0c9911362b98759afe41c6e7f3575');
  assert.equal(facts.length,950);assert.equal(worldWonderFacts.length,100);assert.deepEqual(facts.slice(650,750),worldWonderFacts);
  assert.equal(new Set(facts.map(f=>f.id)).size,950);assert.equal(new Set(facts.map(discoveryQuestion)).size,950);
  for(const fact of worldWonderFacts){const source=worldWonderSources[fact.sourceKey];assert.equal(fact.url,source.url);assert.equal(fact.source,source.label);assert.equal(sourceDetails(fact).reviewedOn,'2026-11-13');assert.equal(fact.collection,'world-worth-wondering');}
  assert.equal(discoveries({...initialView,collection:'world-worth-wondering'},[]).length,100);
});
test('personal collections preserve independently saved identities when renamed, edited, or deleted',()=>{
  const saved=[facts[0].id,facts[749].id],copy=[...saved];
  let items=createCollection([],'test-one','  Mind-blowing  ');items=createCollection(items,'test-two','For the kids');
  items=putInCollection(items,'test-one',saved[0],true);items=putInCollection(items,'test-two',saved[0],true);items=putInCollection(items,'test-one',saved[1],true);
  assert.equal(items[0].ids.length,2);assert.equal(items[1].ids.length,1);
  items=renameCollection(items,'test-one','Engineering ideas');assert.equal(items[0].name,'Engineering ideas');
  items=putInCollection(items,'test-one',saved[0],false);assert.deepEqual(items[1].ids,[saved[0]]);
  const removed=items[0];items=deleteCollection(items,'test-one');assert.equal(items.length,1);assert.deepEqual(saved,copy);
  assert.deepEqual(parseSaved(JSON.stringify({version:1,ids:saved})),copy);
  assert.deepEqual(parseCollections(JSON.stringify({version:1,collections:[...items,removed]})),[...items,removed]);
  assert.notEqual(COLLECTIONS_KEY,SAVED_KEY);assert.notEqual(COLLECTIONS_KEY,RESUME_KEY);
});
test('collection names, capacity, duplicate identities and malformed storage are bounded',()=>{
  assert.equal(collectionName(' A   name '),'A name');assert.equal(collectionName('x'.repeat(70)).length,48);
  const one=createCollection([],'one','My ideas');assert.throws(()=>createCollection(one,'two','my IDEAS'));assert.throws(()=>renameCollection(one,'one','   '));
  assert.throws(()=>createCollection(Array.from({length:30},(_,i)=>({id:'c-'+i,name:'C '+i,ids:[]})),'extra','More'));
  for(const raw of ['{','null','{"version":2,"collections":[]}',JSON.stringify({version:1,collections:[one[0],one[0]]})])assert.throws(()=>parseCollections(raw));
  assert.deepEqual(parseCollections(null),[]);
  assert.deepEqual(parseCollections(JSON.stringify({version:1,collections:[{...one[0],ids:[facts[0].id,facts[0].id,'unknown']}]}))[0].ids,[facts[0].id]);
});
test('personal collection views preserve member order and intersect search without changing Saved',()=>{
  const memberIds=[worldWonderFacts[20].id,worldWonderFacts[0].id];const view={...initialView,personalId:'one',personalName:'My ideas',personalIds:memberIds,factId:memberIds[0]};
  assert.deepEqual(discoveries(view,[]).map(f=>f.id),memberIds);assert.deepEqual(parseResume(JSON.stringify({version:1,view}),[]),view);
  assert.ok(discoveries({...view,query:'nautilus'},[]).every(f=>memberIds.includes(f.id)&&matchesDiscovery(f,'nautilus')));
  assert.equal(parseResume(JSON.stringify({version:1,view:{...view,personalIds:['missing']}}),[]),null);
  assert.equal(parseResume(JSON.stringify({version:1,view:{...view,savedOnly:true}}),[]),null);
});
test('share text wrapping retains all words, handles long URLs and respects a width bound',()=>{
  const measure=text=>Array.from(text).length;const lines=wrapCardText('A small discovery with a verylongunbrokentoken',12,measure);
  assert.ok(lines.every(line=>measure(line)<=12));assert.equal(lines.join('').replace(/\s/g,''),'Asmalldiscoverywithaverylongunbrokentoken');
  assert.deepEqual(wrapCardText('',12,measure),[]);assert.equal(wrapCardText('🌍'.repeat(10),3,measure).join(''),'🌍'.repeat(10));
});
test('every discovery can produce a bounded share card with its complete claim and a stable discovery URL',async()=>{
  for(const fact of facts){const drawn=[];const ctx={font:'20px Arial',fillStyle:'',strokeStyle:'',lineWidth:1,textBaseline:'top',fillRect(){},strokeRect(){},beginPath(){},ellipse(){},stroke(){},moveTo(){},lineTo(){},createLinearGradient(){return{addColorStop(){}}},measureText(text){return{width:Array.from(text).length*parseInt(this.font)*.55}},fillText(text,x,y){drawn.push({text,x,y,width:this.measureText(text).width})}};
    const canvas={width:0,height:0,getContext:()=>ctx};await drawShareCard(canvas,fact,'/unavailable-test-image.webp');
    assert.equal(canvas.width,CARD_WIDTH);assert.equal(canvas.height,CARD_HEIGHT);
    assert.ok(drawn.every(line=>line.x>=0&&line.y>=0&&line.y+parseInt(ctx.font)<CARD_HEIGHT&&line.width<=1040),fact.id);
    const written=drawn.map(line=>line.text).join('').replace(/\s/g,'');assert.ok(written.includes(fact.title.replace(/\s/g,'')),fact.id);assert.ok(written.includes(fact.text.replace(/\s/g,'')),fact.id);assert.ok(written.includes(`eai.engineering/study/curiosity?fact=${fact.id}`),fact.id);
  }
});

const {plainSightFacts,plainSightSources}=load('hidden-in-plain-sight');
const {BACKUP_FORMAT,BACKUP_LIMIT,backupText,parseBackup,localSnapshot,mergeBackup,restoreBackup,RestoreError}=load('backup');
test('V2.1 preserves all 750 complete records and appends 100 sourced discoveries with valid links and context',()=>{
  assert.equal(createHash('sha256').update(JSON.stringify(facts.slice(0,750))).digest('hex'),'787928bc1d2ee3413e2c705731e1338cafd8fa6681c5e839a6cc00f3e3ffb0c7');
  assert.equal(facts.length,950);assert.equal(plainSightFacts.length,100);assert.deepEqual(facts.slice(750,850),plainSightFacts);
  for(const f of plainSightFacts){assert.equal(f.collection,'hidden-in-plain-sight');assert.equal(f.url,plainSightSources[f.sourceKey].url);assert.equal(sourceDetails(f).reviewedOn,'2026-11-14');assert.ok(insights[f.id].why.length>60);assert.equal(relatedDiscoveries(f.id).length,2);}
  const view={...initialView,collection:'hidden-in-plain-sight',factId:plainSightFacts[0].id};
  assert.equal(discoveries(view,[]).length,100);assert.deepEqual(parseResume(JSON.stringify({version:1,view}),[]),view);
});
const emptySnapshot=()=>({saved:[],collections:[],seen:[],reading:{focus:false,textSize:'regular',unreadFirst:true},topics:{},resume:null});
const sampleSnapshot=()=>({saved:[facts[0].id,facts[849].id],collections:[{id:'sample-one',name:'My discoveries',ids:[facts[0].id,facts[750].id]}],seen:[facts[0].id],reading:{focus:true,textSize:'largest',unreadFirst:false},topics:{Space:'more',Nature:'less'},resume:{...initialView,factId:facts[0].id,revealed:true}});
function testStore(data=emptySnapshot()){
 const values=new Map([['unrelated.app.key','untouched'],[SAVED_KEY,JSON.stringify({version:1,ids:data.saved})],[COLLECTIONS_KEY,JSON.stringify({version:1,collections:data.collections})],[SEEN_KEY,JSON.stringify({version:1,ids:data.seen})],[READING_KEY,JSON.stringify({version:1,preferences:data.reading})],[INTERESTS_KEY,JSON.stringify({version:1,topics:data.topics})]]);
 if(data.resume)values.set(RESUME_KEY,JSON.stringify({version:1,view:data.resume}));
 return {values,getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key)};
}
test('backup round-trip retains every personal field while excluding unrelated browser data and facts',()=>{
 const data=sampleSnapshot(),store=testStore(data),state=localSnapshot(store),raw=backupText(state.data,new Date('2026-11-14T16:00:00Z')),parsed=parseBackup(raw);
 assert.deepEqual(parsed.data,data);assert.equal(parsed.format,BACKUP_FORMAT);assert.equal(parsed.skipped,0);assert.ok(!raw.includes('unrelated.app.key'));assert.ok(!raw.includes(facts[750].text));
 const withExtra=JSON.parse(raw);withExtra.data.resume.unrelatedSecret='not-exported';assert.ok(!backupText(parseBackup(JSON.stringify(withExtra)).data).includes('not-exported'));
});
test('backup rejects malformed, unsupported, oversized, and wrongly typed data before any mutation',()=>{
 const base=JSON.parse(backupText(sampleSnapshot()));
 for(const raw of ['{','null','[]',JSON.stringify({...base,version:2}),JSON.stringify({...base,format:'other-app'}),JSON.stringify({...base,createdAt:'yesterday'}),' '.repeat(BACKUP_LIMIT+1),JSON.stringify({...base,data:{...base.data,saved:'wrong'}}),JSON.stringify({...base,data:{...base.data,reading:{focus:'yes',textSize:'largest',unreadFirst:true}}}),JSON.stringify({...base,data:{...base.data,collections:[{id:'bad/id',name:'Invalid',ids:[]}]}}),JSON.stringify({...base,data:{...base.data,topics:{Space:'sometimes'}}})])assert.throws(()=>parseBackup(raw));
 const store=testStore();store.setItem(SAVED_KEY,'{');const before=[...store.values];assert.throws(()=>localSnapshot(store));assert.deepEqual([...store.values],before);
});
test('unavailable discovery IDs are skipped once and duplicate entries are deduplicated',()=>{
 const value=JSON.parse(backupText(sampleSnapshot()));value.data.saved.push('future-fact',facts[0].id);value.data.seen.push('future-fact');value.data.collections[0].ids.push('future-fact');value.data.resume.factId='future-fact';
 const parsed=parseBackup(JSON.stringify(value));assert.equal(parsed.skipped,1);assert.equal(parsed.data.resume,null);assert.equal(parsed.data.saved.length,2);assert.equal(parsed.data.collections[0].ids.length,2);
});
test('restore merges saves, history, and collection membership without replacing settings or resume by default',()=>{
 const current=sampleSnapshot(),incoming=sampleSnapshot();incoming.saved=[facts[1].id];incoming.seen=[facts[2].id];incoming.collections[0].name='A different name';incoming.collections[0].ids=[facts[2].id];incoming.reading=emptySnapshot().reading;incoming.topics={Learning:'more'};incoming.resume={...initialView,factId:facts[1].id};
 const store=testStore(current),before=localSnapshot(store),backup=parseBackup(backupText(incoming)),plan=restoreBackup(store,backup,{preferences:false,place:false},before.fingerprint),after=localSnapshot(store).data;
 assert.deepEqual(after.saved,[...current.saved,facts[1].id]);assert.deepEqual(after.collections[0].ids,[...current.collections[0].ids,facts[2].id]);assert.equal(after.collections[0].name,current.collections[0].name);assert.deepEqual(after.reading,current.reading);assert.deepEqual(after.topics,current.topics);assert.deepEqual(after.resume,current.resume);assert.equal(store.getItem('unrelated.app.key'),'untouched');assert.equal(plan.addedSaved,1);
 const again=restoreBackup(store,backup,{preferences:false,place:false},localSnapshot(store).fingerprint);assert.equal(again.addedSaved,0);assert.equal(again.addedMemberships,0);
});
test('explicit restore options import preferences and a refreshed collection resume',()=>{
 const current=sampleSnapshot(),incoming=emptySnapshot();incoming.reading={focus:false,textSize:'large',unreadFirst:true};incoming.topics={Learning:'more'};incoming.collections=[{id:'sample-one',name:'Imported name',ids:[facts[2].id]}];incoming.resume={...initialView,personalId:'sample-one',personalName:'Imported name',personalIds:[facts[2].id],factId:facts[2].id,revealed:true};
 const store=testStore(current);restoreBackup(store,parseBackup(backupText(incoming)),{preferences:true,place:true},localSnapshot(store).fingerprint);const after=localSnapshot(store).data;
 assert.deepEqual(after.reading,incoming.reading);assert.deepEqual(after.topics,incoming.topics);assert.equal(after.resume.factId,facts[2].id);assert.equal(after.resume.personalName,current.collections[0].name);assert.deepEqual(after.resume.personalIds,after.collections[0].ids);assert.deepEqual(after.saved,current.saved);
});
test('same-name collections with different IDs survive with disambiguation and capacity fails before writing',()=>{
 const current=sampleSnapshot(),incoming=sampleSnapshot();incoming.collections[0].id='second-id';const plan=mergeBackup(current,incoming,{preferences:false,place:false});assert.equal(plan.data.collections.length,2);assert.equal(plan.data.collections[1].name,'My discoveries (imported)');assert.equal(plan.renamed,1);
 current.collections=Array.from({length:30},(_,i)=>({id:'c-'+i,name:'Collection '+i,ids:[]}));const store=testStore(current),before=[...store.values];assert.throws(()=>restoreBackup(store,parseBackup(backupText(incoming)),{preferences:false,place:false},localSnapshot(store).fingerprint),/30 collections/);assert.deepEqual([...store.values],before);
});
test('stale previews and blocked writes do not silently overwrite current personal work',()=>{
 const store=testStore(),state=localSnapshot(store),backup=parseBackup(backupText(sampleSnapshot()));store.setItem(SAVED_KEY,JSON.stringify({version:1,ids:[facts[3].id]}));const changed=[...store.values];assert.throws(()=>restoreBackup(store,backup,{preferences:true,place:true},state.fingerprint),/changed since/);assert.deepEqual([...store.values],changed);
 const rollback=testStore(),old=[...rollback.values],set=rollback.setItem;let count=0;rollback.setItem=(key,value)=>{if(++count===2)throw Error('quota');return set(key,value);};assert.throws(()=>restoreBackup(rollback,backup,{preferences:true,place:true},localSnapshot(rollback).fingerprint),error=>error instanceof RestoreError&&error.rollbackComplete);assert.deepEqual([...rollback.values],old);
});
test('rollback removes newly created keys and reports incomplete recovery truthfully',()=>{
 const store=testStore();for(const key of [SAVED_KEY,COLLECTIONS_KEY,SEEN_KEY,READING_KEY,INTERESTS_KEY])store.removeItem(key);const old=[...store.values],set=store.setItem;let count=0;store.setItem=(key,value)=>{if(++count===2)throw Error('quota');return set(key,value);};const backup=parseBackup(backupText(sampleSnapshot()));assert.throws(()=>restoreBackup(store,backup,{preferences:false,place:false},localSnapshot(store).fingerprint),error=>error instanceof RestoreError&&error.rollbackComplete);assert.deepEqual([...store.values],old);
 const partial=testStore(),original=partial.setItem;let writes=0;partial.setItem=(key,value)=>{if(++writes>=2)throw Error('blocked');return original(key,value);};assert.throws(()=>restoreBackup(partial,backup,{preferences:false,place:false},localSnapshot(partial).fingerprint),error=>error instanceof RestoreError&&!error.rollbackComplete&&error.message.includes('could not be completed'));
});

const {natureSolutionFacts,natureSolutionSources}=load('nature-solutions');
const {exploreSomethingNew}=load('explore-new');
const {BACKUP_REMINDER_KEY,emptyBackupHistory,workSignature,parseBackupHistory,readBackupHistory,backupReminderDue}=load('backup-reminders');
test('V2.2 preserves every complete V2.1 record and appends exactly 100 reviewed discoveries',()=>{
 assert.equal(createHash('sha256').update(JSON.stringify(facts.slice(0,850))).digest('hex'),'f062f09869720b02a2c9b924778907c0ef9eeb37d9e9f136842f5746cd7df078');
 assert.equal(facts.length,950);assert.equal(natureSolutionFacts.length,100);assert.deepEqual(facts.slice(850),natureSolutionFacts);
 assert.equal(new Set(facts.map(f=>f.id)).size,950);assert.equal(new Set(facts.map(discoveryQuestion)).size,950);
 for(const f of natureSolutionFacts){assert.equal(f.collection,'natures-ingenious-solutions');assert.equal(f.url,natureSolutionSources[f.sourceKey].url);assert.equal(sourceDetails(f).reviewedOn,'2026-11-14');assert.ok(insights[f.id].why.length>60);assert.equal(relatedDiscoveries(f.id).length,2);}
 const view={...initialView,collection:'natures-ingenious-solutions',factId:natureSolutionFacts[0].id};assert.equal(discoveries(view,[]).length,100);assert.deepEqual(parseResume(JSON.stringify({version:1,view}),[]),view);
 for(const key of Object.keys(natureSolutionSources)){assert.ok(natureSolutionFacts.filter(f=>f.sourceKey===key).reduce((sum,f)=>sum+(f.question+' '+f.title+' '+f.text).split(/\s+/).length,0)<=200,key);}
});
test('Explore something new favors a topic with fewer unique revealed discoveries and excludes read/current cards',()=>{
 const learning=facts.filter(f=>f.category==='Learning'),nature=facts.filter(f=>f.category==='Nature'),space=facts.filter(f=>f.category==='Space');
 const pool=[...learning.slice(0,3),...nature.slice(0,3),...space.slice(0,3)],seen=[nature[0].id,space[0].id,space[1].id,space[1].id,'unknown-id'];
 const before=JSON.stringify({pool,seen});for(const random of [0,.4,.999]){const result=exploreSomethingNew(pool,seen,learning[0].id,random,random);assert.equal(result.category,'Learning');assert.notEqual(result.id,learning[0].id);assert.ok(!seen.includes(result.id));}assert.equal(JSON.stringify({pool,seen}),before);
});
test('Explore something new gives tied topics equal selection ranges rather than weighting by their catalog size',()=>{
 const small=facts.filter(f=>f.category==='Learning').slice(0,1),large=facts.filter(f=>f.category==='Nature').slice(0,80),pool=[...small,...large];
 assert.equal(exploreSomethingNew(pool,[],'',.49,.9).category,'Learning');assert.equal(exploreSomethingNew(pool,[],'',.5,.9).category,'Nature');
 assert.equal(exploreSomethingNew(pool,[],'',NaN,Infinity).id,small[0].id);assert.equal(exploreSomethingNew(pool,[],'',1,1).id,large.at(-1).id);
});
test('Explore something new never falls back to a revealed card and accepts only its candidate selection',()=>{
 const one=[facts[0]];assert.equal(exploreSomethingNew([],[],'',0,0),null);assert.equal(exploreSomethingNew(one,[],facts[0].id,0,0),null);assert.equal(exploreSomethingNew(one,[facts[0].id],'',0,0),null);
 assert.equal(exploreSomethingNew(one,[],'',0,0).id,facts[0].id);assert.equal(exploreSomethingNew(facts,facts.map(f=>f.id),'',0,0),null);
});
test('backup reminders depend only on actual saved work and acknowledge download or dismissal snapshots',()=>{
 const work=sampleSnapshot(),signature=workSignature(work.saved,work.collections);
 assert.equal(backupReminderDue([],[],emptyBackupHistory),false);assert.equal(backupReminderDue(work.saved,work.collections,emptyBackupHistory),true);
 assert.equal(backupReminderDue(work.saved,work.collections,{...emptyBackupHistory,dismissedWork:signature}),false);
 assert.equal(backupReminderDue(work.saved,work.collections,{...emptyBackupHistory,downloadedWork:signature,lastRequestedAt:'2026-11-14T12:00:00Z'}),false);
 const extra=[...work.saved,facts[9].id];assert.equal(backupReminderDue(extra,work.collections,{...emptyBackupHistory,downloadedWork:signature}),true);
 assert.equal(backupReminderDue(extra,work.collections,{...emptyBackupHistory,dismissedWork:signature}),true);
 assert.equal(backupReminderDue([],work.collections,emptyBackupHistory),true);
});
test('reminder fingerprint ignores ordering and repeated identities but detects collection edits and removals',()=>{
 const work=sampleSnapshot(),base=workSignature(work.saved,work.collections);
 assert.equal(workSignature([...work.saved].reverse().concat(work.saved[0]),work.collections.map(c=>({...c,ids:[...c.ids].reverse()}))),base);
 for(const collections of [[],work.collections.map(c=>({...c,name:'Changed'})),work.collections.map(c=>({...c,ids:[...c.ids,facts[9].id]}))])assert.notEqual(workSignature(work.saved,collections),base);
 assert.equal(workSignature(work.saved,work.collections),base);assert.equal(backupText(work).includes('downloadedWork'),false);
});
test('backup reminder metadata is versioned, bounded, and separated from all existing personal storage keys',()=>{
 const history={lastRequestedAt:'2026-11-14T12:00:00Z',downloadedWork:workSignature([facts[0].id],[]),dismissedWork:null};assert.deepEqual(parseBackupHistory(JSON.stringify({version:1,history})),history);assert.deepEqual(parseBackupHistory(null),emptyBackupHistory);
 for(const raw of ['{','null','[]',JSON.stringify({version:2,history}),JSON.stringify({version:1,history:{...history,lastRequestedAt:'invalid'}}),JSON.stringify({version:1,history:{...history,dismissedWork:'arbitrary'}})])assert.throws(()=>parseBackupHistory(raw));
 for(const key of [SAVED_KEY,RESUME_KEY,COLLECTIONS_KEY,SEEN_KEY,READING_KEY,INTERESTS_KEY])assert.notEqual(BACKUP_REMINDER_KEY,key);
});
test('unavailable reminder storage leaves a usable session fallback without touching saved work',()=>{
 const original=Object.getOwnPropertyDescriptor(globalThis,'localStorage'),access=[];
 try{Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem(key){access.push(key);throw Error('blocked');}}});const result=readBackupHistory();assert.deepEqual(result.history,emptyBackupHistory);assert.match(result.warning,/Downloads still work/);assert.deepEqual(access,[BACKUP_REMINDER_KEY]);}
 finally{if(original)Object.defineProperty(globalThis,'localStorage',original);else delete globalThis.localStorage;}
});
