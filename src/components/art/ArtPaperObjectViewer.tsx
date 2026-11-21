'use client';
import {useEffect,useState} from 'react';
import ArtViewer from './ArtViewer';
import {useArtHiddenImageRequest} from './useArtHiddenImageRequest';
import {useArtPersonal} from './useArtPersonal';
import type {ArtPainting} from '@/lib/art/collection';
import type {ArtAnnotation,DetailImage} from '@/lib/art/curation';
export default function ArtPaperObjectViewer({painting,points,reverse}:{painting:ArtPainting;points:ArtAnnotation[];reverse?:DetailImage}){
 const {personal,ready}=useArtPersonal();const [markers,setMarkers]=useState(false),[revealed,setRevealed]=useState(false);const gated=!!painting.contentNote&&(!ready||!!personal.hideSensitiveImages)&&!revealed;const {revealButtonRef,notice,clearNotice}=useArtHiddenImageRequest(painting.id,gated,'View this sheet');
 useEffect(()=>{const highlight=(e:Event)=>{if((e as CustomEvent<{id:string}>).detail?.id===painting.id)setMarkers(true);};window.addEventListener('dai-art-highlight',highlight);return()=>window.removeEventListener('dai-art-highlight',highlight);},[painting.id]);
 if(gated)return <div className="art-subject-gate"><p>{painting.contentNote}</p><button ref={revealButtonRef} onClick={()=>{setRevealed(true);clearNotice();}}>View this sheet</button>{notice&&<p role="status">{notice}</p>}<p>Your optional viewing preference is kept. The process account remains available.</p></div>;
 return <><div className="art-tool-row"><button aria-pressed={markers} onClick={()=>setMarkers(!markers)}>{markers?'Hide detail markers':'Show three looking points'}</button></div><ArtViewer reverseImage={reverse} imageLoading="lazy" painting={painting} annotations={points} guided={markers}/></>;
}
