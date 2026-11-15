import {notFound} from 'next/navigation';
import Link from 'next/link';
import {models,getModel} from '@/lib/explore-models';
import ExperimentRoom from '@/components/explore/ExperimentRoom';
import '../../threshold.css';
import '../../engineering/studio.css';
import '../explore.css';
export function generateStaticParams(){return models.map(m=>({experience:m.id}));}
export async function generateMetadata({params}:{params:Promise<{experience:string}>}){const {experience}=await params;const m=getModel(experience);return {title:m?`${m.title} | eAI Explore`:'eAI Explore',description:m?.line};}
export default async function ExperiencePage({params}:{params:Promise<{experience:string}>}){const {experience}=await params,m=getModel(experience);if(!m)notFound();return <main className="threshold explore-page" id="top"><a className="atlas-skip-link" href="#room-why">Skip to explanation</a><header className="studio-page-header"><Link className="atlas-brand" href="/"><span>eAI</span><small>Intelligence Engineered</small></Link><nav aria-label="Site navigation"><Link href="/explore">All experiences</Link><Link href="/study">Learning Studio ↗</Link></nav></header><ExperimentRoom key={m.id} id={m.id}/><footer className="atlas-footer"><Link href="/explore">Explore another idea →</Link><Link href="/">Home</Link><a href="#top">Back to top ↑</a></footer></main>;}
