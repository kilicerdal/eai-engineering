import StudyHome from "./StudyHome";
import {publicPageMetadata} from "@/lib/public-metadata";
export const metadata=publicPageMetadata("/study","dAI Learning Studio | Explore what you don’t yet know","Explore ideas with an AI tutor, study your own materials, and build understanding through focused practice.");
export default function Page(){return <StudyHome/>;}
