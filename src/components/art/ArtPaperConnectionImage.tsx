'use client';
/* eslint-disable @next/next/no-img-element -- Individually licensed local sheet reproduction. */
import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {useArtPersonal} from './useArtPersonal';
import {paperContentNote} from '@/lib/art/paper-viewing';
export default function ArtPaperConnectionImage({id,image,width,height,alt,contentNote,source,style}:{source?:string;style?:CSSProperties;id:string;image:string;width:number;height:number;alt:string;contentNote?:string}){
 const imageRef=useRef<HTMLImageElement>(null);
 const {personal,ready}=useArtPersonal(),[revealed,setRevealed]=useState(false),[failed,setFailed]=useState(false),[retry,setRetry]=useState(0),note=contentNote??paperContentNote(id);
 useEffect(()=>{if(imageRef.current?.complete&&imageRef.current.naturalWidth===0)queueMicrotask(()=>setFailed(true));},[]);
 if(note&&(!ready||personal.hideSensitiveImages)&&!revealed)return <div className="art-subject-gate"><p>{note}</p><button onClick={()=>setRevealed(true)}>View this sheet</button><p>Your optional viewing preference is kept. The comparison remains available.</p></div>;
 return <div className="art-reproduction" style={{aspectRatio:`${width}/${height}`}}>{!failed?<img ref={imageRef} src={image+(retry?'?retry='+retry:'')} width={width} height={height} alt={alt} style={style} loading="lazy" onError={()=>setFailed(true)}/>:<div className="art-reproduction-error" role="status"><p>This reproduction could not load. The account and your notes remain available.</p><button onClick={()=>{setRetry(Date.now());setFailed(false);}}>Retry reproduction</button>{source&&<p><a href={source} target="_blank" rel="noreferrer">Open the institutional record ↗</a></p>}</div>}</div>;
}
