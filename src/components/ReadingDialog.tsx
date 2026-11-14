'use client';
import {useEffect,useId,useRef,type ReactNode} from 'react';
export function ReadingDialog({title,onClose,children}:{title:string;onClose:()=>void;children:ReactNode}){
 const ref=useRef<HTMLDialogElement>(null),heading=useId();
 useEffect(()=>{const previous=document.activeElement;const dialog=ref.current;dialog?.showModal();return()=>{dialog?.close();if(previous instanceof HTMLElement&&previous.isConnected)previous.focus();};},[]);
 return <dialog ref={ref} className="rr-dialog" aria-labelledby={heading} onCancel={event=>{event.preventDefault();onClose();}}><header><h2 id={heading}>{title}</h2><button aria-label={`Close ${title}`} onClick={onClose}>×</button></header>{children}</dialog>;
}
