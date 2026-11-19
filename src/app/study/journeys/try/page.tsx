import TryOneIdea from '@/components/TryOneIdea';
export const metadata={title:'Try one idea | dAI Learning Studio',description:'Twenty optional ways to predict, reason, practice and connect an idea. One small activity at a time.'};
export default async function Page({searchParams}:{searchParams:Promise<{activity?:string}>}){const query=await searchParams;return <TryOneIdea initial={typeof query.activity==='string'?query.activity:undefined}/>;}
