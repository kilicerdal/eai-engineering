import Link from 'next/link';
import ArtRoomFrame from '@/components/art/ArtRoomFrame';
import ArtPaperConnections from '@/components/art/ArtPaperConnections';
import '../../art-room.css';
export const metadata={title:'Drawings and their afterlives | The Art Room',description:'Documented relationships between studies, paintings, prints and monuments, with evidence and limits.'};
export default function PaperConnections(){return <ArtRoomFrame className="art-on-paper"><header className="art-paper-intro"><Link href="/study/art/on-paper">← Back to works on paper</Link><p className="art-kicker">DRAWINGS & THEIR AFTERLIVES</p><h1>From one object<br/>to another.</h1><p>Preparation is only one possible journey. A study may help create a painting; a print may carry a design into a later drawing; assistants may turn a shared invention into distinct works.</p></header><ArtPaperConnections/><footer className="art-room-footer"><Link href="/study/art/on-paper">Choose another sheet →</Link><Link href="/study/art#collection">Return to the painting collection →</Link></footer></ArtRoomFrame>}
