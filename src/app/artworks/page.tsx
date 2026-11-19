import { publicPageMetadata } from "@/lib/public-metadata";
import Image from 'next/image';
import Link from 'next/link';
import ArtworkViewer from '@/components/ArtworkViewer';
import {artworks} from '@/lib/artworks';
export const metadata={...publicPageMetadata('/artworks','Behind the artwork | eAI','Explore the original artwork and ancient-to-future ideas behind eAI.'),title:'Behind the artwork | eAI',description:'Explore the original ideas, materials and transformations behind eAI’s ancient-to-future artwork.'};
export default function ArtworksPage(){return <main className="refinement-page"><Link href="/">← eAI home</Link><header><small>ART, IMAGINATION & ENGINEERING</small><h1>A mark can become a world.</h1><p>Look closely. Each artwork carries a visual idea into an imagined future. These are conceptual interpretations, not historical reconstructions or real engineering projects.</p></header><div className="artwork-gallery">{artworks.map(a=><article key={a.id}><Image src={`/images/heritage/${a.id}.webp`} alt={a.caption} width={a.width} height={a.height} sizes="(max-width: 760px) 100vw, 45vw" loading="lazy"/><div><h2>{a.title}</h2><p>{a.transformation}</p><ArtworkViewer id={a.id}/></div></article>)}</div></main>;}
