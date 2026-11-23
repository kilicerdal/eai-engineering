"use client";
/* eslint-disable @next/next/no-img-element -- Locally optimized full-sheet historical reproduction. */
import {useState} from 'react';
import {useArtPersonal} from './useArtPersonal';
export default function ArtVitruvianEntrance(){
 const {personal,ready}=useArtPersonal();
 const [revealed,setRevealed]=useState(false);
 const hidden=!ready||(!!personal.hideSensitiveImages&&!revealed);
 return <figure className="art-vitruvian"><div className="art-vitruvian-sheet">{hidden?<div className="art-vitruvian-notice">{ready?<><p>This historical anatomical study depicts a nude figure.</p><button type="button" onClick={()=>setRevealed(true)}>Show this drawing</button></>:<p>Opening the complete drawing…</p>}</div>:<img src="/images/art/entrances/vitruvian-man.webp" width={960} height={1305} alt="Leonardo’s Vitruvian Man: two superimposed positions of a standing male figure within a circle and square, with handwritten notes above and below." fetchPriority="high"/>}</div><figcaption>Leonardo da Vinci · <cite>Vitruvian Man</cite><br/>Historical drawing reproduction · <a href="https://commons.wikimedia.org/wiki/File:Da_Vinci_Vitruve_Luc_Viatour.jpg" target="_blank" rel="noreferrer">Luc Viatour / Wikimedia Commons ↗</a> · Public Domain Mark 1.0</figcaption></figure>;
}
