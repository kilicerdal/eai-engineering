import {labCases, type LabCase, type LabEvidence} from './investigation-cases';
export {labCases};
export type {LabCase,LabEvidence};
export const LAB_STORAGE_KEY='eai-investigation-notebook-v1';
export type LabAnswer={interpretation:string;missing:string[];nextChecks:string[];challenge:string;references:string[]};
export type LabReport={id:string;title:string;createdAt:string;caseId:string|null;question:string;mode:'guided'|'ai'|'checklist';observed:{id:string;summary:string;source?:string}[];answer:LabAnswer;note:string};
export type LabDraft={prediction:number|null;revealed:string[];note:string;correction:number|null;reviewed:boolean;completedAt:string|null};
export type LabNotebook={version:1;drafts:Record<string,LabDraft>;reports:LabReport[]};
export const emptyNotebook=():LabNotebook=>({version:1,drafts:{},reports:[]});
export const emptyDraft=():LabDraft=>({prediction:null,revealed:[],note:'',correction:null,reviewed:false,completedAt:null});
export function findLabCase(id:unknown):LabCase|undefined{return labCases.find(c=>c.id===id)}
export function allowedEvidence(c:LabCase,ids:unknown):LabEvidence[]{
 if(!Array.isArray(ids)||ids.length>c.evidence.length||ids.some(id=>typeof id!=='string')||new Set(ids).size!==ids.length)throw new Error('Choose valid evidence records.');
 const result=c.evidence.filter(e=>ids.includes(e.id));
 if(result.length!==ids.length)throw new Error('Unknown evidence record.');
 return result;
}
export function guidedAnswer(c:LabCase,ids:string[],challengeOnly=false):LabAnswer{
 const evidence=allowedEvidence(c,ids),complete=evidence.length===c.evidence.length;
 return {interpretation:!evidence.length?'No evidence has been opened yet. Begin with the promise and reveal a record.':complete?c.interpretation:'This is a partial investigation. The opened records establish only: '+evidence.map(e=>e.summary).join(' '),missing:complete?c.missing:['Open the remaining records before deciding whether the promise held.',...c.missing],nextChecks:complete?c.nextChecks:['Compare the next record with the promise; do not infer unobserved outcomes.'],challenge:complete||challengeOnly?c.challenge:'Ask what observation would contradict your current explanation, then look for that observation in the remaining records.',references:evidence.map(e=>e.id)};
}
export function weeklyChallenge(date:Date){
 if(!Number.isFinite(date.getTime()))throw new Error('Invalid date');
 const day=new Date(Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate()));
 const offset=(day.getUTCDay()+6)%7;day.setUTCDate(day.getUTCDate()-offset);
 const week=Math.floor((day.getTime()-Date.UTC(2026,10,9))/604800000);
 return {week:day.toISOString().slice(0,10),caseId:labCases[((week%labCases.length)+labCases.length)%labCases.length].id};
}
const isObject=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const bounded=(v:unknown,n:number):v is string=>typeof v==='string'&&v.length<=n;
function textList(v:unknown,maxItems=5,maxChars=1000):v is string[]{return Array.isArray(v)&&v.length>=1&&v.length<=maxItems&&v.every(t=>bounded(t,maxChars)&&!!t.trim())}
export function parseLabAnswer(value:unknown,allowed:string[]):LabAnswer{
 const v=typeof value==='string'?JSON.parse(value.replace(/^```(?:json)?\s*/,'').replace(/\s*```$/,'')):value;
 if(!isObject(v)||!bounded(v.interpretation,1800)||!v.interpretation.trim()||!bounded(v.challenge,1200)||!v.challenge.trim()||!textList(v.missing)||!textList(v.nextChecks)||!textList(v.references,12,100)||v.references.some(id=>!allowed.includes(id)))throw new Error('The AI response could not be checked against the supplied evidence.');
 return {interpretation:v.interpretation,missing:v.missing,nextChecks:v.nextChecks,challenge:v.challenge,references:[...new Set(v.references)]};
}
export function parseNotebook(raw:string|null):LabNotebook{
 if(raw===null)return emptyNotebook();
 if(raw.length>2000000)throw new Error('The saved notebook is too large to read safely.');
 const v:unknown=JSON.parse(raw);
 if(!isObject(v)||v.version!==1||!isObject(v.drafts)||!Array.isArray(v.reports)||v.reports.length>100||Object.keys(v.drafts).length>labCases.length)throw new Error('The saved notebook has an unsupported format.');
 const drafts:Record<string,LabDraft>={};
 for(const [id,d] of Object.entries(v.drafts)){
  const c=findLabCase(id);
  if(!c||!isObject(d)||!(d.prediction===null||Number.isInteger(d.prediction)&&Number(d.prediction)>=0&&Number(d.prediction)<c.predictions.length)||!(d.correction===null||Number.isInteger(d.correction)&&Number(d.correction)>=0&&Number(d.correction)<c.corrections.length)||!bounded(d.note,4000)||typeof d.reviewed!=='boolean'||!(d.completedAt===null||bounded(d.completedAt,40)&&Number.isFinite(Date.parse(d.completedAt))))throw new Error('A saved investigation could not be read.');
  const revealed=allowedEvidence(c,d.revealed).map(e=>e.id);
  if(d.completedAt&&(revealed.length!==c.evidence.length||d.prediction===null||!d.reviewed))throw new Error('The saved completion is incomplete.');
  drafts[id]={prediction:d.prediction as number|null,correction:d.correction as number|null,revealed,note:d.note,reviewed:d.reviewed,completedAt:d.completedAt as string|null};
 }
 const reports:LabReport[]=[],ids=new Set<string>();
 for(const x of v.reports){
  if(!isObject(x)||!bounded(x.id,100)||!x.id||ids.has(x.id)||!bounded(x.title,200)||!bounded(x.createdAt,40)||!Number.isFinite(Date.parse(x.createdAt))||!(x.caseId===null||findLabCase(x.caseId))||!bounded(x.question,3000)||!['guided','ai','checklist'].includes(String(x.mode))||!bounded(x.note,4000)||!Array.isArray(x.observed)||x.observed.length>12)throw new Error('A saved report could not be read.');
  const observed:LabReport['observed']=[];
  for(const e of x.observed){if(!isObject(e)||!bounded(e.id,100)||!bounded(e.summary,4000)||!(e.source===undefined||bounded(e.source,200)&&/^\/(evidence\/|engineering\/)/.test(e.source)))throw new Error('A saved observation could not be read.');observed.push({id:e.id,summary:e.summary,...(e.source?{source:e.source as string}:{})})}
  const answer=parseLabAnswer(x.answer,observed.map(e=>e.id));
  ids.add(x.id);reports.push({id:x.id,title:x.title,createdAt:x.createdAt,caseId:x.caseId as string|null,question:x.question,mode:x.mode as LabReport['mode'],note:x.note,observed,answer});
 }
 return {version:1,drafts,reports};
}
export function writeNotebook(storage:Pick<Storage,'getItem'|'setItem'>,expected:string|null,value:LabNotebook){
 if(storage.getItem(LAB_STORAGE_KEY)!==expected)throw new Error('Another tab changed this notebook. Reload before saving; copy your new notes first.');
 const raw=JSON.stringify(value);parseNotebook(raw);storage.setItem(LAB_STORAGE_KEY,raw);return raw;
}
export function notebookStats(n:LabNotebook){return {started:Object.values(n.drafts).filter(d=>d.prediction!==null||d.revealed.length).length,completed:Object.values(n.drafts).filter(d=>d.completedAt).length,saved:n.reports.length}}
export function reportMarkdown(r:LabReport){return [`# ${r.title}`,`Saved: ${r.createdAt}`,`Mode: ${r.mode==='ai'?'AI interpretation — not independently verified':r.mode==='guided'?'Authored evidence guide':'Rule-based planning checklist'}`,'## Question',r.question,'## Observed / supplied',...r.observed.map(e=>`- [${e.id}] ${e.summary}${e.source?`\n  Source: https://www.eai.engineering${e.source}`:''}`),'## Interpretation',r.answer.interpretation,'## Missing evidence',...r.answer.missing.map(x=>`- ${x}`),'## Next checks',...r.answer.nextChecks.map(x=>`- ${x}`),'## What would change this answer?',r.answer.challenge,'## Referenced records',r.answer.references.join(', '),'## Personal notes',r.note||'No note added.','No tests or repository services were executed by this report.'].join('\n\n')}

export type PlanningResult={observed:LabReport['observed'];answer:LabAnswer};
export function critiqueRequirements(input:string):PlanningResult{
 const text=input.trim();if(text.length<20||text.length>2200)throw new Error('Use 20–2,200 characters of requirements.');
 const vague=[...new Set(text.match(/\b(fast|quickly|easy|seamless|robust|user-friendly|secure|reliable|always|never)\b/gi)||[])];
 const missing=[...(vague.length?[`Define measurable criteria for: ${vague.join(', ')}.`]:[]),'State actors, permissions, preconditions and an observable acceptance outcome.','Define invalid inputs, boundary values, retry behavior and recovery.'];
 return {observed:[{id:'requirements',summary:text}],answer:{interpretation:'This checklist identifies review questions, not proven defects in your specification. '+(vague.length?'Some wording needs measurable definitions.':'No common vague-term trigger was found; that does not establish completeness.'),missing,nextChecks:['Write one Given / When / Then example with an explicit expected outcome.','Add a boundary case, a rejected case and a repeated-request case.','Ask the owner to resolve open questions before generating implementation tests.'],challenge:'Additional acceptance criteria or linked domain rules may resolve these questions. Supply the actual relevant text; a document title alone is not evidence.',references:['requirements']}};
}
export function exploreTradeoff(goal:string,a:string,b:string):PlanningResult{
 if(goal.trim().length<20||goal.length>1200||a.trim().length<3||a.length>500||b.trim().length<3||b.length>500)throw new Error('Add a goal of 20–1,200 characters and two options of 3–500 characters.');
 if(a.trim().toLowerCase()===b.trim().toLowerCase())throw new Error('Describe two different options.');
 return {observed:[{id:'constraints',summary:goal.trim()},{id:'option-a',summary:a.trim()},{id:'option-b',summary:b.trim()}],answer:{interpretation:'Both options are proposals. The supplied descriptions do not establish a winner. Compare them against the same constraints and evidence rather than inventing performance numbers.',missing:['Which constraints are mandatory: consistency, latency, cost, recovery, skills or delivery time?','What load, failure model and measurement method apply?','What would make each option unacceptable?'],nextChecks:['For each option, list one expected benefit, one assumption, one failure mode and one recovery plan.','Define a small, comparable experiment and a pass/fail threshold before running it.','Record measured results separately from predicted outcomes.'],challenge:'A constraint one option cannot meet, or reproducible comparative measurements, could change the choice. No benchmark was run here.',references:['constraints','option-a','option-b']}};
}
