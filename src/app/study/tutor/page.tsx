import type {Metadata} from 'next';
import StudyNavigation from '@/components/StudyNavigation';
import SharedAIChat from '@/components/SharedAIChat';
export const metadata:Metadata={title:'AI Tutor | A Better Place to Think · dAI',description:'A quiet workspace to understand ideas, work through problems and learn from your sources.'};
export default async function TutorPage({searchParams}:{searchParams:Promise<{session?:string}>}){const query=await searchParams;return <main className="tutor-room"><StudyNavigation/><SharedAIChat dedicated localPreviewOnly={(process.env.NODE_ENV==='development'||process.env.DAI_LOCAL_PREVIEW==='1')&&!process.env.CLOUDFLARE_API_TOKEN} initialSession={typeof query.session==='string'?query.session:undefined}/></main>;}
