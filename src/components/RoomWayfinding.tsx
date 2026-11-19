'use client';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {siteRoom} from '@/lib/site-rooms';
import {roomOrientation} from '@/lib/learning-comfort';
export default function RoomWayfinding(){const path=usePathname(),room=siteRoom(path),facts=roomOrientation(path);if(!room||path.startsWith('/recruiters'))return null;return <aside className="room-wayfinding" aria-label="Where you are"><nav aria-label="Room breadcrumb"><Link href={room.parent}>← {room.parentName}</Link><Link href="/your-space">Your space</Link><span aria-current="page">{room.name}</span></nav><details><summary>New here?</summary><p>{room.purpose}</p><p>{facts.ai}</p><p>{facts.saving}</p><Link href={room.start}>{room.action} →</Link><p><Link href={room.next}>{room.nextLabel} ↗</Link></p></details></aside>;}
