import Link from 'next/link';
import {notFound} from 'next/navigation';
import StudyNavigation from '@/components/StudyNavigation';
import ArtRoomFrame from '@/components/art/ArtRoomFrame';
import ArtEssay from '@/components/art/ArtEssay';
import {artEditorial} from '@/lib/art/editorial';
import {artPaintings} from '@/lib/art/collection';
import {publicPageMetadata} from '@/lib/public-metadata';
import '../../art-room.css';
const connections:Record<string,string[]>={'patronage-and-power':['raphael-01','rembrandt-06','goya-05'],'women-and-opportunity':['gentileschi-01','morisot-01','cassatt-01'],'portrait-and-presence':['leonardo-01','raphael-06','vermeer-01'],'sacred-viewer':['caravaggio-06','caravaggio-02','raphael-02'],'industry-and-atmosphere':['turner-02','monet-04','turner-01'],'how-abstraction-works':['kandinsky-01','kandinsky-02','kandinsky-04']};
export function generateStaticParams(){return Object.keys(artEditorial.essays).map(id=>({id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params,e=artEditorial.essays[id];return e?publicPageMetadata('/study/art/essays/'+id,e.title+' | Art Room',e.lead):{};}
export default async function EssayPage({params}:{params:Promise<{id:string}>}){const {id}=await params,e=artEditorial.essays[id];if(!e)notFound();return <ArtRoomFrame><StudyNavigation/><nav className="art-trail" aria-label="Art Room breadcrumb"><Link href="/study/art/essays">← Essays & ideas</Link></nav><header className="art-detail-heading"><p className="art-kicker">READING ACROSS THE COLLECTION</p><h1>{e.title}</h1></header><ArtEssay essay={e}/><section className="art-editorial-works"><h2>Return to the paintings.</h2><ol>{connections[id]?.map(work=>{const p=artPaintings.find(x=>x.id===work)!;return <li key={work}><h3><Link href={`/study/art/painting/${work}`}>{p.title} →</Link></h3><p>{artEditorial.paintings[work]?.lead}</p></li>;})}</ol><Link href="/study/art/essays">Explore another essay →</Link></section></ArtRoomFrame>;}
