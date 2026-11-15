import type { Metadata } from "next";
import Link from "next/link";
import { ProjectDirectory } from "@/components/engineering/MainShowcase";
import "../../threshold.css";
import "../main-showcase.css";
import "../studio.css";
export const metadata: Metadata = {title:"Project Directory | eAI",description:"Practical engineering, project evidence and decisions from eAI."};
export default function Page(){return <main className="threshold"><header className="studio-page-header"><Link href="/" className="atlas-brand"><span>eAI</span><small>Intelligence Engineered</small></Link><nav aria-label="Site navigation"><Link href="/engineering">Engineering Studio</Link><Link href="/study">Learning Studio</Link></nav></header><ProjectDirectory/><footer className="atlas-footer"><Link href="/">Return to eAI</Link><Link href="/engineering/projects">Project directory</Link><small>© 2026 eAI · Erdal Kilic</small></footer></main>}
