import type {ReadingLibrary,ReadingNote} from './library';
import {normalizeSearch} from './navigation';
export const noteTags=['Question','Favorite passage','Thought'] as const;
export type NoteTag=typeof noteTags[number];
export function editNoteDetails(note:ReadingNote,title?:string,tag?:string):ReadingNote{const next={...note};delete next.title;delete next.tag;const value=title?.trim();if(value){if(value.length>80)throw Error('Keep your note title under 81 characters.');next.title=value;}if(tag){if(!(noteTags as readonly string[]).includes(tag))throw Error('Choose a supported note type.');next.tag=tag as NoteTag;}return next;}
export function ownBookMatches(book:{title:string;author:string},query:string){const words=normalizeSearch(query).split(/\s+/).filter(Boolean),text=normalizeSearch(`${book.title} ${book.author}`);return words.every(word=>text.includes(word));}
export const BACKUP_STATUS_KEY='dai-reading-backup-status-v25';
export type BackupPreparation={preparedAt:number;digest:string};
export function readPreparation(raw:string|null):BackupPreparation|null{if(!raw)return null;try{const v=JSON.parse(raw);return v&&Number.isSafeInteger(v.preparedAt)&&v.preparedAt>0&&typeof v.digest==='string'&&/^[a-f0-9]{64}$/.test(v.digest)?{preparedAt:v.preparedAt,digest:v.digest}:null;}catch{return null;}}
function canonical(value:unknown):unknown{if(Array.isArray(value))return value.map(canonical);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).sort(([a],[b])=>a.localeCompare(b)).map(([key,v])=>[key,canonical(v)]));return value;}
export function backupContent(shelf:Record<string,string>,library:ReadingLibrary){return JSON.stringify(canonical({shelf,library}));}
export async function backupDigest(content:string){const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(content));return Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');}
