'use client';
import {useState,type ReactNode} from 'react';
import type {ArtPainting} from '@/lib/art/collection';
import type {ArtAnnotation,DetailImage} from '@/lib/art/curation';
import ArtViewer from './ArtViewer';
import ArtSave from './ArtSave';
import {ArtNotes,ArtVisit} from './ArtPersonalTools';
import {useArtPersonal} from './useArtPersonal';
import {ArtContextTools,ArtConcern} from './ArtLearningTools';
export default function ArtPaintingScene({painting:p,editorialLead,children,annotations,detailImage}:{painting:ArtPainting;editorialLead?:string;children?:ReactNode;annotations?:ArtAnnotation[];detailImage?:DetailImage}){
 const {personal,ready}=useArtPersonal(),[lookFirst,setLookFirst]=useState(false),[guided,setGuided]=useState(false),[revealed,setRevealed]=useState(false);
 const gated=!!p.contentNote&&(!ready||personal.notices)&&!revealed;
 return <><ArtVisit id={p.id}/><div className="art-looking-controls"><button aria-pressed={lookFirst} onClick={()=>setLookFirst(!lookFirst)}>{lookFirst?'Show the introduction':'Look first, read second'}</button><button aria-pressed={guided} onClick={()=>setGuided(!guided)}>{guided?'Hide image markers':'Where should I look?'}</button><span>Take as long as you like.</span></div>
 <div className="art-detail-layout"><figure className="art-main-painting">{gated?<div className="art-subject-gate"><h2>Before you look</h2><p>{p.contentNote}</p><button onClick={()=>setRevealed(true)}>Show this painting</button><p>The essay remains available. You can change subject notices in Viewing comfort.</p></div>:<ArtViewer painting={p} guided={guided} annotations={annotations} detailImage={detailImage}/>}<figcaption>{p.credit} · {p.rights}<br/><a href={p.imageSource} target="_blank" rel="noreferrer">Image source & reuse details ↗</a></figcaption></figure>
 <div className="art-painting-story">{lookFirst?<div className="art-look-first"><p className="art-kicker">A MOMENT BEFORE THE EXPLANATION</p><h2>What catches your eye?</h2><p>Start with a color, an edge or a gesture. You don’t need the right words.</p><button onClick={()=>setLookFirst(false)}>Read the introduction when ready →</button></div>:<><p className="art-kicker">THE WORK IN FOCUS</p><h2>What am I looking at?</h2><p className="art-story-lead">{editorialLead??p.story}</p>{editorialLead&&<a className="art-essay-entry" href="#essay">Read the full essay ↓</a>}</>}
 <ArtSave id={p.id}/><details className="art-secondary-tools" open={guided}><summary>Looking tools & artwork record</summary><details open={guided}><summary>Closer looking · how does it work?</summary><p>{p.how}</p><ol>{p.details.map(d=><li key={d}>{d}</li>)}</ol></details><ArtContextTools painting={p}/><ArtConcern painting={p}/><details className="art-work-record"><summary>When, where & the original work</summary><dl><dt>Date</dt><dd>{p.date}</dd><dt>Medium</dt><dd>{p.medium}</dd><dt>Collection / setting</dt><dd>{p.location}</dd>{p.dimensions&&<><dt>Dimensions</dt><dd>{p.dimensions}</dd></>}</dl><p>The recorded collection is not a promise that it is on display.</p></details></details><div id="personal-thought"><ArtNotes id={p.id} question={p.question}/></div></div></div>{!lookFirst&&children}</>;
}
