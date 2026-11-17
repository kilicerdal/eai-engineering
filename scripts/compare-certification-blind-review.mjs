// Explicit local response file only; no browser data, uploads or authored answer changes.
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {loadStudyModule} from '../tests/load-study-module.mjs';
const Q=loadStudyModule('certification-quality'),P=loadStudyModule('certification-quality-pass-edition');
export function compareReview(input){
 if(input?.format!=='eai-blind-review-response'||!Array.isArray(input.responses)||input.responses.length>26)throw Error('Invalid review response');
 const seen=new Set();const rows=input.responses.map(r=>{if(!P.qualityPassChanges[r.id]||seen.has(r.id))throw Error('Unknown or duplicate question');seen.add(r.id);const q=Q.practiceQuestion(r.id,Q.QUALITY_REVISION),fingerprint=createHash('sha256').update(JSON.stringify(q)).digest('hex');if(r.fingerprint!==fingerprint||!Number.isInteger(r.selected)||r.selected<0||r.selected>=4||typeof r.reasoning!=='string'||!r.reasoning.trim()||r.reasoning.length>2000||typeof r.secondAnswerPlausible!=='boolean')throw Error('Incomplete or stale response');return {id:r.id,agreesWithAuthoredAnswer:r.selected===q.answer,needsDiscussion:r.selected!==q.answer||r.secondAnswerPlausible};});
 return {format:'eai-blind-review-comparison',reviewed:rows.length,expected:26,complete:rows.length===26,rows,scope:'Comparison with authored answers, not proof that authored answers are correct. Discuss disagreements against primary sources. Private reasoning is omitted; nothing is transmitted.'};
}
if(process.argv[1]?.endsWith('compare-certification-blind-review.mjs')){if(!process.argv[2])throw Error('Provide the explicit local response file');const raw=readFileSync(process.argv[2],'utf8');if(raw.length>100000)throw Error('Response too large');console.log(JSON.stringify(compareReview(JSON.parse(raw)),null,2));}
