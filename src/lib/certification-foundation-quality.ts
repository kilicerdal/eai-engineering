import type {CertQuestion} from './certification-content';
export const FOUNDATION_REVIEWED='2026-11-19';
const pdf='https://istqb.org/?download_id=3345&sdm_process_download=1';
export function currentFoundationReference(q:{id:string;track:string;domain:string;source:string}){
 if(q.track!=='istqb-foundation')return q.source;
 if(q.id==='istqb-foundation-25'||q.id==='istqb-foundation-growth-048')return q.source; // Explicit advanced-tool enrichment keeps its own reference.
 const pages:Record<string,number>={fundamentals:15,lifecycle:28,static:33,design:39,management:48,tools:59};
 // One-based PDF destinations, checked against the v4.0.1 contents and section text.
 const base=[15,17,17,16,17,30,30,27,28,33,33,36,37,39,40,41,43,52,54,56,56,59,59,59];
 const growth=[17,17,17,17,17,16,17,17,22,20,30,30,28,28,28,28,27,17,33,34,36,36,36,36,36,39,40,41,41,42,43,43,44,44,46,40,17,52,52,52,49,49,53,53,56,56,59];
 const suffix=q.id.slice('istqb-foundation-'.length);
 const baseIndex=/^\d{2}$/.test(suffix)?Number(suffix)-1:-1;
 if(baseIndex>=0&&base[baseIndex])return pdf+'#page='+base[baseIndex];
 const growthIndex=suffix.startsWith('growth-')?Number(suffix.slice(7))-1:-1;
 if(growthIndex>=0&&growth[growthIndex])return pdf+'#page='+growth[growthIndex];
 const specific:Record<string,number>={'istqb-foundation-transfer-1':40,'istqb-foundation-transfer-2':30,'istqb-foundation-growth-049':59,'istqb-foundation-growth-050':59,'istqb-foundation-extra-01':40,'istqb-foundation-extra-02':33,'istqb-foundation-extra-03':54,'istqb-foundation-extra-04':30,'istqb-foundation-extra-05':56};
 const casePage:Record<string,number>={'1':17,'2':17,'3':27,'4':30,'5':33,'6':35,'7':41,'8':41,'9':54,'10':59};
 const family=suffix.match(/^case-(\d+)-/);
 if(family&&casePage[family[1]])return pdf+'#page='+casePage[family[1]];
 return pdf+'#page='+(specific[q.id]??pages[q.domain]??15);
}
/** New sessions only. quality-v10 and all older question editions remain immutable. */
export function foundationEdition(q:CertQuestion):CertQuestion{
 if(!['cloud-practitioner','istqb-foundation'].includes(q.track))return {...q,contentRevision:'quality-v11'};
 const next={...q,choices:[...q.choices],explanations:[...q.explanations],source:currentFoundationReference(q),reviewed:FOUNDATION_REVIEWED,contentRevision:'quality-v11'};
 if(q.id==='cloud-practitioner-growth-043'){
 next.prompt='A short EC2 experiment has unpredictable usage, requires no term commitment, and cannot accept Spot capacity reclamation. Which purchasing model fits?';
 next.source='https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html';
 next.explanations[q.answer]='On-Demand fits the stated lack of commitment and rejection of Spot capacity reclamation. It does not guarantee uninterrupted application availability.';
 next.explanations[0]='Spot does not require a term commitment either, but its capacity can be reclaimed. That conflicts with the explicit constraint.';
 }
 if(q.id==='cloud-practitioner-growth-025')next.explanations[q.answer]='EFS provides shared file-system access. EBS provides block storage; even supported Multi-Attach does not itself supply a managed shared file system.';
 if(q.id==='cloud-practitioner-01'){
 next.choices=['Elasticity','Agility','High availability','Economies of scale'];
 next.explanations=['Capacity grows and shrinks with the demand, including removal after the peak.','Agility concerns quickly experimenting or delivering changes; the stated clue is changing capacity.','High availability concerns continued service despite failures, not this rise and fall in demand.','Economies of scale can lower unit costs but do not describe this workload adjusting capacity.'];
 }
 if(q.id==='cloud-practitioner-growth-007'){
 next.choices=['Elasticity','Global reach','Agility','High availability'];
 next.explanations=['Elasticity follows changing demand; the stated decision concerns shorter experimentation cycles.','Global reach concerns geographic access, not how quickly a team can try a prototype.','Agility enables faster experimentation without guaranteeing that the experiment succeeds.','Availability concerns continuity during failures, not this reduced provisioning delay.'];
 }
 if(q.id==='cloud-practitioner-growth-008'){
 next.choices=['High availability','Economies of scale','Elasticity','Variable consumption expense'];
 next.explanations=['Availability concerns continuity, rather than replacing an upfront purchase with usage charges.','Economies of scale concerns unit-cost advantages, not the spending model described here.','Elasticity concerns matching capacity to demand; the prompt specifies payment and procurement.','The spending follows consumed resources instead of an upfront purchase of permanent capacity.'];
 }
 if(q.id==='istqb-foundation-06'){
 next.choices[0]='Regression testing';
 next.explanations[0]='Regression seeks adverse effects from a change; it can include the changed component as well as others. This question targets the original defect.';
 }
 if(q.id==='istqb-foundation-20'){
 next.choices[0]='Build, environment and logs, but no triggering steps or expected result';
 next.choices[2]='Steps and expected result, but no observed result or build';
 next.choices[3]='Failure count and severity, but no reproduction conditions';
 next.explanations[0]='Logs help, but the triggering conditions and expected behavior are missing.';
 next.explanations[2]='The observer must also identify the actual result and tested configuration.';
 next.explanations[3]='Impact does not establish how to reproduce the failure.';
 }
 if(q.id==='istqb-foundation-12')next.objective='§3.2.3 · Review roles';
 if(q.id==='istqb-foundation-growth-025'){next.choices=['Inspection','Informal review','Technical review','Walkthrough'];next.explanations=['An inspection uses the complete generic review process and metrics.','An informal review does not require that complete process.','A technical review focuses on technical decisions; the complete process and metrics identify inspection here.','A walkthrough is led by the author; that is not the distinguishing description here.'];next.prompt='A review follows the complete generic review process, with formally defined roles, recorded metrics and anomaly detection as its main objective. Which review type best fits?';}
 return next;
}
