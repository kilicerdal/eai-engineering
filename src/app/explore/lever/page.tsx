import type {Metadata} from 'next';
import Link from 'next/link';
import LeverExperience from '@/components/explore/LeverExperience';
import '../../threshold.css';
import '../../engineering/studio.css';
import '../explore.css';
export const metadata:Metadata={title:'A small force. A heavy load. | eAI Explore',description:'Move a pivot, change a load and explore how an ideal lever trades force for distance. Interactive calculations, an AI companion and saved explorations.',alternates:{canonical:'https://www.eai.engineering/explore/lever'}};
export default function LeverPage(){return <main className="threshold explore-page" id="top"><a className="atlas-skip-link" href="#lever-workspace">Skip to interactive lever</a><header className="studio-page-header"><Link className="atlas-brand" href="/"><span>eAI</span><small>Intelligence Engineered</small></Link><nav aria-label="Site navigation"><Link href="/">Home</Link><Link href="/study">Learning Studio ↗</Link></nav></header><LeverExperience/><footer className="atlas-footer"><Link href="/">eAI / Intelligence Engineered</Link><Link href="/study/curiosity">Follow your curiosity ↗</Link><a href="#top">Back to top ↑</a><small>© 2026 eAI · Erdal Kilic</small></footer></main>}
