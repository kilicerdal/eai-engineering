import 'server-only';
import studies from '../../../data/art/research/collection-studies.json';
export type StudyDossier={scholarship?:{name:string;text:string;url:string};argument:string;audience:string;limit:string;debate:[string,string][];points:{x:number;y:number;title:string;text:string}[];source:{title:string;url:string}};
export const collectionStudies=studies as unknown as Record<string,StudyDossier>;
