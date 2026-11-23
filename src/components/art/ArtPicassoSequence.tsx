'use client';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
type Study={slug:string;title:string};type Route={id:string;title:string;ids:string[]};
export default function ArtPicassoSequence({slug,studies,routes,context=false}:{slug:string;studies:Study[];routes:Route[];context?:boolean}){
 const params=useSearchParams(),route=routes.find(r=>r.id===params.get('route')&&r.ids.includes(slug));
 const sequence=route?.ids??studies.map(s=>s.slug),index=sequence.indexOf(slug),previous=studies.find(s=>s.slug===sequence[index-1]),next=studies.find(s=>s.slug===sequence[index+1]);
 const href=(id:string)=>'/study/art/on-paper/picasso/'+id+(route?'?route='+route.id:'');
 if(context)return route?<p className="art-picasso-route-context">{route.title} · Stop {index+1} of {sequence.length} · <Link href={'/study/art/on-paper/picasso#route-'+route.id}>Choose another route</Link></p>:null;
 return <nav className="art-picasso-sequence" aria-label={route?'Continue '+route.title:'Continue Picasso studies'}>{previous?<Link href={href(previous.slug)}>← Previous: {previous.title}</Link>:<Link href="/study/art/on-paper/picasso#picasso-studies">← Choose another study</Link>}{next?<Link href={href(next.slug)}>Next: {next.title} →</Link>:<Link href={route?'/study/art/on-paper/picasso#route-'+route.id:'/study/art/on-paper/picasso'}>{route?'Route complete · choose another question':'Return to all ten studies'} →</Link>}</nav>;
}
