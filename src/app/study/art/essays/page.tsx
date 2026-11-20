import Link from 'next/link';
import StudyNavigation from '@/components/StudyNavigation';
import ArtRoomFrame from '@/components/art/ArtRoomFrame';
import {artEditorial} from '@/lib/art/editorial';
import {publicPageMetadata} from '@/lib/public-metadata';
import '../art-room.css';
export const metadata=publicPageMetadata('/study/art/essays','Essays & Ideas | The Art Room','Read across the collection through patronage, portraiture, care, modernity and abstraction.');
export default function EssaysPage(){return <ArtRoomFrame><StudyNavigation/><nav className="art-trail" aria-label="Art Room breadcrumb"><Link href="/study/art">← Art Room</Link></nav><header className="art-detail-heading"><p className="art-kicker">ESSAYS & IDEAS</p><h1>Connections worth considering.</h1><p>Read across the collection through a question. Each essay links historical context to specific choices in the paintings.</p></header><div className="art-reading-cards">{Object.entries(artEditorial.essays).map(([id,e])=><article key={id}><p className="art-kicker">{e.minutes} MIN READ</p><h2><Link href={`/study/art/essays/${id}`}>{e.title} →</Link></h2><p>{e.lead}</p></article>)}</div></ArtRoomFrame>;}
