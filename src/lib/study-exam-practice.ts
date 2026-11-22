import {examBank,examDomains,examSkillLessons,type ExamDomain,type ExamProfile,type ExamSkill,type ExamBankQuestion} from "./study-exam-bank";
import type {Mistake} from "./study-exams";
export const EXAM_PREP_KEY="eai-exam-prep-v1";
export type ExamSelection={index:number|null;at:number|null};
export type ExamWork={selectedIndex:number|null;hintsUsed:number;reasoning:string;scratch?:string;estimate?:string;confidence?:"unsure"|"somewhat"|"high";eliminated?:number[];flagged?:boolean;selections?:ExamSelection[];historyTruncated?:boolean};
export type ExamAttempt={id:string;exam:ExamProfile;sessionId:string;mode:"diagnostic"|"practice";questionId:string;selectedIndex:number|null;hintsUsed:number;reasoning:string;submittedAt:number;scratch?:string;estimate?:string;confidence?:ExamWork["confidence"];selections?:ExamSelection[];historyTruncated?:boolean};
export type ExamSession={id:string;mode:"diagnostic"|"practice";questionIds:string[];index:number;startedAt:number;finished:boolean;selectedIndex:number|null;hintsUsed:number;reasoning:string;work?:Record<string,ExamWork>};
export type ExamRecord={version:1;activeExam:ExamProfile;attempts:ExamAttempt[];sessions:{sat:ExamSession|null;psat:ExamSession|null}};
const id=(v:unknown):v is string=>typeof v==="string"&&v.length>0&&v.length<=100&&v.trim()===v;
const profile=(v:unknown):v is ExamProfile=>v==="sat"||v==="psat";
const instant=(v:unknown):v is number=>typeof v==="number"&&Number.isFinite(v)&&v>0;
function extras(value:unknown,choices:number):Partial<ExamWork>|null{
 if(!value||typeof value!=="object")return null;const w=value as ExamWork,out:Partial<ExamWork>={};
 for(const key of ["scratch","estimate"] as const)if(w[key]!==undefined){if(typeof w[key]!=="string"||w[key]!.length>(key==="scratch"?4000:300))return null;out[key]=w[key];}
 if(w.confidence!==undefined){if(!["unsure","somewhat","high"].includes(w.confidence))return null;out.confidence=w.confidence;}
 if(w.eliminated!==undefined){if(!Array.isArray(w.eliminated)||w.eliminated.length>choices||new Set(w.eliminated).size!==w.eliminated.length||w.eliminated.some(n=>!Number.isInteger(n)||n<0||n>=choices))return null;out.eliminated=[...w.eliminated];}
 if(w.historyTruncated!==undefined){if(typeof w.historyTruncated!=="boolean")return null;out.historyTruncated=w.historyTruncated;}
 if(w.flagged!==undefined){if(typeof w.flagged!=="boolean")return null;out.flagged=w.flagged;}
 if(w.selections!==undefined){if(!Array.isArray(w.selections)||w.selections.length>100||w.selections.some(e=>!e||!(e.index===null||Number.isInteger(e.index)&&e.index>=0&&e.index<choices)||!(e.at===null||instant(e.at))))return null;out.selections=w.selections.map(e=>({...e}));}
 return out;
}
export function examWork(session:ExamSession,questionId=session.questionIds[session.index]):ExamWork{
 return session.work?.[questionId]??(questionId===session.questionIds[session.index]?{selectedIndex:session.selectedIndex,hintsUsed:session.hintsUsed,reasoning:session.reasoning}:{selectedIndex:null,hintsUsed:0,reasoning:""});
}
export function editExamWork(record:ExamRecord,exam:ExamProfile,patch:Partial<ExamWork>,now:number):ExamRecord{
 const s=record.sessions[exam];if(!s||!instant(now)||now<s.startedAt)return record;const q=examBank.find(q=>q.id===s.questionIds[s.index])!;
 const checked=sessionAnswers(record,exam,now).some(a=>a.questionId===q.id);
 if(checked&&Object.keys(patch).some(k=>k!=="flagged"))return record;
 const old=examWork(s),next={...old,...patch};
 if(patch.selectedIndex!==undefined&&patch.selectedIndex!==old.selectedIndex){const prior=old.selections|| (old.selectedIndex!==null?[{index:old.selectedIndex,at:null}]:[]);const event={index:patch.selectedIndex,at:now};if(prior.length>=100){next.selections=[prior[0],...prior.slice(-98),event];next.historyTruncated=true;}else next.selections=[...prior,event];}
 const optional=extras(next,q.choices.length);if(!optional||!(next.selectedIndex===null||Number.isInteger(next.selectedIndex)&&next.selectedIndex>=0&&next.selectedIndex<q.choices.length)||!Number.isInteger(next.hintsUsed)||next.hintsUsed<old.hintsUsed||next.hintsUsed>q.hints.length||typeof next.reasoning!=="string"||next.reasoning.length>500||next.selectedIndex!==null&&next.eliminated?.includes(next.selectedIndex))return record;
 const work={selectedIndex:next.selectedIndex,hintsUsed:next.hintsUsed,reasoning:next.reasoning,...optional};
 return {...record,sessions:{...record.sessions,[exam]:{...s,selectedIndex:work.selectedIndex,hintsUsed:work.hintsUsed,reasoning:work.reasoning,work:{...s.work,[q.id]:work}}}};
}
export function navigateExamQuestion(record:ExamRecord,exam:ExamProfile,index:number,now:number):ExamRecord{
 const s=record.sessions[exam];if(!s||!Number.isInteger(index)||index<0||index>=s.questionIds.length||now<s.startedAt)return record;
 const work={...s.work,[s.questionIds[s.index]]:examWork(s)},target=work[s.questionIds[index]]??{selectedIndex:null,hintsUsed:0,reasoning:""};
 return {...record,sessions:{...record.sessions,[exam]:{...s,index,finished:false,selectedIndex:target.selectedIndex,hintsUsed:target.hintsUsed,reasoning:target.reasoning,work}}};
}
export const emptyExamRecord=():ExamRecord=>({version:1,activeExam:"sat",attempts:[],sessions:{sat:null,psat:null}});
export function normalizeExamAttempts(value:unknown):ExamAttempt[]{
 if(!Array.isArray(value))return [];
 const records:ExamAttempt[]=[],seen=new Set<string>();
 for(const a of value){
  const q=examBank.find(q=>q.id===a?.questionId);
  if(!a||!id(a.id)||seen.has(a.id)||!profile(a.exam)||!id(a.sessionId)||!["diagnostic","practice"].includes(a.mode)||!q||!(a.selectedIndex===null||(Number.isInteger(a.selectedIndex)&&a.selectedIndex>=0&&a.selectedIndex<q.choices.length))||!Number.isInteger(a.hintsUsed)||a.hintsUsed<0||a.hintsUsed>q.hints.length||typeof a.reasoning!=="string"||a.reasoning.length>500||!instant(a.submittedAt))continue;
  const optional=extras(a,q.choices.length);if(!optional||optional.selections?.some(e=>e.at!==null&&e.at>a.submittedAt))continue;
  seen.add(a.id);records.push({id:a.id,exam:a.exam,sessionId:a.sessionId,mode:a.mode,questionId:a.questionId,selectedIndex:a.selectedIndex,hintsUsed:a.hintsUsed,reasoning:a.reasoning,submittedAt:a.submittedAt,...(optional.scratch!==undefined?{scratch:optional.scratch}:{}),...(optional.estimate!==undefined?{estimate:optional.estimate}:{}),...(optional.confidence?{confidence:optional.confidence}:{}),...(optional.selections?{selections:optional.selections}:{}),...(optional.historyTruncated!==undefined?{historyTruncated:optional.historyTruncated}:{})});
 }
 return records.sort((a,b)=>a.submittedAt-b.submittedAt).slice(-1000);
}
function normalizeSession(value:unknown):ExamSession|null{
 if(!value||typeof value!=="object")return null;
 const s=value as ExamSession;
 if(!id(s.id)||!["diagnostic","practice"].includes(s.mode)||!Array.isArray(s.questionIds)||!s.questionIds.length||s.questionIds.length>8||new Set(s.questionIds).size!==s.questionIds.length||s.questionIds.some(id=>!examBank.some(q=>q.id===id))||!Number.isInteger(s.index)||s.index<0||s.index>=s.questionIds.length||!instant(s.startedAt)||typeof s.finished!=="boolean"||!(s.selectedIndex===null||(Number.isInteger(s.selectedIndex)&&s.selectedIndex>=0&&s.selectedIndex<4))||!Number.isInteger(s.hintsUsed)||s.hintsUsed<0||s.hintsUsed>2||typeof s.reasoning!=="string"||s.reasoning.length>500)return null;
 const work:Record<string,ExamWork>={};
 if(s.work!==undefined){if(!s.work||typeof s.work!=="object"||Array.isArray(s.work)||Object.keys(s.work).some(key=>!s.questionIds.includes(key)))return null;for(const [key,w] of Object.entries(s.work)){const q=examBank.find(q=>q.id===key)!;const optional=extras(w,q.choices.length);if(!optional||!w||!(w.selectedIndex===null||Number.isInteger(w.selectedIndex)&&w.selectedIndex>=0&&w.selectedIndex<q.choices.length)||!Number.isInteger(w.hintsUsed)||w.hintsUsed<0||w.hintsUsed>q.hints.length||typeof w.reasoning!=="string"||w.reasoning.length>500||w.selectedIndex!==null&&optional.eliminated?.includes(w.selectedIndex))return null;work[key]={selectedIndex:w.selectedIndex,hintsUsed:w.hintsUsed,reasoning:w.reasoning,...optional};}const active=work[s.questionIds[s.index]];if(active&&(active.selectedIndex!==s.selectedIndex||active.hintsUsed!==s.hintsUsed||active.reasoning!==s.reasoning))return null;}
 return {id:s.id,mode:s.mode,questionIds:[...s.questionIds],index:s.index,startedAt:s.startedAt,finished:s.finished,selectedIndex:s.selectedIndex,hintsUsed:s.hintsUsed,reasoning:s.reasoning,...(s.work!==undefined?{work}:{})};
}
export function readExamRecord(value:unknown):ExamRecord{
 if(!value||typeof value!=="object"||Array.isArray(value))throw new Error("Your saved exam practice could not be read. The saved copy has not been replaced.");
 const r=value as ExamRecord;
 if(r.version!==1||!profile(r.activeExam)||!Array.isArray(r.attempts)||!r.sessions||typeof r.sessions!=="object")throw new Error("This exam-practice save is not supported. Your original saved copy is unchanged.");
 const attempts=normalizeExamAttempts(r.attempts);
 const sat=normalizeSession(r.sessions.sat),psat=normalizeSession(r.sessions.psat);
 if(attempts.length!==r.attempts.length||(r.sessions.sat!==null&&!sat)||(r.sessions.psat!==null&&!psat))throw new Error("Part of your exam-practice save is incomplete. Continue temporarily or reload a valid saved copy.");
 return {version:1,activeExam:r.activeExam,attempts,sessions:{sat,psat}};
}
export function latestExamEvidence(exam:ExamProfile,attempts:ExamAttempt[],now:number):Map<string,ExamAttempt>{
 const latest=new Map<string,ExamAttempt>();
 for(const a of normalizeExamAttempts(attempts).filter(a=>a.exam===exam&&a.submittedAt<=now))latest.set(a.questionId,a);
 return latest;
}
export function examSkillEvidence(exam:ExamProfile,attempts:ExamAttempt[],now:number){
 const latest=latestExamEvidence(exam,attempts,now);
 return (Object.keys(examSkillLessons) as ExamSkill[]).map(skill=>{
  const questions=examBank.filter(q=>q.skill===skill),answers=questions.flatMap(q=>{const a=latest.get(q.id);return a?[{a,q}]:[];});
  return {skill,domain:examSkillLessons[skill].domain,total:questions.length,checked:answers.filter(x=>x.a.selectedIndex!==null).length,unanswered:answers.filter(x=>x.a.selectedIndex===null).length,independent:answers.filter(x=>x.a.selectedIndex===x.q.answerIndex&&x.a.hintsUsed===0).length,helped:answers.filter(x=>x.a.selectedIndex===x.q.answerIndex&&x.a.hintsUsed>0).length,needsPractice:answers.filter(x=>x.a.selectedIndex!==null&&x.a.selectedIndex!==x.q.answerIndex).length};
 });
}
export function recommendedExamDomain(exam:ExamProfile,attempts:ExamAttempt[],now:number):ExamDomain{
 const skills=examSkillEvidence(exam,attempts,now);
 return (Object.keys(examDomains) as ExamDomain[]).map(domain=>{
  const items=skills.filter(s=>s.domain===domain);
  return {domain,missed:items.reduce((n,s)=>n+s.needsPractice,0),helped:items.reduce((n,s)=>n+s.helped,0),checked:items.reduce((n,s)=>n+s.checked,0)};
 }).sort((a,b)=>Number(b.missed>0)-Number(a.missed>0)||Number(b.helped>0)-Number(a.helped>0)||a.checked-b.checked)[0].domain;
}
export function startExamSession(record:ExamRecord,exam:ExamProfile,mode:"diagnostic"|"practice",domain:ExamDomain,now:number,sessionId:string,skill?:ExamSkill):ExamRecord{
 if(!profile(exam)||!id(sessionId)||!instant(now)||!["diagnostic","practice"].includes(mode)||!Object.hasOwn(examDomains,domain))throw new Error("Choose a valid exam and practice focus.");
 if(skill!==undefined && (mode!=="practice" || !Object.hasOwn(examSkillLessons,skill) || examSkillLessons[skill].domain!==domain))throw new Error("Choose a skill in the selected practice domain.");
 const latest=latestExamEvidence(exam,record.attempts,now);
 const ranked=(questions:ExamBankQuestion[])=>[...questions].sort((a,b)=>{
  const priority=(q:ExamBankQuestion)=>{const a=latest.get(q.id);return !a||a.selectedIndex===null?0:a.selectedIndex!==q.answerIndex?1:a.hintsUsed?2:3;};
  return priority(a)-priority(b)||(latest.get(a.id)?.submittedAt||0)-(latest.get(b.id)?.submittedAt||0);
 });
 const questionIds=mode==="diagnostic"?(Object.keys(examDomains) as ExamDomain[]).map(d=>{
  const questions=ranked(examBank.filter(q=>q.domain===d));
  const offset=exam==="psat"&&questions.length>1&&!latest.size?1:0;
  return questions[offset].id;
 }):ranked(examBank.filter(q=>q.domain===domain&&(!skill||q.skill===skill))).slice(0,4).map(q=>q.id);
 const session:ExamSession={id:sessionId,mode,questionIds,index:0,startedAt:now,finished:false,selectedIndex:null,hintsUsed:0,reasoning:""};
 return {...record,activeExam:exam,sessions:{...record.sessions,[exam]:session}};
}
export function sessionAnswers(record:ExamRecord,exam:ExamProfile,now:number):ExamAttempt[]{
 const s=record.sessions[exam];if(!s)return [];
 const latest=new Map<string,ExamAttempt>();for(const a of record.attempts.filter(a=>a.exam===exam&&a.sessionId===s.id&&a.submittedAt<=now))latest.set(a.questionId,a);
 return s.questionIds.flatMap(id=>latest.get(id)?[latest.get(id)!]:[]);
}
export function submitExamAnswer(record:ExamRecord,exam:ExamProfile,skip:boolean,now:number,attemptId:string):ExamRecord{
 const s=record.sessions[exam];if(!s||s.finished||now<s.startedAt||!id(attemptId)||!instant(now))return record;
 if(sessionAnswers(record,exam,now).some(a=>a.questionId===s.questionIds[s.index]))return record;
 if(!skip&&s.selectedIndex===null)return record;
 const currentWork=examWork(s);
 const attempt:ExamAttempt={id:attemptId,exam,sessionId:s.id,mode:s.mode,questionId:s.questionIds[s.index],selectedIndex:skip?null:s.selectedIndex,hintsUsed:s.hintsUsed,reasoning:s.reasoning,submittedAt:now,...(currentWork.scratch!==undefined?{scratch:currentWork.scratch}:{}),...(currentWork.estimate!==undefined?{estimate:currentWork.estimate}:{}),...(currentWork.confidence?{confidence:currentWork.confidence}:{}),...(currentWork.selections?{selections:currentWork.selections}:{}),...(currentWork.historyTruncated!==undefined?{historyTruncated:currentWork.historyTruncated}:{})};
 return {...record,attempts:normalizeExamAttempts([...record.attempts,attempt])};
}
export function advanceExamSession(record:ExamRecord,exam:ExamProfile,now:number):ExamRecord{
 const s=record.sessions[exam];if(!s||!sessionAnswers(record,exam,now).some(a=>a.questionId===s.questionIds[s.index]))return record;
 const answered=new Set(sessionAnswers(record,exam,now).map(a=>a.questionId));
 if(s.questionIds.every(id=>answered.has(id)))return {...record,sessions:{...record.sessions,[exam]:{...s,finished:true}}};
 const next=Array.from({length:s.questionIds.length},(_,i)=>(s.index+i+1)%s.questionIds.length).find(i=>!answered.has(s.questionIds[i]))!;
 return navigateExamQuestion(record,exam,next,now);
}
export function examAttemptToMistake(attempt:ExamAttempt,now:number):Mistake{
 const a=normalizeExamAttempts([attempt])[0],q=examBank.find(q=>q.id===a?.questionId);
 if(!a||!q||a.selectedIndex===null||a.submittedAt>now)throw new Error("Answer a checked question before saving it to the notebook.");
 if(a.id.length>95)throw new Error("This practice identifier is too long to save safely in the notebook.");
 const question=[q.passage,q.prompt].filter(Boolean).join("\n\n");
 return {id:`exam-${a.id}`,exam:a.exam==="sat"?"SAT":"PSAT/NMSQT",question:question.slice(0,1200),answer:`Selected: ${q.choices[a.selectedIndex]}.${a.reasoning?` My reasoning: ${a.reasoning}`:""}`.slice(0,700),expected:`${q.choices[q.answerIndex]}. ${q.explanation}`.slice(0,700),reflection:`Original dAI practice, checked against its authored answer key. ${q.choiceNotes[a.selectedIndex]}\n${q.explanation}\nHints used: ${a.hintsUsed}.`,createdAt:a.submittedAt,reviewAt:now+86400000,reviews:0};
}

