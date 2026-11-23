import 'server-only';
import data from '../../../data/art/research/picasso-on-paper.json';
export const picassoStudies=data.studies;
export const picassoRoutes=data.routes;
export const picassoBullStates=data.bullStates;
export const picassoChecked=data.checked;
export const picassoSources=data.sources as Record<string,{title:string;url:string;scope:string;checked:string}>;
export const picassoStudyHref=(slug:string)=>'/study/art/on-paper/picasso/'+slug;
export function picassoStudy(slug:string){return picassoStudies.find(s=>s.slug===slug);}
export function picassoRoute(id:string){return picassoRoutes.find(r=>r.id===id);}
