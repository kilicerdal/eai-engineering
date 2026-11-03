import {validateCheckFeedback,type CheckFeedback,type CheckQuestion} from "./study-checkpoints";
const compact=(value:string)=>value.trim().replace(/\s+/g," ");
function uncertain(reason:"source"|"evidence"):CheckFeedback{
 return {decision:"uncertain",method:"ai",feedback:reason==="source"?"There is not enough original question or source context to verify this answer. This is not evidence that your answer is incorrect.":"The review could not be connected reliably to the words in your answer. This is not evidence that your answer is incorrect.",reasoningGap:"Verification is pending; no reasoning error has been established.",nextStep:reason==="source"?"Supply the referenced passage, data, or complete question before checking the answer again.":"Explain one step of your reasoning and request another review.",guidingQuestion:reason==="source"?"What passage, data, or other information does the question refer to?":"What was the first step you used, and why?"};
}
/** Ground quoted evidence in learner text; this does not independently prove an AI judgment. */
export function validateReviewedFeedback(value:unknown,answer:string):CheckFeedback{
 if(!value||typeof value!=="object")throw new Error("The review was incomplete.");
 const data=value as Record<string,unknown>;
 if(typeof data.canVerify!=="boolean")throw new Error("Missing verification status.");
 if(!data.canVerify)return uncertain("source");
 const excerpt=typeof data.answerExcerpt==="string"?compact(data.answerExcerpt):"";
 if(!excerpt||excerpt.length>500||!compact(answer).includes(excerpt))return uncertain("evidence");
 if(typeof data.guidingQuestion!=="string"||!data.guidingQuestion.trim()||data.guidingQuestion.length>500)throw new Error("The review needs one useful guiding question.");
 return validateCheckFeedback({...data,answerExcerpt:excerpt,guidingQuestion:data.guidingQuestion,method:"ai"});
}
/** Narrow substitution check for a short numeric answer to an explicit integer linear equation. */
export function checkShortLinearAnswer(question:CheckQuestion,answer:string):CheckFeedback|null{
 if(answer.trim().length>120)return null;
 const plain=question.question.replace(/\\[()]/g,"").trim();
 const match=/^Solve(?:\s+for\s+([a-z])\s*:)?\s+([+-]?\d+)\s*([a-z])\s*([+−-])\s*(\d+)\s*=\s*([+-]?\d+)\s*\.?(?:\s+(?:Show each step\.|Show your work\.|Explain your reasoning\.|Show the operation you apply to both sides at each step, then substitute your result into the original equation to check it\.))?$/i.exec(plain);
 if(!match)return null;
 const [,named,coefficient,variable,sign,constant,total]=match;
 if(named&&named.toLowerCase()!==variable.toLowerCase())return null;
 const a=Number(coefficient),b=(sign==="+"?1:-1)*Number(constant),rhs=Number(total);
 if(!a||![a,b,rhs].every(n=>Number.isFinite(n)&&Math.abs(n)<=100000))return null;
 const cleaned=answer.trim().replace(/\\[()]/g,"").replace(/^\$(.*)\$$/,"$1").replace(/−/g,"-").replace(/\\frac\{([+-]?\d+)\}\{([+-]?\d+)\}/g,"$1/$2");
 const value=new RegExp(`^(?:${variable}\\s*=\\s*)?([+-]?\\d+(?:\\.\\d+)?)(?:\\s*\\/\\s*([+-]?\\d+(?:\\.\\d+)?))?\\s*[.]?$`,"i").exec(cleaned);
 if(!value)return null;
 const denominator=value[2]===undefined?1:Number(value[2]),x=Number(value[1])/denominator;
 if(!denominator||!Number.isFinite(x)||Math.abs(x)>1000000)return null;
 const lhs=a*x+b,correct=Math.abs(lhs-rhs)<=1e-9*Math.max(1,Math.abs(lhs),Math.abs(rhs));
 return {decision:correct?"partial":"needs_work",method:"substitution",answerExcerpt:answer.trim(),feedback:correct?"Your stated value satisfies the original equation. Your answer does not yet show the operations used to reach it.":"Your stated value does not satisfy the original equation. Recheck it before deciding which step needs to change.",reasoningGap:correct?"The final value checks, but the equivalent operations and reasoning are not shown.":`Substituting your value into the left side gives ${Number(lhs.toPrecision(10))}; the original right side is ${rhs}. This check does not establish which earlier step caused the mismatch.`,nextStep:correct?"Show the operation applied to both sides at each step, then check by substitution.":"Substitute your value into the original equation, compare the two sides, then show your first inverse operation.",guidingQuestion:correct?"Which operation did you apply to both sides first, and why does it preserve equality?":"Which operation would remove the constant from both sides of the original equation?"};
}
