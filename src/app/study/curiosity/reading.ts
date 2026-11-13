import { facts, type Fact } from './facts';

export const READING_KEY = 'dai.curiosity.reading.v1';
export const SEEN_KEY = 'dai.curiosity.seen.v1';
export type ReadingPreferences = { focus: boolean; textSize: 'regular' | 'large' | 'largest'; unreadFirst: boolean };
export const defaultPreferences: ReadingPreferences = { focus: false, textSize: 'regular', unreadFirst: true };
const known = new Set(facts.map(fact => fact.id));

export function parseSeen(raw: string | null): string[] {
  if (!raw) return [];
  const data = JSON.parse(raw);
  if (!data || data.version !== 1 || !Array.isArray(data.ids)) return [];
  return [...new Set<string>(data.ids.filter((id: unknown) => typeof id === 'string' && known.has(id)))];
}
export function parsePreferences(raw: string | null): ReadingPreferences {
  if (!raw) return defaultPreferences;
  const data = JSON.parse(raw);
  if (!data || data.version !== 1 || !data.preferences) return defaultPreferences;
  const prefs = data.preferences;
  return {
    focus: typeof prefs.focus === 'boolean' ? prefs.focus : false,
    textSize: ['regular', 'large', 'largest'].includes(prefs.textSize) ? prefs.textSize : 'regular',
    unreadFirst: typeof prefs.unreadFirst === 'boolean' ? prefs.unreadFirst : true,
  };
}
export function readReading() {
  let seen: string[] = [], preferences = defaultPreferences, warning = '';
  try { seen = parseSeen(localStorage.getItem(SEEN_KEY)); }
  catch { warning = 'Read history could not be restored. You can still explore.'; }
  try { preferences = parsePreferences(localStorage.getItem(READING_KEY)); }
  catch { warning = 'Reading options could not be restored. You can still explore.'; }
  return { seen, preferences, warning };
}
export function markRead(seen: string[], id: string): string[] {
  return known.has(id) ? [...seen.filter(item => item !== id), id] : seen;
}
// Keep this ordering fixed for the current visit so revealing an answer does not move cards.
export function readingOrder(list: Fact[], seen: string[], preferUnread: boolean, anchor = ''): Fact[] {
  if (!preferUnread) return list;
  const ranks = new Map(seen.map((id, rank) => [id, rank]));
  const ordered = [...list.filter(fact => !ranks.has(fact.id)), ...list.filter(fact => ranks.has(fact.id)).sort((a, b) => ranks.get(a.id)! - ranks.get(b.id)!)];
  const current = ordered.find(fact => fact.id === anchor);
  return current ? [current, ...ordered.filter(fact => fact.id !== anchor)] : ordered;
}
export function surprisePool(list: Fact[], seen: string[], current: string): Fact[] {
  const other = list.filter(fact => fact.id !== current);
  const unread = other.filter(fact => !seen.includes(fact.id));
  return unread.length ? unread : readingOrder(other, seen, true).slice(0, 5);
}

// Strict opt-in: use the caller's filtered list and never fall back to a read card.
export function unreadSurprisePool(list: Fact[], seen: string[], current: string): Fact[] {
  const read = new Set(seen);
  return list.filter(fact => fact.id !== current && !read.has(fact.id));
}
