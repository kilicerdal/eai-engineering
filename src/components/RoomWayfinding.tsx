'use client';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {siteRoom} from '@/lib/site-rooms';
import {roomOrientation} from '@/lib/learning-comfort';
export default function RoomWayfinding(){const path=usePathname(),room=siteRoom(path),facts=roomOrientation(path);if(!room||path==='/study/art'||path.startsWith('/study/art/')||path.startsWith('/recruiters'))return null;return <aside className="room-wayfinding" aria-label="Where you are"><nav aria-label="Room breadcrumb"><Link className="room-back-link" href={room.parent}>← Back to {room.parentName}</Link>{path.startsWith('/study/')&&<Link className="room-home-link" href="/">eAI home ↗</Link>}<Link href="/your-space">Saved work</Link><span aria-current="page">{room.name}</span></nav><details><summary>New here?</summary><p>{room.purpose}</p><p>{facts.ai}</p><p><Link href="/your-space#saving">Saving & backup help →</Link></p><Link href={room.start}>{room.action} →</Link><p><Link href={room.next}>{room.nextLabel} ↗</Link></p></details></aside>;}
