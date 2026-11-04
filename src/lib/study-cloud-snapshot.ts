// Deliberately excludes credentials, unrelated site data, and temporary prompts.
export const STUDY_KEYS = ["eai-goal-journey-v1", "eai-study-conversations-v1", "eai-study-practice-v1", "eai-study-practice-track-v1", "eai-study-plan-v1", "eai-exam-mistakes-v1", "eai-lesson-checks-v1", "eai-exam-prep-v1", "eai-daily-sessions-v1"] as const;
export const SNAPSHOT_BYTES = 4 * 1024 * 1024;
export type StudySnapshot = { version: 1; values: Partial<Record<typeof STUDY_KEYS[number], string>>; library: { documents: unknown[]; entries: unknown[] } };
const arrays = new Set(["eai-study-conversations-v1", "eai-study-practice-v1", "eai-exam-mistakes-v1", "eai-lesson-checks-v1"]);
export function validateStudySnapshot(value: unknown): StudySnapshot {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("This saved learning record is not supported.");
  const snapshot = value as StudySnapshot;
  if (snapshot.version !== 1 || !snapshot.values || typeof snapshot.values !== "object" || Array.isArray(snapshot.values) || !snapshot.library || !Array.isArray(snapshot.library.documents) || !Array.isArray(snapshot.library.entries)) throw new Error("The saved learning record is incomplete.");
  if (new TextEncoder().encode(JSON.stringify(value)).length > SNAPSHOT_BYTES) throw new Error("Your learning record exceeds the 4 MB cloud limit. Export a copy and reduce saved material before saving again.");
  for (const [key, raw] of Object.entries(snapshot.values)) {
    if (!(STUDY_KEYS as readonly string[]).includes(key) || typeof raw !== "string") throw new Error("The saved record contains an unsupported item.");
    if (key === "eai-study-practice-track-v1") {
      if (!["math", "science", "coding", "engineering"].includes(raw)) throw new Error("The saved practice track is not supported.");
    } else {
      let parsed: unknown; try { parsed = JSON.parse(raw); } catch { throw new Error("Part of your learning record cannot be read. Nothing was uploaded."); }
      if (arrays.has(key) ? !Array.isArray(parsed) : !parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Part of your learning record has an unexpected format.");
    }
  }
  return {version: 1, values: {...snapshot.values}, library: snapshot.library};
}
export function canonicalJSON(value: unknown): string {
  function order(item: unknown): unknown {
    if(Array.isArray(item)) return item.map(order);
    if(item && typeof item === "object") return Object.fromEntries(Object.entries(item).sort(([a],[b])=>a.localeCompare(b)).map(([key,child])=>[key,order(child)]));
    return item;
  }
  return JSON.stringify(order(value));
}
export function snapshotSignature(snapshot: StudySnapshot): string {
  return canonicalJSON([STUDY_KEYS.map(key => snapshot.values[key] ?? null), snapshot.library]);
}
export function collectStudyValues(storage: Pick<Storage, "getItem">): StudySnapshot["values"] {
  const values: StudySnapshot["values"] = {};
  for (const key of STUDY_KEYS) { const raw = storage.getItem(key); if (raw !== null) values[key] = raw; }
  return values;
}
// Roll back if a browser quota failure interrupts replacement.
export function replaceStudyValues(storage: Pick<Storage, "getItem" | "setItem" | "removeItem">, values: StudySnapshot["values"]) {
  const previous = collectStudyValues(storage);
  try { for (const key of STUDY_KEYS) { if (values[key] === undefined) storage.removeItem(key); else storage.setItem(key, values[key]!); } }
  catch (error) { for (const key of STUDY_KEYS) { if (previous[key] === undefined) storage.removeItem(key); else storage.setItem(key, previous[key]!); } throw error; }
}
