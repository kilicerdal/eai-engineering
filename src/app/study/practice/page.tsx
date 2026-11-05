import StudyGuide from "@/components/StudyGuide";
import Link from "next/link";
import StudyNavigation from "@/components/StudyNavigation";
import StudyPractice from "@/components/StudyPractice";
import SharedAIChat from "@/components/SharedAIChat";
export default function FoundationalPractice(){return <main><StudyNavigation/><section className="mx-auto max-w-7xl px-6 py-10"><p className="studio-eyebrow">FOUNDATIONAL EXERCISES</p><h1 className="mt-3 text-4xl">A little practice. A clearer idea.</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">A small checked question bank across four learning tracks. These exercises are not an exam simulation or an exam-specific curriculum.</p><StudyGuide section="Foundational practice">Choose a track and try a question. Select an answer and check it, or reveal a hint if you are stuck. Read the feedback before moving to the next question.</StudyGuide><Link href="/study#exam-preparation" className="mt-4 inline-block text-sm text-cyan-300">← Return to exam preparation</Link></section><StudyPractice/><SharedAIChat/></main>;}
