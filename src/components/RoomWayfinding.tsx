'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { siteRoom } from '@/lib/site-rooms';
import { roomOrientation } from '@/lib/learning-comfort';

/** Shared orientation for rooms that use the global Studio navigation. */
export default function RoomWayfinding() {
  const path = usePathname();
  const room = siteRoom(path);
  const facts = roomOrientation(path);

  // These rooms provide a purpose-built collection header and navigation.
  if (
    !room ||
    path === '/study' ||
    path === '/study/nobel' || path.startsWith('/study/nobel/') ||
    path === '/study/curiosity/discoveries' || path.startsWith('/study/curiosity/discoveries/') ||
    path === '/study/art' || path.startsWith('/study/art/') ||
    path.startsWith('/recruiters')
  ) return null;

  return (
    <aside className="room-wayfinding" aria-label="Room orientation">
      <nav aria-label="Your location">
        <Link className="room-back-link" href={room.parent}>← {room.parentName}</Link>
        <span className="room-wayfinding-current" aria-current="page">{room.name}</span>
        <Link className="room-saved-link" href="/your-space">Saved work</Link>
      </nav>
      <details>
        <summary>About this room &amp; what to do next</summary>
        <div className="room-wayfinding-guide">
          <p className="room-guide-purpose">{room.purpose}</p>
          <p><strong>Start with</strong><br /><Link className="room-guide-start" href={room.start}>{room.action} →</Link></p>
          <p><strong>AI use</strong><br />{facts.ai}</p>
          <p><strong>Your work</strong><br />{facts.saving}</p>
          <p className="room-guide-links">
            <Link href="/your-space#saving">Saving &amp; backup help →</Link>
            <Link href={room.next}>Next: {room.nextLabel} ↗</Link>
          </p>
        </div>
      </details>
    </aside>
  );
}
