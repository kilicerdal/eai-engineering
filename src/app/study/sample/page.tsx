import Link from "next/link";
import StudyNavigation from "@/components/StudyNavigation";
import SampleLesson from "@/components/SampleLesson";

export const metadata = { title: "Five-minute algebra lesson | dAI Learning Studio" };

export default function SamplePage() {
  return <main className="studio-materials min-h-screen">
    <StudyNavigation/>
    <section className="mx-auto max-w-2xl px-6 py-12">
      <p className="studio-eyebrow">FIVE-MINUTE SAMPLE LESSON</p>
      <h1 className="my-4 font-serif text-4xl">Keep an equation balanced.</h1>
      <p>Try two short problems. Use a hint when you need one and compare your answers at the end. This sample stays in this tab for the session.</p>
      <SampleLesson/>
      <Link href="/study?from=algebra-sample#ai-assistant" className="underline">Discuss this sample with your AI Tutor →</Link>
    </section>
  </main>;
}
