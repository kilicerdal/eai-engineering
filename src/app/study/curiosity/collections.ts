import { facts } from './facts';
export const COLLECTIONS_KEY = 'dai.curiosity.collections.v1';
export type PersonalCollection = {id:string;name:string;ids:string[]};
export const MAX_COLLECTIONS = 30;
const known = new Set(facts.map(fact=>fact.id));
export function collectionName(value:string) {return value.trim().replace(/\s+/g,' ').slice(0,48);}
export function parseCollections(raw:string|null):PersonalCollection[] {
  if(raw === null) return [];
  const data:unknown=JSON.parse(raw);
  if(!data || typeof data !== 'object' || !('version' in data) || data.version!==1 || !('collections' in data) || !Array.isArray(data.collections) || data.collections.length>MAX_COLLECTIONS) throw Error('Invalid collections');
  const seen=new Set<string>();
  return data.collections.map((value:unknown)=>{
    if(!value || typeof value !== 'object' || !('id' in value) || typeof value.id!=='string' || !/^[a-z0-9-]{1,80}$/.test(value.id) || seen.has(value.id) || !('name' in value) || typeof value.name!=='string' || !collectionName(value.name) || value.name.length>48 || !('ids' in value) || !Array.isArray(value.ids) || value.ids.length>10000) throw Error('Invalid collection');
    seen.add(value.id);
    return {id:value.id,name:collectionName(value.name),ids:[...new Set(value.ids.filter((id):id is string=>typeof id==='string' && known.has(id)))]};
  });
}
export function readCollections() {
  try {return {items:parseCollections(localStorage.getItem(COLLECTIONS_KEY)),warning:''};}
  catch {return {items:[] as PersonalCollection[],warning:'Collections could not be read. Existing Saved discoveries and preferences are unchanged.'};}
}
export function createCollection(items:PersonalCollection[],id:string,name:string):PersonalCollection[] {
  const clean=collectionName(name);
  if(!clean) throw Error('Give your collection a name.');
  if(items.length>=MAX_COLLECTIONS) throw Error('You can keep up to 30 collections.');
  if(items.some(item=>item.id===id)) throw Error('Choose another collection identity.');
  if(items.some(item=>item.name.toLocaleLowerCase()===clean.toLocaleLowerCase())) throw Error('A collection with that name already exists.');
  return [...items,{id,name:clean,ids:[]}];
}
export function renameCollection(items:PersonalCollection[],id:string,name:string):PersonalCollection[] {
  const clean=collectionName(name);
  if(!clean) throw Error('Give your collection a name.');
  if(items.some(item=>item.id!==id && item.name.toLocaleLowerCase()===clean.toLocaleLowerCase())) throw Error('A collection with that name already exists.');
  return items.map(item=>item.id===id?{...item,name:clean}:item);
}
export function putInCollection(items:PersonalCollection[],id:string,factId:string,include:boolean):PersonalCollection[] {
  if(!known.has(factId)) return items;
  return items.map(item=>item.id===id?{...item,ids:include?[...new Set([...item.ids,factId])]:item.ids.filter(value=>value!==factId)}:item);
}
export function deleteCollection(items:PersonalCollection[],id:string) {return items.filter(item=>item.id!==id);}
