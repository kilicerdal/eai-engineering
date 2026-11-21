import Link from "next/link";
import StudyHome from "./StudyHome";
import {publicPageMetadata} from "@/lib/public-metadata";
export const metadata=publicPageMetadata("/study","dAI Learning Studio | Explore what you don’t yet know","Explore ideas with an AI tutor, study your own materials, and build understanding through focused practice.");
export default function Page(){return <StudyHome entrance={<nav className="studio-start-choices" aria-label="Choose your next step"><a href="#learning-rooms"><strong>Learn something</strong><span>A book, a painting, a surprising idea.</span></a><Link href="/study/certifications"><strong>Practice a skill</strong><span>Choose an engineering certification and work at your pace.</span></Link><Link href="/your-space"><strong>Continue my work</strong><span>Find your saved sessions, notes and places.</span></Link></nav>}/>;}
