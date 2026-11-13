import type { Metadata } from 'next';
import StudyNavigation from '@/components/StudyNavigation';
import CuriosityRoom from './room';
import './room.css';

export const metadata: Metadata = { title: 'The Curiosity Room | dAI Learning Studio', description: '60 sourced discoveries, from ancient ingenuity to the science of learning and the possibilities of tomorrow.', robots: { index: false, follow: false } };
export default function Page() { return <div className="curiosity-preview"><StudyNavigation /><CuriosityRoom /></div>; }
