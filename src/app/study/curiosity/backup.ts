import {facts} from './facts';
import {COLLECTIONS_KEY,collectionName,MAX_COLLECTIONS,type PersonalCollection} from './collections';
import {SAVED_KEY,RESUME_KEY,parseResume,type View} from './memory';
import {READING_KEY,SEEN_KEY,type ReadingPreferences,defaultPreferences} from './reading';
import {INTERESTS_KEY,topics,type TopicPreferences} from './interests';
export const BACKUP_LIMIT=2*1024*1024;
export const BACKUP_FORMAT='dai-curiosity-backup';
const keys=[SAVED_KEY,COLLECTIONS_KEY,SEEN_KEY,READING_KEY,INTERESTS_KEY,RESUME_KEY] as const;
const known=new Set(facts.map(fact=>fact.id));
type Store=Pick<Storage,'getItem'|'setItem'|'removeItem'>;
export type Snapshot={saved:string[];collections:PersonalCollection[];seen:string[];reading:ReadingPreferences;topics:TopicPreferences;resume:View|null};
export type Backup={format:typeof BACKUP_FORMAT;version:1;createdAt:string;data:Snapshot;skipped:number};
export type RestoreOptions={preferences:boolean;place:boolean};
function record(value:unknown):value is Record<string,unknown> {return !!value && typeof value==='object' && !Array.isArray(value);}
function idList(value:unknown,missing:Set<string>):string[] {
  if(!Array.isArray(value)||value.length>10000||value.some(id=>typeof id!=='string'||!/^[a-z0-9-]{1,100}$/.test(id)))throw Error('The backup contains an invalid discovery list.');
  for(const id of value)if(!known.has(id))missing.add(id);
  return [...new Set(value.filter((id):id is string=>typeof id==='string' && known.has(id)))];
}
function snapshot(value:unknown,missing:Set<string>):Snapshot {
  if(!record(value))throw Error('The backup data is missing.');
  const saved=idList(value.saved,missing),seen=idList(value.seen,missing);
  if(!Array.isArray(value.collections)||value.collections.length>MAX_COLLECTIONS)throw Error('The backup has too many or invalid collections.');
  const ids=new Set<string>();
  const collections=value.collections.map((item:unknown)=>{
    if(!record(item)||typeof item.id!=='string'||!/^[a-z0-9-]{1,80}$/.test(item.id)||ids.has(item.id)||typeof item.name!=='string'||item.name.length>48||!collectionName(item.name))throw Error('The backup contains an invalid collection.');
    ids.add(item.id);return {id:item.id,name:collectionName(item.name),ids:idList(item.ids,missing)};
  });
  if(!record(value.reading)||typeof value.reading.focus!=='boolean'||typeof value.reading.unreadFirst!=='boolean'||!['regular','large','largest'].includes(String(value.reading.textSize)))throw Error('The backup contains invalid reading options.');
  const reading:ReadingPreferences={focus:value.reading.focus,unreadFirst:value.reading.unreadFirst,textSize:value.reading.textSize as ReadingPreferences['textSize']};
  if(!record(value.topics)||Object.keys(value.topics).length>100||Object.values(value.topics).some(choice=>choice!=='more'&&choice!=='less'))throw Error('The backup contains invalid topic choices.');
  const choices=Object.fromEntries(Object.entries(value.topics).filter(([topic])=>topics.includes(topic))) as TopicPreferences;
  let resume:View|null=null;
  if(value.resume!==null){
    if(!record(value.resume)||typeof value.resume.factId!=='string')throw Error('The backup contains an invalid saved place.');
    // Unavailable discoveries may come from a newer catalog; do not invent a new
    // resume position or reject the rest of an otherwise valid personal library.
    if(!known.has(value.resume.factId))missing.add(value.resume.factId);
    else {
      const fields=['category','query','savedOnly','factId','revealed','daily','dailyDate','dailyIds','collection','personalId','personalName','personalIds','newOnly','newIds'];
      const view=Object.fromEntries(Object.entries(value.resume).filter(([key])=>fields.includes(key)));
      for(const key of ['dailyIds','personalIds','newIds'])if(key in view)view[key]=idList(view[key],missing);
      if(view.daily===true && Array.isArray(view.dailyIds) && view.dailyIds.length!==5)resume=null;
      else {resume=parseResume(JSON.stringify({version:1,view}),saved);if(!resume)throw Error('The backup contains an invalid saved place.');}
    }
  }
  return {saved,seen,collections,reading,topics:choices,resume};
}
export function parseBackup(text:string):Backup {
  if(new TextEncoder().encode(text).length>BACKUP_LIMIT)throw Error('Choose a backup smaller than 2 MB.');
  let value:unknown;try{value=JSON.parse(text);}catch{throw Error('This is not a readable JSON backup.');}
  if(!record(value)||value.format!==BACKUP_FORMAT||value.version!==1||typeof value.createdAt!=='string'||!/^\d{4}-\d{2}-\d{2}T/.test(value.createdAt)||!Number.isFinite(Date.parse(value.createdAt)))throw Error('Choose a Curiosity Room version 1 backup.');
  const missing=new Set<string>(),data=snapshot(value.data,missing);
  return {format:BACKUP_FORMAT,version:1,createdAt:value.createdAt,data,skipped:missing.size};
}
export function backupText(data:Snapshot,now=new Date()):string {
  const clean=snapshot(data,new Set());
  return JSON.stringify({format:BACKUP_FORMAT,version:1,createdAt:now.toISOString(),catalogSize:facts.length,data:clean},null,2);
}
function rawState(store:Store) {return keys.map(key=>[key,store.getItem(key)] as const);}
export function localSnapshot(store:Store):{data:Snapshot;fingerprint:string} {
  const raw=rawState(store),map=new Map<string,string|null>(raw);
  function entry(key:string,field:string,fallback:unknown){const text=map.get(key);if(text===null||text===undefined)return fallback;let value:unknown;try{value=JSON.parse(text);}catch{throw Error('Browser data could not be read. It has not been changed.');}if(!record(value)||value.version!==1||!(field in value))throw Error('Browser data could not be read. It has not been changed.');return value[field];}
  const data=snapshot({saved:entry(SAVED_KEY,'ids',[]),collections:entry(COLLECTIONS_KEY,'collections',[]),seen:entry(SEEN_KEY,'ids',[]),reading:entry(READING_KEY,'preferences',defaultPreferences),topics:entry(INTERESTS_KEY,'topics',{}),resume:entry(RESUME_KEY,'view',null)},new Set());
  return {data,fingerprint:JSON.stringify(raw)};
}
const union=(a:string[],b:string[])=>[...new Set([...a,...b])];
export function mergeBackup(current:Snapshot,incoming:Snapshot,options:RestoreOptions) {
  const collections=current.collections.map(item=>({...item,ids:[...item.ids]}));
  const names=new Set(collections.map(item=>item.name.toLowerCase()));let renamed=0,addedMemberships=0;
  const idMap=new Map<string,string>();
  for(const item of incoming.collections){
    const matching=collections.find(value=>value.id===item.id);
    if(matching){const next=union(matching.ids,item.ids);addedMemberships+=next.length-matching.ids.length;matching.ids=next;idMap.set(item.id,matching.id);continue;}
    if(collections.length>=MAX_COLLECTIONS)throw Error('The merge would exceed 30 collections. Nothing will be restored. Make room in Collections first.');
    let name=item.name,index=1;while(names.has(name.toLowerCase())){const suffix=` (imported${index===1?'':' '+index})`;name=collectionName(item.name.slice(0,48-suffix.length)+suffix);index++;}
    if(name!==item.name)renamed++;names.add(name.toLowerCase());idMap.set(item.id,item.id);collections.push({...item,name,ids:[...item.ids]});addedMemberships+=item.ids.length;
  }
  const saved=union(current.saved,incoming.saved),seen=union(current.seen,incoming.seen);
  let resume=options.place && incoming.resume?{...incoming.resume}:current.resume?{...current.resume}:null;
  if(resume?.personalId){const item=collections.find(item=>item.id===(idMap.get(resume!.personalId!)||resume!.personalId));resume=item?{...resume,personalId:item.id,personalName:item.name,personalIds:item.ids}:null;}
  const data:Snapshot={saved,seen,collections,reading:options.preferences?incoming.reading:current.reading,topics:options.preferences?incoming.topics:current.topics,resume};
  return {data,addedSaved:saved.length-current.saved.length,addedSeen:seen.length-current.seen.length,addedCollections:collections.length-current.collections.length,addedMemberships,renamed};
}
export class RestoreError extends Error {constructor(message:string,public readonly rollbackComplete:boolean){super(message);}}
export function restoreBackup(store:Store,backup:Backup,options:RestoreOptions,fingerprint:string) {
  const before=localSnapshot(store);if(before.fingerprint!==fingerprint)throw Error('Your browser data changed since this preview. Review the refreshed preview before merging.');
  const plan=mergeBackup(before.data,backup.data,options),data=plan.data;
  const old=new Map<string,string|null>(rawState(store));
  const writes:[string,string][]=[
    [SAVED_KEY,JSON.stringify({version:1,ids:data.saved})],
    [COLLECTIONS_KEY,JSON.stringify({version:1,collections:data.collections})],
    [SEEN_KEY,JSON.stringify({version:1,ids:data.seen})],
  ];
  if(options.preferences)writes.push([READING_KEY,JSON.stringify({version:1,preferences:data.reading})],[INTERESTS_KEY,JSON.stringify({version:1,topics:data.topics})]);
  if(options.place && data.resume)writes.push([RESUME_KEY,JSON.stringify({version:1,view:data.resume})]);
  const changed:string[]=[];
  try{for(const [key,value] of writes){if(old.get(key)!==value){store.setItem(key,value);changed.push(key);}}}
  catch{let complete=true;for(const key of changed.reverse())try{const value=old.get(key);if(value===null||value===undefined)store.removeItem(key);else store.setItem(key,value);}catch{complete=false;}
    throw new RestoreError(complete?'Browser saving failed. The restore was rolled back; your previous data is unchanged.':'Browser saving failed and rollback could not be completed. Keep the pre-restore backup below for recovery.',complete);}
  return plan;
}
