import {Suspense} from 'react';
import {notFound} from 'next/navigation';
import {currentRecruiter} from '@/lib/recruiter-server';
import RecruiterSignOut from '@/components/RecruiterSignOut';
async function PrivateWorkspace(){const recruiter=await currentRecruiter();if(!recruiter)notFound();return <section className="recruiter-card"><p className="recruiter-eyebrow">ERDAL KILIC · RECRUITER SPACE</p><h1>Your private workspace.</h1><p>Verified for <strong>{recruiter.email}</strong>.</p><p>This invitation gives you access to a private conversation with Erdal’s career assistant. Career questions, job matching, matrices, and tailored resumes will be available here as they are enabled.</p><p>For now, continue your email conversation with Erdal for questions or documents.</p><RecruiterSignOut/></section>;}
export default function RecruiterPage(){return <Suspense fallback={<section className="recruiter-card"><p>Checking your private invitation…</p></section>}><PrivateWorkspace/></Suspense>;}
