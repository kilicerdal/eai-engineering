import {validateCheckQuestion,type CheckQuestion} from "./study-checkpoints";
const canonical=(text:string)=>text.normalize("NFKC").toLowerCase().replace(/\\[()[\]]/g,"").replace(/[^\p{L}\p{N}]+/gu,"");
function equationFingerprint(text:string):string|null{
 const m=/\bsolve(?:\s+for\s+[a-z]\s*:)?\s*(?:\\\()?\s*([+-]?\d+)\s*[a-z]\s*([+−-])\s*(\d+)\s*=\s*([+-]?\d+)/i.exec(text);
 return m?JSON.stringify([Number(m[1]),m[2]==="+"?Number(m[3]):-Number(m[3]),Number(m[4])]):null;
}
/** Conservative proposal checks, never applied retroactively to saved questions. */
export function validateFreshCheckQuestion(value:unknown,previousQuestion="",recentWork=""):CheckQuestion{
 const question=validateCheckQuestion(value),text=question.question,current=canonical(text),previous=canonical(previousQuestion);
 const equation=equationFingerprint(text);
 if(previous&&(current===previous||(equation&&equation===equationFingerprint(previousQuestion))))throw new Error("Create a different problem, with changed context or values, rather than repeating the previous question.");
 if(current.length>=20&&canonical(recentWork.slice(0,4000)).includes(current))throw new Error("Do not repeat a question already present in the worked examples or recent work.");
 const all=`${text}\n${question.criterion}`;
 if(/\b(?:fictional|hypothetical|imagined|invented|illustrative)\b/i.test(text)&&/\b(?:contributed to|caused|helped trigger|explains why)\b/i.test(text)&&/\b(?:history|historical|revolution|war|actual|real.world)\b/i.test(text))throw new Error("Do not use invented data as evidence for an actual historical cause. Ask a conceptual question, or ask what an explicitly fictional model illustrates and what it cannot establish.");
 if(/(?:^|\n)\s*(?:final\s+)?(?:answer|solution)\s*:\s*(?![_…\s]+$)\S/im.test(all)||/\b(?:correct answer|solution)\s+(?:is|equals)\s+[+−-]?\d/i.test(all))throw new Error("Remove the answer or solution from the question and criterion. Ask the learner to produce it.");
 if(equation&&/(?<![\p{L}\p{N}])[a-z]\s*=\s*[+−-]?\d/iu.test(question.criterion))throw new Error("The criterion must describe the reasoning to demonstrate without revealing the variable's final value.");
 const references=/\b(?:in|from|using|according to|refer to|consult|read)\s+(?:(?:the|this|provided|attached|above|following)\s+)+(?:passage|poem|graph|table|diagram|figure|dataset|worksheet)\b/i;
 const suppliedText=/(?:["“][^"”]{40,}["”]|:\s*[\s\S]{60,}|\n[\s\S]{60,})/.test(text);
 if(references.test(text)&&!suppliedText)throw new Error("Include all referenced source text or data inside the question. Do not require an unavailable passage, figure or worksheet.");
 return question;
}
