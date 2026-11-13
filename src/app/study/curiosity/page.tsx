import type { Metadata } from 'next';
import StudyNavigation from '@/components/StudyNavigation';
import CuriosityRoom from './room';
import './room.css';

export const metadata: Metadata = { title: 'The Curiosity Room | dAI Learning Studio', description: '350 sourced discoveries, including Everyday Wonders and Sounds Made Up: surprising fun facts with sources, explanations, and connections to explore.', robots: { index: false, follow: false } };
export default function Page() { return <div className="curiosity-preview"><StudyNavigation /><CuriosityRoom /></div>; }
