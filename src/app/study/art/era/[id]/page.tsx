import Link from 'next/link';
import {notFound} from 'next/navigation';
import StudyNavigation from '@/components/StudyNavigation';
import ArtRoomFrame from '@/components/art/ArtRoomFrame';
import ArtEssay from '@/components/art/ArtEssay';
import {ArtThumbnail} from '@/components/art/ArtCollection';
import {artEditorial} from '@/lib/art/editorial';
import {artEras} from '@/lib/art/artists';
import {artPaintings} from '@/lib/art/collection';
import {publicPageMetadata} from '@/lib/public-metadata';
import '../../art-room.css';
export function generateStaticParams(){return artEras.map(e=>({id:e.id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params,e=artEditorial.eras[id];return e?publicPageMetadata('/study/art/era/'+id,e.title+' | Art Room',e.lead):{};}
export default async function EraPage({params}:{params:Promise<{id:string}>}){const {id}=await params,e=artEditorial.eras[id],era=artEras.find(x=>x.id===id);if(!e||!era)notFound();const works=artPaintings.filter(p=>p.era===id);return <ArtRoomFrame><StudyNavigation/><nav className="art-trail" aria-label="Art Room breadcrumb"><Link href="/study/art?view=eras#collection">← All eras</Link><Link href="/study/art/essays">Essays & ideas →</Link></nav><header className="art-detail-heading"><p className="art-kicker">{era.dates} · ERA ESSAY</p><h1>{era.name}</h1></header><ArtEssay essay={e}/><section className="art-editorial-works"><h2>Read the era through its paintings.</h2><p>These selected works show different solutions within the period. Dates overlap, and the collection is a selective route through European painting.</p><div className="art-grid">{works.slice(0,6).map(p=><article key={p.id} className="art-tile"><Link className="art-tile-image" href={`/study/art/painting/${p.id}`}><ArtThumbnail painting={p}/></Link><h3><Link href={`/study/art/painting/${p.id}`}>{p.title} →</Link></h3><p>{artEditorial.paintings[p.id]?.lead}</p></article>)}</div><Link href={`/study/art?view=paintings&era=${id}#collection`}>Return to the collection →</Link></section></ArtRoomFrame>;}
