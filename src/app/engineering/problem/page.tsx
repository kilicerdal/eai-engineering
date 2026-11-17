import {Suspense} from 'react';
import Link from 'next/link';
import ProblemWorkspace from '@/components/problem/ProblemWorkspace';
import {journeyKinds,type JourneyKind} from '@/lib/engineering-problem';
import '../../threshold.css';import '../studio.css';import '../main-showcase.css';import '../lab/lab.css';import './problem.css';
export const metadata={title:'Bring an engineering problem | eAI',description:'Work from your question to a practical check, with clear assumptions and a personal problem notebook.'};
async function ProblemPageBody({searchParams}:{searchParams:Promise<{kind?:string;example?:string}>}){const q=await searchParams;return <main className="threshold problem-page"><header className="studio-page-header"><Link className="atlas-brand" href="/"><span>eAI</span><small>Intelligence Engineered</small></Link><nav aria-label="Site navigation"><Link href="/engineering/lab">Investigation Lab</Link><Link href="/explore">Explore</Link><Link href="/study">dAI Learning Studio</Link></nav></header><div className="lab-container"><ProblemWorkspace initialKind={journeyKinds.includes(q.kind as JourneyKind)?q.kind as JourneyKind:'broken'} showExample={q.example==='retry'}/></div></main>;}

export default function ProblemPage({searchParams}:{searchParams:Promise<{kind?:string;example?:string}>}){return <Suspense fallback={<main className="threshold problem-page"><div className="lab-container"><h1>Your engineering problem</h1><p>Opening the workspace…</p></div></main>}><ProblemPageBody searchParams={searchParams}/></Suspense>;}
