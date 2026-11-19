'use client';
import {useEffect,useRef,type ReactNode} from 'react';
/** Keeps legacy anchor destinations reachable without replacing mounted work. */
export default function QuietChapter({title,description,children}:{title:string;description:string;children:ReactNode}){
 const ref=useRef<HTMLDetailsElement>(null);
 useEffect(()=>{function reveal(){let id='';try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}const target=id&&document.getElementById(id);if(target&&ref.current?.contains(target)){ref.current.open=true;requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));}}reveal();window.addEventListener('hashchange',reveal);return()=>window.removeEventListener('hashchange',reveal);},[]);
 return <details className="quiet-chapter" ref={ref}><summary><span>{title}</span><small>{description}</small></summary><div className="quiet-chapter-body">{children}</div></details>;
}
