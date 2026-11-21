'use client';
import {useEffect,useState} from 'react';
// Only within-page, known essay anchors are accepted. No saved-work data changes.
export default function ArtEvidenceReturn({target}:{target:string}){
 const [origin,setOrigin]=useState('');
 useEffect(()=>{const capture=(event:MouseEvent)=>{const link=(event.target as Element).closest<HTMLAnchorElement>('.art-term-link, .art-section-references a');if(link?.getAttribute('href')!=='#'+target)return;const from=link.closest('p[id],section[id]')?.id;if(from&&document.getElementById(from))setOrigin(from);};document.addEventListener('click',capture);return()=>document.removeEventListener('click',capture);},[target]);
 return origin?<a className="art-evidence-return" href={'#'+origin} onClick={()=>{requestAnimationFrame(()=>{const passage=document.getElementById(origin);if(passage){passage.tabIndex=-1;passage.focus({preventScroll:true});}});}}>← Return to the passage you were reading</a>:null;
}
