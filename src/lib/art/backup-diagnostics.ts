import {parseArtBackup,parseArtPersonal,emptyPersonal,ART_IDS,type ArtBackup} from './personal';
import {parseArtGallery} from './gallery';
import {parseArguments,parseBookmarks} from './argument-tools';
import {parseObservation} from './study-tools';
export function readArtBackupForReview(raw:string):{backup:ArtBackup;kind:'gallery'|'complete'}{
 if(raw.length>1400000)throw Error('Backup file: exceeds the 1.4-million-character Art Room limit. Choose a smaller valid backup.');let v;try{v=JSON.parse(raw)}catch{throw Error('Backup JSON syntax cannot be read safely. The original file and current work were not changed.');}
 if(v?.version===1&&Array.isArray(v.ids)){try{return {backup:parseArtBackup(raw),kind:'gallery'}}catch{throw Error('Gallery-only backup: saved painting IDs must be unique, known collection works.');}}
 if(v?.format!=='dai-art-room'||v.version!==1)throw Error('Backup header: choose a complete dai-art-room version 1 file or an original gallery-only backup.');
 try{parseArtGallery(JSON.stringify(v.gallery),ART_IDS)}catch{throw Error('Saved paintings: the list contains an invalid, duplicate or unknown artwork, or an unsupported version.');}
 const p=v.personal;if(!p||typeof p!=='object'||p.version!==1)throw Error('Personal-work header: a version 1 personal record is required.');
 if(!p.notes||typeof p.notes!=='object'||Array.isArray(p.notes))throw Error('Saved notes: expected artwork-to-note records.');
 Object.entries(p.notes).forEach(([id,text],i)=>{if(!ART_IDS.has(id)||typeof text!=='string'||text.length>3000)throw Error(`Saved notes, record ${i+1}: use a known painting and at most 3,000 text characters.`);});
 if(!Array.isArray(p.collections)||p.collections.length>30)throw Error('Personal collections: expected a list with no more than 30 collections.');
 const seen=new Set();p.collections.forEach((c:unknown,i:number)=>{try{parseArtPersonal(JSON.stringify({...emptyPersonal(),collections:[c]}));const id=(c as {id:string}).id;if(seen.has(id))throw Error();seen.add(id)}catch{throw Error(`Personal collections, record ${i+1}: check its unique ID, nonempty name (60 characters maximum), introduction (1,200 maximum) and known unique artwork IDs.`);}});
 for(const [name,limit,parse]of [['arguments',40,parseArguments],['bookmarks',80,parseBookmarks]] as const){if(p[name]!==undefined){if(!Array.isArray(p[name])||p[name].length>limit)throw Error(`${name==='arguments'?'Arguments':'Passage bookmarks'}: expected at most ${limit} records.`);p[name].forEach((r:unknown,i:number)=>{try{parse([r],ART_IDS)}catch{throw Error(`${name==='arguments'?'Arguments':'Passage bookmarks'}, record ${i+1}: check its artwork, unique identifier and field limits. Text was not exposed or changed.`);}});}}
 if(p.observations!==undefined){if(!p.observations||typeof p.observations!=='object'||Array.isArray(p.observations))throw Error('Observation journals: expected artwork records.');Object.values(p.observations).forEach((o,i)=>{try{parseObservation(o)}catch{throw Error(`Observation journals, record ${i+1}: before/after fields allow 700 characters; use up to three detail notes with valid positions, side and 400-character text.`);}});}
 try{return {backup:parseArtBackup(raw),kind:'complete'}}catch{throw Error('Other personal records: check reading positions, recent IDs, comparison-note limits, viewing preferences and duplicate record IDs. The file was not merged.');}
}
