import { facts } from './facts';
import { dailyFacts, linkedFact, localDay } from './journey';

export const SAVED_KEY = 'dai.curiosity.saved.v1';
export const RESUME_KEY = 'dai.curiosity.resume.v1';
export const categories = ['All discoveries', ...new Set(facts.map(fact => fact.category))];
export type View = { category: string; query: string; savedOnly: boolean; factId: string; revealed: boolean; daily?: boolean; dailyDate?: string };
export const initialView: View = { category: categories[0], query: '', savedOnly: false, factId: facts[0].id, revealed: false };
const ids = new Set(facts.map(fact => fact.id));

export function parseSaved(raw: string | null): string[] {
  if (!raw) return [];
  const data: unknown = JSON.parse(raw);
  if (!data || typeof data !== 'object' || !('version' in data) || data.version !== 1 || !('ids' in data) || !Array.isArray(data.ids)) return [];
  return [...new Set(data.ids.filter((id): id is string => typeof id === 'string' && ids.has(id)))];
}

export function discoveries(view: View, saved: string[]) {
  const collection = view.daily ? dailyFacts(view.dailyDate || localDay()) : facts;
  return collection.filter(fact => (!view.savedOnly || saved.includes(fact.id)) && (view.category === categories[0] || fact.category === view.category) && `${fact.title} ${fact.text} ${fact.category}`.toLowerCase().includes(view.query.toLowerCase().trim()));
}

export function normalizeView(view: View, saved: string[]): View {
  const list = discoveries(view, saved);
  return list.some(fact => fact.id === view.factId) ? view : { ...view, factId: list[0]?.id || '', revealed: false };
}

export function parseResume(raw: string | null, saved: string[]): View | null {
  if (!raw) return null;
  const data: unknown = JSON.parse(raw);
  if (!data || typeof data !== 'object' || !('version' in data) || data.version !== 1 || !('view' in data) || !data.view || typeof data.view !== 'object') return null;
  const view = data.view;
  if (!('category' in view) || typeof view.category !== 'string' || !categories.includes(view.category) || !('query' in view) || typeof view.query !== 'string' || view.query.length > 200 || !('savedOnly' in view) || typeof view.savedOnly !== 'boolean' || !('factId' in view) || typeof view.factId !== 'string' || !ids.has(view.factId) || !('revealed' in view) || typeof view.revealed !== 'boolean') return null;
  if ('daily' in view && typeof view.daily !== 'boolean') return null;
  if ('dailyDate' in view && (typeof view.dailyDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(view.dailyDate))) return null;
  if ('daily' in view && view.daily === true && (!('dailyDate' in view) || view.dailyDate !== localDay())) return normalizeView({ ...initialView, daily: true, dailyDate: localDay(), factId: '' }, saved);
  return normalizeView(view as View, saved);
}

export function readMemory() {
  let saved: string[] = [], view = initialView, restored = false, warning = '';
  try { saved = parseSaved(localStorage.getItem(SAVED_KEY)); }
  catch { warning = 'Saving is unavailable or saved discoveries could not be read. You can still explore.'; }
  try {
    const resume = parseResume(localStorage.getItem(RESUME_KEY), saved);
    if (resume?.factId) { view = resume; restored = true; }
  } catch { warning = 'Your place could not be restored. You can still explore.'; }
  // An explicit fact link takes priority over browser resume, without changing favorites.
  if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('fact')) {
    const fact = linkedFact(window.location.search);
    if (fact) {
      const sameFact = view.factId === fact.id;
      view = { ...initialView, factId: fact.id, revealed: sameFact && view.revealed };
      restored = sameFact && restored;
    }
    else warning = 'That discovery link is unavailable. Your saved discoveries are unchanged.';
  }
  return { saved, view, restored, warning };
}
