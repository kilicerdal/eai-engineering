import type {SavedJourney} from "./study-progress";
import {latestLessonCheck,checkLabel,type LessonCheck} from "./study-checkpoints";
export const PLAN_CHOICE_KEY="eai-plan-next-step-v1";
export type PlanChoice={version:1;key:string;option:"adapt"|"original";decidedAt:number};
export type PlanAdjustment={key:string;source:LessonCheck;lesson:SavedJourney["plan"]["lessons"][number];kind:"revisit"|"independent"|"verify"|"continue"|"consolidate";title:string;reason:string;action:string};
export function readPlanChoice(value:unknown):PlanChoice{
 const v=value as PlanChoice;if(!v||v.version!==1||typeof v.key!=="string"||!v.key||v.key.length>100000||(v.option!=="adapt"&&v.option!=="original")||!Number.isFinite(v.decidedAt)||v.decidedAt<=0)throw new Error("Your saved next-step choice could not be read. Its original copy is preserved.");
 return {version:1,key:v.key,option:v.option,decidedAt:v.decidedAt};
}
/** A proposal changes no plan data. It is tied to the full current plan and exact latest evidence. */
export function proposePlanAdjustment(journey:SavedJourney|null,checks:LessonCheck[],now:number):PlanAdjustment|null{
 if(!journey?.accepted||journey.dirty)return null;
 const current=journey.plan.lessons.flatMap((lesson,index)=>{const check=latestLessonCheck({goal:journey.settings.goal,lesson},checks,now);return check?[{lesson,index,check}]:[];}).sort((a,b)=>b.check.submittedAt-a.check.submittedAt||a.index-b.index)[0];
 if(!current)return null;
 const {check:source,lesson:sourceLesson,index}=current;
 const next=journey.plan.lessons.slice(index+1).find(l=>!journey.completed.includes(l.id));
 const kind=source.result.decision==="uncertain"?"verify":source.result.decision!=="meets"?"revisit":source.helpUsed?"independent":next?"continue":"consolidate";
 const lesson=kind==="continue"?next!:sourceLesson;
 const key=JSON.stringify([journey.settings,journey.plan,[...journey.completed].sort(),source]);
 const details={
  verify:{title:`Verify: ${sourceLesson.title}`,reason:"The latest check could not verify the answer. Clarify the original question or source before treating this as a mistake.",action:"Clarify this feedback"},
  revisit:{title:`Revisit: ${sourceLesson.title}`,reason:`The latest check identified a reasoning gap: ${source.result.reasoningGap.slice(0,350)}`,action:"Work on this lesson"},
  independent:{title:`Try independently: ${sourceLesson.title}`,reason:"The latest answer was completed with help. Try a different question on the same objective without hints before moving forward.",action:"Practice without hints"},
  continue:{title:`Continue: ${lesson.title}`,reason:`Your latest answer on “${sourceLesson.title}” was independent. You can try the next unmarked lesson in the existing sequence; this does not prove mastery or mark the earlier lesson complete.`,action:"Continue to this lesson"},
  consolidate:{title:`Consolidate: ${sourceLesson.title}`,reason:"There is no later unmarked lesson in this plan. Review a different example or choose a new goal when ready; your completion marks stay under your control.",action:"Revisit and consolidate"},
 };
 return {key,source,lesson,kind,...details[kind]};
}
export function resolvePlanChoice(journey:SavedJourney|null,checks:LessonCheck[],value:unknown,now:number){
 if(!value)return null;
 let choice:PlanChoice;try{choice=readPlanChoice(value);}catch{return null;}
 const proposal=proposePlanAdjustment(journey,checks,now);
 if(!proposal||choice.key!==proposal.key||choice.decidedAt>now||choice.decidedAt<proposal.source.submittedAt)return null;
 const lesson=choice.option==="adapt"?proposal.lesson:journey!.plan.lessons.find(l=>!journey!.completed.includes(l.id))||journey!.plan.lessons[0];
 if(!lesson)return null;
 return {lesson,choice,proposal,title:choice.option==="adapt"?proposal.title:`Original path: ${lesson.title}`,reason:choice.option==="adapt"?proposal.reason:"You chose to keep the original next lesson. Saved feedback remains available for review.",action:choice.option==="adapt"?proposal.action:"Continue my original path",evidenceLabel:checkLabel(proposal.source)};
}
