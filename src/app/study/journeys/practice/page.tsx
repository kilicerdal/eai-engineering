import Link from 'next/link';
import PracticeWorkshop from '@/components/PracticeWorkshop';
export const metadata={title:'Try one small idea | dAI Learning Studio',description:'Optional reading, evidence and engineering activities. Try one idea and keep your own takeaway.'};
export default function Page(){return <><aside className="idea-entry"><Link href="/study/journeys/try">Try one idea · a short learning activity →</Link></aside><PracticeWorkshop/></>;}
