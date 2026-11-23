import {notFound} from 'next/navigation';
import KnowledgeFrame from '@/components/knowledge/KnowledgeFrame';
import StoryReader from '@/components/knowledge/StoryReader';
import {getStory,stories,storyHref} from '@/lib/knowledge/stories';
import {publicPageMetadata} from '@/lib/public-metadata';
export function generateStaticParams(){return stories.filter(s=>s.collection==='nobel').map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params,s=getStory('nobel',slug);return s?publicPageMetadata(storyHref(s),s.name+' | Nobel Stories',s.dek):{title:'Nobel story not found'}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params,s=getStory('nobel',slug);if(!s)notFound();return <KnowledgeFrame collection="nobel"><StoryReader story={s}/></KnowledgeFrame>}
