import {notFound} from 'next/navigation';
import KnowledgeFrame from '@/components/knowledge/KnowledgeFrame';
import StoryReader from '@/components/knowledge/StoryReader';
import {getStory,stories,storyHref} from '@/lib/knowledge/stories';
import {publicPageMetadata} from '@/lib/public-metadata';
export function generateStaticParams(){return stories.filter(s=>s.collection==='discoveries').map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params,s=getStory('discoveries',slug);return s?publicPageMetadata(storyHref(s),s.name+' | Great Discoveries',s.dek):{title:'Discovery not found'}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params,s=getStory('discoveries',slug);if(!s)notFound();return <KnowledgeFrame collection="discoveries"><StoryReader story={s}/></KnowledgeFrame>}
