import {defaultLever,parseLeverSettings,checkLeverChallenge,LEVER_MODEL_VERSION,type LeverSettings} from './explore-lever';
export const EXPLORE_STORAGE_KEY = 'eai-explore-v1';
export type Exploration = { id: string; title: string; createdAt: string; modelVersion: typeof LEVER_MODEL_VERSION; settings: LeverSettings; notes: string };
export type ExploreData = { version: 1; current: LeverSettings; baseline: LeverSettings | null; notes: string; level: 'simple' | 'deeper'; challenge: { prediction: 'half' | 'same' | 'double' | null; solution: LeverSettings | null } | null; saved: Exploration[] };
export const emptyExplore = (): ExploreData => ({ version: 1, current: { ...defaultLever }, baseline: null, notes: '', level: 'simple', challenge: null, saved: [] });
const obj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const str = (v: unknown, n: number): v is string => typeof v === 'string' && v.length <= n;
export function parseExploreData(raw: string | null): ExploreData {
 if (raw === null) return emptyExplore();
 if (raw.length > 400000) throw new Error('The saved explorations are too large.');
 const v: unknown = JSON.parse(raw);
 if (!obj(v) || v.version !== 1 || !str(v.notes, 3000) || !['simple', 'deeper'].includes(String(v.level)) || !Array.isArray(v.saved) || v.saved.length > 30) throw new Error('The saved explorations have an unsupported format.');
 const current = parseLeverSettings(v.current), baseline = v.baseline === null ? null : parseLeverSettings(v.baseline);
 let challenge: ExploreData['challenge'] = null;
 if (v.challenge !== null) {
  if (!obj(v.challenge) || ![null, 'half', 'same', 'double'].includes(v.challenge.prediction as string | null)) throw new Error('The saved challenge could not be read.');
  const solution = v.challenge.solution === null ? null : parseLeverSettings(v.challenge.solution);
  if (solution && !checkLeverChallenge(solution).correct) throw new Error('The saved challenge solution is invalid.');
  challenge = { prediction: v.challenge.prediction as 'half' | 'same' | 'double' | null, solution };
 }
 const ids = new Set<string>(), saved: Exploration[] = [];
 for (const item of v.saved) {
  if (!obj(item) || !str(item.id, 100) || !item.id || ids.has(item.id) || !str(item.title, 100) || !item.title.trim() || !str(item.createdAt, 40) || !Number.isFinite(Date.parse(item.createdAt)) || item.modelVersion !== LEVER_MODEL_VERSION || !str(item.notes, 3000)) throw new Error('A saved exploration could not be read.');
  ids.add(item.id); saved.push({ id: item.id, title: item.title, createdAt: item.createdAt, modelVersion: LEVER_MODEL_VERSION, settings: parseLeverSettings(item.settings), notes: item.notes });
 }
 return { version: 1, current, baseline, notes: v.notes, level: v.level as 'simple' | 'deeper', challenge, saved };
}
export type ExploreSnapshot = { data: ExploreData; ready: boolean; error: string; saved: boolean };
export const exploreServerSnapshot: ExploreSnapshot = { data: emptyExplore(), ready: false, error: '', saved: false };
export function createExploreStore(storageFactory: () => Pick<Storage, 'getItem' | 'setItem'>, observe: (changed: (key: string | null, value: string | null) => void) => () => void) {
 let snapshot = exploreServerSnapshot, expected: string | null = null, initialized = false, blocked = false, stop: (() => void) | undefined;
 const listeners = new Set<() => void>();
 const publish = (value: ExploreSnapshot) => { snapshot = value; for (const listener of listeners) listener(); };
 return {
  getSnapshot: () => snapshot,
  subscribe: (listener: () => void) => {
   listeners.add(listener);
   if (!initialized) { initialized = true; try { const raw = storageFactory().getItem(EXPLORE_STORAGE_KEY); const data = parseExploreData(raw); expected = raw; publish({ data, ready: true, error: '', saved: false }); } catch { blocked = true; publish({ ...snapshot, ready: true, error: 'Your saved explorations could not be read. The original copy is untouched. You can explore here and export your current work.' }); } }
   if (!stop) stop = observe((key, value) => { if ((key === EXPLORE_STORAGE_KEY || key === null) && value !== expected) { blocked = true; publish({ ...snapshot, saved: false, error: 'Another tab changed your explorations. Your current work is retained here. Export it before reloading.' }); } });
   return () => { listeners.delete(listener); if (!listeners.size) { stop?.(); stop = undefined; } };
  },
  update: (fn: (old: ExploreData) => ExploreData) => {
   const data = fn(snapshot.data);
   if (blocked) { publish({ ...snapshot, data, saved: false }); return; }
   try { const storage = storageFactory(); if (storage.getItem(EXPLORE_STORAGE_KEY) !== expected) throw new Error('Concurrent update'); const raw = JSON.stringify(data); parseExploreData(raw); storage.setItem(EXPLORE_STORAGE_KEY, raw); expected = raw; publish({ data, ready: true, error: '', saved: true }); } catch { blocked = true; publish({ data, ready: true, saved: false, error: 'This browser could not save the exploration, or another tab changed it. Your work is retained in this tab. Export it before leaving.' }); }
  },
 };
}
