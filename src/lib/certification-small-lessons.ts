import {expandedLessons,expandedConceptMaps} from './certification-concept-expansion';
import {certQuestions,type CertQuestion} from './certification-content';
import {practiceCaseByQuestion} from './certification-bank500';
import type {CertStudy} from './certification-study';
import {practiceQuestion,QUALITY_REVISION} from './certification-quality';
export type SmallLesson={id:string;title:string;rule:string;example:string;project?:{href:string;title:string;task:string}};
const model=(href:string,title:string,task:string)=>({href,title,task});
export const smallLessons:Record<string,SmallLesson>={
 ...expandedLessons,
 elasticity:{id:'elasticity',title:'Capacity follows demand',rule:'Elasticity concerns adding and removing capacity. It does not establish recovery from a failed dependency.',example:'Lunch traffic needs more workers; after lunch, remove idle capacity.',project:model('/explore/route','Explore alternative routes','Block a route. Compare changing capacity with providing another path. This is a local teaching model, not AWS execution.')},
 availability:{id:'availability',title:'Capacity and resilience differ',rule:'A larger single component can still fail. An independent alternative also needs an effective failover path.',example:'Two idle workers are not useful redundancy if no work reaches the surviving worker.',project:model('/engineering/practice/aws-recovery','Try the recovery exercise','Identify the failed dependency and the recovery evidence in this authored local exercise.')},
 identity:{id:'identity',title:'Sign-in is different from permission',rule:'MFA strengthens authentication. Scoped permissions constrain access; a workload role can supply temporary credentials.',example:'A second sign-in factor does not authorize a worker to read every bucket.',project:model('/engineering/practice/aws-boundary','Try the permission-boundary exercise','Compare the minimum required permissions in this authored local exercise. It does not access an AWS account.')},
 cost:{id:'cost',title:'Estimate, alert, investigate',rule:'Use an estimate before running, a configured budget notification for a target, and actual cost analysis to investigate spend.',example:'A launch estimate cannot send a warning on its own when later usage increases.'},
 purchase:{id:'purchase',title:'Match the purchasing constraint',rule:'A term commitment and Spot capacity reclamation are separate trade-offs. Check both constraints before choosing.',example:'A short non-interruptible experiment needs a different option from a restartable batch job.'},
 storage:{id:'storage',title:'Choose the data interface',rule:'Objects, shared files, block devices and relational records are different interfaces; choose for the access requirement.',example:'Images retrieved by bucket and key fit object storage; a shared file-system mount is another need.'},
 queue:{id:'queue',title:'Receiving is not processing',rule:'A queue buffers work. Receiving a standard-queue message does not prove its business intent has never been processed.',example:'A worker stores a claim, then loses its acknowledgement. Redelivery must not store a second claim.',project:model('/engineering/claim-twice#evidence','Inspect the claim-redelivery evidence','Compare storage and acknowledgement in this recorded synthetic case. It is not a live AWS queue.')},
 delivery:{id:'delivery',title:'Delivery and name resolution differ',rule:'Edge caching can deliver repeated content nearer users. DNS name resolution alone does not cache the website content.',example:'Resolving a hostname is not the same operation as delivering a cached image.'},
 confirmation:{id:'confirmation',title:'Fix versus side effects',rule:'Confirmation checks the fix; regression checks adverse effects.',example:'Retry the failed payment, then examine refunds.',project:model('/engineering/order-once#evidence','Inspect the checkout evidence','Compare the passing control and controlled defect. This is recorded synthetic evidence.')},
 boundary:{id:'boundary',title:'Check the edge',rule:'Exercise limits and neighboring values.',example:'For integers 18 upward, inspect 17, 18, 19.',project:model('/engineering/practice/boundary','Try boundary test design','Work through the local boundary exercise; it does not affect your certification score.')},
 validation:{id:'validation',title:'Passing is not enough',rule:'Passing checks do not establish fitness for users.',example:'A working checkout can still solve the wrong task.'},
 static:{id:'static',title:'Review before execution',rule:'Static testing examines work products without executing them.',example:'Find contradictory requirements before coding.'},
 risk:{id:'risk',title:'Show what remains unknown',rule:'Report important gaps alongside results.',example:'A green percentage can hide an untested refund path.'},
 coverage:{id:'coverage',title:'Coverage needs a model',rule:'Statement coverage does not imply branch coverage.',example:'One decision outcome may remain untested.'},
 automation:{id:'automation',title:'Automate useful evidence',rule:'Automation needs meaningful checks and maintenance.',example:'A page-load check does not check its total.',project:model('/engineering/order-once#evidence','Inspect the controlled fault','Ask whether the recorded assertions detect the injected fault, rather than counting executions.')},
};
// Authored concept membership, not similarity inferred from the learner's answer.
const maps:Record<string,Record<string,string>>={
 'cloud-practitioner':{
 ...Object.fromEntries(['01','transfer-1','growth-001'].map(x=>[x,'elasticity'])),
 ...Object.fromEntries(['02','19','growth-005','case-2-1','case-2-2'].map(x=>[x,'availability'])),
 ...Object.fromEntries(['09','12','13','case-4-1','case-4-2','case-4-3','transfer-2','growth-012','growth-013'].map(x=>[x,'identity'])),
 ...Object.fromEntries(['21','22','23','case-8-1','case-8-2','case-8-3','case-9-1','case-9-2','case-9-3','growth-039','growth-040','growth-041','growth-048','growth-049'].map(x=>[x,'cost'])),
 ...Object.fromEntries(['24','growth-042','growth-043','growth-044','growth-050'].map(x=>[x,'purchase'])),
 ...Object.fromEntries(['14','16','case-6-1','case-6-2','case-6-3','growth-023','growth-024','growth-025','growth-026','growth-027'].map(x=>[x,'storage'])),
 ...Object.fromEntries(['18','growth-028'].map(x=>[x,'queue'])),
 ...Object.fromEntries(['17','growth-030','growth-031'].map(x=>[x,'delivery']))},
 'istqb-foundation':{
 ...Object.fromEntries(['06','07','case-4-1','transfer-2','growth-011','growth-012'].map(x=>[x,'confirmation'])),
 ...Object.fromEntries(['15','transfer-1','growth-027','growth-036'].map(x=>[x,'boundary'])),
 ...Object.fromEntries(['05','growth-001','growth-037'].map(x=>[x,'validation'])),
 ...Object.fromEntries(['10','11','case-3-1','case-3-2','case-3-3','case-5-1','case-5-2','case-5-3','growth-019'].map(x=>[x,'static'])),
 ...Object.fromEntries(['18','19','case-9-1','case-9-2','case-9-3','growth-040','growth-043','growth-044'].map(x=>[x,'risk'])),
 ...Object.fromEntries(['17','growth-030','growth-031'].map(x=>[x,'coverage'])),
 ...Object.fromEntries(['22','23','case-10-1','case-10-2','case-10-3','growth-047'].map(x=>[x,'automation']))}
};
export function smallLesson(q:{track:string;id:string}){const suffix=q.id.slice(q.track.length+1),id=maps[q.track]?.[suffix]??expandedConceptMaps[q.track]?.[suffix];return id?smallLessons[id]:null;}
export function oneRelatedQuestion(q:CertQuestion,data:CertStudy,now:number){const lesson=smallLesson(q);if(!lesson||q.track!==data.track)return null;const seen=new Set(data.attempts.filter(a=>a.at<=now).map(a=>a.question));return certQuestions.filter(x=>x.track===q.track&&x.id!==q.id&&smallLesson(x)?.id===lesson.id&&x.prompt!==q.prompt&&(!practiceCaseByQuestion[q.id]||practiceCaseByQuestion[x.id]!==practiceCaseByQuestion[q.id])&&!data.session?.questions.includes(x.id)).sort((a,b)=>Number(seen.has(a.id))-Number(seen.has(b.id))||a.id.localeCompare(b.id))[0]??null;}
export function learningNextStep(data:CertStudy,now:number){if(data.session?.finishedAt===null)return null;const latest=new Map<string,CertStudy['attempts'][number]>();for(const a of data.attempts){if(a.at>now||!certQuestions.some(q=>q.id===a.question&&q.track===data.track))continue;const old=latest.get(a.question);if(!old||old.at<a.at)latest.set(a.question,a);}const conceptLatest=new Map<string,CertStudy['attempts'][number]>();for(const a of latest.values()){const concept=smallLesson(practiceQuestion(a.question,a.contentRevision))?.id;if(!concept)continue;const previous=conceptLatest.get(concept);if(!previous||previous.at<a.at)conceptLatest.set(concept,a);}const wrong=[...conceptLatest.values()].filter(a=>{const q=practiceQuestion(a.question,a.contentRevision);return a.selected!==null&&a.selected!==q.answer&&smallLesson(q);}).sort((a,b)=>b.at-a.at)[0];if(!wrong)return null;const q=practiceQuestion(wrong.question,wrong.contentRevision),lesson=smallLesson(q)!;return {q,lesson,next:oneRelatedQuestion(q,data,now),source:practiceQuestion(q.id,QUALITY_REVISION).source};}
