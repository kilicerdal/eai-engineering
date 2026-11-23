import KnowledgeFrame from '@/components/knowledge/KnowledgeFrame';
import CollectionEntrance from '@/components/knowledge/CollectionEntrance';
import {publicPageMetadata} from '@/lib/public-metadata';
export const metadata=publicPageMetadata('/study/curiosity/discoveries','Great Discoveries | dAI Learning Studio','Explore the people, experiments and evidence behind penicillin and the photoelectric effect, with detailed stories and connected Nobel accounts.');
export default function Page(){return <KnowledgeFrame collection="discoveries"><CollectionEntrance collection="discoveries"/></KnowledgeFrame>}
