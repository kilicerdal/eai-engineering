import Link from 'next/link';import ArtRoomFrame from '@/components/art/ArtRoomFrame';import StudyNavigation from '@/components/StudyNavigation';import ArtStudyNotebook from '@/components/art/ArtStudyNotebook';import '../art-room.css';
export const metadata={title:'My Study Notebook | The Art Room'};
export default function Notebook(){return <ArtRoomFrame><StudyNavigation/><nav className="art-trail"><Link href="/study/art">← Back to the Art Room</Link></nav><ArtStudyNotebook/></ArtRoomFrame>;}
