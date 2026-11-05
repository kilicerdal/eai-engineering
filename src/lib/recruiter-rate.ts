import {ipAddress} from '@vercel/functions';
import {Redis} from '@upstash/redis';
import {Ratelimit} from '@upstash/ratelimit';
import {createHmac} from 'node:crypto';
import {NextResponse} from 'next/server';
import {PRIVATE_HEADERS} from './recruiter-server';
const redis=process.env.UPSTASH_REDIS_REST_URL&&process.env.UPSTASH_REDIS_REST_TOKEN?Redis.fromEnv():null;
const limiter=redis?new Ratelimit({redis,limiter:Ratelimit.slidingWindow(20,'10 m'),prefix:'eai:recruiter:rate',analytics:false}):null;
export async function protectRecruiterRequest(request:Request){
 const ip=ipAddress(request),secret=process.env.RECRUITER_AUTOMATION_KEY;
 if(!limiter||!ip||!secret)return NextResponse.json({error:'Verification is temporarily unavailable.'},{status:503,headers:PRIVATE_HEADERS});
 try{const key=createHmac('sha256',secret).update('recruiter-ip:'+ip).digest('hex');const result=await limiter.limit(key);if(!result.success)return NextResponse.json({error:'Please wait before trying again.'},{status:429,headers:{...PRIVATE_HEADERS,'Retry-After':String(Math.max(1,Math.ceil((result.reset-Date.now())/1000)))}});return null;}
 catch{return NextResponse.json({error:'Verification is temporarily unavailable.'},{status:503,headers:PRIVATE_HEADERS});}
}