export type ExamReview={skill:ExamSkill;domain:ExamDomain;anchor:ExamAttempt;dueAt:number;resolvedBy:ExamAttempt|null};
/** A supported/missed answer needs a different independently answered example, not a repeat of its key. */
export function examReviewProgress(exam:ExamProfile,attempts:ExamAttempt[],now:number):ExamReview[]{
 const history=normalizeExamAttempts(attempts).filter(a=>a.exam===exam&&a.submittedAt<=now),reviews:ExamReview[]=[];
 for(const skill of Object.keys(examSkillLessons) as ExamSkill[]){
  const items=history.filter(a=>examBank.find(q=>q.id===a.questionId)?.skill===skill);
  const anchor=items.findLast(a=>{const q=examBank.find(q=>q.id===a.questionId)!;return a.selectedIndex!==null&&(a.selectedIndex!==q.answerIndex||a.hintsUsed>0);});
  if(!anchor)continue;
  const resolvedBy=items.find(a=>{const q=examBank.find(q=>q.id===a.questionId)!;return a.submittedAt>anchor.submittedAt&&a.questionId!==anchor.questionId&&a.selectedIndex===q.answerIndex&&a.hintsUsed===0;})||null;
  reviews.push({skill,domain:examSkillLessons[skill].domain,anchor,dueAt:anchor.submittedAt+86400000,resolvedBy});
 }
 return reviews.sort((a,b)=>a.dueAt-b.dueAt||a.skill.localeCompare(b.skill));
}
export function startExamReview(record:ExamRecord,exam:ExamProfile,skill:ExamSkill,now:number,sessionId:string):ExamRecord{
 if(!profile(exam)||!Object.hasOwn(examSkillLessons,skill)||!instant(now)||!id(sessionId))throw new Error("Choose a valid review skill.");
 const review=examReviewProgress(exam,record.attempts,now).find(r=>r.skill===skill&&!r.resolvedBy);
 if(!review)throw new Error("This skill has no pending review. Choose another area or refresh your practice.");
 const latest=latestExamEvidence(exam,record.attempts,now);
 const priority=(q:ExamBankQuestion)=>{const a=latest.get(q.id);return !a?0:a.selectedIndex===null?1:a.selectedIndex!==q.answerIndex?2:a.hintsUsed?3:4;};
 const anchorRepresentation=examBank.find(q=>q.id===review.anchor.questionId)?.representation;
 const differentPresentation=(q:ExamBankQuestion)=>Number(q.representation!==anchorRepresentation);
 const questionIds=examBank.filter(q=>q.skill===skill&&q.id!==review.anchor.questionId).sort((a,b)=>priority(a)-priority(b)||differentPresentation(b)-differentPresentation(a)||(latest.get(a.id)?.submittedAt||0)-(latest.get(b.id)?.submittedAt||0)).slice(0,2).map(q=>q.id);
 if(!questionIds.length)throw new Error("There is no different reviewed question for this skill yet. Choose another area.");
 const session:ExamSession={id:sessionId,mode:"practice",questionIds,index:0,startedAt:now,finished:false,selectedIndex:null,hintsUsed:0,reasoning:""};
 return {...record,activeExam:exam,sessions:{...record.sessions,[exam]:session}};
}
