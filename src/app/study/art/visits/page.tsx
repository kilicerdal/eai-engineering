import Link from 'next/link';
import ArtRoomFrame from '@/components/art/ArtRoomFrame';
import ArtVisitChooser,{type ArtVisitChoice} from '@/components/art/ArtVisitChooser';
import {artTours} from '@/lib/art/looking';
import {artExhibitions} from '@/lib/art/exhibitions';
import depth from '../../../../../data/art/research/looking-room.json';
import '../art-room.css';
export const metadata={title:'Guided Visits | The Art Room'};
export default function Visits(){
 const visits:ArtVisitChoice[]=[...artTours.map(t=>({id:'tour-'+t.id,title:t.title,intro:t.intro,href:'/study/art/trail/'+t.id,kind:'short' as const,description:`${t.ids.length} works · about ${t.ids.length===3?'5':'8–10'} minutes`})),...depth.routes.map(r=>({id:'question-'+r.id,title:r.title,intro:r.intro,href:'/study/art/questions/'+r.id,kind:'question' as const,description:'Three works · about 10–20 minutes'})),...artExhibitions.map(e=>({id:'exhibition-'+e.id,title:e.title,intro:e.intro,href:'/study/art/exhibitions/'+e.id,kind:'exhibition' as const,description:'Four works · shorter and fuller routes available'}))];
 return <ArtRoomFrame><section className="art-hub"><p className="art-kicker">A SMALL VISIT, AT YOUR PACE</p><h1>Follow one question.</h1><p className="art-editorial-lead">Choose a short introduction or stay with a connected argument. No timer, test or required response.</p><div className="art-visit-start"><Link className="art-primary" href="/study/art/trail/five-minutes">Start with a five-minute visit →</Link><p className="art-small">Times estimate reading. Take as long as you want with the artwork.</p></div><ArtVisitChooser visits={visits}/><p><Link href="/study/art/my-art">Resume a saved visit in My Art →</Link> · <Link href="/study/art/my-exhibition">Arrange your own exhibition →</Link></p></section></ArtRoomFrame>;
}
