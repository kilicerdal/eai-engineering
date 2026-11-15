export type TutorSource = {kind:'problem'|'passage';title:string;text:string;href?:string};
export function normalizeTutorSource(value:unknown):TutorSource|null {
 if(!value||typeof value!=='object')return null;
 const v=value as Record<string,unknown>;
 if(!['problem','passage'].includes(String(v.kind))||typeof v.title!=='string'||!v.title.trim()||v.title.length>200||typeof v.text!=='string'||!v.text.trim()||v.text.length>4000)return null;
 if(v.href!==undefined&&(typeof v.href!=='string'||v.href.length>500||!/^\/study\/(?:reading|materials)(?:[/?#]|$)/.test(v.href)))return null;
 return {kind:v.kind as TutorSource['kind'],title:v.title,text:v.text,...(typeof v.href==='string'?{href:v.href}:{})};
}
