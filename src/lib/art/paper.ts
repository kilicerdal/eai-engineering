import 'server-only';
import data from '../../../data/art/research/on-paper.json';
export type PaperStudy={id:string;imageView?:"paired";role:string;material:string;observation:string;documented:string;limit:string;process:string;paper:string;provenance:string;inscription:string;prompts:{x:number;y:number;title:string;text:string}[];sources:{title:string;url:string}[];reverse?:{caption?:string;image:string;width:number;height:number;source:string;rights:string;licenseUrl:string;bytes:number}};
export const paperStudies=data.studies as Record<string,PaperStudy>;
export const paperMaterials=data.materials;
export const paperConnections=data.connections;

export const paperPractices=data.practices;
