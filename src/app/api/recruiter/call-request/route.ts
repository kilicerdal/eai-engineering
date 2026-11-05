import {NextResponse} from 'next/server';
import {currentRecruiter,portalEnabled,PRIVATE_HEADERS,recruiterOrigin} from '@/lib/recruiter-server';
import {requestIsSameOrigin} from '@/lib/recruiter-access';
import {protectRecruiterRequest} from '@/lib/recruiter-rate';
import {validateCallRequest,notifyCallOwner} from '@/lib/recruiter-call-request';
export async function POST(request:Request){
 if(!portalEnabled())return new NextResponse(null,{status:404,headers:PRIVATE_HEADERS});
 if(!requestIsSameOrigin(request,recruiterOrigin()))return new NextResponse(null,{status:403,headers:PRIVATE_HEADERS});
 const recruiter=await currentRecruiter();if(!recruiter)return NextResponse.json({error:'Please verify your invitation again.'},{status:401,headers:PRIVATE_HEADERS});
 const key=process.env.RECRUITER_CALL_EMAIL_KEY;if(!key)return NextResponse.json({error:'Automatic notifications are not configured. Use the email request option.'},{status:503,headers:PRIVATE_HEADERS});
 const limited=await protectRecruiterRequest(request);if(limited)return limited;
 let fields;try{const body=await request.text();if(body.length>3000)throw Error('Request too long.');fields=validateCallRequest(JSON.parse(body));}catch(error){return NextResponse.json({error:error instanceof Error?error.message:'Invalid request.'},{status:400,headers:PRIVATE_HEADERS});}
 try{await notifyCallOwner(fields,recruiter.email,key);return NextResponse.json({message:'Your request has been emailed to Erdal. He will review your preferred times and reply. No call is booked yet.'},{headers:PRIVATE_HEADERS});}
 catch{return NextResponse.json({error:'Your email notification could not be confirmed. Please retry the same request or email Erdal directly. No call has been booked.'},{status:502,headers:PRIVATE_HEADERS});}
}
