import {publicPageMetadata} from "@/lib/public-metadata";
import LearningJourneys from '@/components/LearningJourneys';
import {journeys} from '@/lib/learning-paths';
import {facts} from '../curiosity/facts';
export const metadata={...publicPageMetadata('/study/journeys','Learning journeys | dAI Learning Studio','Short guided journeys from sourced discovery to experiment and reflection.'),title:'Wonder, try, understand | dAI Learning Studio',description:'Short guided journeys connecting a sourced discovery, an interactive experiment and your own reflection.'};
export default function Page(){return <LearningJourneys discoveries={journeys.map(j=>{const f=facts.find(f=>f.id===j.fact)!;return {id:f.id,title:f.title,text:f.text,source:f.source,url:f.url};})}/>;}
