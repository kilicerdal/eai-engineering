import {Suspense} from 'react';
import {notFound} from 'next/navigation';
import {currentRecruiter} from '@/lib/recruiter-server';
import RecruiterSignOut from '@/components/RecruiterSignOut';
import RecruiterAssistant from '@/components/RecruiterAssistant';
async function PrivateWorkspace(){const recruiter=await currentRecruiter();if(!recruiter)notFound();return <section className="recruiter-card"><p className="recruiter-eyebrow">ERDAL KILIC · RECRUITER SPACE</p><h1>Your private workspace.</h1><p>Verified for <strong>{recruiter.email}</strong>.</p><RecruiterAssistant/><RecruiterSignOut/></section>;}
export default function RecruiterPage(){return <Suspense fallback={<section className="recruiter-card"><p>Checking your private invitation…</p></section>}><PrivateWorkspace/></Suspense>;}
