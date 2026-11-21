import 'server-only';
import data from '../../../data/art/facts/collection.json';
export type ArtFact={id:string;title:string;kind:'documented'|'observation'|'research-limit';category:string;text:string;why:string;source:{title:string;url:string;scope?:string};editorialReviewed:string;reviewScope:string;evidenceNote?:string;relatedWork?:string};
export const artFacts=data as {edition:string;authored:string;scope:string;painters:Record<string,ArtFact[]>;paintings:Record<string,ArtFact[]>};
export const factLabels={documented:'Documented context',observation:'Visible detail','research-limit':'Research limit'};
