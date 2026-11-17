import {getQuestion} from './certification-content';
import {practiceCaseByQuestion} from './certification-bank500';
export function wordingDisposition(id:string,nearQuestions:readonly string[],signals:readonly string[]){
 if(signals.some(s=>!s.startsWith('Close wording:')))return null;
 if([id,...nearQuestions].every(x=>['ai-testing-growth-015','ai-testing-growth-016'].includes(x)))return {decision:'Retain: distinct metric denominators',reason:'The pair deliberately contrasts detected/actual positives (recall) with true/predicted positives (precision). Shared numbers are not equivalent evaluation claims.'};
 const family=practiceCaseByQuestion[id],q=getQuestion(id);
 if(family&&q&&nearQuestions.length&&nearQuestions.every(other=>{const candidate=getQuestion(other);return practiceCaseByQuestion[other]===family&&candidate&&candidate.objective!==q.objective&&candidate.prompt!==q.prompt;}))return {decision:'Retain: shared case, distinct task',reason:`Case ${family} intentionally supplies shared context for different decision, verification or interpretation tasks. This item’s task is ${q.objective}. The sampler prefers unfamiliar cases and the interface labels a familiar case even when this particular task is new. This resolves the close-wording signal, not independent technical truth validation.`};
 return null;
}
