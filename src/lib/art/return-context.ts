/** Small, tab-local navigation records; never stored with personal writing or backups. */
export const ART_CONTEXT_KEY='dai-art-return-context-v1';
export type ArtReturnContext={target:string;href:string;label:string};
const route=/^\/study\/art(?:\/(?:scholarship|painter\/[a-z0-9-]+|painting\/[a-z0-9-]+|on-paper(?:\/[a-z0-9-]+)?|visits|trail\/[a-z0-9-]+|exhibitions(?:\/[a-z0-9-]+)?|my-art|compare))?$/;
export function parseArtReturnContext(raw:string|null,target:string):ArtReturnContext|null {
 try{const value:unknown=JSON.parse(raw??'null');if(!value||typeof value!=='object')return null;const v=value as Record<string,unknown>;
 if(v.target!==target||typeof v.href!=='string'||v.href.length>1600||typeof v.label!=='string'||v.label.length>100)return null;
 const url=new URL(v.href,'https://local.invalid');if(url.origin!=='https://local.invalid'||!route.test(url.pathname)||url.pathname===target)return null;
 return {target,href:url.pathname+url.search+url.hash,label:v.label};
 }catch{return null;}
}
export function artContextLabel(path:string){return path.endsWith('/scholarship')?'Back to your scholarship results':path.includes('/painter/')?'Back to the painter profile':path.includes('/on-paper')?'Back to drawings & working process':path.includes('/painting/')?'Back to the previous study':path.includes('/compare')?'Back to your comparison':path.includes('/my-art')?'Back to My Art':/\/(visits|trail|exhibitions)(\/|$)/.test(path)?'Back to your guided visit':'Back to your results';}
