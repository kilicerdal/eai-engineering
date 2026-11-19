import Image from 'next/image';
import type { ReactNode } from 'react';
import ArtworkViewer from './ArtworkViewer';

export default function HeritageRow({id,scene,caption,reverse=false,projects=false,imageWidth=1672,imageHeight=941,children}:{id?:string;scene:string;caption:string;reverse?:boolean;projects?:boolean;imageWidth?:number;imageHeight?:number;children:ReactNode}){
 return <div id={id} className={`heritage-row${reverse?' heritage-row--reverse':''}${projects?' heritage-row--projects':''}`}>
  <figure className="heritage-row-picture"><Image src={`/images/heritage/${scene}.webp`} alt={caption} width={imageWidth} height={imageHeight} sizes="(max-width: 760px) 100vw, 55vw" loading="lazy"/><figcaption><span>{caption}</span><ArtworkViewer id={scene}/></figcaption></figure>
  <div className="heritage-row-content">{children}</div>
 </div>;
}
