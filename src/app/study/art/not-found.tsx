import Link from 'next/link';
import ArtRoomFrame from '@/components/art/ArtRoomFrame';
import './art-room.css';
export default function MissingArt(){return <ArtRoomFrame><section className="art-hub"><p className="art-kicker">A DIFFERENT WAY BACK</p><h1>This Art Room page could not be found.</h1><p>The address may be incomplete or refer to an unavailable study. Your saved paintings and notes remain in this browser.</p><p><Link href="/study/art?view=paintings#collection">Browse the paintings →</Link> · <Link href="/study/art/my-art">Open My Art →</Link></p></section></ArtRoomFrame>}
