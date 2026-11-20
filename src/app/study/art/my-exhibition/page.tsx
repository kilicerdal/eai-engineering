import Link from 'next/link';import ArtRoomFrame from '@/components/art/ArtRoomFrame';import StudyNavigation from '@/components/StudyNavigation';import ArtPersonalExhibition from '@/components/art/ArtPersonalExhibition';import '../art-room.css';
export const metadata={title:'My Personal Exhibition | The Art Room'};
export default function Page(){return <ArtRoomFrame><StudyNavigation/><nav className="art-trail"><Link href="/study/art">← Back to the Art Room</Link></nav><ArtPersonalExhibition/></ArtRoomFrame>;}
