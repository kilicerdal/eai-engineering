// Visit history is separate from saved work, preferences, and revealed answers.
export const CATALOG_KEY = 'dai.curiosity.catalog.v1';
export const VISIT_KEY = 'dai.curiosity.visit.v1';
type Store = Pick<Storage, 'getItem' | 'setItem'>;
type Visit = { baselineIds: string[] | null };
export type Arrivals = { ids: string[]; kind: 'latest' | 'since-visit'; warning: string };
function validIds(value: unknown): value is string[] {
  return Array.isArray(value) && value.length <= 10000 && value.every(id => typeof id === 'string' && /^[a-z0-9-]{1,100}$/.test(id)) && new Set(value).size === value.length;
}
export function parseCatalog(raw: string | null): string[] | null {
  try {const data = raw ? JSON.parse(raw) : null;return data?.version === 1 && validIds(data.ids) ? data.ids : null;} catch {return null;}
}
export function parseVisit(raw: string | null): Visit | null {
  try {const data = raw ? JSON.parse(raw) : null;return data?.version === 1 && (data.baselineIds === null || validIds(data.baselineIds)) ? {baselineIds:data.baselineIds} : null;} catch {return null;}
}
export function arrivalIds(catalog: string[], baseline: string[] | null, latest: string[]): string[] {
  const known = new Set(baseline ?? []), recent = new Set(latest);
  return catalog.filter(id => baseline === null ? recent.has(id) : !known.has(id));
}
export function readArrivals(catalog: string[], latest: string[], local?: Store, session?: Store): Arrivals {
  let previous: string[] | null = null, visit: Visit | null = null;
  let warning = '';
  try {previous = parseCatalog((local ?? localStorage).getItem(CATALOG_KEY));}
  catch {warning = 'Visit history is unavailable. Showing the latest additions instead.';}
  try {visit = parseVisit((session ?? sessionStorage).getItem(VISIT_KEY));}
  catch {warning = 'Visit history is unavailable. Showing the latest additions instead.';}
  const baseline = warning ? null : visit ? visit.baselineIds : previous;
  try {
    // Keep the same baseline on refresh. A new tab session starts from the last
    // catalog visited. Do not discard IDs written by a newer catalog in another tab.
    (session ?? sessionStorage).setItem(VISIT_KEY,JSON.stringify({version:1,baselineIds:baseline}));
    if (!warning) (local ?? localStorage).setItem(CATALOG_KEY,JSON.stringify({version:1,ids:[...new Set([...(previous ?? []),...catalog])]}));
  } catch {warning = 'Visit history applies to this visit only. Browser saving is unavailable.';}
  return {ids:arrivalIds(catalog,baseline,latest),kind:baseline === null ? 'latest' : 'since-visit',warning};
}
