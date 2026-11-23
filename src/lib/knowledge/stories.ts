import data from '../../../data/knowledge/opening-stories.json';
export type Collection='discoveries'|'nobel';
export type Reference={title:string;url:string;kind:string;scope:string;checked:string};
export type Story={slug:string;collection:Collection;topic:string;title:string;name:string;dek:string;period:string;visual:string;pair?:string;question:string;uncertainty:string;discussionPrompts:string[];summary:string;summarySources:string[];lead:string[];sections:{id:string;title:string;paragraphs:string[];sourceIds:string[]}[];timeline:{date:string;title:string;text:string;sourceIds:string[]}[];people:{name:string;role:string;text:string;sourceIds:string[]}[];evidence:{observed:string;established:string;limit:string};reflection:string;award?:{year:string;field:string;recipients:string[];citation:string;sourceId:string}};
export const stories=data.stories as Story[];
export const references=data.sources as Record<string,Reference>;
export const edition=data.edition;
export const collectionHref=(collection:Collection)=>collection==='discoveries'?'/study/curiosity/discoveries':'/study/nobel';
export const collectionTitle=(collection:Collection)=>collection==='discoveries'?'Great Discoveries':'Nobel Stories';
export const storyHref=(story:Pick<Story,'slug'|'collection'>)=>collectionHref(story.collection)+'/'+story.slug;
export const getStory=(collection:Collection,slug:string)=>stories.find(s=>s.collection===collection&&s.slug===slug);
export const storyReferences=(story:Story)=>[...new Set([...story.summarySources,...story.sections.flatMap(s=>s.sourceIds),...story.people.flatMap(p=>p.sourceIds),...story.timeline.flatMap(t=>t.sourceIds),...(story.award?[story.award.sourceId]:[])])];
export function readingMinutes(story:Story){const text=[story.summary,...story.lead,...story.sections.flatMap(s=>s.paragraphs),...story.people.map(p=>p.text),...story.timeline.map(t=>t.text),...Object.values(story.evidence),story.reflection].join(' ');return Math.max(1,Math.ceil(text.split(/\s+/).length/190));}
