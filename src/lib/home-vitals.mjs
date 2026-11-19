// A deliberately small first-party payload: no URLs, IDs, headers, messages or saved work.
export function normalizeHomeVital(input) {
 if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
 if (!['device,metric,value','context,device,metric,value'].includes(Object.keys(input).sort().join(','))) return null;
 if (input.context !== undefined && !['home-so-far','after-navigation'].includes(input.context)) return null;
 const {metric,value,device}=input;
 if (!['LCP','CLS','INP'].includes(metric) || !['mobile','desktop'].includes(device)) return null;
 if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > (metric === 'CLS' ? 10 : 600000)) return null;
 const thresholds=metric==='CLS'?[.1,.25]:metric==='LCP'?[2500,4000]:[200,500];
 return {metric,value:Math.round(value*1000)/1000,device,...(input.context ? {context:input.context} : {}),rating:value<=thresholds[0]?'good':value<=thresholds[1]?'needs-improvement':'poor'};
}
export async function readVitalBody(request) {
 if(Number(request.headers.get('content-length')||0)>512)throw new RangeError('Payload too large');
 const reader=request.body?.getReader();if(!reader)throw new Error('Missing body');
 let bytes=0;const chunks=[];
 try {for(;;){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>512){await reader.cancel();throw new RangeError('Payload too large');}chunks.push(value);}}finally{reader.releaseLock();}
 const body=new Uint8Array(bytes);let offset=0;for(const chunk of chunks){body.set(chunk,offset);offset+=chunk.byteLength;}
 return JSON.parse(new TextDecoder().decode(body));
}
export function createVitalBudget(limit=300,windowMs=60000) {
 let start=0,count=0;
 return (now=Date.now())=>{if(now-start>=windowMs){start=now;count=0;}return ++count<=limit;};
}
