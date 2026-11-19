export const SHORT_CASE_KEY='eai-short-cases-v1';
export const shortCases=[
 {id:'retry',door:'Something broke',title:'A reply was lost. Was the order lost too?',invitation:'Predict a retry outcome, then inspect a captured result.',kind:'Recorded case'},
 {id:'cloud',door:'Help me choose',title:'Where should the next image come from?',invitation:'Compare an origin request with an edge cache hit.',kind:'Illustrative model'},
 {id:'testing',door:'Teach me something',title:'One number. A hidden boundary.',invitation:'Choose an input that exposes a tiny comparison defect.',kind:'Interactive model'},
] as const;
export type ShortCaseId=typeof shortCases[number]['id'];
export type ShortProgress={version:1;caseId:ShortCaseId;step:number;prediction:string;fault:boolean;probe:number;updatedAt:number};
export function restoreShortProgress(raw:string|null):ShortProgress|null{
 try{const x=JSON.parse(raw||'null');if(!x||x.version!==1||!shortCases.some(c=>c.id===x.caseId)||![0,1,2].includes(x.step)||typeof x.prediction!=='string'||!['','original','second','unknown','edge','origin','99','100','101'].includes(x.prediction)||typeof x.fault!=='boolean'||![99,100,101].includes(x.probe)||!Number.isFinite(x.updatedAt))return null;return x;}catch{return null;}
}
export function boundaryResult(input:number,fault:boolean){return fault?input>100:input>=100;}
