import {notFound} from 'next/navigation';
import StudyNavigation from '@/components/StudyNavigation';
import CertificationPath from '@/components/certifications/CertificationStudio';
import {certTracks,getCert} from '@/lib/certification-content';
import '../certifications.css';
export function generateStaticParams(){return certTracks.map(t=>({track:t.id}));}
export async function generateMetadata({params}:{params:Promise<{track:string}>}){const {track}=await params,t=getCert(track);return {title:t?`${t.title} | Engineering Certification Studio`:'Certification Studio',description:t?.intro};}
export default async function CertificationPage({params}:{params:Promise<{track:string}>}){const {track}=await params,t=getCert(track);if(!t)notFound();return <main className="cert-studio"><StudyNavigation/><CertificationPath key={t.id} id={t.id}/></main>;}
