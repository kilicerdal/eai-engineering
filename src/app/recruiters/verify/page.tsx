import {notFound} from 'next/navigation';
import {portalEnabled} from '@/lib/recruiter-server';
import RecruiterVerification from '@/components/RecruiterVerification';
export default function RecruiterVerifyPage(){if(!portalEnabled())notFound();return <RecruiterVerification/>;}
