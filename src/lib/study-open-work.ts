import {normalizeStudyConversations} from "./study-continuity";
import {readExamRecord,sessionAnswers} from "./study-exam-practice";
export type OpenStudyWork={id:string;kind:"tutor"|"exam";title:string;detail:string;href:string;updatedAt:number};
/** Read-only links to existing work. No completion, mastery, reminders or AI calls. */
export function openStudyWork(rawConversations:unknown,rawExam:unknown,now:number):OpenStudyWork[]{
 const entries:OpenStudyWork[]=[];
 const sessions=normalizeStudyConversations(rawConversations);
 if(Array.isArray(rawConversations)&&sessions.length===rawConversations.length){
  const latest=sessions.filter(s=>s.updatedAt<=now&&(s.draft?.trim()||s.continuityNote?.trim()||s.messages.some(m=>m.role==="user"))).sort((a,b)=>b.updatedAt-a.updatedAt)[0];
  if(latest)entries.push({id:latest.id,kind:"tutor",title:latest.title==="New conversation"?"Your tutor session":latest.title,detail:latest.draft?.trim()?"An unsent message is saved. Review it before sending.":"Return to this conversation and its session context.",href:`/study?session=${encodeURIComponent(latest.id)}#ai-assistant`,updatedAt:latest.updatedAt});
 }
 try{if(rawExam){const record=readExamRecord(rawExam);for(const exam of ["sat","psat"] as const){const session=record.sessions[exam];if(!session||session.finished||session.startedAt>now)continue;const answers=sessionAnswers(record,exam,now);entries.push({id:`${exam}-${session.id}`,kind:"exam",title:`${exam==="sat"?"SAT":"PSAT/NMSQT"} ${session.mode==="diagnostic"?"skill check":"practice"}`,detail:`${answers.length} of ${session.questionIds.length} checked or skipped. Your current answer draft stays with this session.`,href:`/study/exams?exam=${exam}#exam-practice-workspace`,updatedAt:Math.max(session.startedAt,...answers.map(a=>a.submittedAt))});}}}catch{/* Leave the original saved record untouched. */}
 return entries.sort((a,b)=>b.updatedAt-a.updatedAt).slice(0,3);
}
