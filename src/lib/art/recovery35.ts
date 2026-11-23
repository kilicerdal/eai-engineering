import {artPaintings} from './collection';
import {parseArguments,type ArtArgument} from './argument-tools';
const works=new Set(artPaintings.map(p=>p.id));
export type DraftEntry<T>={base:T;value:T};
export function readRecovery<T>(raw:string|null,validate:(v:unknown)=>T,max=180):Record<string,DraftEntry<T>>{if(raw===null)return {};if(raw.length>1500000)throw Error('This recovery copy exceeds its limit. Your saved work and recovery copy were kept.');const v=JSON.parse(raw);if(!v||v.version!==1||!v.records||typeof v.records!=='object'||Array.isArray(v.records)||Object.keys(v.records).length>max)throw Error('The separate recovery copy needs review. Your saved writing was not replaced.');const result:Record<string,DraftEntry<T>>={};for(const [id,entry]of Object.entries(v.records) as [string,DraftEntry<unknown>][]){if(!/^[a-zA-Z0-9~/-]{1,180}$/.test(id)||!entry||!Object.hasOwn(entry,'base')||!Object.hasOwn(entry,'value'))throw Error('Invalid recovery entry.');result[id]={base:validate(entry.base),value:validate(entry.value)};}return result;}
export function argumentDraft(v:unknown):ArtArgument{return parseArguments([v],works)[0];}
export function comparisonDraft(v:unknown){if(typeof v!=='string'||v.length>1500)throw Error('The comparison draft exceeds 1,500 characters.');return v;}
export type DetailDraft={text:string;x:number;y:number;side:'front'|'back'|'paired';editing:string|null;baseline:string};
export function detailDraft(v:unknown):DetailDraft{const d=v as DetailDraft;if(!d||typeof d.text!=='string'||d.text.length>400||![d.x,d.y].every(n=>typeof n==='number'&&Number.isFinite(n)&&n>=0&&n<=100)||!['front','back','paired'].includes(d.side)||(d.editing!==null&&(typeof d.editing!=='string'||!/^[a-zA-Z0-9-]{1,80}$/.test(d.editing)))||typeof d.baseline!=='string'||d.baseline.length>2500)throw Error('This detail-note recovery copy cannot be read.');return {text:d.text,x:d.x,y:d.y,side:d.side,editing:d.editing,baseline:d.baseline};}

export const meaningfulDetail=(v:DetailDraft)=>!!v.text.trim()||v.editing!==null;
