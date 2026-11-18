export type LabUsage={promptTokens:number;completionTokens:number;totalTokens:number};
export function measuredLabUsage(value:unknown):LabUsage|null{if(!value||typeof value!=='object')return null;const v=value as Record<string,unknown>;if(!['prompt_tokens','completion_tokens','total_tokens'].every(k=>Number.isSafeInteger(v[k])&&Number(v[k])>=0&&Number(v[k])<=10000000))return null;if(Number(v.total_tokens)!==Number(v.prompt_tokens)+Number(v.completion_tokens))return null;return {promptTokens:Number(v.prompt_tokens),completionTokens:Number(v.completion_tokens),totalTokens:Number(v.total_tokens)};}

export function labRequestBody(payload:Record<string,unknown>,question:string,economy:boolean){return {...payload,question,...(economy?{economy:true}:{})};}
