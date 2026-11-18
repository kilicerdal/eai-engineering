import Image from 'next/image';
import type { ReactNode } from 'react';

export default function HeritageRow({scene,caption,reverse=false,projects=false,imageWidth=1672,imageHeight=941,children}:{scene:string;caption:string;reverse?:boolean;projects?:boolean;imageWidth?:number;imageHeight?:number;children:ReactNode}){
 return <div className={`heritage-row${reverse?' heritage-row--reverse':''}${projects?' heritage-row--projects':''}`}>
  <figure className="heritage-row-picture"><Image src={`/images/heritage/${scene}.webp`} alt={caption} width={imageWidth} height={imageHeight} sizes="(max-width: 760px) 100vw, 55vw"/><figcaption>{caption}</figcaption></figure>
  <div className="heritage-row-content">{children}</div>
 </div>;
}
