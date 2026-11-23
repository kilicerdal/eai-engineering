import KnowledgeFrame from '@/components/knowledge/KnowledgeFrame';
import CollectionEntrance from '@/components/knowledge/CollectionEntrance';
import {publicPageMetadata} from '@/lib/public-metadata';
export const metadata=publicPageMetadata('/study/nobel','Nobel Stories | dAI Learning Studio','Understand the achievements behind Einstein’s 1921 Physics prize and the 1945 penicillin prize, with sources, timelines and wider contributors.');
export default function Page(){return <KnowledgeFrame collection="nobel"><CollectionEntrance collection="nobel"/></KnowledgeFrame>}
