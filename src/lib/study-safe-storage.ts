/** Strict reads preserve the original bytes when a normalizer would discard saved work. */
export type StudyStorage = Pick<Storage, "getItem" | "setItem">;
export function readSavedArray<T>(storage: StudyStorage, key: string, normalize: (value: unknown) => T[]): {items:T[];raw:string|null} {
  const raw=storage.getItem(key);
  if(raw===null)return {items:[],raw};
  const parsed:unknown=JSON.parse(raw),items=normalize(parsed);
  if(!Array.isArray(parsed)||items.length!==parsed.length)throw new Error("The saved copy contains entries that could not be read.");
  return {items,raw};
}
export function writeStudyCopy(storage: StudyStorage,key:string,expected:string|null,value:unknown):string {
  if(storage.getItem(key)!==expected)throw new Error("Another tab or account restore changed the saved copy. Reload after copying your new work.");
  const raw=JSON.stringify(value);
  storage.setItem(key,raw);
  return raw;
}
