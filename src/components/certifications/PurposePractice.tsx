'use client';
import {recommendedPractice,coverageInventory,conceptAlternative} from '@/lib/certification-purpose';
import type {CertStudy} from '@/lib/certification-study';
import type {CertQuestion,CertId} from '@/lib/certification-content';

export function RecommendedPractice({data,now,ready,onStart}:{data:CertStudy;now:number;ready:boolean;onStart:(ids:string[])=>void}){
 const next=recommendedPractice(data,now);if(!ready||!next)return null;
 return <aside className="cert-purpose-next"><p className="cert-eyebrow">ONE RECOMMENDED NEXT STEP</p><h3>{next.title}</h3><p>{next.reason}</p><button className="cert-primary" onClick={()=>onStart(next.ids)}>Try {next.ids.length} questions on this topic →</button><p className="cert-small">Fresh questions first. This is a suggestion; the three starting choices remain below.</p></aside>;
}
export function ConceptRetry({data,q,now,onStart}:{data:CertStudy;q:CertQuestion;now:number;onStart:(ids:string[])=>void}){
 const next=conceptAlternative(data,q,now);if(!next)return <p>No different scenario remains in this topic. Your official reference is still available.</p>;
 return <div className="cert-concept-retry"><button onClick={()=>onStart([next.id])}>{next.kind==='related-concept'?'Try a related concept in a different scenario':'Try a different question in this topic'} →</button><p className="cert-small">{next.familiar?'Previously checked material, offered deliberately for transfer practice.':'A question not previously checked in retained history.'} {next.kind==='broader-topic'?'This is a broader topic connection; it may test a different concept.':'Selected by shared answer concepts and objective wording; it is not an exact-equivalence guarantee.'}</p></div>;
}
export function CoverageInventory({id}:{id:CertId}){
 const rows=coverageInventory(id);return <details className="cert-more cert-coverage-inventory"><summary>Question coverage and gaps</summary><p>This inventory maps the 100 questions to the path’s existing domain or chapter sections. Planning shares help prioritize editorial work; they are not a claim that every official objective is covered or a predicted exam score.</p><ul>{rows.map(d=><li key={d.id}><h3>{d.title}</h3><p>{d.total} scored-bank questions · {d.planningShare}% planning share · {d.priority}</p>{d.guided>0&&<p>{d.guided} additional guided checks in Learn a topic. These strengthen practice without counting as scored-bank or complete-objective coverage.</p>}<a href={d.reference.href} target="_blank" rel="noreferrer">{d.reference.section} ↗</a></li>)}</ul><p className="cert-small">Question and objective-label counts measure inventory, not depth or independent validation. Low representation is an editorial review signal. Saved editions remain intact when content is improved.</p></details>;
}
