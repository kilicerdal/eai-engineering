'use client';
import {useState} from 'react';
import type {CertQuestion} from '@/lib/certification-content';
import {relevantNotes} from '@/lib/certification-refinements';
import {useLearning} from './useLearning';
export default function RelevantNotes({q}:{q:CertQuestion}){const work=useLearning(q.track),notes=relevantNotes(q,work.data),[shown,setShown]=useState(false);if(!notes.length)return null;return <details className="cert-more"><summary>Bring back my relevant reading notes</summary><label className="cert-check"><input type="checkbox" checked={shown} onChange={e=>setShown(e.target.checked)}/>Show my notes beside this idea</label>{shown&&notes.map(n=><blockquote className="cert-personal-note" key={n.id}><strong>{n.title}</strong><p style={{whiteSpace:'pre-wrap'}}>{n.text}</p></blockquote>)}<p className="cert-small">These notes stay local. Showing them here does not include them in any AI request.</p></details>;}
