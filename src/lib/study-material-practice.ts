import {MATERIAL_LIMITS,normalizeMaterialText,validateMaterialSources,type CourseDocument,type MaterialExcerpt,type MaterialSource} from "./study-materials";
import {normalizeLessonChecks,lessonIdentity,type LessonContext,type LessonCheck} from "./study-checkpoints";
function fingerprint(text:string){let a=2166136261,b=5381;for(let i=0;i<text.length;i++){const code=text.charCodeAt(i);a=Math.imul(a^code,16777619);b=Math.imul(b,33)^code;}return `${(a>>>0).toString(16).padStart(8,"0")}${(b>>>0).toString(16).padStart(8,"0")}`;}
export function selectStudyPassage(document:CourseDocument,pageNumber:number,selection:string):MaterialSource{
 const page=document.pages.find(p=>p.number===pageNumber),text=normalizeMaterialText(selection);
 if(!page||text.length<30||text.length>MATERIAL_LIMITS.excerptCharacters||!normalizeMaterialText(page.text).includes(text))throw new Error("Choose 30–1,800 characters from this source section.");
 return validateMaterialSources([{documentId:document.id,name:document.name,kind:document.kind,page:pageNumber,text}])[0];
}
export function sourceStillAvailable(source:MaterialExcerpt,documents:CourseDocument[]):boolean{
 const page=documents.find(d=>d.id===source.documentId)?.pages.find(p=>p.number===source.page);
 return !!page&&normalizeMaterialText(page.text).includes(normalizeMaterialText(source.text));
}
export function materialPracticeContext(source:MaterialSource):LessonContext{
 const [safe]=validateMaterialSources([source]);
 return {goal:`Understand and apply a passage from ${safe.name}.`,lesson:{id:`material-${fingerprint(JSON.stringify([safe.documentId,safe.page,safe.text]))}`,title:`Practice: ${safe.name}`.slice(0,120),objective:"Explain and apply the selected passage, distinguishing what it supports from what it does not establish.",activity:"Answer one fresh question grounded only in the supplied passage. Do not assume access to the rest of the document or outside sources.",checkpoint:"Justify the answer using relevant source evidence and explain the reasoning.",sourceIds:["S1"]},sources:[safe]};
}
export function materialReviewSteps(checks:LessonCheck[],documents:CourseDocument[],now:number):LessonCheck[]{
 const latest=new Map<string,LessonCheck>();
 for(const check of normalizeLessonChecks(checks).filter(c=>c.submittedAt<=now&&c.context.sources?.length&&c.context.sources.every(s=>sourceStillAvailable(s,documents)))){const key=lessonIdentity(check.context);if(!latest.has(key))latest.set(key,check);}
 return [...latest.values()].filter(c=>c.result.decision!=="meets"||c.helpUsed).sort((a,b)=>a.submittedAt-b.submittedAt);
}
