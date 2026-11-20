import {artPaintings} from './collection';
import {parseArtGallery,type ArtGallery} from './gallery';
export const ART_PERSONAL_KEY='dai-art-personal-v1';
export const ART_RETURN_KEY='dai-art-return-v1';
export const ART_IDS=new Set(artPaintings.map(p=>p.id));
export type ArtPersonal={version:1;notes:Record<string,string>;collections:{id:string;name:string;ids:string[]}[];recent:string[];next:string|null;textSize:number;focus:boolean;notices:boolean};
export const emptyPersonal=():ArtPersonal=>({version:1,notes:{},collections:[],recent:[],next:null,textSize:1,focus:false,notices:true});
function fail():never{throw Error('This Art Room copy cannot be read safely. Your current work has not been replaced.');}
function ids(value:unknown,max=100):string[]{if(!Array.isArray(value)||value.length>max||value.some(id=>typeof id!=='string'||!ART_IDS.has(id))||new Set(value).size!==value.length)fail();return [...value];}
export function parseArtPersonal(raw:string|null):ArtPersonal{
 if(raw===null)return emptyPersonal();if(raw.length>650000)fail();let v;try{v=JSON.parse(raw);}catch{fail();}
 if(!v||typeof v!=='object'||v.version!==1||!v.notes||typeof v.notes!=='object'||Array.isArray(v.notes)||!Array.isArray(v.collections)||v.collections.length>30)fail();
 const notes:Record<string,string>={};for(const [id,n] of Object.entries(v.notes)){if(!ART_IDS.has(id)||typeof n!=='string'||n.length>3000)fail();notes[id]=n;}
 const seen=new Set();const collections=v.collections.map((c:Record<string,unknown>)=>{if(!c||typeof c!=='object'||typeof c.id!=='string'||!/^[a-zA-Z0-9-]{1,80}$/.test(c.id)||seen.has(c.id)||typeof c.name!=='string'||!c.name.trim()||c.name.length>60)fail();seen.add(c.id);return {id:c.id,name:c.name,ids:ids(c.ids)};});
 if(v.next!==null&&(typeof v.next!=='string'||!ART_IDS.has(v.next)))fail();if(![1,1.15,1.3].includes(v.textSize)||typeof v.focus!=='boolean'||typeof v.notices!=='boolean')fail();
 return {version:1,notes,collections,recent:ids(v.recent,20),next:v.next,textSize:v.textSize,focus:v.focus,notices:v.notices};
}
export type ArtBackup={format:'dai-art-room';version:1;gallery:ArtGallery;personal:ArtPersonal};
export function parseArtBackup(raw:string):ArtBackup{
 if(raw.length>750000)fail();let v;try{v=JSON.parse(raw);}catch{fail();}
 // Original V1 gallery downloads remain importable.
 if(v?.version===1&&Array.isArray(v.ids))return {format:'dai-art-room',version:1,gallery:parseArtGallery(raw,ART_IDS),personal:emptyPersonal()};
 if(v?.format!=='dai-art-room'||v.version!==1||!v.gallery||!v.personal)fail();
 return {format:'dai-art-room',version:1,gallery:parseArtGallery(JSON.stringify(v.gallery),ART_IDS),personal:parseArtPersonal(JSON.stringify(v.personal))};
}
export function mergeArtBackup(current:ArtBackup,incoming:ArtBackup,replaceConflictingNotes=false):ArtBackup{
 const personal:ArtPersonal={...current.personal,notes:replaceConflictingNotes?{...current.personal.notes,...incoming.personal.notes}:{...incoming.personal.notes,...current.personal.notes},collections:current.personal.collections.map(c=>({...c,ids:[...c.ids]})),recent:[...new Set([...current.personal.recent,...incoming.personal.recent])].slice(0,20),next:current.personal.next??incoming.personal.next};
 for(const c of incoming.personal.collections){const existing=personal.collections.find(x=>x.id===c.id);if(existing)existing.ids=[...new Set([...existing.ids,...c.ids])];else personal.collections.push({...c,ids:[...c.ids]});}
 if(personal.collections.length>30)throw Error('This merge would exceed 30 collections. Export both copies and reduce the collections before restoring.');
 return {format:'dai-art-room',version:1,gallery:{version:1,ids:[...new Set([...current.gallery.ids,...incoming.gallery.ids])]},personal};
}
export function downloadArtFile(name:string,data:unknown){const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
