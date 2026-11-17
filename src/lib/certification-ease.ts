import {getCert,type CertId,type CertQuestion} from './certification-content';
import type {CertStudy} from './certification-study';
import type {CoachingWork} from './certification-coaching';
import {parseCert} from './certification-study';
import {parseLearning} from './certification-learning';
import {parseChallenge} from './certification-challenges';
import {parseCoaching} from './certification-coaching';
import {certificationTerms} from './certification-ease-content';
const normalize=(s:string)=>s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function matchingTerms(q:CertQuestion){const words=normalize(q.prompt+' '+q.choices.join(' '));return certificationTerms.filter(t=>words.includes(normalize(t.name))||words.includes(t.id.replaceAll('-',' ')));}
export function searchTerms(query:string){const words=normalize(query).trim().split(/\s+/).filter(Boolean);return certificationTerms.filter(t=>words.every(w=>normalize(t.name+' '+t.plain+' '+t.technical).includes(w)));}
export function briefAnswer(q:CertQuestion){return q.explanations[q.answer].split(/(?<=[.!?])\s+/)[0];}
export function returnAfterBreak(study:CertStudy,now:number){const valid=[study.session?.startedAt,study.session?.finishedAt,...study.attempts.map(a=>a.at)].filter((n):n is number=>typeof n==='number'&&n>0&&n<=now);return valid.length>0&&now-Math.max(...valid)>=3*86400000;}
export function saveTopicLater(work:CoachingWork,domain:string,now:number){if(!getCert(work.track)!.domains.some(d=>d.id===domain))throw Error('Choose a topic in this path.');if(work.revisitTopics?.[domain])return work;return {...work,revisitTopics:{...work.revisitTopics,[domain]:{note:'',at:now,reviewed:false}}};}
export function inspectCertificationBackup(track:CertId,raw:string){
 if(raw.length>8000000)throw Error('Choose a certification backup smaller than 8 MB.');
 let value;try{value=JSON.parse(raw);}catch{throw Error('This file is not a readable JSON backup.');}if(!value||value.format!=='eai-certification-backup'||value.version!==1||value.track!==track||!value.current||typeof value.current!=='object'||Array.isArray(value.current))throw Error('Choose a complete eAI certification backup for this path. Nothing was restored.');
 for(const section of ['study','learning','challenge'])if(!value.current[section]||typeof value.current[section]!=='object'||Array.isArray(value.current[section]))throw Error('The backup is missing a required current-work section.');
 if(typeof value.exportedAt!=='string'||value.exportedAt.length>50||!Number.isFinite(Date.parse(value.exportedAt)))throw Error('The backup date could not be validated.');
 const d=parseCert(track,JSON.stringify(value.current.study)),learning=parseLearning(track,JSON.stringify(value.current.learning)),challenge=parseChallenge(JSON.stringify(value.current.challenge)),coaching=value.current.coaching?parseCoaching(track,JSON.stringify(value.current.coaching)):null;
 const warnings:string[]=[];if(value.storedCopies!==undefined){if(!value.storedCopies||typeof value.storedCopies!=='object'||Array.isArray(value.storedCopies)||Object.keys(value.storedCopies).some(k=>!['study','learning','challenge','coaching'].includes(k)))throw Error('The stored-copy section has an unsupported format.');for(const [kind,copy] of Object.entries(value.storedCopies)){if(copy===null)continue;if(typeof copy!=='string')throw Error('A stored copy is not text.');try{if(kind==='study')parseCert(track,copy);else if(kind==='learning')parseLearning(track,copy);else if(kind==='challenge')parseChallenge(copy);else parseCoaching(track,copy);}catch{warnings.push(`The retained ${kind} copy could not be validated. The current in-tab section was checked separately.`);}}}
 return {title:getCert(track)!.title,exportedAt:value.exportedAt,attempts:d.attempts.length,notebookEntries:Object.keys(d.notebook).length,activeQuestions:d.session?.finishedAt===null?d.session.questions.length:0,resourceNotes:Object.keys(learning.resources).length,recaps:Object.keys(coaching?.recaps??{}).length,extraRounds:coaching?.extraPractice?.rounds.length??0,mistakeReflections:Object.keys(coaching?.mistakeKinds??{}).length,hasChallengeDraft:!!challenge.reason,warnings,scope:'Read-only inspection. No notes, sessions or browser records were restored, merged, deleted or replaced.'};
}
