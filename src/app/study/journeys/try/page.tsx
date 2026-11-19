import {Suspense} from 'react';
import TryOneIdea from '@/components/TryOneIdea';
export const metadata={title:'Try one idea | dAI Learning Studio',description:'Thirty-eight optional ways to predict, reason, practice and connect an idea. One small activity at a time.'};
type Props={searchParams:Promise<{activity?:string}>};
async function SelectedActivity({searchParams}:Props){const query=await searchParams;return <TryOneIdea initial={typeof query.activity==='string'?query.activity:undefined}/>;}
export default function Page(props:Props){return <Suspense fallback={<main className="try-idea-page"><h1>Try one idea.</h1><p role="status">Opening your activity…</p></main>}><SelectedActivity {...props}/></Suspense>;}
