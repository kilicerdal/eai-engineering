import {notFound} from 'next/navigation';
import {portalEnabled} from '@/lib/recruiter-server';
import RecruiterInvitation from '@/components/RecruiterInvitation';
export default function RecruiterInvitePage(){if(!portalEnabled())notFound();return <RecruiterInvitation/>;}
