import type {GoalLesson,GoalSource} from "./study-goal";
import type {CourseDocument,MaterialTask} from "./study-materials";
export const MATERIAL_HANDOFF_KEY="eai-lesson-material-handoff-v1";
export type LessonMaterialHandoff={version:1;title:string;question:string;documentIds:string[];task:MaterialTask};
export function makeLessonMaterialHandoff(goal:string,lesson:GoalLesson,sources:GoalSource[],task:MaterialTask="explain"):LessonMaterialHandoff{
 const ids=[...new Set(lesson.sourceIds.flatMap(id=>sources.filter(s=>s.sourceId===id).map(s=>s.documentId)))].slice(0,5);
 const instruction=task==="quiz"?"Ask ONE original practice question based on the selected excerpts and this lesson objective. Do not reveal its answer; wait for my attempt.":"Explain this lesson objective using the selected excerpts. Identify supporting passages and what the excerpts do not establish.";
 return {version:1,title:lesson.title,documentIds:ids,task,question:`Lesson: ${lesson.title}\nObjective: ${lesson.objective}\nMy learning goal: ${goal.slice(0,700)}\n${instruction}\nUse only supplied materials for factual claims and cite them. If they do not support the requested topic, say what is missing. Do not invent a worksheet, passage, source, or official exam coverage.`.slice(0,2500)};
}
export function normalizeLessonMaterialHandoff(value:unknown):LessonMaterialHandoff|null{
 if(!value||typeof value!=="object")return null;
 const v=value as Record<string,unknown>;
 if(v.version!==1||typeof v.title!=="string"||!v.title.trim()||v.title.length>120||typeof v.question!=="string"||!v.question.trim()||v.question.length>2500||!Array.isArray(v.documentIds)||v.documentIds.length>5||v.documentIds.some(id=>typeof id!=="string"||!id.trim()||id.length>150)||!["explain","quiz","guide"].includes(String(v.task)))return null;
 return {version:1,title:v.title.trim(),question:v.question.trim(),documentIds:[...new Set(v.documentIds)] as string[],task:v.task as MaterialTask};
}
export function lessonMaterialScope(documents:CourseDocument[],focus:string,handoff:LessonMaterialHandoff|null):CourseDocument[]{
 if(focus==="choose")throw new Error("Choose the materials you want to use for this lesson first.");
 if(focus==="lesson"){
  if(!handoff?.documentIds.length)throw new Error("This lesson has no linked materials. Choose a material explicitly.");
  if(handoff.documentIds.some(id=>!documents.some(d=>d.id===id)))throw new Error("Some linked lesson materials are missing. Add them again or choose another material explicitly.");
  return documents.filter(d=>handoff.documentIds.includes(d.id));
 }
 return documents.filter(d=>focus==="all"||d.id===focus);
}
