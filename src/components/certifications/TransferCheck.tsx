'use client';
import {useState} from 'react';
import type {NewQuestion} from '@/lib/certification-new-paths';
import {newTransferQuestion} from '@/lib/certification-transfer-check';
import {completedSnapshot,transferQuestion} from '@/lib/certification-transfer-check';
import type {CertQuestion} from '@/lib/certification-content';
import type {CertStudy} from '@/lib/certification-study';
export function PracticeProgress({data}:{data:CertStudy}){const snapshot=completedSnapshot(data);return snapshot?<p className="cert-small" aria-label="Practice progress scope"><strong>Questions answered:</strong> {snapshot.answered} of {snapshot.total}. Completion records activity; it does not establish concept mastery or exam readiness. A fresh example below can provide one more observation.</p>:null;}
export function TransferCheck({data,reviewed}:{data:CertStudy;reviewed:CertQuestion}){
 const candidate=transferQuestion(data,reviewed);
 if(!candidate)return <p className="cert-small">No unseen question with an authored match to this concept is available in retained history. A broader topic retry is still available below.</p>;
 return <FreshExample question={candidate.question} concept={candidate.concept} reviewedId={reviewed.id}/>;
}
export function NewTransferCheck({reviewed,seen}:{reviewed:Pick<NewQuestion,'id'|'track'|'prompt'>;seen:string[]}){const candidate=newTransferQuestion(reviewed,seen);return candidate?<FreshExample question={candidate.question} concept={candidate.concept} reviewedId={reviewed.id}/>:null;}
function FreshExample({question:q,concept,reviewedId}:{question:Pick<CertQuestion,'id'|'prompt'|'choices'|'answer'|'explanations'|'source'>;concept:string;reviewedId:string}){
 const [selected,setSelected]=useState<number|null>(null),[checked,setChecked]=useState(false);
 return <details className="cert-more transfer-check"><summary>Can I use this idea in a fresh example?</summary><p>{concept} · Different question, same mapped concept. This optional check is separate from your original score.</p><fieldset disabled={checked}><legend>{q.prompt}</legend>{q.choices.map((choice,i)=><label className="cert-check" key={i}><input type="radio" name={`transfer-${reviewedId}`} checked={selected===i} onChange={()=>setSelected(i)}/>{choice}</label>)}</fieldset><button disabled={selected===null||checked} onClick={()=>setChecked(true)}>Check this fresh example</button>{checked&&<div role="status"><p><strong>{selected===q.answer?'Concept applied correctly in this example.':'This example needs another look.'}</strong></p><p>{q.explanations[selected!]}</p>{selected!==q.answer&&<p><strong>Fitting answer:</strong> {q.choices[q.answer]} — {q.explanations[q.answer]}</p>}<a href={q.source} target="_blank" rel="noreferrer">Read the official reference ↗</a><p>One example is limited evidence, not a mastery or readiness score. You can stop here.</p></div>}<p className="cert-small">This check stays in this open review only and is not saved. Your original attempts, scores and notebook are unchanged. For a saved retry, use the existing practice options below.</p></details>;
}
