import data from '../../../data/knowledge/opening-stories.json';
import type {Collection,Reference,Story} from './story-types';
export type {Collection,Reference,Story} from './story-types';
export {collectionHref,collectionTitle,storyHref,storyReferences,readingMinutes} from './story-utils';
export const stories=data.stories as Story[];
export const references=data.sources as Record<string,Reference>;
export const edition=data.edition;
export const getStory=(collection:Collection,slug:string)=>stories.find(s=>s.collection===collection&&s.slug===slug);
