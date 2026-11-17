import {getCert,type CertQuestion} from './certification-content';
import {practiceQuestion,QUALITY_REVISION} from './certification-quality';
import {goalQuestions} from './certification-workshop';
import {practiceQuestions} from './certification-practice';
import type {CertStudy} from './certification-study';
import type {CoachingWork} from './certification-coaching';
// Use only an exact excerpt from this saved question edition; never add evidence to its prompt.
export function decidingExcerpt(q:CertQuestion){const sentences=q.prompt.match(/[^.!?]+[.!?]?/g)?.map(s=>s.trim()).filter(Boolean)??[q.prompt];return sentences.find(s=>/\b(must|but|without|requires?|cannot|only|fails?|failed|needs?)\b/i.test(s))??sentences[0];}
export function highlightParts(q:CertQuestion){const clue=decidingExcerpt(q),at=q.prompt.indexOf(clue);return {before:q.prompt.slice(0,at),clue,after:q.prompt.slice(at+clue.length)};}
export function contentChanges(q:CertQuestion){const latest=practiceQuestion(q.id,QUALITY_REVISION),changes:{label:string;before:string;after:string}[]=[];if(q.prompt!==latest.prompt)changes.push({label:'Question wording',before:q.prompt,after:latest.prompt});for(let i=0;i<q.choices.length;i++){if(q.choices[i]!==latest.choices[i])changes.push({label:`Choice ${String.fromCharCode(65+i)}`,before:q.choices[i],after:latest.choices[i]});if(q.explanations[i]!==latest.explanations[i])changes.push({label:`Explanation ${String.fromCharCode(65+i)}`,before:q.explanations[i],after:latest.explanations[i]});}if(q.source!==latest.source)changes.push({label:'Source',before:q.source,after:latest.source});return {from:q.contentRevision??'original',to:QUALITY_REVISION,changes,answerPreserved:q.answer===latest.answer,reviewed:latest.reviewed};}
export function lowEnergyQuestions(data:CertStudy,now:number){const ids=goalQuestions(data,3,'all','mix',now);for(const id of practiceQuestions(data,3))if(ids.length<3&&!ids.includes(id))ids.push(id);return ids;}
export function keepPersonalExample(work:CoachingWork,domain:string,text:string,now:number){if(!getCert(work.track)!.domains.some(d=>d.id===domain)||typeof text!=='string'||text.length>600||!Number.isFinite(now)||now<0)throw Error('Choose a topic and an example up to 600 characters.');return {...work,personalExamples:{...work.personalExamples,[domain]:{text,at:now}}};}
import type {ConcernLocation} from './certification-learning';
export function concernExcerpt(q:CertQuestion,location:ConcernLocation){if(location==='prompt')return q.prompt;if(location.startsWith('choice-'))return q.choices[location.charCodeAt(7)-97];if(location==='explanation')return q.explanations.join('\n');if(location==='source')return q.source;return '';}
