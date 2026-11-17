// Read-only local gate. Never deploys or changes learner storage.
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {loadStudyModule} from '../tests/load-study-module.mjs';
const C=loadStudyModule('certification-content'),Q=loadStudyModule('certification-quality'),E=loadStudyModule('certification-extra-questions'),N=loadStudyModule('certification-new-paths'),V=loadStudyModule('certification-new-edition');
export const contentFingerprint=()=>createHash('sha256').update(JSON.stringify([...C.certQuestions.map(q=>Q.practiceQuestion(q.id,Q.QUALITY_REVISION)),...E.extraQuestions,...V.currentNewQuestions()])).digest('hex');
export function releaseReadiness(evidence={},now=Date.now()){
 const fingerprint=contentFingerprint(),required=['preservation','recovery','sourceReview','materialConcerns','ownerWalkthrough','independentReview'];
 const checks=required.map(name=>{const item=evidence[name],valid=item&&item.fingerprint===fingerprint&&typeof item.at==='number'&&item.at>0&&item.at<=now&&now-item.at<=7*86400000&&item.passed===true&&typeof item.evidence==='string'&&item.evidence.trim().length>=10;return {name,status:valid?'recorded':'pending',evidence:valid?item.evidence:'Fresh evidence for this content is required.'};});
 return {format:'eai-local-certification-release-gate',fingerprint,questions:C.certQuestions.length+E.extraQuestions.length+N.newPathQuestions.length,paths:C.certTracks.length+N.newPaths.length,checks,ready:checks.every(c=>c.status==='recorded'),scope:'Evidence records are explicit attestations, not automatic proof of human review. A passing gate never authorizes deployment. Publishing still requires the owner’s instruction. No learner storage is read or changed.'};
}
if(process.argv[1]?.endsWith('check-certification-release-readiness.mjs')){let evidence={};if(process.argv[2]){const raw=readFileSync(process.argv[2],'utf8');if(raw.length>100000)throw Error('Evidence file too large');evidence=JSON.parse(raw);}const result=releaseReadiness(evidence);console.log(JSON.stringify(result,null,2));if(!result.ready)process.exitCode=1;}
