// Reproducible overlap triage. A structural disposition is not factual sign-off.
import {readFileSync,writeFileSync} from 'node:fs';
import {loadStudyModule as load} from '../tests/load-study-module.mjs';
const {wordingDisposition}=load('certification-editorial-dispositions');
const audit=JSON.parse(readFileSync(process.argv[2]??'tmp/site16-overlap-review.json','utf8'));
const records=audit.conceptOverlap.map(pair=>{
 const [a,b]=pair.questions;
 const decision=wordingDisposition(a,[b],['Close wording: automated comparison']);
 return {...pair,status:decision?'intentional-linked-case':'pending-editorial-comparison',decision:decision?.decision??'Do not remove on lexical similarity alone',reason:decision?.reason??'Compare both deciding constraints and answer rationales. Distinct IDs and existing saved editions remain intact.',technicalVerification:'Not established by this classification'};
});
const counts={pairs:records.length,intentionalLinkedCases:records.filter(r=>r.status==='intentional-linked-case').length,pendingEditorialComparison:records.filter(r=>r.status==='pending-editorial-comparison').length};
writeFileSync(process.argv[3]??'tmp/certification-overlap-dispositions.json',JSON.stringify({scope:'Structural overlap triage using existing explicit shared-case dispositions. No content is deleted, no saved edition is changed, and factual correctness is not inferred.',counts,records},null,2)+'\n');
console.log(JSON.stringify(counts));
