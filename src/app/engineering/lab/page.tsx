import {publicPageMetadata} from "@/lib/public-metadata";
import {Suspense} from 'react';
import type {Metadata} from 'next';
import Link from 'next/link';
import InvestigationLab from '@/components/investigation/InvestigationLab';
import '../../threshold.css';
import '../studio.css';
import './lab.css';
export const metadata:Metadata={...publicPageMetadata('/engineering/lab','Investigation Lab | eAI','Investigate engineering cases using public evidence and recorded results.'),title:'Investigation Lab | eAI',description:'Investigate engineering cases with public evidence, challenge AI interpretations, review requirements and keep a personal engineering notebook.',alternates:{canonical:'https://www.eai.engineering/engineering/lab'}};
export default function Page(){return <main className="threshold investigation-page" id="top"><a className="atlas-skip-link" href="#lab-workspace">Skip to investigation workspace</a><header className="studio-page-header"><Link className="atlas-brand" href="/"><span>eAI</span><small>Intelligence Engineered</small></Link><nav aria-label="Site navigation"><Link href="/engineering">Engineering Studio</Link><Link href="/study">Learning Studio ↗</Link></nav></header><Suspense fallback={<section className="lab-container lab-loading"><h1>The Investigation Lab</h1><p>Opening the engineering workspace…</p></section>}><InvestigationLab/></Suspense><footer className="atlas-footer"><Link href="/">eAI / Intelligence Engineered</Link><Link href="/engineering/projects">Project directory</Link><a href="#top">Back to top ↑</a><small>© 2026 eAI · Erdal Kilic</small></footer></main>}
