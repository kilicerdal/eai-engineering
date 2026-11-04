import {lessonIdentity,normalizeLessonContext,normalizeLessonChecks,type LessonContext} from "./study-checkpoints";
import {normalizeExamAttempts} from "./study-exam-practice";
import {examBank,examDomains,examSkillLessons,type ExamProfile,type ExamDomain,type ExamSkill} from "./study-exam-bank";
export const DAILY_SESSION_KEY="eai-daily-sessions-v1";
export const dailyStages=["Review","Learn","Practice","Reflect"] as const;
export type DailyTarget={kind:"lesson"|"notebook"|"material"|"exam"|"plan";title:string;context?:LessonContext;id?:string;exam?:ExamProfile;domain?:ExamDomain;skill?:ExamSkill};
export type DailySession={id:string;minutes:10|20|30;target:DailyTarget;startedAt:number;updatedAt:number;finishedAt:number|null;stage:0|1|2|3;completed:number[];reflection:string};
export type DailyRecord={version:1;activeId:string|null;sessions:DailySession[]};
const instant=(v:unknown):v is number=>typeof v==="number"&&Number.isFinite(v)&&v>0;
const identifier=(v:unknown):v is string=>typeof v==="string"&&v.length>0&&v.length<=100;
export function normalizeDailyTarget(value:unknown):DailyTarget{
 if(!value||typeof value!=="object")throw new Error("Choose a valid study focus.");
 const v=value as DailyTarget;if(!["lesson","notebook","material","exam","plan"].includes(v.kind)||typeof v.title!=="string"||!v.title.trim()||v.title.length>180)throw new Error("The saved study focus is incomplete.");
 const base:DailyTarget={kind:v.kind,title:v.title};
 if(v.kind==="lesson"||v.kind==="notebook"||v.kind==="material"){
  const context=normalizeLessonContext(v.context);if(!context)throw new Error("The study objective could not be restored.");base.context=context;
  if(v.kind!=="lesson"){if(!identifier(v.id))throw new Error("The saved study source is missing.");base.id=v.id;}
 }
 if(v.kind==="exam"){
  if((v.exam!=="sat"&&v.exam!=="psat")||typeof v.domain!=="string"||!Object.hasOwn(examDomains,v.domain)||v.skill!==undefined&&(!Object.hasOwn(examSkillLessons,v.skill)||examSkillLessons[v.skill].domain!==v.domain))throw new Error("The saved exam focus is invalid.");
  base.exam=v.exam;base.domain=v.domain;if(v.skill)base.skill=v.skill;
 }
 return base;
}
export const emptyDailyRecord=():DailyRecord=>({version:1,activeId:null,sessions:[]});
export function readDailyRecord(value:unknown):DailyRecord{
 const v=value as DailyRecord;if(!v||v.version!==1||!Array.isArray(v.sessions)||v.sessions.length>20)throw new Error("This study-session save is unreadable. The original copy has been preserved.");
 const ids=new Set<string>();const sessions=v.sessions.map(s=>{
  if(!s||!identifier(s.id)||ids.has(s.id)||![10,20,30].includes(s.minutes)||!instant(s.startedAt)||!instant(s.updatedAt)||s.updatedAt<s.startedAt||!(s.finishedAt===null||instant(s.finishedAt)&&s.finishedAt>=s.startedAt&&s.finishedAt<=s.updatedAt)||![0,1,2,3].includes(s.stage)||!Array.isArray(s.completed)||new Set(s.completed).size!==s.completed.length||s.completed.some(n=>![0,1,2,3].includes(n))||typeof s.reflection!=="string"||s.reflection.length>1000)throw new Error("Part of your study session cannot be read. The original copy has been preserved.");
  ids.add(s.id);return {...s,target:normalizeDailyTarget(s.target)};
 });
 if(v.activeId!==null&&!sessions.some(s=>s.id===v.activeId))throw new Error("The active study session could not be found.");return {version:1,activeId:v.activeId,sessions};
}
export function startDailySession(record:DailyRecord,target:DailyTarget,minutes:10|20|30,now:number,id:string):DailyRecord{
 if(!instant(now)||!identifier(id)||![10,20,30].includes(minutes)||record.sessions.some(s=>s.id===id))throw new Error("Choose a valid study duration.");
 if(record.sessions.length>=20)throw new Error("You have 20 saved sessions. Export a backup and remove an older session before starting another.");
 if(record.sessions.some(s=>!s.finishedAt))throw new Error("Resume or finish your open session before starting another.");
 return {...record,activeId:id,sessions:[{id,minutes,target:normalizeDailyTarget(target),startedAt:now,updatedAt:now,finishedAt:null,stage:0,completed:[],reflection:""},...record.sessions]};
}
export function dailyMinutes(minutes:10|20|30){const review=Math.round(minutes*.2),learn=Math.round(minutes*.4),practice=Math.round(minutes*.3);return [review,learn,practice,minutes-review-learn-practice];}
export function dailyTargetHref(target:DailyTarget):string{
 if(target.kind==="exam")return `/study/exams?exam=${target.exam}&domain=${target.domain}${target.skill?`&skill=${target.skill}`:""}#exam-review`;
 if(target.kind==="material")return `/study/materials?review=${encodeURIComponent(target.id!)}#material-understanding-check`;
 return target.kind==="plan"?"/study#learning-goal":target.kind==="notebook"?"/study#mistake-notebook":"/study#ai-assistant";
}
/** Only checked work for this exact focus, performed inside this session's time window. */
export function dailyEvidence(session:DailySession,rawChecks:unknown,rawExam:unknown,now:number){
 const end=Math.min(now,session.finishedAt||now),counts={independent:0,helped:0,practice:0,uncertain:0,skipped:0};
 if(session.target.context){
  const latest=new Map<string,ReturnType<typeof normalizeLessonChecks>[number]>();
  for(const c of normalizeLessonChecks(rawChecks).filter(c=>c.submittedAt>=session.startedAt&&c.submittedAt<=end&&lessonIdentity(c.context)===lessonIdentity(session.target.context!)).reverse())latest.set(c.question.question.toLowerCase().replace(/\s+/g," "),c);
  for(const c of latest.values()){if(c.result.decision==="uncertain")counts.uncertain++;else if(c.result.decision!=="meets")counts.practice++;else if(c.helpUsed)counts.helped++;else counts.independent++;}
 }else if(session.target.kind==="exam"){
  const latest=new Map<string,ReturnType<typeof normalizeExamAttempts>[number]>();
  for(const a of normalizeExamAttempts((rawExam as {attempts?:unknown})?.attempts).filter(a=>a.exam===session.target.exam&&a.submittedAt>=session.startedAt&&a.submittedAt<=end)){
   const q=examBank.find(q=>q.id===a.questionId)!;if(q.domain===session.target.domain&&(!session.target.skill||q.skill===session.target.skill))latest.set(a.questionId,a);
  }
  for(const a of latest.values()){const q=examBank.find(q=>q.id===a.questionId)!;if(a.selectedIndex===null)counts.skipped++;else if(a.selectedIndex!==q.answerIndex)counts.practice++;else if(a.hintsUsed)counts.helped++;else counts.independent++;}
 }
 return {...counts,total:Object.values(counts).reduce((a,b)=>a+b,0)};
}
