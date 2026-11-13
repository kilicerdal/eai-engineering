'use client';
import {useEffect,useRef,useState} from 'react';
import Image from 'next/image';
import type {Fact} from './facts';
import {drawShareCard} from './share-card';
export function ShareCardPanel({fact,background}:{fact:Fact;background:string}) {
  const [url,setUrl]=useState(''),[message,setMessage]=useState(''),[busy,setBusy]=useState(false);
  const active=useRef(true),latest=useRef('');
  useEffect(()=>{active.current=true;return ()=>{active.current=false;if(latest.current)URL.revokeObjectURL(latest.current);};},[]);
  async function create() {
    setBusy(true);setMessage('Creating your card…');
    try {
      const canvas=document.createElement('canvas');await drawShareCard(canvas,fact,background);
      const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(value=>value?resolve(value):reject(Error('Unable to create image.')),'image/png'));
      if(!active.current)return;
      if(latest.current)URL.revokeObjectURL(latest.current);
      latest.current=URL.createObjectURL(blob);setUrl(latest.current);setMessage('Your card is ready. Download the PNG, then share it wherever you like.');
    } catch {if(active.current)setMessage('The image could not be created. You can still use Copy link.');}
    finally {if(active.current)setBusy(false);}
  }
  return <div className="curiosity-depth curiosity-share-card"><details><summary>Share card</summary><div className="curiosity-share-card-body"><p>A portrait image with the fact, source credit, and a link back to this discovery.</p>{!url && <button disabled={busy} onClick={create}>{busy?'Creating…':'Create share card'}</button>}{message && <p role="status">{message}</p>}{url && <><Image unoptimized src={url} width={1200} height={1600} alt={`Share card: ${fact.title} ${fact.text} Source: ${fact.source}.`}/><a href={url} download={`curiosity-${fact.id}.png`}>Download PNG ↓</a><p>The image is created in your browser. Nothing is posted automatically.</p></>}</div></details></div>;
}
