'use client';
import Image from 'next/image';
import {useId,useRef,useState} from 'react';
export default function ProjectScreenshot({src,title,demonstrates,limitation}:{src:string;title:string;demonstrates?:string;limitation?:string}){
 const dialog=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement>(null),id=useId(),[open,setOpen]=useState(false);
 function close(){dialog.current?.close();}
 return <><button className="quiet-screenshot-trigger" ref={trigger} onClick={()=>{setOpen(true);dialog.current?.showModal();}}>Enlarge screenshot <span aria-hidden="true">↗</span></button><dialog ref={dialog} className="quiet-screenshot" aria-labelledby={id} onClose={()=>{setOpen(false);trigger.current?.focus();}} onClick={e=>{if(e.target===e.currentTarget)close();}}><header><h2 id={id}>{title}</h2><button autoFocus onClick={close}>Close screenshot</button></header>{open&&<Image src={src} alt={`${title} project preview`} width={1600} height={900} sizes="95vw"/>}<p><strong>What this preview shows:</strong> {demonstrates||'The project interface at the captured moment.'}</p><p><strong>What it cannot establish:</strong> {limitation||'A screenshot alone does not establish runtime correctness, performance or production reliability.'}</p><p>Open the project’s recorded evidence to inspect the tested result.</p></dialog></>;
}
