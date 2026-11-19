import {normalizeHomeVital,readVitalBody,createVitalBudget} from '@/lib/home-vitals.mjs';
const takeBudget=createVitalBudget();
export async function POST(request: Request) {
 const suppliedOrigin=request.headers.get('origin');
 let sameOrigin=false;
 try {
  const source=new URL(suppliedOrigin||'');
  const loopback=['127.0.0.1','localhost','[::1]'].includes(source.hostname)&&source.protocol==='http:';
  sameOrigin=source.origin===suppliedOrigin&&source.host===request.headers.get('host')&&(source.protocol==='https:'||loopback);
 }catch{ /* Missing or malformed origins are not browser telemetry. */ }
 if(!sameOrigin || request.headers.get('sec-fetch-site')==='cross-site')return new Response(null,{status:403});
 if(!takeBudget())return new Response(null,{status:429,headers:{'Retry-After':'60'}});
 try {
  const metric=normalizeHomeVital(await readVitalBody(request));
  if(!metric)return new Response(null,{status:400});
  // Deliberately do not log the request or its headers, URL, IP, or any client-supplied fields.
  console.info(JSON.stringify({event:'homepage_web_vital',scope:'homepage-entry-document',...metric,context:metric.context||'legacy-document',revision:process.env.VERCEL_GIT_COMMIT_SHA?.slice(0,40)||'local'}));
  return new Response(null,{status:204,headers:{'Cache-Control':'no-store'}});
 } catch(error) {return new Response(null,{status:error instanceof RangeError?413:400});}
}
