'use client';
import Image from 'next/image';
import {useId,useRef,useState} from 'react';
import {artworkById} from '@/lib/artworks';
export default function ArtworkViewer({id}:{id:string}){
 const art=artworkById(id),dialog=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement>(null),heading=useId(),[zoom,setZoom]=useState(false),[opened,setOpened]=useState(false),[loaded,setLoaded]=useState(false),[failed,setFailed]=useState(false);
 if(!art)return null;
 function close(){dialog.current?.close();setZoom(false);trigger.current?.focus();}
 return <><button ref={trigger} className="artwork-open" aria-haspopup="dialog" aria-label={`View artwork: ${art.title}`} onClick={()=>{setOpened(true);setLoaded(false);setFailed(false);dialog.current?.showModal();}}>View artwork ↗</button><dialog ref={dialog} className="artwork-dialog" aria-labelledby={heading} onClose={()=>{setOpened(false);setZoom(false);trigger.current?.focus();}} onClick={e=>{if(e.target===e.currentTarget)close();}}>
 <header><div><small>BEHIND THE ARTWORK</small><h2 id={heading}>{art.title}</h2></div><button autoFocus onClick={close} aria-label="Close artwork">Close ×</button></header>
 <div className={`artwork-canvas${loaded?' artwork-canvas--loaded':''}${zoom?' artwork-canvas--zoom':''}`}  tabIndex={0} aria-label="Artwork viewing area">{opened&&<Image src={`/images/heritage/${art.id}.webp`} alt={art.caption} width={art.width} height={art.height} sizes="100vw" loading="eager" onLoad={()=>setLoaded(true)} onError={()=>{setLoaded(true);setFailed(true);}}/>} {opened&&!loaded&&<p role="status">Loading the complete artwork…</p>}{failed&&<p role="status">The artwork could not load. Close this viewer and try again when your connection is available.</p>}</div>
 <div className="artwork-view-tools"><button aria-pressed={zoom} onClick={()=>setZoom(v=>!v)}>{zoom?'Fit whole artwork':'Look closer'}</button><span>The full composition stays available. Escape closes this viewer.</span></div>
 <details><summary>From the original idea to a future world</summary><p><strong>Inspiration:</strong> {art.inspiration}</p><p><strong>Transformation:</strong> {art.transformation}</p><p>AI-generated conceptual artwork for eAI. It does not document a real future building, a historical event or a working engineering design.</p></details>
 </dialog></>;
}
