import 'server-only';
import manuscript from '../../../data/art/editorial-v2.json';
export type ArtEssay={title:string;lead:string;sections:{id:string;title:string;kind:string;sources:number[];paragraphs:string[]}[];sources:{title:string;url:string;scope:string}[];words:number;minutes:number;edition:string;reviewed:string};
export const artEditorial=manuscript as Record<'painters'|'paintings'|'eras'|'essays',Record<string,ArtEssay>>;
export const editorialLabels:Record<string,string>={history:'Historical context',analysis:'Visual analysis',technical:'Material & technique',interpretation:'Interpretation'};
