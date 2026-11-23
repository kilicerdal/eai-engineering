import KnowledgeFrame from '@/components/knowledge/KnowledgeFrame';
import CollectionEntrance from '@/components/knowledge/CollectionEntrance';
import {publicPageMetadata} from '@/lib/public-metadata';
export const metadata=publicPageMetadata('/study/nobel','Nobel Stories | dAI Learning Studio','Explore eighteen researched Nobel and Economic Sciences stories across five Nobel categories and Economic Sciences, with detailed histories, official award records, evidence, contributors and open questions.');
export default function Page(){return <KnowledgeFrame collection="nobel"><CollectionEntrance collection="nobel"/></KnowledgeFrame>}
