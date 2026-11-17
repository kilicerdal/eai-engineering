export type RetryMode='same-key'|'changed-payload'|'new-key';
export type Result={status:number;id:string|null};
export function createRetryModel(initialStock?:number):{submit:(key:string,payload:string)=>Result;inspect:()=>{orderCount:number;stock:number}};
export function runRetryExample(mode?:RetryMode):{mode:RetryMode;first:Result;retry:Result;orderCount:number;stock:number;singleEffect:boolean};
export function checkRetryExamples():unknown;
