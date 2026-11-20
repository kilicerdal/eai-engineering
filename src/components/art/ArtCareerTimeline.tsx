import Link from 'next/link';
import {ArtThumbnail} from './ArtCollection';
import {orderedWorks} from '@/lib/art/looking';
import {careerLenses} from '@/lib/art/curation';
export default function ArtCareerTimeline({artist}:{artist:string}){const works=orderedWorks(artist),picks=[works[0],works[Math.floor((works.length-1)/2)],works.at(-1)!];return <section className="art-career-visual" aria-label="Visual career timeline"><p className="art-kicker">THREE WORKS ACROSS A CAREER</p><h2>See what changes.</h2><p>A selective chronology of works in this collection, not the artist’s first and final paintings. The captions offer visual comparisons; chronological order alone does not prove influence.</p><ol>{picks.map((p,i)=><li key={p.id}><Link href={'/study/art/painting/'+p.id}><ArtThumbnail painting={p}/><span>{p.date}</span><h3>{p.title}</h3></Link><p>{careerLenses[artist]?.[i]}</p></li>)}</ol></section>}
