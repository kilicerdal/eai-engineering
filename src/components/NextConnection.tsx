'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {nextConnection} from '@/lib/welcome';
export default function NextConnection(){const path=usePathname(),next=nextConnection(path);return <aside className="next-connection" aria-label="One possible next step"><small>WHENEVER YOU’RE READY</small><h3><Link href={next.href}>{next.title} →</Link></h3><p>{next.why}</p><p>You can also stop here. Your own pace is enough.</p></aside>;}
