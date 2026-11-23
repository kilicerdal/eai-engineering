import type {Collection,Reference,Story} from './story-types';

export const collectionHref=(collection:Collection)=>collection==='discoveries'?'/study/curiosity/discoveries':'/study/nobel';
export const collectionTitle=(collection:Collection)=>collection==='discoveries'?'Great Discoveries':'Nobel Stories';
export const storyHref=(story:Pick<Story,'slug'|'collection'>)=>collectionHref(story.collection)+'/'+story.slug;
export const storyReferences=(story:Story)=>[...new Set([...story.summarySources,...story.sections.flatMap(s=>s.sourceIds),...story.people.flatMap(p=>p.sourceIds),...story.timeline.flatMap(t=>t.sourceIds),...(story.award?[story.award.sourceId]:[])])];
export function readingMinutes(story:Story){const text=[story.summary,...story.lead,...story.sections.flatMap(s=>s.paragraphs),...story.people.map(p=>p.text),...story.timeline.map(t=>t.text),...Object.values(story.evidence),story.reflection].join(' ');return Math.max(1,Math.ceil(text.split(/\s+/).length/190));}

export type {Collection,Reference,Story};
