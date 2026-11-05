export const CALL_OWNER='erdal.kilic.us@gmail.com';
export const CALL_SUBJECT='[Recruiter wants to connect] Call request for Erdal Kilic';
export type CallRequest={requestId:string;name:string;date:string;windows:string;timezone:string;topic:string};
export function validateCallRequest(value:unknown):CallRequest{
 if(!value||typeof value!=='object')throw Error('Enter your preferred date, time windows and timezone.');
 const v=value as Record<string,unknown>;
 for(const [key,max] of [['requestId',36],['name',100],['date',10],['windows',400],['timezone',80],['topic',600]] as const)if(typeof v[key]!=='string'||(v[key] as string).length>max||/[\u0000-\u0008\u000b-\u001f]/.test(v[key] as string))throw Error('Please check the request fields.');
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v.requestId as string))throw Error('Invalid request. Reload and try again.');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(v.date as string)||new Date((v.date as string)+'T12:00:00Z').toISOString().slice(0,10)!==v.date)throw Error('Enter a valid date.');
 try{new Intl.DateTimeFormat('en',{timeZone:v.timezone as string}).format();}catch{throw Error('Use a timezone such as America/New_York.');}
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:v.timezone as string,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 if((v.date as string)<today)throw Error('Please choose today or a future date.');
 if(!(v.windows as string).trim()||!(v.topic as string).trim())throw Error('Enter preferred times and a short topic.');
 return Object.fromEntries(Object.entries(v).filter(([k])=>['requestId','name','date','windows','timezone','topic'].includes(k)).map(([k,x])=>[k,(x as string).trim()])) as CallRequest;
}
export function callRequestText(r:CallRequest,email?:string){return `Recruiter wants to connect with Erdal\n\n${email?'Verified recruiter email: '+email+'\n':''}Name: ${r.name||'Not supplied'}\nPreferred date: ${r.date}\nPreferred time windows: ${r.windows}\nTimezone: ${r.timezone}\nTopic: ${r.topic}\n\nThis is a request only. No call has been scheduled and no availability has been promised. Erdal will review and reply with a suitable time.\nRequest reference: ${r.requestId}`;}
export function callRequestMailto(r:CallRequest){return `mailto:${CALL_OWNER}?subject=${encodeURIComponent(CALL_SUBJECT)}&body=${encodeURIComponent(callRequestText(r))}`;}
export async function notifyCallOwner(r:CallRequest,email:string,key:string,fetcher:typeof fetch=fetch){
 const response=await fetcher('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json','Idempotency-Key':'recruiter-call-'+r.requestId},body:JSON.stringify({from:'eAI Recruiter Requests <signin@notify.eai.engineering>',to:[CALL_OWNER],reply_to:email,subject:CALL_SUBJECT,text:callRequestText(r,email)}),signal:AbortSignal.timeout(15000),cache:'no-store'});
 if(!response.ok)throw Error('Notification could not be confirmed. Retry the same request or email Erdal directly.');
 const result=await response.json();if(typeof result.id!=='string')throw Error('Notification could not be confirmed.');return result.id as string;
}
