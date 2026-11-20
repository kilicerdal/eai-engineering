import {ArtMyArtLinks} from '@/components/art/ArtMyArt';
import Link from 'next/link';import ArtRoomFrame from '@/components/art/ArtRoomFrame';import StudyNavigation from '@/components/StudyNavigation';import ArtArgumentNotebook from '@/components/art/ArtArgumentNotebook';import '../art-room.css';
export const metadata={title:'My Passages & Arguments | The Art Room'};
export default function Arguments(){return <ArtRoomFrame><StudyNavigation/><ArtMyArtLinks/><nav className="art-trail"><Link href="/study/art/notebook">← My study notebook</Link><Link href="/study/art/looking-room">The Looking Room →</Link></nav><ArtArgumentNotebook/></ArtRoomFrame>}
