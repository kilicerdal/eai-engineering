import {getCert,getQuestion,type CertQuestion} from './certification-content';
import type {CertStudy,CertSession} from './certification-study';
import type {LearningWork} from './certification-learning';
import {practiceQuestion,decidingDetail} from './certification-quality';
import {practiceQuestions} from './certification-practice';
import {practiceCaseByQuestion} from './certification-bank500';

export function reviewReason(s:CertSession,w:LearningWork,id:string){const q=getQuestion(id)!,a=s.answers[id];if(a?.selected==null)return 'Unanswered';if(a.selected!==q.answer)return 'Incorrect';const confidence=w.confidence[`${s.id}:${id}`];return confidence==='guessing'?'Correct · guessed':confidence==='unsure'?'Correct · unsure':null;}
export function reviewTargets(s:CertSession,w:LearningWork){return s.questions.filter(id=>reviewReason(s,w,id)!==null).sort((a,b)=>Number(s.answers[a]?.selected===getQuestion(a)!.answer)-Number(s.answers[b]?.selected===getQuestion(b)!.answer));}
export function ideaPractice(d:CertStudy,w:LearningWork,domain?:string){const s=d.session;if(!s||s.finishedAt===null)return [];const targets=reviewTargets(s,w),domains=domain?[domain]:[...new Set((targets.length?targets:s.questions).map(id=>getQuestion(id)!.domain))],oldCases=new Set(s.questions.map(id=>practiceCaseByQuestion[id]??id)),used=new Set<string>(),selected:string[]=[],groups=domains.map(domain=>practiceQuestions(d,50,domain).filter(id=>!s.questions.includes(id)).sort((a,b)=>Number(oldCases.has(practiceCaseByQuestion[a]??a))-Number(oldCases.has(practiceCaseByQuestion[b]??b))));while(selected.length<5&&groups.some(g=>g.length)){let moved=false;for(const g of groups){const at=g.findIndex(id=>!used.has(practiceCaseByQuestion[id]??id));if(at<0)continue;const id=g.splice(at,1)[0];selected.push(id);used.add(practiceCaseByQuestion[id]??id);moved=true;if(selected.length===5)break;}if(!moved){const g=groups.find(g=>g.length);if(!g)break;selected.push(g.shift()!);}}return selected;}
export function recordedEncounters(d:CertStudy){const s=d.session;if(!s||s.finishedAt===null)return null;const prior=d.attempts.filter(a=>!a.id.startsWith(s.id+':')&&a.at<=s.startedAt&&a.contentRevision===s.contentRevision),seen=new Set(prior.map(a=>a.question));const first=s.questions.filter(id=>!seen.has(id)),retry=s.questions.filter(id=>seen.has(id));const score=(ids:string[])=>({correct:ids.filter(id=>s.answers[id]?.selected===getQuestion(id)!.answer).length,total:ids.length});return {first:score(first),retry:score(retry),scope:'First recorded encounters are based on retained history of the same question edition; older attempts may no longer be available. Retry scores do not replace an earlier result.'};}
export function narrowComparison(q:CertQuestion,selected:number|null,other:number|undefined){if(selected===null||other===undefined||selected===other||!Number.isInteger(other)||other<0||other>3)return null;return {chosen:{text:q.choices[selected],why:q.explanations[selected]},other:{text:q.choices[other],why:q.explanations[other]},requirement:decidingDetail(q),neither:selected!==q.answer&&other!==q.answer,answer:q.choices[q.answer]};}
export function workedSteps(q:CertQuestion){const wrong=[0,1,2,3].find(i=>i!==q.answer)!;return [{title:'Identify the requirement',text:decidingDetail(q)},{title:'Eliminate a mismatch',text:`“${q.choices[wrong]}”: ${q.explanations[wrong]}`},{title:'Choose the answer that fits',text:`“${q.choices[q.answer]}”: ${q.explanations[q.answer]}`}];}
export function stoppingTakeaway(d:CertStudy,w:LearningWork){const s=d.session;if(!s||s.finishedAt===null)return null;const id=reviewTargets(s,w)[0]??s.questions[0],q=practiceQuestion(id,s.contentRevision),reason=reviewReason(s,w,id);return {domain:q.domain,text:`${reason==='Correct · guessed'||reason==='Correct · unsure'?'You chose correctly but felt uncertain. ':reason==='Incorrect'?'For the next scenario, check this detail first. ':reason==='Unanswered'?'Start your next attempt by finding this detail. ':'Carry this requirement into a different scenario. '}“${decidingDetail(q)}”.`};}
// Illustrations restate supplied scenarios only; they do not add evidence or change grading.
export const scenarioEvidence:Record<string,{label:string;text:string}>={
 'cloud-practitioner-01':{label:'Ticket-site demand',text:'Normal demand → extra capacity for one hour → normal demand'},
 'cloud-practitioner-02':{label:'Observed constraint',text:'Compute capacity: enough\nOne dependency: failing\nQuestion: address the stated failure'},
 'ai-practitioner-01':{label:'Training examples',text:'Message → supplied label: spam\nMessage → supplied label: not spam\nModel task: classify messages'},
 'ai-practitioner-03':{label:'Evaluation setup',text:'Training examples ──┐\n                   ├─ same examples\nEvaluation data ────┘'},
 'istqb-foundation-03':{label:'Sequence under review',text:'Requirement misunderstood → faulty code introduced → wrong result observed'},
 'istqb-foundation-05':{label:'Two observations',text:'Checks: many pass\nDelivered feature: solves the wrong user problem'},
 'solutions-architect-01':{label:'Access requirement',text:'EC2 application → needs S3 access\nConstraint: no stored access keys'},
 'solutions-architect-03':{label:'Failure to withstand',text:'Web tier\n   ↓\nLoss of one Availability Zone\n   ↓\nRequired: keep serving'},
 'developer-associate-01':{label:'Payment-event delivery',text:'Payment event → Lambda handler\nSame event again → Lambda handler\nQuestion: application behavior'},
 'developer-associate-05':{label:'Release requirement',text:'Existing Lambda version: current traffic\nNew version: small initial share'},
 'test-automation-01':{label:'Reported automation evidence',text:'Script count: 5,000\nWhich failures they detect: unexplained'},
 'test-automation-03':{label:'Adoption evidence',text:'Tool demo → toy page succeeds\nProposed next step → organization-wide adoption'},
 'ai-testing-03':{label:'Observed performance',text:'Overall accuracy: 98%\nRare critical events: most missed'},
 'ai-testing-05':{label:'Supplied classifier outcomes',text:'Actual positives found: 30\nActual positives missed: 10\nTask: recall'},
 'generative-ai-testing-01':{label:'Requirement mismatch',text:'Requirements: password rule absent\nLLM output: password rule invented'},
 'generative-ai-testing-05':{label:'Prompt contents',text:'Included: real customer identifiers\nNeed for those identifiers: unnecessary'},
 'github-actions-02':{label:'Required combinations',text:'Runtime A × Operating system A\nRuntime A × Operating system B\nRuntime B × Operating system A\nRuntime B × Operating system B'},
 'github-actions-03':{label:'Cross-job file handoff',text:'Build job → output created\nLater job → output not found'},
 'github-copilot-01':{label:'Review boundary',text:'Copilot suggestion → plausible authentication change\nMerge → not yet performed'},
 'github-copilot-04':{label:'Proposed change scope',text:'Agent proposal → six changed files\nQuestion → developer inspection'},
};

/** Describes only this completed sample, never readiness or mastery. */
export function sessionDomainSnapshot(data:CertStudy){
 const s=data.session;if(!s||s.finishedAt===null)return null;
 const rows=getCert(data.track)!.domains.map(d=>{const ids=s.questions.filter(id=>practiceQuestion(id,s.contentRevision).domain===d.id);return {id:d.id,title:d.title,total:ids.length,correct:ids.filter(id=>s.answers[id]?.selected===practiceQuestion(id,s.contentRevision).answer).length};}).filter(d=>d.total>0);
 const ranked=[...rows].sort((a,b)=>(b.correct*a.total-a.correct*b.total)||b.total-a.total);
 return {strongest:ranked.find(d=>d.correct>0)??null,revisit:[...rows].sort((a,b)=>(a.correct*b.total-b.correct*a.total)||b.total-a.total).find(d=>d.correct<d.total)??null};
}
