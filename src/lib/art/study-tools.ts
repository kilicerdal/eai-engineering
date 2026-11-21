import {paperStudyHref} from './paper-viewing';
import type {ArtPainting} from './collection';
import {scaleInCm} from './looking';
export type ArtObservation={before:string;after:string;details:{id:string;x:number;y:number;text:string}[]};
export function emptyObservation():ArtObservation{return {before:'',after:'',details:[]};}
export function parseObservation(v:unknown):ArtObservation{
 const fail=()=>{throw Error('An observation cannot be read safely. Your existing work was not replaced.');};
 if(!v||typeof v!=='object')return fail();const r=v as ArtObservation;
 if(typeof r.before!=='string'||r.before.length>700||typeof r.after!=='string'||r.after.length>700||!Array.isArray(r.details)||r.details.length>3)return fail();const seen=new Set();
 const details=r.details.map(n=>{if(!n||typeof n.id!=='string'||!/^[a-zA-Z0-9-]{1,80}$/.test(n.id)||seen.has(n.id)||!Number.isFinite(n.x)||!Number.isFinite(n.y)||n.x<0||n.x>100||n.y<0||n.y>100||typeof n.text!=='string'||!n.text.trim()||n.text.length>400)return fail();seen.add(n.id);return {id:n.id,x:n.x,y:n.y,text:n.text};});return {before:r.before,after:r.after,details};
}
export function physicalPair(left:ArtPainting,right:ArtPainting){const a=scaleInCm(left),b=scaleInCm(right);if(!a||!b)return null;return {left:a,right:b,width:a.width+b.width+Math.max(a.width,b.width)*.12,height:Math.max(a.height,b.height)};}
export const comparisonQuestions={light:'Which bright or dark passage first gives a form importance?',gesture:'What relationship is established by a hand, pose or turn?',space:'How does the painting locate the viewer relative to the scene?',handling:'Where does a painted mark remain visible rather than disappearing into description?'};
export function studyText(paintings:Pick<ArtPainting,'id'|'title'|'date'|'medium'|'sources'|'credit'|'rights'|'imageSource'>[],personal:{notes:Record<string,string>;observations?:Record<string,ArtObservation>}){return ['# My Art Room study notes','Private observations exported from this browser. These are your responses, not attributed artist statements. No artwork images are embedded.',...paintings.map(p=>{const o=personal.observations?.[p.id];return ['\n## '+p.title,p.date+' · '+p.medium,'Study: https://www.eai.engineering'+paperStudyHref(p.id),personal.notes[p.id]?'\nSaved note\n'+personal.notes[p.id]:'',o?.before?'\nBefore reading\n'+o.before:'',o?.after?'\nAfter reading\n'+o.after:'',...(o?.details??[]).map(n=>`\nDetail (${n.x.toFixed(1)}%, ${n.y.toFixed(1)}%)\n${n.text}`),'\nReferences',...p.sources.map(s=>`${s.title}: ${s.url}`),'Image credit (image not included): '+p.credit+' · '+p.rights,p.imageSource].filter(Boolean).join('\n');})].join('\n\n');}
