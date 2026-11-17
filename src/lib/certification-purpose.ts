import {guidedChecks} from './certification-workshop-content';
import {certQuestions,getCert,getQuestion,type CertQuestion,type CertId} from './certification-content';
import {practiceQuestions} from './certification-practice';
import {practiceCaseByQuestion} from './certification-bank500';
import {officialSection} from './certification-resources';
import type {CertStudy,CertSession} from './certification-study';

function latest(data:CertStudy,now:number){
 const records=new Map<string,CertStudy['attempts'][number]>();
 for(const a of data.attempts)if(a.at<=now&&(!records.has(a.question)||records.get(a.question)!.at<=a.at))records.set(a.question,a);
 return [...records.values()];
}
export function recommendedPractice(data:CertStudy,now:number){
 if(data.session?.finishedAt===null)return null;
 const missed=latest(data,now).filter(a=>a.selected!==getQuestion(a.question)!.answer);
 const domains=getCert(data.track)!.domains.map(d=>({...d,missed:missed.filter(a=>getQuestion(a.question)!.domain===d.id)}))
  .filter(d=>d.missed.length).sort((a,b)=>b.missed.length-a.missed.length||Math.max(...b.missed.map(x=>x.at))-Math.max(...a.missed.map(x=>x.at)));
 const domain=domains[0];if(!domain)return null;
 const ids=practiceQuestions({...data,attempts:data.attempts.filter(a=>a.at<=now)},5,domain.id);
 return {domain:domain.id,title:domain.title,ids,reason:`Your latest retained answers include ${domain.missed.length} ${domain.missed.length===1?'idea':'ideas'} to revisit in this topic.`};
}
export function encounterLabel(data:CertStudy,session:CertSession,id:string){
 const seen=data.attempts.some(a=>a.at<=session.startedAt&&!a.id.startsWith(session.id+':')&&a.question===id);
 const family=practiceCaseByQuestion[id],familiarScenario=!!family&&data.attempts.some(a=>a.at<=session.startedAt&&!a.id.startsWith(session.id+':')&&practiceCaseByQuestion[a.question]===family);
 if(!seen&&familiarScenario)return 'Familiar scenario · a different task in a retained case';
 return session.mode==='review'||session.purpose==='revisit'?(seen?'Deliberate review · previously checked question':'Review round · different question in this topic'):
 seen?'Previously checked · included after fresh questions in this focus':'Fresh question · not previously checked in retained history';
}
const terms=(s:string)=>new Set(s.toLowerCase().replace(/[^a-z0-9]+/g,' ').split(' ').filter(x=>x.length>3&&!['which','what','this','that','with','from','only','rather','scenario','following','most'].includes(x)));
export function conceptAlternative(data:CertStudy,q:CertQuestion,now:number){
 const seen=new Set(latest(data,now).map(a=>a.question)),excluded=new Set(data.session?.questions??[]),family=practiceCaseByQuestion[q.id];
 const domainTitle=getCert(q.track)!.domains.find(d=>d.id===q.domain)!.title;
 const key=terms(q.choices[q.answer]+' '+q.objective.replace(domainTitle,'')),ranked=certQuestions.filter(x=>x.track===data.track&&x.domain===q.domain&&x.id!==q.id&&!excluded.has(x.id)&&(!family||practiceCaseByQuestion[x.id]!==family)).map(x=>{
  const target=terms(x.choices[x.answer]+' '+x.objective),common=[...key].filter(t=>target.has(t)).length;
  const sameAnswer=x.choices[x.answer].toLowerCase()===q.choices[q.answer].toLowerCase();
  return {id:x.id,shared:common,score:(sameAnswer?100:0)+common,familiar:seen.has(x.id)};
 }).sort((a,b)=>b.score-a.score||Number(a.familiar)-Number(b.familiar)||a.id.localeCompare(b.id));
 const best=ranked[0];return best?{id:best.id,kind:best.score>=100||best.shared>=2?'related-concept' as const:'broader-topic' as const,familiar:best.familiar}:null;
}
function firstSentence(text:string){return text.split(/(?<=[.!?])\s+/)[0];}
export function mistakeDistinction(q:CertQuestion,selected:number|null){
 if(selected===null||selected===q.answer)return null;
 // Explain the authored contrast; never infer a learner's private reasoning.
 return `${firstSentence(q.explanations[selected])} The deciding requirement: ${firstSentence(q.explanations[q.answer])}`;
}
export function calmResult(data:CertStudy){
 const s=data.session;if(!s||s.finishedAt===null)return null;
 const domains=getCert(data.track)!.domains.map(d=>({...d,missed:s.questions.filter(id=>getQuestion(id)!.domain===d.id&&s.answers[id]?.selected!==getQuestion(id)!.answer).length})).sort((a,b)=>b.missed-a.missed);
 const focus=domains.find(d=>d.missed>0);return focus?{domain:focus.id,title:focus.title,detail:`Revisit ${focus.title}. Start with the requirement that separates the answer from the alternatives.`}:{domain:null,title:'Build on this session',detail:'No missed answers in this session. Try fresh questions when you return; one result does not establish mastery.'};
}
export function coverageInventory(id:CertId){
 const t=getCert(id)!,sum=t.domains.reduce((n,d)=>n+d.weight,0),all=certQuestions.filter(q=>q.track===id);
 return t.domains.map(d=>{const pool=all.filter(q=>q.domain===d.id),target=all.length*d.weight/sum;return {id:d.id,title:d.title,total:pool.length,guided:guidedChecks.filter(q=>q.track===id&&q.domain===d.id).length,objectiveLabels:new Set(pool.map(q=>q.objective)).size,planningShare:Math.round(100*d.weight/sum),target:Math.round(target),priority:pool.length<target*.75?'Needs editorial attention':'Sample present',reference:officialSection(id,d.id)};});
}

export function resultReviewOrder(data:CertStudy,ids:readonly string[]){const focus=calmResult(data)?.domain;return [...ids].sort((a,b)=>Number(getQuestion(b)?.domain===focus)-Number(getQuestion(a)?.domain===focus));}
